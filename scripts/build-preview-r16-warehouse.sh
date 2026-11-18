#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p previews
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# The opening clip stays identical: industrial Lodz (Pixabay).
curl --fail --location --show-error --silent --retry 3 --connect-timeout 20 --max-time 200 \
  "https://cdn.pixabay.com/video/2021/11/14/97897-649761128_large.mp4" -o "$WORK/lodz.mp4"
ffprobe -v error "$WORK/lodz.mp4" >/dev/null

# A/B choices: genuinely expansive logistics / industrial parks in landscape format.
# Neither clip is claimed to be Panattoni or to be filmed in Lodz.
for label in A B; do
  case "$label" in
    A) clipid="29982338";;
    B) clipid="30985183";;
  esac
  echo "Downloading warehouse option $label from Pexels $clipid"
  curl --fail --location --show-error --silent --retry 3 --connect-timeout 20 --max-time 240 \
    -A "Mozilla/5.0" "https://www.pexels.com/download/video/$clipid/" -o "$WORK/warehouse-$label.mp4"
  ffprobe -v error "$WORK/warehouse-$label.mp4" >/dev/null
  duration="$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$WORK/warehouse-$label.mp4")"
  python3 - "$duration" <<'PY'
import sys
assert float(sys.argv[1]) >= 13.3, "The new source needs at least 13.3 seconds of real camera motion."
PY

  ffmpeg -hide_banner -loglevel error -y -i "$WORK/lodz.mp4" -i "$WORK/warehouse-$label.mp4" \
    -filter_complex "[0:v]trim=start=0:duration=8.5,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[lodz];[1:v]trim=start=0:duration=13.3,setpts=PTS-STARTPTS,fps=25,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,settb=AVTB,format=yuv420p[log];[lodz][log]xfade=transition=fade:duration=1.6:offset=6.9,format=yuv420p[out]" \
    -map "[out]" -an -r 25 -c:v libx264 -crf 26 -preset fast -pix_fmt yuv420p -movflags +faststart \
    "previews/hero-r16-warehouse-$label.mp4"
  ffmpeg -hide_banner -loglevel error -y -ss 13 -i "previews/hero-r16-warehouse-$label.mp4" -frames:v 1 -q:v 3 "previews/hero-r16-warehouse-$label-poster.jpg"
  python3 - "$label" <<'PY'
import sys,json,subprocess,os
label=sys.argv[1]
p="previews/hero-r16-warehouse-"+label+".mp4"
x=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration,size","-of","json",p]))["format"]
d=float(x["duration"]);s=int(x["size"])
assert 20 <= d <= 20.4,(d,s)
assert 250000 < s < 30000000,s
assert os.stat("previews/hero-r16-warehouse-"+label+"-poster.jpg").st_size>10000
print("VALIDATED_WAREHOUSE",label,"duration",d,"file_size",s,flush=True)
PY
done

cat > previews/VIDEO_R16_WAREHOUSE_CANDIDATES.md <<'EOF'
# R16 — two warehouse alternatives, not published

Two independent short previews, each: approved Łódź industrial moving footage (8.5s) + a newly selected large logistics/industrial complex moving drone footage (13.3s), crossfaded for 1.6s during camera movement. Approx. 20.2 seconds each. Normal colors, straight rectangular 16:9 frame, no text overlays, no artificial zoom, no stills.

- **Opening:** PolishSights, [Pixabay 97897](https://pixabay.com/videos/poland-industrial-old-building-97897/), Pixabay Content License.
- **Alternative A:** Toàn BDS, [Pexels 29982338](https://www.pexels.com/video/aerial-view-of-industrial-warehouse-complex-29982338/), Pexels License, actual 4K 16:9 footage of large warehouse complex.
- **Alternative B:** Toàn BDS, [Pexels 30985183](https://www.pexels.com/video/aerial-view-of-industrial-area-with-warehouses-30985183/), Pexels License, actual 4K 16:9 footage of a sprawling industrial site.

Both alternative stock videos are generic and are not represented as Panattoni or as Łódź footage. For Panattoni's **actual** Central European Logistics Hub Łódź, the [owner's official video](https://www.youtube.com/watch?v=z1R_MeTsiJU) requires separate permission/licensing. If neither free candidate achieves the requested scale, the logistics sequence should be omitted. Approved scenes of Piotrkowska and Brama Miasta require suitable footage and licensing, and are not part of these A/B previews.
EOF
