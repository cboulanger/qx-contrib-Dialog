#!/bin/bash
npm install
pushd node_modules/qxcompiler
npm link
popd
#qx compile --target=build --clean
echo "Once the message 'Compiled 0 classes ...' appears, open a new terminal and start the tests with 'tests/run.sh'"
qx serve --target=build
