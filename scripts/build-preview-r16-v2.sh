#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p previews
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
# Video 1: established industrial Lodz (Pixabay license). 8.5 seconds, no repeated frozen frames.
curl -fL --retry 3 --connect-timeout 20 --max-time 150 -A "Barczuk/VideoReview/1.0" \
  "https://cdn.pixabay.com/video/2021/11/14/97897-649761128_large.mp4" \
  -o "$WORK/lodz.mp4"
# Video 2: modern large industrial/logistics complex, Pexels free license.
curl -fL --retry 3 --connect-timeout 20 --max-time 180 -A "Mozilla/5.0" \
  "https://www.pexels.com/download/video/37703920/" \
  -o "$WORK/logistics.mp4"
# Video 3: historic Fabryczna / NC Lodz footage from Wikimedia Commons.
# This is for review only and is labeled explicitly as an archival/temporary scene.
python3 - "$WORK" <<'PY'
import json,sys,urllib.request,urllib.parse,html,os
w=sys.argv[1]
title="File:Nowe Centrum Łodzi - Budowa dworca Łódź Fabryczna.webm"
q=urllib.parse.urlencode({"action":"query","prop":"imageinfo","titles":title,"iiprop":"url|extmetadata","format":"json"})
url="https://commons.wikimedia.org/w/api.php?"+q
req=urllib.request.Request(url,headers={"User-Agent":"BarczukPreviewReview/1.0 (kontakt@barczuk.com.pl)"})
with urllib.request.urlopen(req,timeout=40) as resp: j=json.load(resp)
p=next(iter(j["query"]["pages"].values()))
if "missing" in p or not p.get("imageinfo"): raise RuntimeError("Wikimedia file missing")
d=p["imageinfo"][0]; meta=d.get("extmetadata",{})
license=html.unescape(meta.get("LicenseShortName",{}).get("value",""))
terms=html.unescape(meta.get("UsageTerms",{}).get("value",""))
author=html.unescape(meta.get("Artist",{}).get("value",""))
if not (license.startswith("CC BY") or license=="CC0" or license=="Public domain"): raise RuntimeError("License needs review: "+license)
if "NC" in license or "ND" in license: raise RuntimeError("Incompatible license: "+license)
video_url=d["url"]
with urllib.request.urlopen(urllib.request.Request(video_url,headers={"User-Agent":"BarczukPreviewReview/1.0 (kontakt@barczuk.com.pl)"}),timeout=100) as resp,open(w+"/fabryczna.webm","wb") as out:
 while True:
  chunk=resp.read(1024*1024)
  if not chunk: break
  out.write(chunk)
  if out.tell()>50_000_000: raise RuntimeError("Unexpected video size")
if os.stat(w+"/fabryczna.webm").st_size<300000:raise RuntimeError("Video is too small")
with open("previews/VIDEO_R16_V2_SOURCES.md","w") as out:
 out.write("# R16 montage trial — sources\n\n**PREVIEW ONLY — third clip is historical construction, not the modern completed district, and must be replaced before production.**\n\n")
 out.write("1. [Lodz industrial video](https://pixabay.com/videos/poland-industrial-old-building-97897/) — PolishSights, Pixabay Content License.\n")
 out.write("2. [Modern logistics complex aerial video](https://www.pexels.com/video/aerial-view-of-industrial-warehouse-complex-37703920/) — Toàn BDS, Pexels License. Generic international logistics park; **not represented as Lodz**.\n")
 out.write("3. [Nowe Centrum Łodzi — construction of Łódź Fabryczna](https://commons.wikimedia.org/wiki/File:Nowe_Centrum_%C5%81odzi_-_Budowa_dworca_%C5%81%C3%B3d%C5%BA_Fabryczna.webm) — historical footage, Wikimedia "+license+", "+terms+", "+author+". Source "+video_url+".\n\n")
 out.write("The final commercial version needs current moving footage of completed Fabryczna / NC Łodzi and verified appropriate rights. Current footage is not to be published as a depiction of modern Łódź.\n")
print("Wikimedia license:",license,"Author:",author[:180],"size",os.path.getsize(w+"/fabryczna.webm"))
PY
ffprobe -v error "$WORK/lodz.mp4" >/dev/null
ffprobe -v error "$WORK/logistics.mp4" >/dev/null
ffprobe -v error "$WORK/fabryczna.webm" >/dev/null
# Compute crossfades while cameras are moving; no zoom/pan and no tpad.
# Each subclip has genuine temporal motion. The archival clip is visibly identified.
ffmpeg -hide_banner -loglevel error -y \
  -i "$WORK/lodz.mp4" -i "$WORK/logistics.mp4" -i "$WORK/fabryczna.webm" \
  -filter_complex "[0:v]trim=duration=8.5,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v0];[1:v]trim=duration=12,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v1];[2:v]trim=duration=12,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v2];[v0][v1]xfade=transition=fade:duration=1.6:offset=6.9[v01];[v01][v2]xfade=transition=fade:duration=1.6:offset=17.3,format=yuv420p,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='ARCHIWUM — ŁÓDŹ FABRYCZNA':fontsize=24:fontcolor=white:box=1:boxcolor=black@0.45:boxborderw=8:x=24:y=h-55:enable='gte(t,18.0)'[out]" \
  -map "[out]" -an -r 25 -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -movflags +faststart \
  previews/hero-r16-three-shots-test.mp4
ffmpeg -hide_banner -loglevel error -y -ss 10 -i previews/hero-r16-three-shots-test.mp4 \
  -frames:v 1 -q:v 3 previews/hero-r16-logistics-poster.jpg
python3 - <<'PY'
import json,os,subprocess
p="previews/hero-r16-three-shots-test.mp4"
x=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration,size","-of","json",p]))["format"]
d=float(x["duration"]);size=int(x["size"])
assert 29.0<=d<=29.5,(d,size)
assert 200000 < size < 30000000,size
print(f"REVIEW VIDEO: {d:.2f}s, {size} bytes. Third scene is marked ARCHIVAL.")
PY
