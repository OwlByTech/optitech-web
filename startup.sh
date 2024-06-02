#!/bin/sh
# TODO: Check if the script is running on docker container or outside.
echo "Installing bash..."
apk add bash

echo "Installing dependiencies"
yarn install

if [ $ENV = "prod" ]; then
    yarn build
    yarn start -p 3001
else
  echo "------------ DEVELOPMENT MODE ------------"
  yarn dev -p 3001
fi
