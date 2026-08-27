@echo off
setlocal EnableExtensions

title Publicar site Wolff's Room no GitHub

set "REPO=WolffsRoom/WolffsRoom"
set "REMOTE_URL=https://github.com/WolffsRoom/WolffsRoom.git"
set "REPO_DESCRIPTION=Site oficial do Wolff's Room - traducoes, modificacoes, ports e analises para PS Vita e consoles retro."

cd /d "%~dp0"

echo.
echo ============================================================
echo   PUBLICACAO DO SITE WOLFF'S ROOM
echo ============================================================
echo   Repositorio: %REPO%
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [ERRO] O Git nao foi encontrado.
  echo Instale em: https://git-scm.com/download/win
  goto :failure
)

if not exist ".git" (
  echo [1/6] Inicializando o repositorio local...
  git init
  if errorlevel 1 goto :git_failure
) else (
  echo [1/6] Repositorio local ja inicializado.
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin "%REMOTE_URL%"
) else (
  git remote set-url origin "%REMOTE_URL%"
)
if errorlevel 1 goto :git_failure

echo [2/6] Baixando o historico existente...
git fetch origin main
if errorlevel 1 (
  echo.
  echo [ERRO] Nao foi possivel acessar o repositorio.
  echo Confirme sua autenticacao e se a branch principal se chama main.
  goto :failure
)

echo [3/6] Preservando a branch e o historico remotos...
git show-ref --verify --quiet refs/remotes/origin/main
if not errorlevel 1 (
  git checkout -B main origin/main
) else (
  git checkout -B main
)
if errorlevel 1 (
  echo.
  echo [ERRO] Existem arquivos locais conflitantes com o repositorio remoto.
  echo Nenhum push foi realizado. Revise os arquivos indicados pelo Git.
  goto :failure
)

echo [4/6] Atualizando a descricao do repositorio...
where gh >nul 2>&1
if errorlevel 1 (
  echo [AVISO] GitHub CLI nao encontrado. A descricao nao foi alterada.
  echo Instale em: https://cli.github.com/
) else (
  gh auth status >nul 2>&1
  if errorlevel 1 (
    echo [AVISO] GitHub CLI ainda nao esta autenticado.
    echo Execute "gh auth login" e rode este arquivo novamente.
  ) else (
    gh repo edit "%REPO%" --description "%REPO_DESCRIPTION%"
    if errorlevel 1 (
      echo [AVISO] Nao foi possivel atualizar a descricao, mas o source continuara sendo enviado.
    ) else (
      echo [OK] Descricao atualizada.
    )
  )
)

echo [5/6] Preparando os arquivos do site...
git add .
if errorlevel 1 goto :git_failure

git diff --cached --quiet
if not errorlevel 1 (
  echo [INFO] Nao existem alteracoes de source para enviar.
) else (
  git commit -m "Adiciona source do site Wolff's Room"
  if errorlevel 1 (
    echo.
    echo [ERRO] O commit falhou. Configure seu nome e e-mail, se necessario:
    echo   git config --global user.name "Seu nome"
    echo   git config --global user.email "seu-email@example.com"
    goto :failure
  )
)

echo [6/6] Enviando para o GitHub...
git push -u origin main
if errorlevel 1 goto :git_failure

echo.
echo ============================================================
echo   CONCLUIDO COM SUCESSO
echo ============================================================
echo   https://github.com/%REPO%
echo.
pause
exit /b 0

:git_failure
echo.
echo [ERRO] O Git interrompeu a operacao. Nenhum envio forcado foi realizado.

:failure
echo.
echo Corrija a situacao informada e execute este arquivo novamente.
pause
exit /b 1
