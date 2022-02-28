#!/usr/bin/env sh

set -e

npm run build 

cd dist

git init
git add -A 
git commit -m "New Deployment"
git push -f git@github.com:MorAgayev/Mor-Agayev-25-02-2022.git master:gh-pages

cd -
