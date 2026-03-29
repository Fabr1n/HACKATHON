# 🚀 PROJETO HACKATHON - PLATAFORMA DE EMPREENDEDORISMO DA MULHER

> Estrutura organizada em 5 segmentos principais para facilitar manutenção, escalabilidade e compreensão do projeto.

---

## 📂 ESTRUTURA RÁPIDA

```
📁 projeto hackathon
├── 📁 backend/           ← Servidor Node.js
├── 📁 frontend/          ← Páginas HTML
├── 📁 dados/             ← Banco de dados JSON
├── 📁 documentacao/      ← Guias e manuais
├── 📁 configuracao/      ← Setup e dependências
├── ⚡ iniciar-servidor.bat/.ps1  ← Scripts rápidos
└── 📄 ESTRUTURA-PROJETO.md       ← Documentação desta organização
```

---

## ⚡ INÍCIO RÁPIDO

### 1️⃣ Opção Windows Batch (Mais Fácil)
```powershell
iniciar-servidor.bat
```

### 2️⃣ Opção PowerShell
```powershell
./iniciar-servidor.ps1
```

### 3️⃣ Opção Manual
```powershell
cd backend
node backendexpandido.js
```

### 4️⃣ Opção npm
```powershell
npm start
```

---

## 🌐 ACESSAR A PLATAFORMA

Após iniciar o servidor, acesse:

| Página | URL |
|--------|-----|
| 🏠 Home | http://localhost:3000 |
| 🔐 Login | http://localhost:3000/login |
| 📝 Registrar | http://localhost:3000/register |
| 📊 Dashboard | http://localhost:3000/dashboard |
| 🏢 Registrar Empresa | http://localhost:3000/companies |
| 📢 Editais | http://localhost:3000/editals |
| 🎓 Cursos | http://localhost:3000/courses |

### 🔑 Credenciais Teste
```
Email:  admin@exemplo.com
Senha:  123456
```

---

## 📁 O QUE ESTÁ EM CADA PASTA

### 🔧 BACKEND (`backend/`)
Servidor Express.js com APIs e lógica de negócio
```
- backendexpandido.js  ⭐ Principal (15+ rotas)
- backendbase.js       Alternativo (básico)
- backend.py           Python (backup)
- seed-data.js         Dados iniciais
```

### 🎨 FRONTEND (`frontend/`)
Interface do usuário - 14 páginas HTML responsivas
```
- index.html              🏠 Página inicial
- login.html              🔐 Autenticação
- dashboard-new.html      📊 Dashboard principal
- companies-register.html 🏢 Formulário empresa
- editals.html            📢 Editais com matching
- courses.html            🎓 Cursos
+ 8 mais...
```

### 💾 DADOS (`dados/`)
9 arquivos JSON com dados persistentes
```
- users.json              👥 Usuários
- companies.json          🏢 Empresas
- courses.json            🎓 Cursos
- editals.json            📢 Editais
- applications.json       📋 Candidaturas
+ 4 mais...
```

### 📚 DOCUMENTAÇÃO (`documentacao/`)
9 arquivos markdown (2600+ linhas)
```
- README.md               Documentação principal
- COMECE-AQUI.md          ⭐ Guia 5 minutos
- GUIA-USO.md             Tutorial completo
- TECNICO.md              Detalhos técnicos
+ 5 mais...
```

### ⚙️ CONFIGURAÇÃO (`configuracao/`)
Setup do projeto
```
- package.json            📦 Dependências Node.js
- requirements.txt        🐍 Dependências Python
- bancodedados.sql        🗄️ Schema SQL (futuro)
```

---

## 🤖 ALGORITMOS & FUNCIONALIDADES

### ✨ Principais Algoritmos
- **RecommendationEngine**: Recomenda cursos por tipo de empresa × estágio de desenvolvimento
- **Edital Matching**: Calcula score de compatibilidade 0-1000 para cada edital
- **Gamification**: Sistema de pontos (0-1000 = níveis 1-10)

### 🎯 Funcionalidades Core
- ✅ Autenticação JWT (24 horas)
- ✅ Registro de empresa (4 passos)
- ✅ Base de editais com filtros
- ✅ Plataforma de cursos
- ✅ Sessões de mentoria
- ✅ Dashboard com KPIs
- ✅ Sistema de pontuação

---

## 📊 ESTATÍSTICAS DO PROJETO

```
📊 Arquivos:
  - 🔧 Backend:      4 arquivos (400+ linhas)
  - 🎨 Frontend:     14 páginas HTML (3000+ linhas)
  - 💾 Dados:        9 arquivos JSON
  - 📚 Documentação: 9 arquivos MD (2600+ linhas)
  - ⚙️  Configuração: 4 arquivos
  ━━━━━━━━━━━━━━━━━━━━━━━━
  📈 Total:          40+ arquivos, 7400+ linhas de código

🎯 Funcionalidades:
  ✅ 15+ rotas de API
  ✅ 3 algoritmos IA/ML
  ✅ 10 tipos de empresa
  ✅ 5 estágios de desenvolvimento
  ✅ 8+ editais
  ✅ 10+ cursos
  ✅ 3+ mentores
  ✅ 100% responsivo
  ✅ 10 níveis de gamification
```

---

## 🔧 TROUBLESHOOTING

### ❌ "Servidor não inicia"
```powershell
# 1. Verificar Node.js
node --version

# 2. Instalar dependências
npm install

# 3. Verificar se porta 3000 está livre
netstat -ano | findstr :3000

# 4. Matar processo na porta 3000
taskkill /PID <PID> /F
```

### ❌ "Páginas não carregam"
- Confirmar servidor rodando em http://localhost:3000
- Verificar Console (F12) por erros
- Ver arquivo `documentacao/GUIA-USO.md`

### ❌ "Dados não salvam"
- Verificar pasta `dados/` existe e tem permissão
- Ver logs do servidor para erros

---

## 📖 DOCUMENTAÇÃO COMPLETA

Para explorar em profundidade:

| Documento | Para Quem | Tempo |
|-----------|-----------|-------|
| [COMECE-AQUI.md](documentacao/COMECE-AQUI.md) | Iniciantes | 5 min |
| [GUIA-USO.md](documentacao/GUIA-USO.md) | Usuários | 20 min |
| [TECNICO.md](documentacao/TECNICO.md) | Developers | 30 min |
| [ESTRUTURA-PROJETO.md](ESTRUTURA-PROJETO.md) | Arquitetos | 10 min |
| [MAPA-VISUAL.md](documentacao/MAPA-VISUAL.md) | Visualizadores | 15 min |

---

## 🚀 PRÓXIMOS PASSOS

### Imediato
- [ ] Iniciar servidor
- [ ] Acessar http://localhost:3000
- [ ] Fazer login (admin@exemplo.com / 123456)
- [ ] Testar cada página

### Curto Prazo (Esta Semana)
- [ ] Customizar dados para seu use case
- [ ] Testar APIs com Postman/Insomnia
- [ ] Revisar algoritmos em `TECNICO.md`

### Médio Prazo (Este Mês)
- [ ] Implementar bcrypt para passwords
- [ ] Adicionar email verification
- [ ] Criar admin dashboard

### Longo Prazo (Próximos Meses)
- [ ] Migrar para PostgreSQL
- [ ] Implementar Redis cache
- [ ] Deploy em produção
- [ ] App mobile (React Native)

---

## 💡 DICAS

### Para Developers
- Backend principal: `backend/backendexpandido.js`
- Adicionar nova rota? Ver linhas 300+ do backend
- Algoritmos? Ver classe `RecommendationEngine` (linhas 60-150)

### Para Designers
- CSS está inline nos HTML
- Design responsivo com CSS Grid/Flexbox
- Cores: Vermelho (#ff6b6b), Roxo (#667eea)

### Para Product Managers
- Dados estão em `dados/` (fácil editar)
- KPIs em `dashboard-new.html`
- Gamification em `user_scores.json`

---

## 📞 CONTATO & SUPORTE

- 📖 Guia: Ver `documentacao/`
- 🐛 Bug: Verificar Console (F12)
- ❓ Dúvida: Ler `GUIA-USO.md`
- 🔧 Técnico: Consultar `TECNICO.md`

---

## ✅ CHECKLIST PRÉ-APRESENTAÇÃO

- [ ] Servidor rodando sem erros
- [ ] Todas as páginas carregam
- [ ] Login funciona
- [ ] Empresa registra
- [ ] Editais carregam com matching
- [ ] Cursos mostram recomendações
- [ ] Dashboard mostra KPIs
- [ ] Documentação revisada
- [ ] Dados testados
- [ ] Preparado para demo

---

**Desenvolvido para o Hackathon de Empreendedorismo da Mulher** 💪  
**Última atualização: Março 2026**  
**Status: ✅ PRONTO PARA HACKATHON**

---

### 🎯 LEMBRE-SE
> Este projeto está organizado para **crescer com você**. Cada pasta tem seu propósito específico, facilitando manutenção, colaboração e expansão. Bem-vindo! 🚀
