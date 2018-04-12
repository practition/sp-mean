#!/usr/local/bin/fish

set COURSE_ROOT (dirname (pwd))

set -x PATH $PATH $COURSE_ROOT/bin/node_modules/.bin $COURSE_ROOT/node/node_modules/.bin $COURSE_ROOT/mongo/node_modules/.bin $COURSE_ROOT/angular/banking-app/node_modules/.bin
