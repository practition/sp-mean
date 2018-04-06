@echo off

SET COURSE_ROOT=%CD%

FOR /D %%I IN ("%CD%") DO SET _LAST_SEGMENT_=%%~nxI

echo Initial COURSE_ROOT: %COURSE_ROOT%
echo LAST_SEGMENT: %_LAST_SEGMENT_%

if "%_LAST_SEGMENT_%"=="bin" (
  set COURSE_ROOT=%COURSE_ROOT:~0,-4%
)

echo Modified COURSE_ROOT %COURSE_ROOT%
set OLD_PATH=%PATH%

echo Setting PATH....
set PATH=%PATH%;%COURSE_ROOT%\bin\node_modules\.bin;%COURSE_ROOT%\node\node_modules\.bin;%COURSE_ROOT%\mongo\node_modules\.bin

echo PATH successfully set for MEAN course
echo PATH is %PATH%
