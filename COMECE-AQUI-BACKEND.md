# 🚀 MEG Backend - Guia de Início Rápido

## ⚡ Início em 5 Minutos

### Windows (PowerShell)
```powershell
# 1. Navegue até a pasta do projeto
cd c:\Users\tiago\Desktop\projeto-hackathon-main

# 2. Execute o script de startup
.\start-backend.ps1

# O servidor estará rodando em http://localhost:5000
```

### macOS / Linux (Bash)
```bash
# 1. Navegue até a pasta do projeto
cd ~/seu-caminho-para/projeto-hackathon-main

# 2. Dê permissão e execute
chmod +x start-backend.sh
./start-backend.sh

# O servidor estará rodando em http://localhost:5000
```

---

## 📋 Checklist de Configuração

### 1️⃣ **Configurar Email SMTP (IMPORTANTE!)**

Se você for usar o sistema de confirmação de email, precisa configurar SMTP:

#### Opção A: Gmail (Recomendado)
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "Mail" e "Windows/Linux" 
3. Copie a senha de 16 caracteres gerada
4. Edite `.env` e adicione:
   ```
   SENDER_EMAIL=seu-email@gmail.com
   SENDER_PASSWORD=xxxxxxxxxxxxxxxx
   ```

#### Opção B: Outlook
1. Edite `.env`:
   ```
   SMTP_SERVER=smtp-mail.outlook.com
   SENDER_EMAIL=seu-email@outlook.com
   SENDER_PASSWORD=sua-senha
   ```

#### Opção C: SendGrid
1. Crie conta em: https://sendgrid.com
2. Edite `.env`:
   ```
   SENDGRID_API_KEY=sua-chave-api
   ```

---

## 🔍 Verificar Saúde do Servidor

Após iniciar o backend, teste:

```bash
# No navegador ou terminal:
curl http://localhost:5000/health

# Resposta esperada:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45.123456",
  "service": "MEG Backend API",
  "version": "1.0.0"
}
```

---

## 📱 Testar Endpoints (via cURL ou Postman)

### 1. Registrar Novo Usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### 3. Confirmar Email
```bash
# Use o token enviado no email de confirmação
curl -X GET "http://localhost:5000/api/auth/confirm-email/seu-token-aqui"
```

### 4. Listar Oportunidades
```bash
curl http://localhost:5000/api/oportunidades
```

### 5. Listar Mentoras
```bash
curl http://localhost:5000/api/mentores
```

---

## 🎯 Frontend - Conectar ao Backend

O frontend já está configurado para acessar o backend em `http://localhost:5000`.

Para alterar a URL da API, edite o arquivo `/frontend/js/auth.js`:

```javascript
// Procure por:
const API_BASE_URL = '/api';  // Alterar se necessário

// Ou adicione uma variável de ambiente globalmente
const API_BASE_URL = process.env.API_URL || '/api';
```

---

## 📂 Estrutura de Arquivos

```
backend/
├── main.py              # 🔴 Arquivo principal (NOVO!)
├── auth_routes.py       # Endpoints de autenticação
├── email_service.py     # Serviço de email
├── venv/                # Ambiente virtual (criado automaticamente)
└── meg_app.log          # Log de execução

.env.example             # Template de configuração (copiar para .env)
start-backend.ps1        # Script de startup (Windows)
start-backend.sh         # Script de startup (macOS/Linux)
requirements-auth.txt    # Dependências Python
```

---

## 🔧 Troubleshooting

### ❌ "Module not found: 'flask'"
```bash
# Solução: Reinstale dependências
pip install -r requirements-auth.txt
```

### ❌ "SMTP Authentication failed"
1. Verifique as credenciais em `.env`
2. Para Gmail, verifique se usou "App Password" (não a senha do Gmail)
3. Teste com outro provedor (Outlook/SendGrid)

### ❌ "CORS error" no navegador
- Verifique `CORS_ORIGINS` em `.env`
- Adicione seu domínio/localhost se necessário

### ❌ "Port 5000 already in use"
```bash
# Altere a porta em .env
PORT=5001

# Ou encontre o processo usando a porta e finalize
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000
```

---

## 🚀 Próximas Passos

### 1. **Implementar Banco de Dados** (Recomendado para Produção)
```bash
# Instale PostgreSQL
# Configure em .env:
DATABASE_URL=postgresql://user:password@localhost:5432/meg_database

# Crie modelos SQLAlchemy
# Rode migrations (Alembic)
```

### 2. **Configurar Videochamadas** (Jitsi/Agora/Twilio)
- Já está pronto no frontend (`videochamadas-novo.html`)
- Para Jitsi: Nenhuma configuração necessária
- Para Agora/Twilio: Adicione credenciais em `.env`

### 3. **Setup de Produção**
```bash
# Deploy Heroku (backend)
heroku create seu-app-meg
heroku config:set ENVIRONMENT=production
git push heroku main

# Deploy Vercel (frontend)
npm install -g vercel
vercel
```

### 4. **Configurar Prometheus/Grafana** (Monitoramento)
- Métricas em tempo real do servidor
- Alertas de performance

### 5. **Setup de CI/CD**
- GitHub Actions para testes automáticos
- Deployment automático em push para main

---

## 📞 Suporte e Debugging

### Ver Logs em Tempo Real
```bash
tail -f backend/meg_app.log  # macOS/Linux
Get-Content backend/meg_app.log -Tail 10 -Wait  # Windows (PowerShell)
```

### Habilitar Debug Verboso
Em `.env`:
```
DEBUG=True
LOG_LEVEL=DEBUG
```

### Usar Python Debugger
```bash
# No main.py, adicione:
import pdb; pdb.set_trace()

# Ou use um IDE (VS Code, PyCharm) com debug integrado
```

---

## 📚 Documentação Adicional

- [GUIA-CONFIGURACAO-SISTEMA.md](./GUIA-CONFIGURACAO-SISTEMA.md) - Setup completo
- [README.md](./README.md) - Overview do projeto
- [ARQUITETURA-PRODUCAO.md](./documentacao/ARQUITETURA-PRODUCAO.md) - Arquitetura de produção

---

## ✅ Verificação Final

Após seguir este guia, você deve ter:

- ✅ Backend rodando em `http://localhost:5000`
- ✅ Endpoint `/health` respondendo
- ✅ Email configurado (SMTP testado)
- ✅ Frontend conectado ao backend (localStorage funcionando)
- ✅ Videochamadas/mentorias visíveis no dashboard

**Parabéns! Você está pronto para usar o MEG Backend! 🎉**

---

**Última atualização:** 2024-01-15  
**Versão:** 1.0.0  
**Criador:** GitHub Copilot
