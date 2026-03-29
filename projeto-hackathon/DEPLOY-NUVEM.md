# 🚀 GUIA COMPLETO DE DEPLOY NA NUVEM

## 📋 ÍNDICE
1. [Preparação Local](#preparação-local)
2. [Escolha da Plataforma](#escolha-da-plataforma)
3. [Deploy no Vercel](#deploy-no-vercel)
4. [Deploy no Heroku](#deploy-no-heroku)
5. [Deploy no DigitalOcean](#deploy-no-digitalocean)
6. [Deploy na AWS](#deploy-na-aws)
7. [Configuração de Domínio](#configuração-de-domínio)
8. [Segurança em Produção](#segurança-em-produção)
9. [Monitoring e Logs](#monitoring-e-logs)

---

## 🔧 PREPARAÇÃO LOCAL

### 1. Configurar .env
```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Editar `.env` com suas configurações:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=gerar_chave_segura_aqui
SOCKET_ORIGIN=https://seu-dominio.com.br
DOMAIN=seu-dominio.com.br
```

### 2. Gerar JWT_SECRET Seguro
```bash
# No PowerShell
$secret = [Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
Write-Host $secret
```

Copiar o hash gerado para JWT_SECRET no `.env`.

### 3. Testar Localmente
```bash
# Instalar dependências
npm install

# Rodar em produção
npm run prod
```

Acessar http://localhost:3000 para testar.

### 4. Preparar para Deploy
```bash
# Criar .gitignore
node_modules/
.env
.DS_Store
*.log
dados/*.json
```

---

## 🌍 ESCOLHA DA PLATAFORMA

| Plataforma | Preço | Facilidade | Escalabilidade | Recomendado Para |
|-----------|-------|-----------|-----------------|-----------------|
| **Vercel** | Grátis-$20/mês | ⭐⭐⭐⭐⭐ | Média | Frontend + Node |
| **Heroku** | Grátis (removido) | ⭐⭐⭐⭐ | Média | Node puro |
| **DigitalOcean** | $5-$12/mês | ⭐⭐⭐ | Alta | Produção |
| **AWS** | Pay-as-you-go | ⭐⭐ | Muito Alta | Empresarial |
| **Render** | Grátis-$7/mês | ⭐⭐⭐⭐ | Média | Node + Socket.io |

**RECOMENDAÇÃO**: DigitalOcean + Vercel (Frontend separado)

---

## 🔵 DEPLOY NO VERCEL

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Git instalado
- Código no GitHub

### Passo 1: Preparar Repositório Git
```bash
cd "c:\Users\jessi\OneDrive\Desktop\projeto hackathon"

# Inicializar git
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Inicial: Plataforma Mulheres Empreendedoras com Chat, Video e Matching"

# Conectar ao GitHub (criar repo primeiro)
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main
```

### Passo 2: Fazer Deploy no Vercel

**Opção A: Via CLI**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

**Opção B: Via Interface Web**
1. Ir a https://vercel.com/dashboard
2. Clicar "New Project"
3. Selecionar repositório do GitHub
4. Configurações:
   - **Root Directory**: `.`
   - **Build Command**: `npm install`
   - **Output Directory**: `frontend`
   - **Environment Variables**: Adicionar variáveis do .env

5. Clicar "Deploy"

### Passo 3: Configurar Variáveis de Ambiente
No dashboard do Vercel:
1. Settings → Environment Variables
2. Adicionar:
   - `JWT_SECRET`: Seu valor seguro
   - `NODE_ENV`: `production`
   - `SOCKET_ORIGIN`: Seu domínio

### Passo 4: Conectar Domínio
1. Settings → Domains
2. Adicionar domínio: `seu-dominio.com.br`
3. Seguir instruções de DNS

---

## 🟣 DEPLOY NO HEROKU

⚠️ **NOTA**: Heroku removeu dyno grátis em 2022, mas ainda oferece plano pago.

### Passo 1: Preparar Procfile
```bash
# Criar arquivo Procfile (sem extensão)
echo "web: npm start" > Procfile
```

### Passo 2: Fazer Deploy
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create seu-app-name

# Deploy
git push heroku main

# Ver logs
heroku logs --tail
```

### Passo 3: Configurar Variáveis
```bash
heroku config:set JWT_SECRET=seu_valor_seguro
heroku config:set SOCKET_ORIGIN=https://seu-app-name.herokuapp.com
heroku config:set NODE_ENV=production
```

---

## 🔴 DEPLOY NO DIGITALOCEAN

### MELHOR OPÇÃO para Socket.io e produção!

### Passo 1: Criar Droplet
1. Ir a https://www.digitalocean.com
2. Clicar "Create" → "Droplets"
3. Configurações:
   - **OS**: Ubuntu 22.04 LTS
   - **Plan**: $5/mês (1GB RAM, 1 CPU)
   - **Region**: Escolher mais próximo dos usuários
   - **SSH Key**: Adicionar sua chave
   - **Hostname**: `seu-app`

4. Clicar "Create Droplet"

### Passo 2: Conectar via SSH
```bash
# No PowerShell
ssh -i seu-chave-privada.pem root@seu_ip_do_droplet

# Ou se estiver em WSL/Git Bash
ssh -i ~/.ssh/sua-chave root@seu_ip
```

### Passo 3: Configurar Servidor

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Instalar Git
apt install -y git

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Clonar repositório
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# Instalar dependências
npm install --production

# Criar .env
nano .env
# (Adicionar variáveis, depois Ctrl+X, Y, Enter)

# Iniciar com PM2
pm2 start backend/backendexpandido.js --name "mulheres-app"
pm2 startup
pm2 save
```

### Passo 4: Configurar Nginx (Proxy Reverso)

```bash
# Instalar Nginx
apt install -y nginx

# Criar arquivo de configuração
sudo nano /etc/nginx/sites-available/seu-dominio.com.br
```

Adicionar:
```nginx
server {
    listen 80;
    server_name seu-dominio.com.br www.seu-dominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Ativar configuração
sudo ln -s /etc/nginx/sites-available/seu-dominio.com.br /etc/nginx/sites-enabled/

# Testar
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx
```

### Passo 5: Configurar SSL/HTTPS
```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Gerar certificado
certbot --nginx -d seu-dominio.com.br -d www.seu-dominio.com.br
```

---

## 🟧 DEPLOY NA AWS

### Opção mais robusta para produção

#### Passo 1: Criar EC2 Instance
1. Ir a AWS Console
2. EC2 → Instances → Launch Instance
3. AMI: Ubuntu 22.04 LTS
4. Instance type: t3.micro (grátis no free tier)
5. Security Group: Abrir portas 80, 443, 22

#### Passo 2: Conectar
```bash
ssh -i sua-chave.pem ubuntu@seu_ip_aws
```

#### Passo 3: Setup (similar ao DigitalOcean)
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2

# Clonar e setup
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install --production
pm2 start backend/backendexpandido.js --name "mulheres-app"
pm2 startup && pm2 save
```

#### Passo 4: Configurar RDS (Banco de Dados)
- RDS → Create Database → MySQL/PostgreSQL
- Configurar conexão em `.env`

---

## 🌐 CONFIGURAÇÃO DE DOMÍNIO

### 1. Registrar Domínio
Opções:
- [Registro.br](https://registro.br) (domínio .com.br)
- [Namecheap](https://namecheap.com)
- [GoDaddy](https://godaddy.com)

### 2. Configurar Apontamento

**Para DigitalOcean:**
1. DigitalOcean → Networking → Domains
2. Adicionar domínio
3. Copiar nameservers
4. No registrador de domínio, configurar nameservers do DigitalOcean

**Para Vercel:**
1. Vercel → Settings → Domains
2. Adicionar domínio
3. Copiar registros CNAME/A
4. No registrador, adicionar os registros DNS

**Registros DNS típicos:**
```
A Record: @ → seu_ip_do_servidor
CNAME: www → seu-dominio.com.br
MX: seu_servidor_email (se aplicável)
```

### 3. Validar
```bash
# No PowerShell
nslookup seu-dominio.com.br
# Deve mostrar seu IP
```

---

## 🔒 SEGURANÇA EM PRODUÇÃO

### 1. Criar .env Seguro
```env
# NUNCA colocar valores reais no código
NODE_ENV=production
PORT=3000
JWT_SECRET=<GERAR_CHAVE_SEGURA_AQUI>
SOCKET_ORIGIN=https://seu-dominio.com.br
```

### 2. Proteger Dados Sensíveis
- ❌ Não fazer commit de `.env`
- ✅ Adicionar ao `.gitignore`
- ✅ Usar variáveis de ambiente da plataforma

### 3. HTTPS/SSL
- ✅ Usar Let's Encrypt (grátis com Certbot)
- ✅ Renovação automática
- ✅ Redirecionar HTTP → HTTPS

### 4. CORS Seguro
```javascript
// backend/backendexpandido.js
const io = socketIo(server, { 
    cors: { 
        origin: process.env.SOCKET_ORIGIN || 'http://localhost:3000',
        credentials: true 
    } 
});
```

### 5. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // 100 requisições
});

app.use('/api/', limiter);
```

### 6. Validação de Input
```javascript
// Validar todos os inputs
function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}
```

---

## 📊 MONITORING E LOGS

### PM2 (DigitalOcean)
```bash
# Ver status
pm2 status

# Ver logs
pm2 logs

# Salvar logs
pm2 logs > app.log

# Monitor em tempo real
pm2 monit
```

### Vercel
- Dashboard → Deployments → Logs
- Automaticamente captura logs

### Datadog (Opcional - Monitoramento Profissional)
```bash
npm install dd-trace
```

### Health Check
```javascript
// backend/backendexpandido.js
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});
```

Configurar monitoramento para chamar `/health` a cada 5 minutos.

---

## 🚀 CHECKLIST DE DEPLOY

### Antes de Deploy:
- [ ] `.env` criado e seguro
- [ ] `package.json` atualizado
- [ ] `Procfile` criado (se Heroku)
- [ ] `.gitignore` configurado
- [ ] Código testado localmente
- [ ] Dependências instaladas

### Deploy:
- [ ] Repositório no GitHub
- [ ] Variáveis de ambiente configuradas na plataforma
- [ ] Domínio registrado e apontado
- [ ] SSL/HTTPS ativado
- [ ] PM2/systemd configurado (se VPS)

### Após Deploy:
- [ ] Testar http://seu-dominio.com.br
- [ ] Testar HTTPS redirecionamento
- [ ] Testar Socket.io (chat)
- [ ] Testar API endpoints
- [ ] Verificar logs
- [ ] Adicionar Health Check
- [ ] Configurar backups automáticos

---

## 📞 TROUBLESHOOTING DE DEPLOY

### Socket.io não conecta
```javascript
// backend/backendexpandido.js
// Verificar se SOCKET_ORIGIN está correto
const io = socketIo(server, { 
    cors: { origin: process.env.SOCKET_ORIGIN } 
});

console.log('Socket.io origin:', process.env.SOCKET_ORIGIN);
```

### Porta 3000 em uso
```bash
# DigitalOcean
sudo lsof -i :3000
sudo kill -9 <PID>
pm2 restart all
```

### Arquivos JSON não encontrados
```javascript
// Certificar que dados/ existe
if (!fs.existsSync('dados')) {
    fs.mkdirSync('dados', { recursive: true });
}
```

### Nginx erro 502 Bad Gateway
```bash
# Verificar se Node está rodando
pm2 status

# Reiniciar
pm2 restart all
sudo systemctl restart nginx
```

---

## 💡 RECOMENDAÇÕES FINAIS

### Para Desenvolvimento:
```bash
npm run dev
# Usa nodemon para auto-reload
```

### Para Produção:
```bash
npm run prod
# Node puro, mais rápido
```

### Estrutura Recomendada:
```
Frontend (Vercel) + Backend (DigitalOcean)
- Frontend em: seu-dominio.com.br
- API em: api.seu-dominio.com.br ou /api
- Socket.io: mesmo domínio
```

### Próximos Passos:
1. [ ] Deploy em teste (staging)
2. [ ] Testar todas as funcionalidades
3. [ ] Coletar feedback
4. [ ] Deploy em produção
5. [ ] Monitoramento contínuo

---

**Versão**: 1.0  
**Última atualização**: Março 2026  
**Status**: Pronto para deploy ✅
