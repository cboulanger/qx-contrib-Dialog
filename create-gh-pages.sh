#!/bin/bash
set -e
cp -a demo/default/api /tmp/
cp -a demo/default/build /tmp/
current=$(git symbolic-ref --short HEAD)
git checkout gh-pages
mv /tmp/api .
mv /tmp/build .
git add api
git add build
git commit -a -m "Update gh-pages"
git checkout $current
