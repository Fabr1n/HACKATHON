# 🏗️ ARQUITETURA DE PRODUÇÃO

## 🌐 Estrutura Completa em Nuvem

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USUÁRIOS FINAIS                              │
│                (Mulheres Empreendedoras do Brasil)                    │
└────────────────────────┬──────────────────────────────────────────────┘
                         │
                    HTTPS/TLS
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ┌────▼─────────┐           ┌────────▼──────┐
    │   DOMÍNIO    │           │  CDN/CACHE    │
    │   .com.br    │           │  (Cloudflare) │
    │              │           │  (Opcional)   │
    └────┬─────────┘           └────────┬──────┘
         │                              │
         └────────────────┬─────────────┘
                          │
            ┌─────────────▼──────────────┐
            │   NGINX (Proxy Reverso)    │
            │   (Port 80/443)            │
            │   DigitalOcean Droplet     │
            └─────────────┬──────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
      HTTPS            HTTPS            WebSocket
         │                │                │
    ┌────▼─────────┐  ┌───▼─────────┐  ┌─▼──────────┐
    │   Frontend   │  │  API REST   │  │ Socket.io  │
    │   (HTML/CSS) │  │  (Express)  │  │ (Real-time)│
    │              │  │             │  │            │
    └──────────────┘  └─────┬───────┘  └─┬──────────┘
                            │            │
                ┌───────────▼────────────▼──┐
                │   Node.js + Express       │
                │   (Port 3000)             │
                │   backendexpandido.js     │
                └───────────┬───────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
         ┌──▼──┐       ┌───▼───┐      ┌──▼──┐
         │JWT  │       │Socket │      │CORS │
         │Auth │       │.io    │      │Logs │
         └─────┘       │Events │      └─────┘
                       └───┬───┘
                           │
            ┌──────────────▼──────────────┐
            │    Camada de Dados          │
            │    (JSON Files)             │
            │    /dados/                  │
            └──────────────┬──────────────┘
            
         ┌─────────────────┴─────────────────┐
         │                                   │
    ┌────▼────────┐              ┌──────────▼──┐
    │  users.json │              │companies.json│
    │messages.json│              │matches.json  │
    │forum_*      │              │video_calls   │
    │courses.json │              │editals.json  │
    └─────────────┘              └──────────────┘
```

---

## 🔄 FLUXO DE DADOS - CHAT EM TEMPO REAL

```
USUÁRIO A                    SOCKET.IO                   USUÁRIO B
    │                            │                           │
    ├─ "Oi, tudo bem?" ─────────>│                           │
    │                            │                           │
    │                    Salva em messages.json               │
    │                            │                           │
    │                    Broadcast para sala                  │
    │                            ├──────────────────────────>│
    │                            │    Mensagem aparece       │
    │                            │                           │
    │ <─ "Oi! Tudo certo" ───────┤<──────────────────────────┤
    │    (outro usuário)         │                           │
    │                    Salva em messages.json               │
    │                    Broadcast para todos                 │
    │                    na sala "geral"                      │
```

---

## 🤖 FLUXO DE MATCHING - IA

```
EMPRESA A (Usuário)
      │
      ├─ Acessar /match
      │
      ├─ GET /api/matches
      │      │
      │      ├─ Busca todas empresas em companies.json
      │      │
      │      ├─ Para cada empresa B:
      │      │    └─ calculateMatchScore(A, B)
      │      │       ├─ Tipo (+0-30)
      │      │       ├─ Estágio (+0-25)
      │      │       ├─ Localização (+0-15)
      │      │       ├─ Funcionários (+0-20)
      │      │       └─ Receita (+0-10)
      │      │       = SCORE 0-100
      │      │
      │      ├─ Ordena por score DESC
      │      │
      │      └─ Retorna TOP 10 com scores
      │
      ├─ Frontend exibe com:
      │    ├─ Cards bonitos
      │    ├─ Score colorido
      │    ├─ Compatibilidade visualizada
      │    └─ Botão "Enviar Proposta"
      │
      └─ POST /api/matches/request
           │
           ├─ Salva em matches.json
           │
           ├─ Notifica EMPRESA B
           │
           └─ EMPRESA B pode aceitar/recusar

```

---

## 📹 FLUXO DE VIDEOCHAMADA

```
USUÁRIO A                    SERVIDOR                    USUÁRIO B
    │                            │                           │
    ├─ Clica "Iniciar Chamada"──>│                           │
    │                            │                           │
    │           POST /api/video/start                         │
    │                            │                           │
    │         Cria room Jitsi     │                           │
    │    retorna URL da chamada   │                           │
    │    <─────────────────────────                           │
    │                            │                           │
    │ Abre iframe Jitsi          │    Notifica USUÁRIO B     │
    │ (externa em meet.jit.si)   │───────────────────────────>│
    │                            │                           │
    │ "Conectado à sala"         │    Clica para entrar      │
    │                            │<───────────────────────────│
    │                            │                           │
    │ <─────── Peer-to-Peer Connection (criptografado) ─────>│
    │           (Audio/Video via WebRTC)                      │
    │                            │                           │
    │   [CHAMADA EM ANDAMENTO]    │    [CHAMADA EM ANDAMENTO] │
    │   - Áudio bidirecional     │    - Áudio bidirecional   │
    │   - Vídeo bidirecional     │    - Vídeo bidirecional   │
    │   - Compartilhar tela      │    - Compartilhar tela    │
    │                            │                           │
    │ Clica "Encerrar"           │                           │
    ├─ Fecha conexão ────────────>│                           │
    │                            │  Desconecta               │
    │                            │<───────────────────────────│
    │                            │                           │
    └── Salva em video_calls.json ──────────────────────────┘

```

---

## 🔐 FLUXO DE AUTENTICAÇÃO

```
NOVO USUÁRIO
     │
     ├─ Acessa login.html
     │
     ├─ Preenche: email + senha
     │
     ├─ POST /api/login
     │       │
     │       ├─ Busca email em users.json
     │       ├─ Compara senha (hash)
     │       ├─ Se OK: Gera JWT Token
     │       │         jwt.sign({email, id}, JWT_SECRET)
     │       └─ Se erro: 401 Unauthorized
     │
     ├─ Recebe token
     │
     ├─ Armazena em localStorage
     │       localStorage.setItem('token', token)
     │
     ├─ Redireciona para /dashboard
     │
     ├─ Em cada requisição à API:
     │       Authorization: Bearer <token>
     │       │
     │       └─ Backend verifica: jwt.verify(token, JWT_SECRET)
     │
     └─ Se válido: Permite acesso
       Se inválido: 403 Forbidden
```

---

## 📊 ESTRUTURA DE BANCO DE DADOS JSON

```
projeto-hackathon/dados/
│
├── users.json
│   ├── id
│   ├── email          ← Chave única
│   ├── password       ← Hash (bcrypt)
│   ├── name
│   ├── phone
│   ├── bio
│   ├── avatar
│   ├── createdAt
│   └── [mais campos]
│
├── companies.json
│   ├── id
│   ├── name
│   ├── email          ← Contato
│   ├── type           ← tech, fashion, food, etc
│   ├── stage          ← ideia, pre-launch, launched
│   ├── employees
│   ├── revenue
│   ├── location
│   ├── description
│   └── [mais campos]
│
├── messages.json
│   ├── id
│   ├── email          ← Quem enviou
│   ├── content        ← Mensagem
│   ├── room           ← Sala (geral, startup, etc)
│   ├── timestamp
│   └── threadId       ← Para threads
│
├── matches.json
│   ├── id
│   ├── companyA_id
│   ├── companyB_id
│   ├── score          ← 0-100
│   ├── status         ← pending, accepted, rejected
│   ├── createdAt
│   └── [mais campos]
│
└── [mais arquivos...]
```

---

## 🚀 DEPLOY PIPELINE

```
CÓDIGO LOCAL (seu PC)
        │
        ├─ npm install              (atualiza deps)
        ├─ npm run prod             (testa local)
        ├─ git add .
        ├─ git commit -m "..."
        └─ git push origin main
                │
                ▼
        GITHUB (Repositório)
                │
                └─ Webhook dispara (opcional)
                   (ou pull manual)
                        │
                        ▼
                DIGITALOCEAN DROPLET
                        │
                        ├─ git pull origin main
                        ├─ npm install --production
                        ├─ pm2 restart mulheres-app
                        │
                        ├─ Nginx redireciona tráfego
                        ├─ SSL valida certificado
                        └─ App online!
                             │
                             ▼
                        USUÁRIOS ACESSAM
                        seu-dominio.com.br
```

---

## 🔄 FLUXO COMPLETO DE USO

```
NOVO USUÁRIO
    │
    ├─ Acessa seu-dominio.com.br
    │
    ├─ Clica "Registrar"
    │  └─ Preenche formulário
    │  └─ POST /api/register
    │  └─ Salva em users.json
    │
    ├─ Login com email/senha
    │  └─ Recebe JWT token
    │  └─ localStorage.setItem('token', token)
    │
    ├─ Preenche questionário
    │  └─ Respostas salvas
    │
    ├─ Registra empresa
    │  └─ POST /api/companies
    │  └─ Salva em companies.json
    │
    ├─ Acessa Dashboard
    │  ├─ Vê estatísticas
    │  ├─ Pode começar a usar plataforma
    │  └─ Links para: Chat, Video, Matching
    │
    ├─ Usa Chat
    │  ├─ Socket.io connect
    │  ├─ Entra em salas temáticas
    │  ├─ Conversa em tempo real
    │  └─ Mensagens salvas em messages.json
    │
    ├─ Encontra matches
    │  ├─ GET /api/matches (carrega scores)
    │  ├─ Aplica filtros
    │  ├─ Vê compatibilidade com IA
    │  └─ Envia proposta de parceria
    │
    ├─ Faz videochamada
    │  ├─ POST /api/video/start
    │  ├─ Jitsi Meet carrega
    │  ├─ Video em p2p (seguro)
    │  └─ Chamada gravada (opcional)
    │
    └─ Participa do fórum
       ├─ Vê threads de discussão
       ├─ Cria nova discussão
       ├─ Responde com ideias
       └─ Community cresce!
```

---

## 💾 BACKUP E RECUPERAÇÃO

```
DADOS IMPORTANTES
        │
        ├─ Código (GitHub)
        │  └─ Sempre sincronizado
        │  └─ Histórico completo
        │
        ├─ Banco JSON (dados/)
        │  ├─ Backup manual: cp -r dados/ backup-$(date +%s)
        │  ├─ Backup automático: DigitalOcean snapshots
        │  └─ Sync cloud: rsync para storage externo
        │
        └─ .env (Secrets)
           ├─ Nunca sincronizar
           ├─ Manter seguro offline
           └─ Apenas admin conhece
```

---

## 📈 ESCALABILIDADE FUTURA

```
VERSÃO 1.0 (Atual)
    └─ JSON files (suficiente para 1000s usuários)

VERSÃO 1.5 (Próximo passo)
    ├─ Adicionar banco relacional (PostgreSQL)
    ├─ Implementar cache (Redis)
    └─ Melhorar performance

VERSÃO 2.0 (Maduro)
    ├─ Microserviços
    ├─ Load balancer
    ├─ Kubernetes
    ├─ Machine learning avançado
    └─ App mobile (React Native)
```

---

## ✨ RESUMO DA ARQUITETURA

| Camada | Tecnologia | Papel |
|--------|-----------|-------|
| **Cliente** | HTML/CSS/JS + Socket.io | Interface do usuário |
| **Network** | HTTPS + TLS | Comunicação segura |
| **Proxy** | Nginx | Roteamento de tráfego |
| **Aplicação** | Node.js + Express | Lógica de negócio |
| **Real-time** | Socket.io | Chat/Notificações |
| **Dados** | JSON files | Persistência |
| **Infra** | DigitalOcean | Hospedagem |

---

**Versão**: 1.0  
**Data**: Março 2026  
**Status**: ✅ PRONTO PARA PRODUÇÃO
