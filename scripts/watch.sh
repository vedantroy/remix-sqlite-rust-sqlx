#! /usr/bin/sh
while true; do
   echo "Starting entr ..."
   ls -d db_adapter/src/*.rs | entr -d ./scripts/refresh_native_addon.sh
done