#!/usr/bin/env bash
./node_modules/.bin/watchify -v -t reactify -o build/js/wrangler_bundle.js src/js/wrangler.jsx &


for job in `jobs -p`
do
  wait $job
done
