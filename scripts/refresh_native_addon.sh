#! /usr/bin/sh
echo "Re-building Rust $(date) ..."
cd db_adapter
npm run build:debug
cd ..
./scripts/copy_native_addon.js