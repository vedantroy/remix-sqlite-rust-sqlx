#! /usr/bin/sh
echo "Re-building Rust $(date) ..."
cd db_adapter
rm /tmp/dev.sqlite
touch /tmp/dev.sqlite
env DATABASE_URL="sqlite:///tmp/dev.sqlite" sqlx migrate run
env DATABASE_URL="sqlite:///tmp/dev.sqlite" npm run build:debug
cd ..
./scripts/copy_native_addon.js