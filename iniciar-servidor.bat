@echo off
REM Script para iniciar o servidor do projeto hackathon
REM Plataforma de Empreendedorismo da Mulher

echo.
echo ================================
echo  PROJETO HACKATHON - SERVIDOR
echo ================================
echo.

REM Mudar para a pasta backend
cd /d "%~dp0backend" || (
    echo Erro: Nao consegui encontrar a pasta backend
    pause
    exit /b 1
)

REM Verificar se node.js esta instalado
where node >nul 2>nul
if errorlevel 1 (
    echo Erro: Node.js nao esta instalado ou nao esta no PATH
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
)

echo [1] Verificando dependencias...
if not exist ..\node_modules (
    echo [2] Instalando dependencias do package.json...
    cd ..
    call npm install
    cd backend
)

echo.
echo [3] Iniciando servidor...
echo.
echo ================================
echo  SERVIDOR RODANDO
echo ================================
echo.
echo Acesse em: http://localhost:3000
echo.
echo Rotas disponiveis:
echo   - / (home)
echo   - /login
echo   - /register
echo   - /dashboard
echo   - /companies
echo   - /editals
echo   - /courses
echo.
echo Para parar o servidor: Ctrl + C
echo ================================
echo.

REM Iniciar o servidor
node backendexpandido.js

pause
