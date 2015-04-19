babel src/scripts/*.js --watch --out-file dist/scripts/main.js -m common &
watchify dist/scripts/main.js -o dist/scripts/bundle.js