# 🗺️ Índice de Navegação - Encontre o Que Precisa Rápido

## 📚 Documentação - Por Tipo de Leitor

### 👶 "Sou Iniciante, Por Onde Começo?"
1. **COMECE-AQUI.md** ⚡ (5 min)
   - 3 passos para iniciar
   - Credenciais de teste
   - Exemplos de uso

2. **GUIA-USO.md** 📖 (20 min)
   - Tutorial completo
   - Cada funcionalidade explicada
   - Passo a passo
   - FAQ

### 👨‍💻 "Sou Desenvolvedor, Quero Estender"
1. **TECNICO.md** 🔧 (30 min)
   - Arquitetura completa
   - Algoritmos em detalhe
   - Como adicionar features
   - Migration guides

2. **README.md** 📋 (Referência)
   - API endpoints
   - Stack técnico
   - Segurança
   - Roadmap

### 📊 "Quero Visão Geral Rápida"
1. **SUMARIO.md** 📈 (10 min)
   - O que foi criado
   - Funcionalidades
   - Estatísticas
   - Próximos passos

---

## 🎯 Encontre por Tópico

### Iniciando o Servidor
```bash
node backendexpandido.js
# URL: http://localhost:3000
# Veja: COMECE-AQUI.md
```

### Registrar Empresa
- **Página**: /companies
- **Arquivo**: companies-register.html
- **Como**: GUIA-USO.md > Registrar Empresa

### Editais de Financiamento
- **Página**: /editals
- **Arquivo**: editals.html
- **Algoritmo**: Match Score em TECNICO.md

### Cursos e Aprendizado
- **Página**: /courses
- **Arquivo**: courses.html
- **Recomendações**: RecommendationEngine em TECNICO.md

### Mentorias
- **Página**: /dashboard (Abas)
- **Arquivo**: dashboard-new.html
- **API**: POST /api/mentoring/schedule

### Gamificação e Pontos
- **Visão**: Dashboard
- **Algoritmo**: TECNICO.md > Pontuação
- **Dados**: user_scores.json

### Autenticação
- **Login**: /login (login.html)
- **Registro**: /register (register.html)
- **Fluxo**: JWT em TECNICO.md

---

## 📁 Arquivos Agrupados por Função

### 🔐 Autenticação
- login.html
- register.html
- backendexpandido.js (rotas /login, /register)

### 🏢 Empresas
- companies-register.html
- companies.json
- backendexpandido.js (rotas /api/companies)

### 💰 Editais
- editals.html
- editals.json
- backendexpandido.js (rotas /api/editals)

### 📚 Cursos
- courses.html
- courses.json
- backendexpandido.js (rotas /api/courses)

### 📊 Dashboard
- dashboard-new.html
- backendexpandido.js (GET /dashboard, stats)

### 🎯 Recomendações
- RecommendationEngine em backendexpandido.js
- TECNICO.md > Algoritmos
- APIs: /api/recommendations/*

### 🏆 Gamificação
- user_scores.json
- calculateUserScore em backendexpandido.js
- Dashboard mostra progresso

### 📖 Documentação
- README.md (Técnica)
- GUIA-USO.md (Uso)
- TECNICO.md (Desenvolvimento)
- COMECE-AQUI.md (Quick start)
- SUMARIO.md (Visão geral)
- Este arquivo (Índice)

---

## 🔍 Buscar por Palavra-Chave

### "Como registro uma empresa?"
→ GUIA-USO.md > Registrar Empresa

### "Como funciona o match score?"
→ TECNICO.md > RecommendationEngine

### "Como gano pontos?"
→ TECNICO.md > Gamificação
→ GUIA-USO.md > Recursos

### "Como estendo com novo edital?"
→ TECNICO.md > Como Estender > Adicionar Novo Edital

### "Como migro para PostgreSQL?"
→ TECNICO.md > Migração para PostgreSQL

### "Qual é a estrutura de dados?"
→ TECNICO.md > Estrutura de Dados
→ README.md > Endpoints da API

### "Como faço deploy?"
→ TECNICO.md > Escalabilidade (planning)
→ README.md > TODO

### "Encontrei um bug!"
→ COMECE-AQUI.md > Problemas Comuns

---

## 🎓 Tutorial Passo a Passo

### Primeiro Acesso (5 min)
1. COMECE-AQUI.md: "Em 3 Passos"
2. Abrir http://localhost:3000
3. Clicar em "Registrar"

### Usar Plataforma (15 min)
1. GUIA-USO.md: "Quick Start"
2. Registrar empresa
3. Ver recomendações
4. Fazer um curso

### Entender Arquitetura (30 min)
1. README.md: "Arquitetura"
2. TECNICO.md: "Arquitetura da Solução"
3. backendexpandido.js: estudar código

### Adicionar Funcionalidade (1h)
1. TECNICO.md: "Como Estender"
2. Escolher o que adicionar
3. Modificar arquivos
4. Testar

---

## 📞 Troubleshooting Rápido

| Problema | Solução | Documento |
|----------|---------|-----------|
| Servidor não inicia | Matar processo Node | COMECE-AQUI.md > Problemas |
| Esqueci credenciais | Usar admin@exemplo.com | README.md > Credenciais |
| Edital não aparece | Refreshar página | GUIA-USO.md > Editais |
| Pontos não contam | Fazer logout/login | TECNICO.md > Gamificação |
| Banco de dados ruim | Rodar seed-data.js | README.md > Instalação |

---

## 🚀 Roadmap de Leitura

### Para Hackathon (1h)
```
1. COMECE-AQUI.md (5 min)
2. GUIA-USO.md - seções principais (20 min)
3. Explorar interface (20 min)
4. Ler SUMARIO.md (15 min)
```

### Para Desenvolvimento (3h)
```
1. README.md completo (30 min)
2. TECNICO.md - Arquitetura (45 min)
3. Estudar backendexpandido.js (45 min)
4. TECNICO.md - Como Estender (30 min)
5. Praticar com código (30 min)
```

### Para Produção (1 dia)
```
1. Ler Segurança em README.md (1h)
2. TECNICO.md - Melhorias (1h)
3. Configurar PostgreSQL (2h)
4. Deploy e testes (3h)
```

---

## 📊 Mapa Mental

```
PLATAFORMA
├── FRONTEND
│   ├── Páginas HTML (7)
│   │   ├── Login/Register
│   │   ├── Dashboard
│   │   ├── Empresas (NOVO!)
│   │   ├── Editais (NOVO!)
│   │   └── Cursos (NOVO!)
│   ├── Estilos CSS
│   │   ├── Gradientes
│   │   ├── Responsividade
│   │   └── Animações
│   └── JavaScript
│       ├── API calls
│       └── UI interactions
│
├── BACKEND
│   ├── Express.js
│   │   ├── Rotas (15+)
│   │   └── Middleware
│   ├── Autenticação JWT
│   ├── RecommendationEngine
│   └── APIs (8 groups)
│
├── DADOS
│   ├── JSON Files (8)
│   │   ├── users
│   │   ├── companies
│   │   ├── editals
│   │   ├── courses
│   │   └── ...
│   └── Seed data
│
└── DOCUMENTAÇÃO
    ├── README.md (Técnica)
    ├── GUIA-USO.md (Uso)
    ├── TECNICO.md (Dev)
    ├── COMECE-AQUI.md (Start)
    ├── SUMARIO.md (Overview)
    └── INDICE.md (Este arquivo)
```

---

## 🎯 URLs Rápidas

| Página | URL | O Quê |
|--------|-----|-------|
| Home | http://localhost:3000 | Landing |
| Login | http://localhost:3000/login | Autenticação |
| Register | http://localhost:3000/register | Novo cadastro |
| Dashboard | http://localhost:3000/dashboard | Painel principal |
| Empresas | http://localhost:3000/companies | Registrar empresa |
| Editais | http://localhost:3000/editals | Oportunidades |
| Cursos | http://localhost:3000/courses | Plataforma learning |

---

## 💾 Arquivos de Dados

| Arquivo | Propósito | Estrutura |
|---------|-----------|-----------|
| users.json | Usuárias | {id, email, password, name, ...} |
| companies.json | Empresas | {id, userEmail, name, type, ...} |
| editals.json | Editais | {id, title, amount, targetTypes, ...} |
| courses.json | Cursos | {id, title, instructor, ...} |
| user_scores.json | Pontuação | {email, score, level} |
| applications.json | Candidaturas | {id, userEmail, editalId, ...} |
| mentoring_sessions.json | Mentorias | {id, userEmail, mentorId, ...} |
| questionnaires.json | Questionários | {id, email, name, age, ...} |

---

## 🔧 Stack por Componente

| Componente | Stack | Arquivo |
|-----------|-------|---------|
| Recomendação Cursos | JS OOP | backendexpandido.js |
| Scoring Editais | Algoritmo | TECNICO.md |
| Gamificação | JavaScript | user_scores.json |
| Autenticação | JWT | backendexpandido.js |
| UI/UX | HTML+CSS | *.html |
| API REST | Express | backendexpandido.js |

---

## 🎓 Vocabulário Rápido

- **JWT**: Token de autenticação
- **Edital**: Oportunidade de financiamento
- **Match Score**: Compatibilidade em %
- **Gamificação**: Sistema de pontos/níveis
- **RecommendationEngine**: Algoritmo de recomendação
- **Middleware**: Função que processa requisições
- **REST API**: Interface de comunicação
- **MVP**: Mínimo Produto Viável

---

## ✅ Checklist de Uso

Para começar:
- [ ] Ler COMECE-AQUI.md (5 min)
- [ ] Iniciar servidor
- [ ] Criar conta
- [ ] Explorar dashboard
- [ ] Registrar empresa
- [ ] Ver recomendações

Para desenvolver:
- [ ] Ler TECNICO.md
- [ ] Entender RecommendationEngine
- [ ] Estudar backendexpandido.js
- [ ] Praticar adicionando feature
- [ ] Testar mudanças

Para produção:
- [ ] Implementar bcrypt
- [ ] Adicionar HTTPS
- [ ] Migrar para PostgreSQL
- [ ] Implementar email verification
- [ ] Deploy em servidor

---

## 📌 Atalhos Principais

### Iniciar em 3 linhas
```powershell
cd projeto\ hackathon
npm install
node backendexpandido.js
```

### Entrar como Admin
- Email: admin@exemplo.com
- Senha: 123456

### Popular Dados
```powershell
node seed-data.js
```

### Matar Servidor (se travar)
```powershell
Get-Process node | Stop-Process -Force
```

---

## 🎉 Pronto Para Começar?

1. **Iniciante?** → COMECE-AQUI.md
2. **Usuária?** → GUIA-USO.md
3. **Desenvolvedor?** → TECNICO.md
4. **Gerente?** → SUMARIO.md
5. **Perdido?** → Este arquivo

---

**Versão**: 1.0.0  
**Data**: 28/03/2026  
**Status**: ✅ COMPLETO  

Explore, aprenda, crie, prospere! 🚀💜👩‍💼
