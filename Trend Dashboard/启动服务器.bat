@echo off
chcp 65001 >nul
cd /d %~dp0
echo ========================================
echo    Trend Dashboard 开发服务器
echo ========================================
echo.
echo 正在启动服务器，请稍候...
echo.
npm run dev
echo.
echo 服务器已停止
pause

