@echo off
cd /d "%~dp0"
where node >nul 2>nul || (echo ERRO: instale o Node.js antes de continuar. & pause & exit /b 1)
start "" http://127.0.0.1:4177
node tools\post-editor\server.mjs
pause
