#!/bin/bash
# MEG Backend Startup Script

echo "🚀 MEG - Mulheres Empreendedoras Goianas"
echo "========================================"
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3.8+"
    exit 1
fi

echo "✅ Python encontrado: $(python3 --version)"

# Check if venv exists
if [ ! -d "backend/venv" ]; then
    echo ""
    echo "📦 Criando ambiente virtual..."
    python3 -m venv backend/venv
fi

# Activate venv
echo "✅ Ativando ambiente virtual..."
source backend/venv/bin/activate

# Install requirements
echo ""
echo "📥 Instalando dependências..."
pip install -q -r requirements-auth.txt

# Check .env file
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️ Arquivo .env não encontrado!"
    echo "📋 Criando arquivo .env a partir do template..."
    cp .env.example .env
    echo ""
    echo "⚠️ IMPORTANTE: Edite o arquivo .env com suas credenciais SMTP"
    echo "   Abra: .env"
    echo ""
fi

# Start backend
echo ""
echo "🌐 Iniciando servidor MEG Backend..."
echo "📍 Acesse em: http://localhost:5000"
echo "💡 Dica: Abra http://localhost:5000/health para verificar saúde do servidor"
echo ""

cd backend
python3 main.py
