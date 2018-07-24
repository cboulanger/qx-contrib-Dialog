#!/bin/bash
npx testcafe safari tests/testcafe.js || exit 1
npx testcafe chrome:headless tests/testcafe.js || exit 1
npx testcafe firefox:headless tests/testcafe.js || exit 1