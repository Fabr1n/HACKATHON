# 🎯 MEG - Guia de Configuração Completo do Sistema

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Backend](#instalação-backend)
3. [Configuração de Email](#configuração-de-email)
4. [Configuração de Videochamadas](#configuração-de-videochamadas)
5. [Integração Frontend-Backend](#integração-frontend-backend)
6. [Testes](#testes)
7. [Deploy](#deploy)

---

## 🔧 Pré-requisitos

### Software Necessário
- **Python 3.8+** - Download em [python.org](https://www.python.org)
- **Node.js 14+** (Opcional, para frontend avançado) - [nodejs.org](https://nodejs.org)
- **Git** - [git-scm.com](https://git-scm.com)
- **PostgreSQL** (Recomendado) ou SQLite (desenvolvimento)

### Verificar Instalação
```bash
python --version
pip --version
git --version
```

---

## 🚀 Instalação Backend

### 1. Clonar Repositório
```bash
cd c:\Users\tiago\Desktop\projeto-hackathon-main
git clone <seu-repositorio-url>
cd backend
```

### 2. Criar Virtual Environment
```bash
# Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1

# Windows CMD
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar Dependências
```bash
pip install -r ../requirements-auth.txt
pip install Flask==2.3.2 Flask-CORS==4.0.0 python-dotenv==1.0.0
```

### 4. Criar Arquivo .env
```bash
# Copie o .env.example e customize
copy ..\.env.example .env

# Ou crie um novo:
cat > .env << EOF
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui-minimo-32-caracteres
SENDER_EMAIL=seu_email@gmail.com
SENDER_PASSWORD=sua_senha_de_app
EOF
```

---

## 📧 Configuração de Email

### Opção 1: Gmail (Recomendado)

#### Passo 1: Habilitar Autenticação de Dois Fatores
1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Clique em **"Segurança"** (esquerda)
3. Ative **"Autenticação em 2 etapas"**

#### Passo 2: Gerar Senha de App
1. Em **Segurança**, procure por **"Senhas de app"**
2. Selecione: **App: Mail** | **Dispositivo: Windows, Mac ou Linux**
3. Google gerará uma senha única de 16 caracteres
4. Copie essa senha e adicione ao `.env`:

```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=seu_email@gmail.com
SENDER_PASSWORD=xyzwxyzwxyzwxyzw  # Senha gerada pelo Google
```

#### Passo 3: Testar Envio
```bash
python
>>> from backend.email_service import MEGEmailService
>>> service = MEGEmailService()
>>> service.send_confirmation_email("seu_email@gmail.com", "Teste", "ABC123XYZ")
```

### Opção 2: Outlook/Hotmail
```env
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SENDER_EMAIL=seu_email@outlook.com
SENDER_PASSWORD=sua_senha_outlook
```

### Opção 3: SendGrid (Produção)
```bash
pip install sendgrid
```

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

---

## 🎥 Configuração de Videochamadas

### Opção 1: Jitsi Meet (Gratuito,Open Source)
Jitsi é pre-configurado na página `videochamadas-novo.html`

**Características:**
- ✅ Sem necessidade de chave de API
- ✅ Seguro e open source
- ✅ Suport direto no navegador
- ✅ Salas ilimitadas

**Uso:**
```html
<!-- Já integrado em videochamadas-novo.html -->
<script src="js/auth.js"></script>
```

### Opção 2: Agora.io (Pago, Profissional)
```bash
pip install agora-channel-access-key
```

```env
AGORA_APP_ID=sua_app_id
AGORA_APP_CERTIFICATE=sua_app_certificate
```

### Opção 3: Twilio (Pago, Confiável)
```bash
pip install twilio
```

```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_API_KEY=SK...
TWILIO_API_SECRET=...
```

---

## 🔗 Integração Frontend-Backend

### 1. Configurar CORS no Backend
```python
# backend.py ou main.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:8000"])
```

### 2. Atualizar URLs de API nos Formulários

**Em `frontend/js/auth.js`:**
```javascript
// Verificar e atualizar as URLs da API
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

// Exemplo de requisição
fetch(`${API_BASE_URL}/login`, { ... })
```

###3. Usar as Rotas de Autenticação
```
POST   /api/register              → Registrar novo usuário
POST   /api/login                 → Fazer login
GET    /api/confirm-email/<token> → Confirmar email
POST   /api/mentor-register       → Registrar mentor
GET    /api/confirm-mentor/<token> → Confirmar mentor
POST   /api/forgot-password       → Solicitar reset de senha
```

---

## 🧪 Testes

### Teste de Email
```bash
python -c "
from backend.email_service import MEGEmailService
service = MEGEmailService()
success = service.send_confirmation_email(
    'seu_email@gmail.com',
    'João Silva',
    'ABC123XYZ789'
)
print('✅ Email enviado' if success else '❌ Erro ao enviar')
"
```

### Teste de API
```bash
# Terminal 1 - Iniciar Flask
cd backend
python backend.py

# Terminal 2 - Fazer requisição
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@example.com",
    "phone": "(62) 99999-9999",
    "cpf": "123.456.789-00",
    "password": "SenhaSegura123"
  }'
```

### Teste de Videochamadas
1. Abra `frontend/videochamadas-novo.html`
2. Clique em "Ativar Câmera"
3. Clique em "Ativar Microfone"
4. Verifique se os dispositivos foram detectados

---

## 📦 Deploy

### Deploy Backend - Heroku

#### 1. Instalar Heroku CLI
```bash
# Download em heroku.com/download
# Depois
heroku login
```

#### 2. Criar Aplicação
```bash
heroku create meg-goianas-backend
heroku addons:create heroku-postgresql:hobby-dev
```

#### 3. Configurar Variáveis de Ambiente
```bash
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=sua-chave-secreta-longa
heroku config:set SENDER_EMAIL=seu_email@gmail.com
heroku config:set SENDER_PASSWORD=sua_senha_de_app
```

#### 4. Deploy
```bash
git push heroku main
```

### Deploy Frontend - Vercel

#### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

#### 2. Deploy
```bash
cd frontend
vercel
```

#### 3. Configurar Variáveis
```bash
vercel env add API_URL https://seu-backend-heroku.herokuapp.com
```

---

## ✅ Checklist de Configuração

- [ ] Python e dependências instalados
- [ ] Virtual environment ativado
- [ ] Arquivo `.env` criado e configurado
- [ ] Email testado e funcionando
- [ ] API rodando em `http://localhost:5000`
- [ ] Frontend rodando em `http://localhost:8000`
- [ ] Videochamadas testadas
- [ ] Registro e login funcionando
- [ ] Email de confirmação sendo enviado
- [ ] Mentor registration funcionando

---

## 🐛 Troubleshooting

### Erro: "Module not found: email_service"
```bash
# Adicione o caminho ao PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:/path/to/backend"
```

### Erro: "SMTP authentication failed"
- Verifique si usou "Senha de app" (Gmail) e não senha normal
- Garanta que autenticação de 2 fatores está ativada
- Tente com um novo token de app

### Erro: "CORS error in browser"
- Adicione a origem do frontend ao CORS:
```python
CORS(app, origins=["seu-frontend-url"])
```

### Videochamada não funciona
- Garanta que browser tem permissão de câmera/microfone
- Verifique em Settings > Privacy > Camera/Microphone
- Teste em navegador diferente (Chrome, Firefox, Edge)

---

## 📞 Suporte e Contato

**Email:** contato@meggoianas.com.br
**Localização:** Goiânia, Goiás - Brasil
**Projeto:** Hackathon GO! UAI Tech / HUB CERRADO

---

**Última atualização:** Março de 2026
**Status:** ✅ Sistema Completo
