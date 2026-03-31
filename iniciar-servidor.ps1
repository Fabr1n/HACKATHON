#!/usr/bin/env pwsh
# Script para iniciar o servidor do projeto hackathon
# Plataforma de Empreendedorismo da Mulher

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  PROJETO HACKATHON - SERVIDOR" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Mudar para a pasta backend
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "backend"
$rootPath = $scriptPath

if (-not (Test-Path $backendPath)) {
    Write-Host "Erro: Nao consegui encontrar a pasta backend" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Set-Location $backendPath

# Verificar se node.js esta instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Erro: Node.js nao esta instalado ou nao esta no PATH" -ForegroundColor Red
    Write-Host "Baixe em: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[1] Verificando dependencias..." -ForegroundColor Yellow

$nodeModulesPath = Join-Path $rootPath "node_modules"
if (-not (Test-Path $nodeModulesPath)) {
    Write-Host "[2] Instalando dependencias do package.json..." -ForegroundColor Yellow
    Set-Location $rootPath
    npm install
    Set-Location $backendPath
}

Write-Host ""
Write-Host "[3] Iniciando servidor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  SERVIDOR RODANDO" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Acesse em: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Rotas disponiveis:" -ForegroundColor Yellow
Write-Host "  - / (home)" -ForegroundColor Gray
Write-Host "  - /login" -ForegroundColor Gray
Write-Host "  - /register" -ForegroundColor Gray
Write-Host "  - /dashboard" -ForegroundColor Gray
Write-Host "  - /companies" -ForegroundColor Gray
Write-Host "  - /editals" -ForegroundColor Gray
Write-Host "  - /courses" -ForegroundColor Gray
Write-Host ""
Write-Host "Para parar o servidor: Ctrl + C" -ForegroundColor Gray
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar o servidor
node backendexpandido.js
