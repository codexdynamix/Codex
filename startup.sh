#!/bin/sh
set -eu

cd "$(dirname "$0")"

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev -- --host 0.0.0.0 --port 8080 >>/tmp/app-startup.log 2>&1 &

for _ in 1 2 3 4 5 6 7 8 9 10; do
  if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
    exit 0
  fi
  sleep 1
done

exit 1
