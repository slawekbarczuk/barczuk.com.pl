#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p previews
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
curl -LfsS --retry 3 --max-time 120 -o "$WORK/lodz.mp4" \
  "https://cdn.pixabay.com/video/2021/11/14/97897-649761128_large.mp4"
ffprobe -v error "$WORK/lodz.mp4" >/dev/null
python3 - "$WORK" <<'PY'
import os, sys, subprocess
from urllib.request import Request, urlopen
work=sys.argv[1]
sources=[
  ("Magazyny przemyslowe z drona, Pexels 40800049", "https://www.pexels.com/download/video/40800049/"),
  ("Duzy zaklad produkcyjny z drona, Pexels 29959491", "https://www.pexels.com/download/video/29959491/"),
  ("Magazyny i plac logistyczny, Pexels 32312093", "https://videos.pexels.com/video-files/32312093/13780545_1920_1080_30fps.mp4")
]
for title,url in sources:
  print("Testing", title, flush=True)
  try:
    req=Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; video-preview/1.0)"})
    with urlopen(req,timeout=95) as response,open(work+"/warehouse.mp4","wb") as f:
      while True:
        buf=response.read(1024*1024)
        if not buf: break
        f.write(buf)
        if f.tell()>180_000_000: raise Exception("File exceeds preview size limit")
    r=subprocess.run(["ffprobe","-v","error","-select_streams","v:0","-show_entries","stream=duration","-show_entries","format=duration","-of","default=noprint_wrappers=1",work+"/warehouse.mp4"],capture_output=True,text=True)
    if r.returncode or os.stat(work+"/warehouse.mp4").st_size<100000: raise Exception("Video validation failure")
    open(work+"/source.txt","w").write(title+"\n"+url+"\n")
    print("SUCCESS", title,os.stat(work+"/warehouse.mp4").st_size,flush=True)
    break
  except Exception as e:
    print("SKIPPED",str(e)[:200],flush=True)
else:
  raise SystemExit("No Pexels source could be legally retrieved")
PY
S2="$(ffprobe -v error -show_entries format=duration -of default=nokey=1:noprint_wrappers=1 "$WORK/warehouse.mp4" | awk '{if($1>12.7)print "12.0";else if($1>7.8)print "7.5";else if($1>6)print "5.5";else print "0"}')"
test "$S2" != "0"
# Video 1 is genuine Lodz drone shot, video 2 is stock industrial facilities from unspecified location.
# Natural colors throughout, crossfade begins while both source cameras are still in motion.
ffmpeg -hide_banner -loglevel error -y \
 -i "$WORK/lodz.mp4" -i "$WORK/warehouse.mp4" \
 -filter_complex "[0:v]trim=start=0:duration=8.1,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v0];[1:v]trim=start=0:duration=$S2,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v1];[v0][v1]xfade=transition=fade:duration=1.6:offset=6.5,format=yuv420p[out]" \
 -map "[out]" -an -r 25 -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -movflags +faststart \
 previews/hero-r16-natural-first-two.mp4
ffmpeg -hide_banner -loglevel error -y -ss 2 -i previews/hero-r16-natural-first-two.mp4 -frames:v 1 -q:v 3 \
 previews/hero-r16-natural-poster.jpg
cp "$WORK/source.txt" previews/warehouse-source.txt
python3 - <<'PY'
import subprocess,json,os
f="previews/hero-r16-natural-first-two.mp4"
x=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration,size","-of","json",f]))["format"]
d=float(x["duration"]);size=int(x["size"])
assert 11 < d < 20, (d,size)
assert 200000 < size < 16000000, size
print(f"CREATED REVIEW MP4: {d:.2f}s, {size} bytes.")
PY
