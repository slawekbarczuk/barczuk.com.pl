#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/photos-r16
curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "Mozilla/5.0" 'https://barczuk.sharepoint.com/:u:/g/IQDEfyU7_tjNSZDOtlDFqITiAVferlxUAmrYLA18_j8dnRI?download=1' -o assets/photos-r16/fabryczna.webp
curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "Mozilla/5.0" 'https://barczuk.sharepoint.com/:u:/g/IQAZe3_1YoM6SZZFFrOsO4iLATu_xniKQ6kTIwS5jVQU23k?download=1' -o assets/photos-r16/manufaktura.webp
curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "Mozilla/5.0" 'https://barczuk.sharepoint.com/:u:/g/IQACEHqNrRcjS5OG5WC9qnTTAZtbnqWoYm6xS8gMZfiw4Ko?download=1' -o assets/photos-r16/piotrkowska.webp
curl --fail --location --silent --show-error --retry 3 --max-time 90 -A "Mozilla/5.0" 'https://barczuk.sharepoint.com/:u:/g/IQBXYxDfgKH1Qqa3SAn6XDpgAZk8O78X8vXLftw_VZ7bfys?download=1' -o assets/photos-r16/ec1.webp
python3 - <<'PY'
from pathlib import Path
for name in ("fabryczna", "manufaktura", "piotrkowska", "ec1"):
    p=Path("assets/photos-r16")/(name+".webp")
    b=p.read_bytes()
    assert len(b)>5000, (name,len(b))
    assert b[:4]==b"RIFF" and b[8:12]==b"WEBP", (name,b[:32])
    print("Verified source image",name,len(b),"bytes")
PY
