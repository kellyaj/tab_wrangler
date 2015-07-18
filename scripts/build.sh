#!/usr/bin/env bash
./node_modules/.bin/browserify -t reactify -o build/js/wrangler_bundle.js src/js/wrangler.jsx
