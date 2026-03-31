# 📁 ESTRUTURA DO PROJETO HACKATHON

## 📂 Organização de Pastas

Projeto organizado em 5 segmentos principais para melhor manutenção e escalabilidade:

```
projeto hackathon/
├── 📁 backend/                          # Código servidor Node.js
│   ├── backendexpandido.js             # 🚀 Servidor principal (EXPRESS)
│   ├── backendbase.js                  # Servidor base alternativo
│   ├── backend.py                      # Backend Python (backup)
│   └── seed-data.js                    # Script para popular dados iniciais
│
├── 📁 frontend/                         # Interface do usuário (HTML/CSS/JS)
│   ├── index.html                      # 🏠 Página inicial
│   ├── login.html                      # 🔐 Login
│   ├── register.html                   # 📝 Registrar usuário
│   ├── dashboard.html                  # 📊 Dashboard alternativo
│   ├── dashboard-new.html              # 📊 Dashboard principal
│   ├── questionnaire.html              # 📋 Questionário de perfil
│   ├── companies-register.html         # 🏢 Registrar empresa (4 passos)
│   ├── editals.html                    # 📢 Editais com matching
│   ├── courses.html                    # 🎓 Cursos e recomendações
│   ├── admin.html                      # ⚙️ Painel administrativo
│   ├── about.html                      # ℹ️ Sobre o projeto
│   ├── contact.html                    # 📧 Contato
│   ├── landingpage1.html               # 🎯 Landing page alternativa
│   └── projetfront.html                # 💼 Projeto frontend principal
│
├── 📁 dados/                            # Banco de dados JSON (persistência)
│   ├── users.json                      # 👥 Usuários cadastrados
│   ├── companies.json                  # 🏢 Empresas registradas
│   ├── courses.json                    # 🎓 Base de cursos
│   ├── editals.json                    # 📢 Base de editais
│   ├── applications.json               # 📋 Candidaturas a editais
│   ├── mentoring_sessions.json         # 🤝 Sessões de mentoria
│   ├── mentors.json                    # 👨‍🏫 Perfil de mentores
│   ├── user_scores.json                # 📊 Pontuação e gamificação
│   └── questionnaires.json             # 📝 Respostas de questionários
│
├── 📁 documentacao/                     # Documentação técnica e guias
│   ├── README.md                       # 📖 Documentação principal
│   ├── COMECE-AQUI.md                  # 🚀 Início rápido (5 min)
│   ├── GUIA-USO.md                     # 📚 Guia completo do usuário
│   ├── TECNICO.md                      # 🔧 Documentação técnica
│   ├── MAPA-VISUAL.md                  # 🗺️ Diagramas e flowcharts
│   ├── INDICE.md                       # 📑 Índice de documentação
│   ├── SUMARIO.md                      # 📊 Sumário do projeto
│   ├── FINAL.md                        # ✅ Instruções finais
│   └── README-FINAL.md                 # 📝 Resumo executivo
│
├── 📁 configuracao/                     # Configurações do projeto
│   ├── package.json                    # 📦 Dependências Node.js
│   ├── package-lock.json               # 🔒 Lock de versões
│   ├── requirements.txt                # 🐍 Dependências Python
│   └── bancodedados.sql                # 🗄️ Schema SQL (futuro)
│
└── 📁 node_modules/                     # Bibliotecas instaladas (Node.js)
```

---

## 🚀 COMO USAR

### 1️⃣ Iniciar o Servidor

```powershell
cd "projeto hackathon\backend"
node backendexpandido.js
```

Servidor iniciará em: `http://localhost:3000`

### 2️⃣ Acessar a Plataforma

```
http://localhost:3000              # Página inicial
http://localhost:3000/login        # Login
http://localhost:3000/dashboard    # Dashboard
http://localhost:3000/companies    # Registrar empresa
http://localhost:3000/editals      # Editais
http://localhost:3000/courses      # Cursos
```

### 3️⃣ Credenciais Padrão

```
Email:    admin@exemplo.com
Senha:    123456
```

---

## 📊 RESUMO DE ARQUIVOS

| Categoria | Quantidade | Descrição |
|-----------|-----------|-----------|
| **Backend** | 4 arquivos | Servidores (Node.js/Python) |
| **Frontend** | 14 páginas HTML | Interface completa |
| **Dados** | 9 arquivos JSON | Persistência de dados |
| **Documentação** | 9 arquivos MD | 2600+ linhas |
| **Configuração** | 4 arquivos | Setup do projeto |
| **Total** | 40+ arquivos | ~7400 linhas de código |

---

## 🔧 FUNCIONALIDADES PRINCIPAIS

### 🤖 Algoritmos de IA
- ✅ **RecommendationEngine**: Recomenda cursos por tipo × estágio
- ✅ **Edital Matching**: Score de compatibilidade 0-100%
- ✅ **Gamification**: Sistema de pontos (0-1000 pts = níveis 1-10)

### 💼 Funcionalidades
- ✅ Autenticação JWT (24h)
- ✅ Registro de empresa (4 passos)
- ✅ Base de editais com filtros
- ✅ Plataforma de cursos
- ✅ Sessões de mentoria
- ✅ Sistema de pontuação
- ✅ Dashboard com KPIs

### 🎨 Design
- ✅ Responsivo (mobile/tablet/desktop)
- ✅ Gradientes modernos (vermelho/roxo)
- ✅ Animações suaves
- ✅ Font Awesome 6.0.0
- ✅ Roboto font

---

## 📝 PRÓXIMOS PASSOS

1. **Curto Prazo**
   - Testar cada página no navegador
   - Validar dados JSON
   - Testar APIs

2. **Médio Prazo**
   - Implementar bcrypt (passwords)
   - Adicionar email verification
   - Criar admin dashboard

3. **Longo Prazo**
   - Migrar para PostgreSQL
   - Implementar Redis cache
   - Deploy em produção
   - Aplicativo mobile (React Native)

---

## 🆘 TROUBLESHOOTING

### Servidor não inicia
```powershell
# Verificar se porta 3000 está em uso
netstat -ano | findstr :3000

# Matar processo na porta 3000
taskkill /PID <PID> /F
```

### Dados não salvam
- Verificar permissões da pasta `dados/`
- Confirmar que JSON files estão acessíveis

### Páginas não carregam
- Verificar caminhos em `backendexpandido.js`
- Confirmar arquivos HTML existem em `frontend/`

---

## 📞 SUPORTE

Para detalhes técnicos, veja: `documentacao/README.md`  
Para tutorial completo, veja: `documentacao/GUIA-USO.md`  
Para começar rapidinho, veja: `documentacao/COMECE-AQUI.md`

---

**Projeto Hackathon - Empreendedorismo da Mulher** 💪  
Última atualização: Março 2026
