#!/bin/sh

PWD=$(pwd)

COURSE_ROOT=$(dirname $PWD)
echo COURSE_ROOT is $COURSE_ROOT

export PATH=$PATH:$COURSE_ROOT/bin/node_modules/.bin:$COURSE_ROOT/node/node_modules/.bin:$COURSE_ROOT/mongo/node_modules/.bin:$COURSE_ROOT/angular/banking-app/node_modules/.bin
