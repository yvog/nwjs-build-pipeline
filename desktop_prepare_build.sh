#!/bin/bash

webpack --config ./webpack.prod.config.js

.\\bin\\nwjc\\nwjc .\\build\\app.js .\\build\\lib.bin

rm -f .\\build\\app.js

node ./desktop_wrap_build.js

read
