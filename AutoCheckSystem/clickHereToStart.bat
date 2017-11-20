@echo off

setlocal enabledelayedexpansion
REM +++++++++++++++++++MEAN MENU------------------------
echo ^G
cls
title  兑票挂失或风险监测系统
:menu
cls
color 0C
echo.
echo                 ==============================
echo                       请选择您要操作的行为:
echo                 ==============================
echo.
echo              1. 开始检查兑票
echo.
echo              2. 制作目录 c:\csvFolder
echo.
echo              3. 清空目录 c:\csvFolder
echo.
echo              4. 查看单个兑票
echo.
echo              Q. Quit
echo.
echo.
:cho
set choice=
set /p choice=          Please Choose:
IF NOT "%choice%"=="" SET choice=%choice:~0,1%
if /i "%choice%"=="1" goto runservices
if /i "%choice%"=="2" goto mkrepo
if /i "%choice%"=="3" goto cleanrepo
if /i "%choice%"=="4" goto checkcode
if /i "%choice%"=="Q" goto endd
echo Illigal input Please Check it again.
echo.
goto cho

:runservices
start docker run -v c:/csvFolder:/csvFolder aliciahan/huipiaocheck:latest files 4 2
pause
goto menu

:mkrepo
mkdir C:\csvFolder & echo "已经建立好了,此动作只做一次即可"
pause
goto menu

:cleanrepo
del C:\csvFolder\*
pause
goto menu

:checkcode
set huipiaoid=
set /p huipiaoid=                   请输入汇票的ID
call docker run aliciahan/huipiaocheck:latest code %huipiaoid%
pause
goto menu


:endd
echo 谢谢使用此脚本. Bye Bye & pause > nul
