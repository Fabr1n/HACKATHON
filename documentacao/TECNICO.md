# 🔧 Documentação Técnica - Arquitetura e Extensão

## 📐 Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (HTML/CSS/JS)                 │
├─────────────────────────────────────────────────────────────┤
│  Landing │ Login │ Register │ Dashboard │ Company │ Editals │
│  Courses │ Mentorias │ Recursos │ Perfil   │ Admin         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────┴────────────────────────────────────┐
│              Express.js Backend (Node.js)                   │
├─────────────────────────────────────────────────────────────┤
│ Routes │ Controllers │ Middleware │ Auth (JWT)              │
│ Algorithms │ APIs     │ Recommendations Engine               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ File I/O
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Data Layer (JSON Files)                   │
├─────────────────────────────────────────────────────────────┤
│ users.json │ companies.json │ editals.json │ courses.json   │
│ applications.json │ mentoring_sessions.json │ scores.json   │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Fluxo de Autenticação

```
1. Usuária registra (POST /register)
   ↓
2. Dados salvos em users.json
   ↓
3. Usuária faz login (POST /login)
   ↓
4. Sistema valida email/senha
   ↓
5. JWT gerado com:
   - userId
   - email
   - expiração: 24h
   ↓
6. Token retornado ao cliente
   ↓
7. Cliente armazena em localStorage
   ↓
8. Requisições futuras incluem: Authorization: Bearer {token}
   ↓
9. Middleware verifyToken valida em cada requisição protegida
```

## 🎯 Fluxo de Registro de Empresa

```
Usuária preenche form 4 etapas
         ↓
    Validação Frontend
         ↓
   Submit POST /api/companies
         ↓
   Middleware verifyToken
         ↓
   Backend valida dados
         ↓
   Salva em companies.json
         ↓
   Incrementa pontos em user_scores.json (+50)
         ↓
   Recalcula nível de usuária
         ↓
   Retorna sucesso
         ↓
   Frontend redireciona para dashboard
```

## 🤖 RecommendationEngine - Funcionamento Detalhado

### Classe: RecommendationEngine

```javascript
class RecommendationEngine {
  // Método 1: Recomendar Cursos
  static recommendCourses(company) {
    // Acessa matriz de cursos por tipo + estágio
    // Retorna array de nomes de cursos
    // Exemplo:
    // company = { type: 'tech', stage: 'launched' }
    // Retorna: ['Escalabilidade', 'Produto-Market Fit', 'Levantamento de Capital']
  }

  // Método 2: Recomendar Editais
  static recommendEditals(company, userProfile) {
    // Para cada edital no banco:
    // 1. Calcula score baseado em múltiplos fatores
    // 2. Adiciona pontos por compatibilidade
    // 3. Ordena por score descendente
    // 4. Retorna top 5
    // Sistema de scoring:
    // - type match: +30 pts (se tipo está em targetTypes)
    // - stage match: +25 pts (se estágio está em targetStages)
    // - revenue match: +20 pts (se faturamento >= minRevenue)
    // - revenue match: +20 pts (se faturamento <= maxRevenue)
    // - region match: +15 pts (se estado está em regions)
    // - special req: +10 pts (se há requisitos especiais)
  }

  // Método 3: Calcular Score de Usuária
  static calculateUserScore(userEmail) {
    // Calcula pontos totais de uma usuária
    // Base: 10 pts (perfil)
    // Por empresa: +50 pts
    // Por edital aplicado: +30 pts
    // Por questionário: +20 pts
    // Máximo: 1000 pts
    // Nível: floor(score / 100) + 1
  }
}
```

### Matriz de Tipos e Estágios (Tech)

```javascript
courseDatabase = {
  tech: {
    idea: [
      'Validação de Ideia Tech',
      'MVP - Desenvolvimento',
      'Pitch para Investidores'
    ],
    'pre-launch': [
      'Go-to-Market Tech',
      'Tração Inicial',
      'Proteção de IP'
    ],
    launched: [
      'Escalabilidade',
      'Produto-Market Fit',
      'Levantamento de Capital'
    ],
    growing: [
      'Liderança em Tech',
      'Internacionalização',
      'M&A Preparação'
    ],
    established: [
      'Inovação Contínua',
      'Transformação Digital',
      'ESG em Tech'
    ]
  }
}
```

## 📡 Endpoints da API Completa

### Autenticação
```
POST /register
Body: { email, password, name?, age? }
Response: { success, message }

POST /login
Body: { email, password }
Response: { success, token, userEmail }
```

### Empresas
```
GET /api/companies
Headers: Authorization: Bearer {token}
Response: [{ id, userEmail, name, type, stage, ... }]

POST /api/companies
Headers: Authorization: Bearer {token}
Body: { name, cnpj?, type, stage, revenue?, employees?, description }
Response: { success, company }
```

### Recomendações
```
GET /api/recommendations/courses
Headers: Authorization: Bearer {token}
Response: { courses: [string, string, ...] }

GET /api/recommendations/editals
Headers: Authorization: Bearer {token}
Response: { editals: [{ id, title, amount, ... }, ...] }
```

### Editais
```
GET /api/editals
Response: [{ id, title, organization, ... }]

POST /api/editals/apply
Headers: Authorization: Bearer {token}
Body: { editalId }
Response: { success, application }
```

### Cursos
```
POST /api/courses/enroll
Headers: Authorization: Bearer {token}
Body: { courseTitle }
Response: { success, enrollment }
```

### Mentorias
```
POST /api/mentoring/schedule
Headers: Authorization: Bearer {token}
Body: { mentorId, date, time }
Response: { success, session }
```

### Perfil
```
GET /api/user/profile
Headers: Authorization: Bearer {token}
Response: { user: {...}, score: {...} }

GET /api/user/dashboard-stats
Headers: Authorization: Bearer {token}
Response: { companiesCount, coursesCount, ... }
```

### Admin
```
GET /api/admin/analytics
Headers: Authorization: Bearer {token}
Response: { totalUsers, totalCompanies, averageScore, topUsers }
```

## 🔒 Segurança - Estado Atual

### ✅ Implementado
- Tokens JWT com expiração
- Verificação de token em rotas protegidas
- CORS habilitado
- Body parser para validação de JSON

### ⚠️ TODO (Crítico)
- [ ] Hash de senhas (bcrypt)
- [ ] Rate limiting nas APIs
- [ ] Validação de entrada mais rigorosa
- [ ] HTTPS/SSL em produção
- [ ] Email verification (SMTP)
- [ ] Refresh tokens

### ❌ Não Implementado (Futuro)
- 2FA / Multi-factor authentication
- OAuth2 (login com Google, LinkedIn)
- Criptografia de dados sensíveis
- Auditoria de logs
- Backup automático

## 🚀 Como Estender

### 1. Adicionar Novo Tipo de Empresa

#### Arquivo: backendexpandido.js
```javascript
// Na classe RecommendationEngine, adicione em courseDatabase:
healthcare: {
  idea: ['Regulação em Saúde', 'Análise de Mercado'],
  'pre-launch': ['Certificações', 'Parcerias'],
  // ... etc
}
```

#### Arquivo: companies-register.html
```html
<!-- No select companyType, adicione: -->
<option value="healthcare">🏥 Saúde / Wellness</option>
```

#### Arquivo: editals.html
```javascript
// Atualize array targetTypes nos editais que aceitam:
targetTypes: ['healthcare', 'tech', ...]
```

### 2. Adicionar Novo Edital

#### Arquivo: backendexpandido.js (ou editals.html)
```javascript
const newEdital = {
  id: 9,
  title: "Edital Novo Programa",
  organization: "Órgão Responsável",
  description: "Descrição do edital",
  amount: 250000,
  targetTypes: ['tech', 'fashion'],
  minRevenue: 0,
  maxRevenue: 2000000,
  deadline: "2026-12-31",
  status: "open",
  requirements: "Requisitos específicos"
};
// Adicionar ao array editalDatabase
```

### 3. Adicionar Novo Curso

#### Arquivo: courses.html
```javascript
const newCourse = {
  id: 11,
  title: "Novo Curso Incrível",
  instructor: "Nome Instrutor",
  description: "Descrição do curso",
  level: "intermediate",
  category: "business",
  duration: "8 semanas",
  price: 199,
  students: 1500,
  rating: 4.9,
  icon: "🎯",
  tags: ["Tag1", "Tag2"],
  modules: 16
};
// Adicionar ao array coursesDatabase
```

### 4. Adicionar Nova Mentora

#### Arquivo: backendexpandido.js
```javascript
const newMentor = {
  id: 4,
  name: "Nova Mentora",
  expertise: "Seu Conhecimento",
  background: "Sua história profissional",
  availability: "Disponível",
  specialty: "categoria"
};
// Adicionar ao array mentors
```

## 🗄️ Migração para PostgreSQL

### Passo 1: Instalar dependências
```bash
npm install pg sequelize
```

### 2: Criar connection
```javascript
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});
```

### 3: Definir modelos
```javascript
const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  name: DataTypes.STRING
});
```

### 4: Remover readData/writeData
Substituir chamadas JSON por sequelize queries

### 5: Schema SQL
Ver arquivo `bancodedados.sql`

## 🔧 Melhorias de Performance

### Caching
```javascript
// Adicionar memoização
const cache = new Map();

function getCourses(type, stage) {
  const key = `${type}-${stage}`;
  if (cache.has(key)) return cache.get(key);
  
  const courses = RecommendationEngine.recommendCourses({type, stage});
  cache.set(key, courses);
  return courses;
}
```

### Compressão
```javascript
const compression = require('compression');
app.use(compression());
```

### Paginação na API
```javascript
// GET /api/companies?page=1&limit=20
const page = req.query.page || 1;
const limit = req.query.limit || 20;
const start = (page - 1) * limit;
const items = data.slice(start, start + limit);
```

## 📈 Escalabilidade

### Próximo Passo: Redis Cache
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache de recomendações
app.get('/api/recommendations/courses', verifyToken, (req, res) => {
  const cacheKey = `courses:${req.user.userId}`;
  
  client.get(cacheKey, (err, data) => {
    if (data) return res.json(JSON.parse(data));
    
    // Se não estiver em cache, calcular
    const courses = RecommendationEngine.recommendCourses(...);
    client.setex(cacheKey, 3600, JSON.stringify(courses));
    res.json({ courses });
  });
});
```

### Implementar Message Queue
```javascript
// Para enviar emails assincronamente
const Queue = require('bull');
const emailQueue = new Queue('email', 'redis://localhost:6379');

emailQueue.process(async (job) => {
  // Enviar email
});

// Quando registrar
emailQueue.add({ email: user.email, type: 'welcome' });
```

## 🧪 Testes

### Teste de Recomendações
```javascript
// test/recommendations.test.js
const test = require('assert');
const RE = require('../RecommendationEngine');

test('Tech + Idea recomenda corretamente', () => {
  const company = { type: 'tech', stage: 'idea' };
  const courses = RE.recommendCourses(company);
  test.ok(courses.includes('Validação de Ideia Tech'));
});
```

### Teste de API
```javascript
// test/api.test.js
const fetch = require('node-fetch');

test('POST /login retorna token', async () => {
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({email: 'test@test.com', password: 'pass123'})
  });
  const data = await res.json();
  test.ok(data.token);
});
```

## 📊 Monitoramento

### Winston Logger
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usar em rota
app.post('/login', (req, res) => {
  try {
    // logica
    logger.info(`Login bem-sucedido: ${email}`);
  } catch (err) {
    logger.error(`Erro no login: ${err.message}`);
  }
});
```

## 🎓 Recursos para Aprender

### Conceitos-chave
- Autenticação JWT: https://jwt.io
- Express.js: https://expressjs.com
- REST APIs: https://restfulapi.net
- Node.js: https://nodejs.org/docs

### Próximas Tecnologias
- PostgreSQL: https://www.postgresql.org
- Redis: https://redis.io
- Docker: https://www.docker.com
- Kubernetes: https://kubernetes.io

---

**Versão**: 1.0.0  
**Atualizado**: 28/03/2026  
**Arquitetura**: MVC + REST API  
**Database**: JSON → PostgreSQL (migração planejada)
