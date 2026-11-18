#!/bin/zsh
# Shrinks a finished reel for the website and makes a cover image.
# Usage:  ./add-video.sh ~/Downloads/my-reel.mp4 my-reel
# Then add the line it prints to the VIDEOS list in config.js.
set -e
src="$1"; name="${2:-$(basename "${1%.*}")}"
[ -f "$src" ] || { echo "Usage: ./add-video.sh path/to/video.mp4 short-name"; exit 1; }
cd "$(dirname "$0")/videos"
ffmpeg -v error -y -i "$src" -vf "scale=540:-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart "$name.mp4"
ffmpeg -v error -y -ss 1 -i "$src" -frames:v 1 -vf "scale=540:-2" -q:v 4 "$name.jpg"
echo "Done: videos/$name.mp4 ($(du -h "$name.mp4" | cut -f1))"
echo "Add this line to config.js → VIDEOS:"
echo "  { file: \"$name.mp4\", cover: \"$name.jpg\", title: \"Title here\", tag: \"Love story\" },"
