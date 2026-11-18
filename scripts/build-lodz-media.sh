#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
test -s assets/video/lodz-warszawa-r16.mp4
mkdir -p assets/video
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
curl --fail --location --silent --show-error --retry 3 --output "$WORK/modern.jpg" "https://images.pexels.com/photos/32747566/pexels-photo-32747566.jpeg?auto=compress&cs=tinysrgb&w=1900"
curl --fail --location --silent --show-error --retry 3 --output "$WORK/city.jpg" "https://images.pexels.com/photos/32747520/pexels-photo-32747520.jpeg?auto=compress&cs=tinysrgb&w=1900"
ffprobe -v error "$WORK/modern.jpg" >/dev/null
ffprobe -v error "$WORK/city.jpg" >/dev/null
ffmpeg -hide_banner -loglevel error -y -i assets/video/lodz-warszawa-r16.mp4 -i "$WORK/modern.jpg" -i "$WORK/city.jpg" \
-filter_complex "[0:v]trim=start=0:duration=4,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,format=yuv420p,fade=t=out:st=3.6:d=0.4[v0];[1:v]scale=1360:765:force_original_aspect_ratio=increase,zoompan=z='min(zoom+0.0005,1.05)':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=100:s=1280x720:fps=25,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.4,fade=t=out:st=3.6:d=0.4[v1];[2:v]scale=1360:765:force_original_aspect_ratio=increase,zoompan=z='min(zoom+0.0005,1.05)':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=100:s=1280x720:fps=25,setsar=1,format=yuv420p,fade=t=in:st=0:d=0.4[v2];[v0][v1][v2]concat=n=3:v=1:a=0[v]" \
-map '[v]' -an -c:v libx264 -preset medium -crf 28 -pix_fmt yuv420p -movflags +faststart assets/video/lodz-r16.mp4
ffmpeg -hide_banner -loglevel error -y -ss 1.5 -i assets/video/lodz-r16.mp4 -frames:v 1 -q:v 3 assets/video/lodz-r16-poster.jpg
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
test -f "$FONT"
ffmpeg -hide_banner -loglevel error -y -f lavfi -i "color=c=0x14243a:s=180x180:d=1" -vf "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf:text=B:fontcolor=0xf7f5f0:fontsize=135:x=17:y=0,drawbox=x=137:y=132:w=25:h=25:color=0xb6a27a:t=fill" -frames:v 1 favicon-b-180.png
ffmpeg -hide_banner -loglevel error -y -i favicon-b-180.png -vf "scale=32:32" -frames:v 1 favicon-b-32.png
ffmpeg -hide_banner -loglevel error -y -i favicon-b-180.png -vf "scale=32:32" -frames:v 1 favicon.ico
python3 -c 'import json,subprocess; x=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration,size","-of","json","assets/video/lodz-r16.mp4"]))["format"]; assert 11.9<=float(x["duration"])<=12.1; print("Video:",x)'
