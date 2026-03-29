# ⚡ SETUP RÁPIDO - PRODUÇÃO EM 5 MINUTOS

## 🚀 Opção Mais Rápida: DigitalOcean + GitHub

### 1️⃣ PREPARAÇÃO LOCAL (5 min)

```bash
# Windows PowerShell
cd "c:\Users\jessi\OneDrive\Desktop\projeto hackathon"

# Criar .env
Copy-Item .env.example .env

# Editar .env (abrir no VS Code)
code .env
```

Mudar no `.env`:
```
JWT_SECRET=sua_chave_segura_aqui_32_caracteres
SOCKET_ORIGIN=https://seu-dominio.com.br
```

```bash
# Fazer commit
git init
git add .
git commit -m "Deploy: Mulheres Empreendedoras Platform v1"
```

### 2️⃣ PUSH PARA GITHUB (3 min)

```bash
# Criar repo em https://github.com/new
# Nome: seu-repo
# Privado recomendado

# No PowerShell:
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main
```

### 3️⃣ CRIAR DROPLET DIGITALOCEAN (2 min)

1. Ir para https://www.digitalocean.com/
2. **Create** → **Droplets**
3. Configurações:
   - **OS**: Ubuntu 22.04 LTS
   - **Plan**: $5/mês
   - **Region**: Próximo aos usuários
   - **SSH Key**: Adicionar sua chave pública
   - **Hostname**: `mulheres-app`

4. Clicar **Create Droplet**

### 4️⃣ SETUP NO SERVIDOR (5 min)

Após criação, copiar o **IP do Droplet** e conectar:

```bash
# PowerShell - conectar ao servidor
ssh -i seu-chave-privada.pem root@seu_ip_do_droplet

# (Se não tem chave SSH, gerar antes:)
# ssh-keygen -t rsa -b 4096 -f C:\Users\jessi\.ssh\id_rsa
```

No terminal do servidor (via SSH):

```bash
# PARTE 1: Instalar dependências (copiar/colar tudo)
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs nginx git pm2

# PARTE 2: Clonar projeto
cd /home
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# PARTE 3: Instalar NPM deps
npm install --production

# PARTE 4: Criar .env no servidor
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
JWT_SECRET=sua_chave_super_segura
SOCKET_ORIGIN=https://seu-dominio.com.br
DOMAIN=seu-dominio.com.br
EOF

# PARTE 5: Iniciar aplicação
pm2 start backend/backendexpandido.js --name "mulheres-app"
pm2 startup
pm2 save

# PARTE 6: Configurar Nginx
cat > /etc/nginx/sites-available/seu-dominio.com.br << 'EOF'
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
EOF

# PARTE 7: Ativar Nginx
ln -s /etc/nginx/sites-available/seu-dominio.com.br /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# PARTE 8: SSL (Let's Encrypt)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com.br -d www.seu-dominio.com.br
```

### 5️⃣ APONTAR DOMÍNIO (2 min)

1. Ir ao registrador (Registro.br, GoDaddy, etc)
2. Adicionar **nameservers do DigitalOcean**:
   - `ns1.digitalocean.com`
   - `ns2.digitalocean.com`
   - `ns3.digitalocean.com`

Ou apontar **A Record**:
```
@ → seu_ip_do_droplet
www → seu_ip_do_droplet
```

### 6️⃣ VERIFICAR ✅

Após 5-10 minutos:
```bash
# Teste DNS
nslookup seu-dominio.com.br

# Acessar
https://seu-dominio.com.br
```

---

## 🎯 RESUMO DO FLUXO

```
LOCAL:
  1. Criar .env
  2. Git init + push para GitHub

NUVEM (DigitalOcean):
  1. Criar Droplet
  2. SSH + Install Node + Nginx + PM2
  3. Clone repo
  4. npm install + pm2 start
  5. Config Nginx como proxy
  6. SSL com certbot

DOMÍNIO:
  1. Apontar nameservers DigitalOcean
  2. OU apontar A record
```

---

## 🔧 COMANDOS ÚTEIS APÓS DEPLOY

### Ver Status
```bash
# SSH no servidor
ssh root@seu_ip

# Status da app
pm2 status

# Logs em tempo real
pm2 logs mulheres-app

# Reiniciar
pm2 restart mulheres-app
```

### Atualizar Código
```bash
# SSH no servidor
cd /home/seu-repo
git pull origin main
npm install --production
pm2 restart mulheres-app
```

### Monitorar
```bash
# SSH no servidor
pm2 monit

# Verificar Nginx
sudo systemctl status nginx

# Verificar portas
sudo netstat -tlnp
```

---

## 💰 CUSTO MENSAL

- **DigitalOcean Droplet**: $5/mês (1GB RAM, 1CPU, 25GB SSD)
- **Domínio .com.br**: ~R$40/ano (Registro.br)
- **SSL**: Grátis (Let's Encrypt)
- **Total**: ~$5/mês + domínio

---

## ⚠️ IMPORTANTE

1. **Mude JWT_SECRET**: Gerar chave segura
2. **Backup automático**: Configurar no DigitalOcean
3. **Monitoramento**: Configurar alertas
4. **Logs**: Verificar regularmente `pm2 logs`
5. **Atualizações**: Rodar `apt update` mensalmente

---

**Pronto! Sua plataforma está ONLINE! 🎉**
