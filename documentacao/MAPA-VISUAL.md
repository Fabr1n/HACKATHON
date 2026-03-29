# 🗺️ Mapa Visual do Projeto

## Estrutura de Páginas

```
┌─────────────────────────────────────────────────────────┐
│                     PLATAFORMA                          │
│           Empreendedorismo Feminino v1.0                │
└─────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │  Landing     │ (index.html)
                    │  Page        │
                    └────┬─────────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
       ┌────────┐  ┌─────────┐  ┌──────────────┐
       │ Login  │  │Register │  │ Questionário │
       │        │  │         │  │              │
       └───┬────┘  └────┬────┘  └──────┬───────┘
           │            │              │
           └────────┬───┴──────────────┘
                    │
           ┌────────▼────────┐
           │  Dashboard      │ (dashboard-new.html)
           │  Principal      │
           └────────┬────────┘
                    │
      ┌─────────────┼─────────────────┬────────────┐
      │             │                 │            │
      ▼             ▼                 ▼            ▼
  ┌──────────┐ ┌──────────┐    ┌──────────┐  ┌──────────┐
  │ Empresas │ │ Editais  │    │ Cursos   │  │Mentorias │
  │          │ │          │    │          │  │          │
  │🏢📝✅    │ │💰🎯📋  │    │📚🎓📖  │  │👩‍💼💬🤝│
  └──────────┘ └──────────┘    └──────────┘  └──────────┘

  ┌──────────┐ ┌──────────┐    ┌──────────┐
  │ Recursos │ │ Perfil   │    │ Admin    │
  │          │ │          │    │          │
  │📄🔗📑  │ │👤💎🏆  │    │📊⚙️🔑 │
  └──────────┘ └──────────┘    └──────────┘
```

---

## Fluxo de Usuária

```
INICIANTE
    │
    ├─→ Landing Page (index.html)
    │   ├─→ Vê benefícios
    │   └─→ Clica em "Registrar"
    │
    ├─→ Registro (register.html)
    │   ├─→ Email: seu.email@
    │   ├─→ Senha: ••••••
    │   └─→ ✓ Criar Conta
    │
    ├─→ Login (login.html)
    │   ├─→ Email: seu.email@
    │   ├─→ Senha: ••••••
    │   └─→ ✓ Entrar
    │
    ├─→ Dashboard (dashboard-new.html)
    │   ├─→ Vê KPIs
    │   ├─→ Menu lateral
    │   └─→ Progresso: 45%
    │
    ├─→ Registrar Empresa (companies-register.html)
    │   ├─→ Etapa 1: Informações Básicas
    │   ├─→ Etapa 2: Tipo e Estágio
    │   ├─→ Etapa 3: Financeiro
    │   ├─→ Etapa 4: Descrição
    │   └─→ ✓ Salvar
    │
    ├─→ Cursos Recomendados (courses.html)
    │   ├─→ "Para Você" → Recomendações baseadas em perfil
    │   ├─→ "Todos" → Catalogo completo com filtros
    │   ├─→ Matricular em curso
    │   └─→ Ganhar +25 pontos
    │
    ├─→ Editais Compatíveis (editals.html)
    │   ├─→ Ver 8+ oportunidades
    │   ├─→ Match Score: 85% ✨
    │   ├─→ Candidatar-se
    │   └─→ Ganhar +30 pontos
    │
    ├─→ Agendar Mentoria
    │   ├─→ Escolher mentora
    │   ├─→ Data e hora
    │   └─→ Ganhar +20 pontos
    │
    └─→ EMPREENDEDORA CONFIRMADA! 🚀
        Total: 150+ pontos
        Nível: 2 ⭐
        Próximo: 250 pts = Nível 3
```

---

## Algoritmo de Recomendação de Cursos

```
ENTRADA: Empresa { type, stage }
           │
           ▼
    ┌──────────────────────┐
    │ RecommendationEngine │
    │ .recommendCourses()  │
    └──────────┬───────────┘
               │
    ┌──────────▼──────────┐
    │ Buscar na Matriz:   │
    │ courseDatabase      │
    │ [type][stage]       │
    └──────────┬──────────┘
               │
    Tech + Idea:
    ├─→ Validação de Ideia Tech
    ├─→ MVP - Desenvolvimento
    └─→ Pitch para Investidores
    
    Fashion + Lançada:
    ├─→ Varejo Moda
    ├─→ E-commerce Fashion
    └─→ Influencer Marketing
    
    Food + Consolidada:
    ├─→ Inovação Menu
    ├─→ Sustentabilidade Ambiental
    └─→ Exportação
               │
               ▼
    SAÍDA: Array de 3-5 cursos ✓
```

---

## Algoritmo de Match Score com Editais

```
ENTRADA: Empresa + Edital
    │
    ├─ Compatibilidade Tipo:        +30 pts ✓
    │
    ├─ Compatibilidade Estágio:     +25 pts ✓
    │
    ├─ Faixa Receita Mínima:        +20 pts ✓
    │
    ├─ Faixa Receita Máxima:        +20 pts ✓
    │
    ├─ Localização (UF):            +15 pts ✗
    │
    └─ Requisitos Especiais:        +10 pts ✓
                                    ─────────
                                    120 pts = 120%
                                    (capped at 100%)
                                    │
                                    ▼
    SAÍDA: 85% Match Score 🟢 Muito Compatível!
```

---

## Gamificação - Sistema de Pontos

```
AÇÕES E PONTOS:

┌─────────────────────────────────────────────────┐
│ Ação                              │ Pontos      │
├─────────────────────────────────────────────────┤
│ Perfil Completo                   │ +10         │
│ Registrar Empresa                 │ +50         │
│ Candidatar a Edital               │ +30         │
│ Matricular em Curso               │ +25-50      │
│ Agendar Mentoria                  │ +20         │
│ Completar Curso                   │ +50-100     │
│ Completar Edital com sucesso      │ +200        │
└─────────────────────────────────────────────────┘

PROGRESSÃO DE NÍVEIS:

0-100 pts     → Nível 1  🌱 Iniciante
101-200 pts   → Nível 2  🌿 Aprendiz
201-300 pts   → Nível 3  🌳 Em Crescimento
301-400 pts   → Nível 4  🌲 Estabilizada
401-500 pts   → Nível 5  🏔️ Escalando
501-600 pts   → Nível 6  ⭐ Líder
601-700 pts   → Nível 7  🚀 Aceleradora
701-800 pts   → Nível 8  💎 Mentora
801-900 pts   → Nível 9  👑 Rainha
901-1000 pts  → Nível 10 🏆 Lenda

PROGRESS VISUAL:

Nível 3 - Em Crescimento 🌳
┌──────────────────────────────┐
│ [████████░░░░░░░░░░] 250/300 │
│ Próximo: 50 pontos           │
│ Prêmio: Badge "Escaladora"   │
└──────────────────────────────┘
```

---

## Tipos de Empresas Suportados

```
├─ 🖥️  TECH / SOFTWARE
│   Foco: Inovação, MVP, Investimento
│   Cursos: Validação, Escalabilidade, Capital
│
├─ 👗 FASHION / VESTUÁRIO
│   Foco: Produção, Design, Marcas
│   Cursos: Produção, E-commerce, Marketing
│
├─ 🍽️  ALIMENTOS / GASTRONOMIA
│   Foco: Regulação, Segurança, Distribuição
│   Cursos: APPCC, Licenças, Logística
│
├─ 💄 BELEZA / COSMÉTICOS
│   Foco: ANVISA, Formulação, Branding
│   Cursos: Regulação, Produção, Vendas
│
├─ 📊 CONSULTORIA / SERVIÇOS
│   Foco: Expertise, Vendas, Escalabilidade
│   Cursos: Atração de Clientes, Processos
│
├─ 🔧 SERVIÇOS GERAIS
│   Foco: Operacional, Qualidade, Crescimento
│   Cursos: Gestão, Qualidade, Equipe
│
├─ 🎓 EDUCAÇÃO / TREINAMENTO
│   Foco: Conteúdo, Plataformas, Impacto
│   Cursos: Produção, Plataformas, Certificação
│
├─ 🛍️  VAREJO / E-COMMERCE
│   Foco: Online, Logística, Marketing
│   Cursos: E-commerce, Marketing, Logística
│
├─ 🏥 SAÚDE / WELLNESS
│   Foco: Regulação, Qualidade, Confiança
│   Cursos: Regulação, Qualidade, Marketing
│
└─ ✨ OUTRO
    Foco: Caso a caso
    Cursos: Personalizados
```

---

## Editais Disponíveis

```
1️⃣  BNDES - Programa Mulheres
    Valor: R$ 300 mil
    Taxa especial para mulheres
    Requisito: Empresa formalizada
    Status: ✅ Aberto

2️⃣  FINEP - Inovação Feminina
    Valor: R$ 500 mil
    Foco: Tech, pesquisa
    Requisito: Inovação significativa
    Status: ⏳ Fechando (7 dias)

3️⃣  SEBRAE - StartUp Brasil
    Valor: R$ 100 mil
    Foco: Startups em estágio inicial
    Requisito: MVP desenvolvido
    Status: ✅ Aberto

4️⃣  Instituto Ethos - Moda Sustentável
    Valor: R$ 200 mil
    Foco: Fashion com sustentabilidade
    Requisito: Práticas eco-friendly
    Status: ✅ Aberto

5️⃣  MAPA - Alimentos Orgânicos
    Valor: R$ 150 mil
    Foco: Alimentos naturais
    Requisito: Certificação orgânica
    Status: ✅ Aberto

6️⃣  BNDES Social - Beleza Inclusiva
    Valor: R$ 120 mil
    Foco: Inclusão feminina
    Requisito: Mulheres em liderança
    Status: ✅ Aberto

7️⃣  CAPES - Educação Feminina
    Valor: R$ 250 mil
    Foco: Educação para mulheres
    Requisito: Conteúdo de qualidade
    Status: ✅ Aberto

8️⃣  Google for Startups
    Valor: R$ 300 mil
    Foco: Tech, inovação
    Requisito: Tração inicial
    Status: ✅ Aberto
```

---

## Dashboard - KPIs Principais

```
┌───────────────────────────────────────────────────┐
│           DASHBOARD PRINCIPAL                     │
├───────────────────────────────────────────────────┤
│                                                   │
│  🏢 Empresas Registradas      0/5                 │
│  ████░░░░░░░░░░░░░░ 0%                           │
│                                                   │
│  📚 Cursos Iniciados           0/3                │
│  ░░░░░░░░░░░░░░░░░░░ 0%                          │
│                                                   │
│  💰 Editais Disponíveis        8                  │
│  ████████████████████ 100%                        │
│                                                   │
│  ⭐ Pontuação Geral           150 pts             │
│  ████████░░░░░░░░░░ 15%                          │
│                                                   │
│  🎯 Próximos Passos:                              │
│  ✓ Perfil Completo                               │
│  ⏳ Registrar Empresa (Pendente)                  │
│  ⏳ Fazer um Curso (Pendente)                     │
│  ⏳ Candidatar em um Edital (Pendente)            │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## Ciclo Completo de uma Usuária

```
DIA 1 - Descoberta
  └─ Acessa plataforma
     └─ Vê landing page com benefícios
        └─ Clica em "Registrar"

DIA 1 - Onboarding (30 min)
  └─ Cria conta
     └─ Preenche perfil básico (+10 pts)
        └─ Vê dashboard
           └─ Ganha Nível 1 🌱

DIA 2 - Ação (1h)
  └─ Registra sua empresa (+50 pts)
     └─ Sistema recomenda cursos
        └─ Vê editais compatíveis
           └─ Ganha Nível 2 🌿

DIA 3 - Aprendizado (2h)
  └─ Matricula em curso (+25 pts)
     └─ Estuda módulo 1
        └─ Vai progredindo
           └─ Total: 85 pts

DIA 4 - Oportunidade (30 min)
  └─ Candidata a edital (+30 pts)
     └─ Preenche formulário
        └─ Submete candidatura
           └─ Total: 115 pts

DIA 5 - Networking (1h)
  └─ Agenda mentoria (+20 pts)
     └─ Conversa com especialista
        └─ Recebe feedback
           └─ Total: 135 pts

SEMANA 2 - Crescimento
  └─ Continua aprendendo
     └─ Completa primeiro curso (+50 pts)
        └─ Total: 185 pts → Nível 2 ⭐
           └─ Desbloqueado: Badge "Escaladora"

MÊS 1 - Consolidação
  └─ Múltiplas ações combinadas
     └─ Pontos acumulando
        └─ Nível 3 🌳 alcançado
           └─ Agora é "Empreendedora em Crescimento"
```

---

## Integração com APIs (Roadmap)

```
AGORA (v1.0):
  ├─ Dados locais (JSON files)
  ├─ Fake APIs (mock data)
  └─ Sem integração externa

FUTURO (v1.2):
  ├─ API real de editais (Gov)
  ├─ Integração BNDES
  ├─ Integração SEBRAE
  └─ Integração com cursos (Udemy, Alura)

FUTURO (v2.0):
  ├─ Pagamento (Stripe)
  ├─ Email (SendGrid)
  ├─ SMS (Twilio)
  ├─ Analytics (Mixpanel)
  └─ CRM (HubSpot)
```

---

## Stack Visual

```
FRONTEND
┌─────────────────────────────────┐
│ HTML5 (Semântica)               │
│ CSS3 (Gradientes, Flex/Grid)    │
│ JavaScript Vanilla (Fetch API)  │
│ Font Awesome 6.0.0              │
│ Google Fonts (Roboto)           │
└────────────┬────────────────────┘
             │
        HTTP │ HTTPS (Futuro)
             │
┌────────────▼────────────────────┐
│        BACKEND (Express.js)     │
├─────────────────────────────────┤
│ Node.js v24.12.0                │
│ Express 4.18.2                  │
│ JWT (jsonwebtoken 9.0.2)        │
│ CORS 2.8.5                      │
│ Body-Parser 1.20.2              │
├─────────────────────────────────┤
│ RecommendationEngine (OOP)      │
│ API Routes (15+)                │
│ Middleware (Auth, CORS)         │
└────────────┬────────────────────┘
             │
        File I/O
             │
┌────────────▼────────────────────┐
│        DATA (JSON Files)        │
├─────────────────────────────────┤
│ users.json                      │
│ companies.json                  │
│ editals.json                    │
│ courses.json                    │
│ user_scores.json                │
│ applications.json               │
└─────────────────────────────────┘
```

---

## Performance & Escalabilidade

```
ATUAL (v1.0):
  Load: < 100 ms
  Concurrent Users: < 100
  Storage: < 10 MB
  Database: JSON files
  
MELHORADO (v1.2):
  Load: < 50 ms (com cache)
  Concurrent Users: < 1000
  Storage: < 100 MB
  Database: PostgreSQL
  Cache: Redis
  
ENTERPRISE (v2.0):
  Load: < 20 ms
  Concurrent Users: > 10k
  Storage: > 1 GB
  Database: PostgreSQL + Sharding
  Cache: Redis + CDN
  Queue: Message broker
```

---

## Matriz de Compatibilidade

```
Empresa              Cursos            Editais         Mentoras
─────────────────────────────────────────────────────────────
Tech + Ideia         Validação         FINEP (95%)     Sandra ⭐⭐⭐
                     MVP               Google (90%)
                     Pitch             
                     
Fashion + Lançada    E-commerce        Instituto       Patricia ⭐⭐⭐
                     Marketing         Ethos (85%)
                     Varejo            BNDES (80%)
                     
Food + Consol.       Inovação          MAPA (90%)      Juliana ⭐⭐
                     Sustentabilidade  BNDES (85%)
                     Exportação
```

---

✨ **Mapa atualizado: 28/03/2026**  
Status: ✅ Completo e Funcional!
