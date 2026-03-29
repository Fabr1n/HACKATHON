# 🎯 REFERÊNCIA RÁPIDA - PROJETO HACKATHON

## ⚡ INICIAR SERVIDOR (Escolha uma opção)

### Opção 1: Windows Batch (MAIS FÁCIL) ⭐
```
Clique duplo em: iniciar-servidor.bat
```

### Opção 2: PowerShell
```powershell
./iniciar-servidor.ps1
```

### Opção 3: Manual
```powershell
cd backend
node backendexpandido.js
```

### Opção 4: npm
```powershell
npm start
```

---

## 🌐 ACESSAR PLATAFORMA

Após iniciar servidor:
- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login  
- **Dashboard**: http://localhost:3000/dashboard
- **Registrar Empresa**: http://localhost:3000/companies
- **Editais**: http://localhost:3000/editals
- **Cursos**: http://localhost:3000/courses

---

## 🔑 LOGIN TESTE

```
Email:  admin@exemplo.com
Senha:  123456
```

---

## 📁 ESTRUTURA EM UMA OLHADA

```
projeto hackathon/
├── backend/          ← Servidor (4 arquivos)
├── frontend/         ← Páginas (14 HTML)
├── dados/            ← JSON (9 arquivos)
├── documentacao/     ← Guias (9 MD)
├── configuracao/     ← Setup (4 arquivos)
│
├── README-INICIO.md  ← COMECE AQUI
├── ESTRUTURA-PROJETO.md
├── ARVORE-PROJETO.txt
├── MAPA-RAPIDO.html
│
└── iniciar-servidor.bat/.ps1
```

---

## 📖 LEITURA RECOMENDADA (em ordem)

1. **README-INICIO.md** (5 min)
   - Visão geral do projeto

2. **ESTRUTURA-PROJETO.md** (10 min)
   - Documentação da organização

3. **documentacao/COMECE-AQUI.md** (5 min)
   - Guia rápido de início

4. **documentacao/GUIA-USO.md** (20 min)
   - Tutorial completo

5. **documentacao/TECNICO.md** (30 min)
   - Detalhes técnicos

---

## 🚀 QUICKSTART (30 SEGUNDOS)

```bash
# 1. Abrir terminal na pasta do projeto
cd "c:\Users\jessi\OneDrive\Desktop\projeto hackathon"

# 2. Iniciar servidor
node backend/backendexpandido.js

# 3. Abrir navegador e acessar
http://localhost:3000

# 4. Fazer login
Email: admin@exemplo.com
Senha: 123456

# 5. Explorar!
```

---

## 📊 O QUE TEM EM CADA PASTA

### 🔧 backend/
- **backendexpandido.js** ⭐ (Principal - 500+ linhas)
- backendbase.js (Alternativo)
- backend.py (Python)
- seed-data.js (Dados iniciais)

### 🎨 frontend/
- **14 páginas HTML** (dashboard, companies, editals, courses, etc.)
- Totalmente responsivas
- CSS3 gradients
- JavaScript vanilla

### 💾 dados/
- **users.json** - Usuários
- **companies.json** - Empresas
- **courses.json** - Cursos (10+)
- **editals.json** - Editais (8+)
- + 5 mais arquivos

### 📚 documentacao/
- **9 arquivos markdown** (2600+ linhas)
- README, GUIA-USO, TECNICO, etc.

### ⚙️ configuracao/
- package.json
- package-lock.json
- requirements.txt
- bancodedados.sql

---

## 🎯 FUNCIONALIDADES PRINCIPAIS

✅ Autenticação JWT (24h)  
✅ Registro de empresa (4 passos)  
✅ Algoritmo de recomendação de cursos  
✅ Edital matching (score 0-100%)  
✅ Plataforma de cursos  
✅ Sessões de mentoria  
✅ Sistema de gamification (10 níveis)  
✅ Dashboard com KPIs  

---

## 🤖 ALGORITMOS IA IMPLEMENTADOS

### RecommendationEngine.recommendCourses()
Recomenda cursos baseado em:
- Tipo de empresa (10 tipos)
- Estágio de desenvolvimento (5 estágios)
- Retorna 3-5 cursos específicos

### RecommendationEngine.recommendEditals()
Score de compatibilidade 0-1000 baseado em:
- Tipo de empresa
- Estágio
- Receita
- Localização
- Critérios especiais

### RecommendationEngine.calculateUserScore()
Gamification:
- Pontos por ação (0-1000 max)
- Níveis de 1-10
- Visível no dashboard

---

## 🔗 ROTAS API PRINCIPAIS

### Auth
- POST /register
- POST /login

### Empresas
- POST /api/companies (registrar)
- GET /api/companies (listar)

### Editais
- GET /api/editals
- POST /api/editals/apply

### Cursos
- POST /api/courses/enroll
- GET /api/courses

### Mentoria
- POST /api/mentoring/schedule

### User
- GET /api/user/profile
- GET /api/user/dashboard-stats

---

## 🐛 TROUBLESHOOTING RÁPIDO

### ❌ "Servidor não inicia"
```powershell
# Verificar Node.js
node --version

# Instalar dependências
npm install

# Verificar porta 3000
netstat -ano | findstr :3000

# Matar processo na porta
taskkill /PID <PID> /F
```

### ❌ "Página em branco"
- F12 para abrir console
- Ver erro exato
- Conferir caminho em backendexpandido.js

### ❌ "Dados não salvam"
- Verificar pasta `dados/` existe
- Conferir permissões Windows
- Ver logs do servidor

---

## 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Arquivos | 40+ |
| Linhas de Código | 7400+ |
| Pastas Organizadas | 5 |
| Rotas API | 15+ |
| Algoritmos IA | 3 |
| Páginas HTML | 14 |
| Arquivos JSON | 9 |
| Linhas Documentação | 2600+ |

---

## ✅ CHECKLIST PRÉ-HACKATHON

- [ ] Servidor inicia sem erros
- [ ] Todas as páginas carregam
- [ ] Login funciona
- [ ] Empresa registra
- [ ] Editais aparecem com matching
- [ ] Cursos mostram recomendações
- [ ] Dashboard mostra KPIs
- [ ] Documentação revisada
- [ ] Dados testados
- [ ] Pronto para apresentar

---

## 💡 DICAS PROFISSIONAIS

### Para Developers
```javascript
// Algoritmos em: backend/backendexpandido.js
class RecommendationEngine {
    static recommendCourses(company) { ... }
    static recommendEditals(company, userProfile) { ... }
    static calculateUserScore(email) { ... }
}
```

### Para Designers
```html
<!-- CSS em cada página (inline) -->
<!-- Gradients: #ff6b6b → #ee5a24 (action) -->
<!-- Gradients: #667eea → #764ba2 (secondary) -->
```

### Para Product Managers
```
Customizar dados em: dados/*.json
Editar editais: dados/editals.json
Editar cursos: dados/courses.json
Ver pontuação: dados/user_scores.json
```

---

## 🎨 DESIGN SYSTEM

### Cores
- **Ação**: #ff6b6b → #ee5a24 (Vermelho/Rosa)
- **Secundário**: #667eea → #764ba2 (Roxo)
- **Destaque**: #4facfe → #00f2fe (Azul claro)
- **Sucesso**: #43e97b → #38f9d7 (Verde)

### Tipografia
- Font: Roboto (Google Fonts)
- Icons: Font Awesome 6.0.0

### Layout
- Responsivo (mobile/tablet/desktop)
- CSS Grid + Flexbox
- Breakpoints: 320px, 768px, 1024px

---

## 📞 SUPORTE RÁPIDO

| Pergunta | Resposta | Arquivo |
|----------|----------|---------|
| Como começar? | Leia README-INICIO.md | root |
| Não funciona? | Ver troubleshooting | ESTRUTURA-PROJETO.md |
| Como usar? | Ler GUIA-USO.md | documentacao/ |
| Código técnico? | Ver TECNICO.md | documentacao/ |
| Apresentar? | Usar FINAL.md | documentacao/ |

---

## 🎉 PRONTO!

Você tem:
✅ Código funcional (7400+ linhas)  
✅ Estrutura profissional (5 pastas)  
✅ Documentação completa (2600+ linhas)  
✅ Algoritmos IA (3 engines)  
✅ Design responsivo (14 páginas)  
✅ Base de dados (9 arquivos JSON)  

**Agora é só apresentar e conquistar! 🚀💪**

---

**Última atualização: Março 2026**  
**Status: ✅ PRONTO PARA HACKATHON**
