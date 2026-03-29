# MEG Backend Startup Script (Windows PowerShell)

Write-Host "🚀 MEG - Mulheres Empreendedoras Goianas" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check Python installation
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    Write-Host "❌ Python não encontrado. Por favor, instale Python 3.8+" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Python encontrado: $($python.Version)" -ForegroundColor Green

# Check if venv exists
$venvPath = "backend\venv"
if (-not (Test-Path $venvPath)) {
    Write-Host ""
    Write-Host "📦 Criando ambiente virtual..." -ForegroundColor Yellow
    python -m venv $venvPath
}

# Activate venv
Write-Host "✅ Ativando ambiente virtual..." -ForegroundColor Green
& "$venvPath\Scripts\Activate.ps1"

# Install requirements
Write-Host ""
Write-Host "📥 Instalando dependências..." -ForegroundColor Yellow
pip install -q -r requirements-auth.txt

# Check .env file
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "⚠️ Arquivo .env não encontrado!" -ForegroundColor Yellow
    Write-Host "📋 Criando arquivo .env a partir do template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "⚠️ IMPORTANTE: Edite o arquivo .env com suas credenciais SMTP" -ForegroundColor Red
    Write-Host "   Abra: .env" -ForegroundColor Yellow
    Write-Host ""
}

# Start backend
Write-Host ""
Write-Host "🌐 Iniciando servidor MEG Backend..." -ForegroundColor Green
Write-Host "📍 Acesse em: http://localhost:5000" -ForegroundColor Cyan
Write-Host "💡 Dica: Abra http://localhost:5000/health para verificar saúde do servidor" -ForegroundColor Cyan
Write-Host ""

cd backend
python main.py
