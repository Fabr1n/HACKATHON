# 🚀 TL;DR - COLOCAR ONLINE EM 15 MINUTOS

## AGORA (HOJE)

```bash
# 1. Ler este arquivo (2 min)
# 2. Criar conta DigitalOcean (2 min)
# 3. Criar Droplet (2 min)
# 4. SSH e rodar comandos (9 min)
# = ONLINE! ✅
```

---

## PASSO 1: Criar Conta DigitalOcean
→ https://www.digitalocean.com/
(Leva 2 minutos)

---

## PASSO 2: Criar Droplet
1. Dashboard → Create → Droplets
2. OS: Ubuntu 22.04 LTS
3. Plan: $5/mês
4. Region: São Paulo (recomendado)
5. Hostname: `mulheres-app`
6. SSH Key: Adicionar sua chave
7. Create

**Copiar o IP que aparecer**

---

## PASSO 3: Conectar via SSH

### Windows PowerShell:
```powershell
ssh -i sua-chave-privada.pem root@seu_ip_do_droplet
```

### Ou no Git Bash:
```bash
ssh -i ~/.ssh/sua-chave root@seu_ip_do_droplet
```

---

## PASSO 4: Executar Comandos (Copiar/Colar)

No terminal SSH, copiar e colar estes comandos um por um:

```bash
# Parte 1: Atualizar sistema
apt update && apt upgrade -y

# Parte 2: Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs nginx git pm2

# Parte 3: Clonar projeto
cd /home
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# Parte 4: Instalar dependências
npm install --production

# Parte 5: Criar .env
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
JWT_SECRET=sua_chave_super_segura_aqui_32_chars
SOCKET_ORIGIN=https://seu-dominio.com.br
DOMAIN=seu-dominio.com.br
EOF

# Parte 6: Iniciar app
pm2 start backend/backendexpandido.js --name "mulheres-app"
pm2 startup
pm2 save

# Parte 7: Configurar Nginx
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

# Parte 8: Ativar Nginx
ln -s /etc/nginx/sites-available/seu-dominio.com.br /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Parte 9: SSL (Let's Encrypt)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com.br -d www.seu-dominio.com.br
```

---

## PASSO 5: Apontar Domínio

1. Registrador (Registro.br, GoDaddy, etc)
2. Nameservers DO:
   - ns1.digitalocean.com
   - ns2.digitalocean.com
   - ns3.digitalocean.com

Ou A record:
```
@ → seu_ip_do_droplet
www → seu_ip_do_droplet
```

---

## PASSO 6: Validar ✅

Após 5-10 minutos:
```
https://seu-dominio.com.br
```

---

## ⚠️ IMPORTANTE

- **JWT_SECRET**: Mude para algo seguro!
- **seu-dominio**: Mude para seu domínio real
- **seu-repo**: Mude para seu repo no GitHub

---

## 🆘 PROBLEMA?

**App não inicia?**
```bash
# SSH no servidor
ssh root@seu_ip
pm2 logs mulheres-app
```

**Nginx erro?**
```bash
sudo systemctl restart nginx
```

**Sem SSL?**
```bash
certbot --nginx
```

---

## 📞 REFERÊNCIA COMPLETA

Todos os guias estão em documentacao/:
- SETUP-RAPIDO-PRODUCAO.md (15 min)
- DEPLOY-NUVEM.md (30 min)
- MANUAL-CHAT-VIDEO-MATCHING.md (features)

---

**Pronto! Sua plataforma online em 15 minutos! 🚀**
