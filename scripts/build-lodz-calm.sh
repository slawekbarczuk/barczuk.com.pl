#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
command -v rsvg-convert >/dev/null
test -s assets/video/lodz-r16.mp4
test -s favicon-b.svg
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
ORIGINAL_URL="https://cdn.pixabay.com/video/2021/11/14/97897-649761128_large.mp4"
if curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "BarczukWebsite/1.0 (kontakt@barczuk.com.pl)" -o "$WORK/industrial.mp4" "$ORIGINAL_URL" && ffprobe -v error "$WORK/industrial.mp4" >/dev/null; then
  echo "Using complete Lodz industrial source."
  CUT="8.5"
else
  echo "Source temporarily unavailable: using first Lodz seconds from the licensed R16 montage."
  cp assets/video/lodz-r16.mp4 "$WORK/industrial.mp4"
  CUT="3.3"
fi
curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "BarczukWebsite/1.0" \
  -o "$WORK/modern.jpg" "https://images.pexels.com/photos/32747566/pexels-photo-32747566.jpeg?auto=compress&cs=tinysrgb&w=1900"
curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "BarczukWebsite/1.0 (kontakt@barczuk.com.pl)" \
  -o "$WORK/panorama.jpg" "https://upload.wikimedia.org/wikipedia/commons/7/7b/20191211_085254_%C5%81%C3%B3d%C5%BA_Fabryczna.jpg"
ffprobe -v error "$WORK/modern.jpg" >/dev/null
ffprobe -v error "$WORK/panorama.jpg" >/dev/null
ffmpeg -hide_banner -loglevel error -y -i "$WORK/industrial.mp4" -frames:v 1 -q:v 2 "$WORK/first.jpg"
mkdir -p assets/video
ffmpeg -hide_banner -loglevel error -y \
  -i "$WORK/industrial.mp4" \
  -loop 1 -framerate 25 -t 13 -i "$WORK/modern.jpg" \
  -loop 1 -framerate 25 -t 13 -i "$WORK/panorama.jpg" \
  -loop 1 -framerate 25 -t 2.5 -i "$WORK/first.jpg" \
  -filter_complex "[0:v]trim=duration=$CUT,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,tpad=stop_mode=clone:stop_duration=13,trim=duration=13,settb=AVTB,format=yuv420p[v0];[1:v]fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,trim=duration=13,setpts=PTS-STARTPTS,settb=AVTB,format=yuv420p[v1];[2:v]fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,trim=duration=13,setpts=PTS-STARTPTS,settb=AVTB,format=yuv420p[v2];[3:v]fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,trim=duration=2.5,setpts=PTS-STARTPTS,settb=AVTB,format=yuv420p[v3];[v0][v1]xfade=transition=fade:duration=2.5:offset=10.5[v01];[v01][v2]xfade=transition=fade:duration=2.5:offset=21[v02];[v02][v3]xfade=transition=fade:duration=2.5:offset=31.5,eq=saturation=0.58:brightness=-0.01:contrast=1.04,format=yuv420p[out]" \
  -map "[out]" -an -r 25 -c:v libx264 -preset fast -crf 29 -pix_fmt yuv420p -movflags +faststart \
  assets/video/lodz-r16-calm.mp4
ffmpeg -hide_banner -loglevel error -y -ss 1 -i assets/video/lodz-r16-calm.mp4 \
  -frames:v 1 -q:v 3 assets/video/lodz-r16-calm-poster.jpg
rsvg-convert -w 180 -h 180 -o favicon-b-180.png favicon-b.svg
rsvg-convert -w 32 -h 32 -o favicon-b-32.png favicon-b.svg
ffmpeg -hide_banner -loglevel error -y -i favicon-b-32.png -frames:v 1 favicon.ico
python3 - <<'PY'
import json, subprocess, os
p=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration,size","-of","json","assets/video/lodz-r16-calm.mp4"],capture_output=True,text=True,check=True)
x=json.loads(p.stdout)["format"]
duration=float(x["duration"]); size=int(x["size"])
assert 33.8 <= duration <= 34.3, (duration,size)
assert 350_000 < size < 25_000_000, size
for f in ["assets/video/lodz-r16-calm-poster.jpg","favicon-b-180.png","favicon-b-32.png","favicon.ico"]:
 assert os.stat(f).st_size > 100, f
print("Validated:",duration,"seconds,",size,"bytes; all icons exist.")
PY
