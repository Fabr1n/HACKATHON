# 🚀 Plataforma de Empreendedorismo Feminino

Uma plataforma completa e profissional para apoiar mulheres empreendedoras no Brasil, integrando funcionalidades de registro de empresas, acesso a editais, cursos e mentorias.

## 📋 Visão Geral

Este projeto foi desenvolvido para hackathon com o objetivo de criar um ecossistema digital para mulheres empreendedoras, oferecendo:

- 👩‍💼 **Registro de Empresas** - Cadastro detalhado de empresas com classificação inteligente
- 📊 **Dashboard Analítico** - Visão geral do progresso e oportunidades
- 📚 **Plataforma de Cursos** - Com algoritmo de recomendação baseado em perfil
- 📄 **Editais e Oportunidades** - Acesso a financiamentos e programas especiais
- 🎯 **Sistema de Mentorias** - Conexão com mentoras experientes
- 🏆 **Gamificação** - Pontos, níveis e reconhecimento de progresso

## 🛠️ Arquitetura Técnica

### Backend
- **Framework**: Express.js (Node.js v24.12.0)
- **Autenticação**: JWT (JSON Web Tokens) com expirração 24h
- **Persistência**: JSON Files (simulando banco de dados)
- **Middleware**: CORS, Body-Parser

### Frontend
- **HTML5** com semântica e acessibilidade
- **CSS3** com gradientes, animações e design responsivo
- **JavaScript Vanilla** com Fetch API
- **Font Awesome 6.0.0** para ícones
- **Google Fonts** (Roboto)

### Estrutura de Dados
```
users.json                 # Usuárias registradas
companies.json            # Empresas cadastradas
questionnaires.json       # Questionários completos
courses.json              # Cursos e matrículas
editals.json              # Editais disponíveis
applications.json        # Candidaturas a editais
mentoring_sessions.json   # Sessões de mentoria agendadas
user_scores.json          # Pontuação e níveis dos usuários
```

## 🎯 Funcionalidades Principais

### 1. Autenticação e Perfil
- Registro com validação de email
- Login com geração de JWT
- Perfil de usuária com progresso
- Gamificação com pontos e níveis

### 2. Registro de Empresas
- Formulário multi-etapas (4 seções)
- Tipos: Tech, Moda, Alimentos, Beleza, Consultoria, Serviços, Educação, Varejo, Saúde, Outro
- Estágios: Ideia, Pré-lançamento, Lançada, Em crescimento, Consolidada
- Análise inteligente de tipo e estágio
- Descrições contextuais para cada tipo

### 3. Sistema de Recomendações AI
**Algoritmo RecommendationEngine**:

#### Recomendação de Cursos
```
courseDatabase[companyType][companyStage]
```
- Recomenda cursos específicos baseado em tipo e estágio da empresa
- Ex: Startup Tech → "MVP - Desenvolvimento", "Tração Inicial", "Proteção de IP"

#### Recomendação de Editais
```
Score = 30 (tipo) + 25 (estágio) + 20 (receita min) + 20 (receita max) + 15 (região) + 10 (setor especial)
```
- Até 1000 pontos de compatibilidade
- Filtra por tipo, estágio, faturamento, região e requisitos especiais
- Ordena por score (relevância)

### 4. Editais e Oportunidades
- 8+ editais pré-cadastrados
- Filtros por setor, valor mínimo e status
- Cálculo automático de dias até deadline
- Indicador de compatibilidade (match score)
- Aplicação direta via interface

### 5. Plataforma de Cursos
- 10+ cursos disponíveis
- Filtros por nível (Iniciante/Intermediário/Avançado)
- Categorias: Negócios, Marketing, Finanças, Tecnologia, Liderança
- Avaliações e número de alunos
- Abas: Para Você, Todos, Em Progresso, Completados
- Certificados para cursos finalizados

### 6. Sistema de Mentorias
- 3+ mentoras com perfis profissionais
- Especialidades: Tech, Marketing, Finanças
- Agendamento de sessões
- Histórico de mentorias

### 7. Dashboard Personalizado
- KPIs: Empresas, Cursos, Editais, Aplicações
- Progresso geral (45%)
- Próximos passos
- Acesso rápido a funcionalidades

## 📁 Estrutura de Arquivos

```
projeto hackathon/
├── backendexpandido.js          # Servidor Express (USAR ESTE!)
├── index.html                   # Landing page
├── login.html                   # Página de login
├── register.html                # Página de registro
├── dashboard-new.html           # Dashboard principal
├── companies-register.html      # Registro de empresas (NOVO!)
├── editals.html                 # Editais e oportunidades (NOVO!)
├── courses.html                 # Plataforma de cursos (NOVO!)
├── questionnaire.html           # Questionário original
├── seed-data.js                 # Script para popular dados
├── package.json                 # Dependências NPM
├── users.json                   # Dados de usuárias
├── companies.json               # Dados de empresas
├── editals.json                 # Dados de editais
├── courses.json                 # Dados de cursos
└── README.md                    # Este arquivo

```

## 🚀 Como Usar

### 1. Instalação

```bash
cd "c:\Users\jessi\OneDrive\Desktop\projeto hackathon"
npm install express body-parser cors jsonwebtoken
```

### 2. Popular Dados Iniciais

```bash
node seed-data.js
```

### 3. Iniciar Servidor

```bash
node backendexpandido.js
```

O servidor rodará em `http://localhost:3000`

### 4. Acessar a Plataforma

1. Abra `http://localhost:3000` no navegador
2. Clique em "Registrar" ou "Iniciar Questionário"
3. Crie uma conta
4. Faça login
5. Acesse o dashboard e registre sua empresa
6. Explore cursos, editais e mentorias

## 📊 Endpoints da API

### Autenticação
- `POST /register` - Registrar nova usuária
- `POST /login` - Fazer login e obter JWT

### Empresas
- `GET /api/companies` - Listar empresas da usuária
- `POST /api/companies` - Registrar nova empresa

### Recomendações
- `GET /api/recommendations/courses` - Cursos recomendados
- `GET /api/recommendations/editals` - Editais recomendados

### Editais
- `GET /api/editals` - Listar todos editais
- `POST /api/editals/apply` - Candidatar a edital

### Cursos
- `POST /api/courses/enroll` - Matricular em curso

### Mentorias
- `POST /api/mentoring/schedule` - Agendar sessão

### Perfil
- `GET /api/user/profile` - Dados do perfil
- `GET /api/user/dashboard-stats` - Estatísticas do dashboard

### Admin
- `GET /api/admin/analytics` - Analytics gerais

## 🎨 Design e UX

### Paleta de Cores
- **Principal**: Vermelho/Rosa (#ff6b6b, #ee5a24)
- **Secundária**: Roxo (#667eea, #764ba2)
- **Neutros**: Cinza claro, branco

### Tipografia
- **Font**: Roboto (Google Fonts)
- **Pesos**: 300 (light), 400 (regular), 700 (bold)

### Responsividade
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

### Componentes Reutilizáveis
- Cartões (cards)
- Botões (primário, secundário)
- Filtros
- Modais
- Barras de progresso
- Badges e labels

## 🤖 Algoritmos Inteligentes

### 1. Recomendação de Cursos
Baseado em matriz tipo-estágio de empresa:
```
Tech + Ideia → Validação, MVP, Pitch
Fashion + Lançada → Varejo, Marketing, Sustentabilidade
Food + Em crescimento → Escalabilidade, Franquias
...
```

### 2. Pontuação de Compatibilidade com Editais
Sistema de scoring com múltiplos fatores:
- Compatibilidade de tipo (30 pts)
- Compatibilidade de estágio (25 pts)
- Faixa de faturamento (40 pts)
- Localização geográfica (15 pts)
- Requisitos especiais (10 pts)

### 3. Gamificação de Usuárias
Pontos por ações:
- Perfil completo: +10
- Registrar empresa: +50
- Candidatar a edital: +30
- Completar curso: +variável
- Sessão de mentoria: +20

Níveis: 1-10 baseado em pontos (0-1000)

### 4. Análise de Tipo de Empresa
Descrições contextuais e requisitos por tipo:
- Tech: Foco em inovação, MVP, investimento
- Fashion: Tendências, produção, sustentabilidade
- Food: Regulamentação, APPCC, segurança alimentar
- Beauty: ANVISA, cosmética, tendências
- etc.

## 📈 Potencial de Crescimento

### Curto Prazo
- ✅ Autenticação robusta (bcrypt)
- ✅ Email verification (SMTP)
- ✅ Perfil editável
- ✅ Recuperação de senha

### Médio Prazo
- Banco de dados PostgreSQL/MySQL
- Integração com APIs de editais reais
- Sistema de pagamento (Stripe/PagSeguro)
- Chat com mentorias
- Blog/Recursos

### Longo Prazo
- Aplicativo mobile (React Native)
- Machine Learning para recomendações
- Marketplace de serviços
- Programas de aceleração integrados
- Comunidade e networking avançado

## 🔒 Segurança (TODO)

- [ ] Hash de senhas com bcrypt
- [ ] Rate limiting nas APIs
- [ ] HTTPS/SSL
- [ ] CORS configurado por origin
- [ ] Validação de inputs no backend
- [ ] SQL injection prevention (já seguro com JSON)
- [ ] XSS prevention

## 📝 Licença

Projeto de hackathon - Uso livre para fins educacionais

## 👥 Contribuidores

- Desenvolvido para hackathon de empreendedorismo feminino
- Comunidade de mulheres empreendedoras

## 📞 Suporte

Para sugestões ou reportar bugs, entre em contato através da plataforma ou abra uma issue no repositório.

---

**Última atualização**: 28/03/2026  
**Versão**: 1.0.0  
**Status**: ✅ Produção (Hackathon)
