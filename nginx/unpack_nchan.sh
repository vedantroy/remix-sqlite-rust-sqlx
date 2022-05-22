#! /usr/bin/sh
set -eo xtrace

NCHAN_VERSION="1.2.15"
wget https://github.com/slact/nchan/archive/refs/tags/v$NCHAN_VERSION.tar.gz -O /tmp/nchan.tar.gz && tar xzvf /tmp/nchan.tar.gz -C /tmp
