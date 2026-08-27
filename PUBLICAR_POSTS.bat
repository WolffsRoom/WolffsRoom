@echo off
setlocal
cd /d "%~dp0"
where git >nul 2>nul || (echo ERRO: Git nao encontrado. & pause & exit /b 1)
where npm >nul 2>nul || (echo ERRO: Node.js/npm nao encontrado. & pause & exit /b 1)
if not exist node_modules call npm ci
call npm run build || (echo ERRO: o site nao passou na validacao. Nada foi enviado. & pause & exit /b 1)
git add src\content\posts public\images\posts
git diff --cached --quiet && (echo Nenhuma publicacao nova ou alterada. & pause & exit /b 0)
set /p MSG=Mensagem do commit [Publicar posts]: 
if "%MSG%"=="" set "MSG=Publicar posts"
git commit -m "%MSG%" || (pause & exit /b 1)
git push origin main || (pause & exit /b 1)
echo.
echo Publicado no GitHub. O Cloudflare iniciara o deploy automaticamente.
pause
