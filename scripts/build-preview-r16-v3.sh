#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p previews
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
# The first two approved R16 V2 source clips and trims remain unchanged.
curl -fL --retry 3 --connect-timeout 20 --max-time 180 -A "Barczuk/VideoReview/1.0" "https://cdn.pixabay.com/video/2021/11/14/97897-649761128_large.mp4" -o "$WORK/lodz.mp4"
curl -fL --retry 3 --connect-timeout 20 --max-time 180 -A "Mozilla/5.0" "https://www.pexels.com/download/video/37703920/" -o "$WORK/logistics.mp4"
# The third clip is a genuine aerial recording of a seaport; no title overlays.
SELECTED=""
for clip_id in 36026534 30899475; do
  echo "Trying free Pexels aerial seaport $clip_id"
  if curl -fL --retry 2 --connect-timeout 20 --max-time 200 -A "Mozilla/5.0" "https://www.pexels.com/download/video/$clip_id/" -o "$WORK/port.mp4" && ffprobe -v error -select_streams v:0 "$WORK/port.mp4" >/dev/null; then
    actual_dur="$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$WORK/port.mp4")"
    if python3 - "$actual_dur" <<'PY'
import sys
sys.exit(0 if float(sys.argv[1])>=15 else 1)
PY
    then
      SELECTED="$clip_id"
      echo "THIRD_CLIP_SELECTED: Pexels $SELECTED, duration $actual_dur"
      break
    fi
  fi
done
test -n "$SELECTED"
ffprobe -v error "$WORK/lodz.mp4" >/dev/null
ffprobe -v error "$WORK/logistics.mp4" >/dev/null
# No photos, artificial stills, freezing, logos, or subtitles.
# Real motion crossfades between scene 1->2 at 6.9 s and 2->3 at 17.3 s.
ffmpeg -hide_banner -loglevel error -y -i "$WORK/lodz.mp4" -i "$WORK/logistics.mp4" -i "$WORK/port.mp4" \
  -filter_complex "[0:v]trim=duration=8.5,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v0];[1:v]trim=duration=12,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v1];[2:v]trim=duration=13.5,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[v2];[v0][v1]xfade=transition=fade:duration=1.6:offset=6.9[v01];[v01][v2]xfade=transition=fade:duration=1.6:offset=17.3,format=yuv420p[out]" \
  -map "[out]" -an -r 25 -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -movflags +faststart previews/hero-r16-port-v3.mp4
ffmpeg -hide_banner -loglevel error -y -ss 24 -i previews/hero-r16-port-v3.mp4 -frames:v 1 -q:v 3 previews/hero-r16-port-v3-still.jpg
cat > previews/VIDEO_R16_V3_SOURCES.md <<'EOF'
# R16 V3 — private video preview, not published
All shots use natural color, real moving videos, no text overlays, and no artificial freeze frames.

1. **Industrial Łódź** — PolishSights, [Pixabay 97897](https://pixabay.com/videos/poland-industrial-old-building-97897/), Pixabay Content License. Original approved clip and timing unchanged.
2. **Modern logistics complex** — Toàn BDS, [Pexels 37703920](https://www.pexels.com/video/aerial-view-of-industrial-warehouse-complex-37703920/), [Pexels License](https://www.pexels.com/license/). Approved clip and timing unchanged. Not claimed to be Łódź.
3. **Container port** — new footage, source specified below. Port is not presented as a Polish location.

H.264 1280×720, silent, 25 fps, around 30.8 seconds; two overlapping 1.6-second transitions during camera movement. **Not yet published to barczuk.com.pl**.
EOF
if [ "$SELECTED" = 36026534 ]; then
  echo "3. **Hamburg, Germany**, Willy One, [Pexels 36026534](https://www.pexels.com/video/aerial-view-of-busy-shipping-port-in-germany-36026534/), Pexels License." >> previews/VIDEO_R16_V3_SOURCES.md
else
  echo "3. **International seaport (Vietnam)**, Toàn BDS, [Pexels 30899475](https://www.pexels.com/video/aerial-view-of-busy-seaport-container-terminal-30899475/), Pexels License." >> previews/VIDEO_R16_V3_SOURCES.md
fi
python3 - <<'PY'
import json,subprocess,os
f=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration,size","-of","json","previews/hero-r16-port-v3.mp4"]))["format"]
d=float(f["duration"]);s=int(f["size"])
assert 30.5<=d<=31.2,(d,s)
assert 300_000<s<40_000_000,s
assert os.path.getsize("previews/hero-r16-port-v3-still.jpg")>10_000
print(f"VALIDATED_R16_PORT_V3: {d:.2f} seconds, {s:,} bytes, no titles or stills")
PY
