# 📚 Guia Completo de Uso - Plataforma de Empreendedorismo Feminino

## 🎯 Quick Start (5 minutos)

### 1. Iniciar o Servidor
```powershell
cd "c:\Users\jessi\OneDrive\Desktop\projeto hackathon"
npm install
node backendexpandido.js
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
📊 Dashboard: http://localhost:3000/dashboard
🏢 Registrar Empresa: http://localhost:3000/companies
```

### 2. Abrir no Navegador
```
http://localhost:3000
```

### 3. Criar Conta
- Clique em "Registrar"
- Preencha email e senha
- Login

### 4. Explorar Funcionalidades
- Dashboard
- Registrar empresa
- Ver editais
- Explorar cursos

---

## 🎨 Páginas Disponíveis

### Landing Page
**URL**: `http://localhost:3000`
- Visão geral do projeto
- Cards de recursos
- Botões de ação (Login, Registrar, Questionário)

### Autenticação
**Login**: `http://localhost:3000/login`
- Email: admin@exemplo.com
- Senha: 123456

**Registrar**: `http://localhost:3000/register`
- Criar nova conta
- Email único
- Senha mínimo 6 caracteres

### Dashboard Principal
**URL**: `http://localhost:3000/dashboard`
- Visão geral com KPIs
- Empresas, Cursos, Editais
- Menu lateral com navegação
- Perfil de usuária

### Registrar Empresa
**URL**: `http://localhost:3000/companies`
**Tipo**: Multi-etapas (4 seções)

**Seção 1 - Informações Básicas**
- Nome da empresa (obrigatório)
- CNPJ (opcional)
- Site

**Seção 2 - Tipo e Estágio**
- Tipo: Tech, Moda, Food, Beauty, Consultoria, Serviços, Educação, Varejo, Saúde, Outro
- Estágio: Ideia, Pré-lançamento, Lançada, Em crescimento, Consolidada

**Seção 3 - Financeiro**
- Faturamento anual (opcional)
- Número de funcionários
- Capital investido

**Seção 4 - Descrição**
- Descrição da empresa (mín. 50 caracteres)
- Impacto social
- Desafios principais

### Editais e Oportunidades
**URL**: `http://localhost:3000/editals`

**Recursos**:
- Estatísticas: Total, Abertos, Valor Disponível
- Filtros:
  - Por setor
  - Valor mínimo
  - Status (Abertos, Fechando, Fechados)
- Cada edital mostra:
  - Organização
  - Descrição
  - Valor disponível
  - Dias restantes
  - Match score (compatibilidade)
  - Botões: Candidatar, Detalhes

**Editais Inclusos**:
1. BNDES - Apoio a Mulheres (R$ 300k)
2. FINEP - Inovação Feminina (R$ 500k)
3. SEBRAE - StartUp Brasil (R$ 100k)
4. Instituto Ethos - Moda Sustentável (R$ 200k)
5. MAPA - Alimentos Orgânicos (R$ 150k)
6. BNDES Social - Beleza Inclusiva (R$ 120k)
7. CAPES - Educação para Mulheres (R$ 250k)
8. Google for Startups (R$ 300k)

### Plataforma de Cursos
**URL**: `http://localhost:3000/courses`

**Abas**:
- **Para Você** - Recomendados (3 cursos)
- **Todos os Cursos** - Com filtros
- **Em Progresso** - Cursos em andamento
- **Completados** - Com certificados

**Filtros Disponíveis**:
- Nível: Iniciante, Intermediário, Avançado
- Categoria: Negócios, Marketing, Finanças, Tecnologia, Liderança
- Preço: Gratuitos, Pagos

**Cursos Inclusos** (10+):
1. Gestão Financeira (Gratuito)
2. Marketing Digital (R$ 199)
3. Liderança Feminina (R$ 149)
4. Plano de Negócios (R$ 279)
5. Vendas e Negociação (R$ 199)
6. Programação (Gratuito)
7. E-commerce Completo (R$ 249)
8. Contabilidade Básica (R$ 99)
9. Personal Branding (R$ 149)
10. Produtividade e Gestão (Gratuito)

### Questionário Original
**URL**: `http://localhost:3000/questionnaire`
- 9 campos de perfil
- Barra de progresso
- Salva dados de empreendedora

---

## 🤖 Algoritmos de Recomendação

### 1. Recomendação de Cursos

Baseado em **Tipo + Estágio** da empresa:

```
TECH:
  - Ideia → Validação, MVP, Pitch
  - Pré-lançamento → Go-to-Market, Tração, IP
  - Lançada → Escalabilidade, PMF, Capital
  - Em crescimento → Liderança Tech, Internacional, M&A
  - Consolidada → Inovação, Transformação, ESG

FASHION:
  - Ideia → Tendências, Prototipagem
  - Pré-lançamento → Produção, Suprimentos, Branding
  - Lançada → Varejo, E-commerce, Marketing
  - Em crescimento → Expansão, Logística, Sustentabilidade
  - Consolidada → Franquias, Inovação, Mercado Int.

[E assim por diante para Food, Beauty, Consulting, etc]
```

**Como Funciona**:
1. Usuária registra empresa
2. Sistema identifica tipo + estágio
3. Recomenda 3-5 cursos específicos
4. Cursos aparecem na aba "Para Você"

### 2. Compatibilidade com Editais (Match Score)

Sistema de scoring:

```
SCORE TOTAL = Até 1000 pontos

Componentes:
- Compatibilidade de Tipo: +30 pontos
- Compatibilidade de Estágio: +25 pontos
- Faixa de Faturamento Mínima: +20 pontos
- Faixa de Faturamento Máxima: +20 pontos
- Localização Geográfica: +15 pontos
- Requisitos Especiais: +10 pontos

Exemplo:
- Tech startup com faturamento R$ 200k
- Aplicando ao "Edital de Inovação Feminina"
- Tipo: Tech ✓ (+30)
- Estágio: Launched ✓ (+25)
- Revenue: R$ 200k está entre 0-5M ✓ (+40)
- = 95 pontos = Match Score de 95%
```

**Visualização**:
- Barra verde mostrando o percentual
- Número ao lado (ex: 75%)
- Ordenação por score (mais compatível primeiro)

### 3. Pontuação de Usuárias (Gamificação)

Pontos por ações:

```
Ação                              Pontos
─────────────────────────────────────────
Perfil completo                    10
Registrar empresa                  50
Candidatar a edital                30
Completar curso                    Variável (25-100)
Sessão de mentoria agendada        20

Níveis:
0-100 pts     → Nível 1: 🌱 Iniciante
101-200 pts   → Nível 2: 🌿 Aprendiz
201-300 pts   → Nível 3: 🌳 Em Crescimento
301-400 pts   → Nível 4: 🌲 Estabilizada
401-500 pts   → Nível 5: 🏔️ Escalando
501-600 pts   → Nível 6: ⭐ Líder
601-700 pts   → Nível 7: 🚀 Aceleradora
701-800 pts   → Nível 8: 💎 Mentora
801-900 pts   → Nível 9: 👑 Rainha
901-1000 pts  → Nível 10: 🏆 Lenda
```

Visualização:
- Progress circle no dashboard
- Mostrar nível atual
- Próximo milestone

### 4. Classificação de Tipo de Empresa

Cada tipo tem descrição contextual:

```
Tech: 
  "Empresas de tecnologia, software, aplicativos 
   e soluções digitais. Recebem apoio especial 
   para inovação e investimento."

Fashion:
  "Moda, design, vestuário e acessórios. 
   Há muitos editais específicos para este setor."

Food:
  "Alimentos, gastronomia, bebidas e restaurantes. 
   Exigem conformidade com regulamentações especiais."

[E assim por diante...]
```

Mostra quando tipo é selecionado.

---

## 💾 Estrutura de Dados

### users.json
```json
[
  {
    "id": 1234567890,
    "email": "usuario@email.com",
    "password": "senha123",
    "name": "Nome Usuária",
    "age": 28,
    "createdAt": "2026-03-28T10:00:00Z"
  }
]
```

### companies.json
```json
[
  {
    "id": 1234567891,
    "userEmail": "usuario@email.com",
    "name": "Tech Company Brasil",
    "cnpj": "00.000.000/0001-00",
    "type": "tech",
    "stage": "launched",
    "revenue": 500000,
    "employees": 15,
    "description": "Desenvolvemos soluções de IA...",
    "website": "https://teccompany.com.br",
    "socialImpact": "Geramos 15 empregos diretos...",
    "challenges": "Escalabilidade e marketing...",
    "createdAt": "2026-03-28T10:15:00Z",
    "status": "ativa"
  }
]
```

### applications.json
```json
[
  {
    "id": 1234567892,
    "userEmail": "usuario@email.com",
    "editalId": 2,
    "appliedAt": "2026-03-28T11:00:00Z",
    "status": "pendente"
  }
]
```

### user_scores.json
```json
[
  {
    "email": "usuario@email.com",
    "score": 150,
    "level": 2
  }
]
```

---

## 🔑 Credenciais de Teste

### Admin
- **Email**: admin@exemplo.com
- **Senha**: 123456

### Novo Usuário
Registre uma conta com email/senha qualquer

---

## 🚀 Casos de Uso

### Caso 1: Empreendedora de Tech
1. Registra conta
2. Registra startup de IA
3. Sistema recomenda cursos de "MVP" e "Tração"
3. Vê edital FINEP compatível (95% match)
4. Candidata-se
5. Agenda mentoria com Sandra (especialista em tech)
6. Ganha 100 pontos + Nível 2

### Caso 2: Empreendedora de Moda
1. Registra conta
2. Registra loja de roupas sustentáveis
3. Sistema recomenda cursos de "Produção" e "E-commerce"
4. Vê edital Instituto Ethos (88% match)
5. Faz curso de Marketing
6. Ganha 75 pontos + Nível 1

### Caso 3: Empreendedora de Alimentos
1. Registra conta
2. Registra empresa de bolos artesanais
3. Sistema recomenda cursos de "Regulação" e "Distribuição"
4. Vê edital MAPA (92% match)
5. Completa 3 cursos
6. Ganha 200 pontos + Nível 3

---

## 🛠️ Troubleshooting

### Porta 3000 em Uso
```powershell
# Encontrar processo
Get-NetTCPConnection -LocalPort 3000

# Matar processo
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Erro ao Registrar
- Email já existe? Use outro email
- Senha muito curta? Mínimo 6 caracteres
- Conexão com servidor? Verifique se server está rodando

### Dados Não Salvam
- Verifique se arquivos JSON têm permissão de escrita
- Pasta do projeto na raiz do disco local
- Tente seed-data.js novamente

### Token Expirado
- Refaça login
- Token dura 24 horas
- Será adicionada renovação automática

---

## 🌟 Funcionalidades Futuras

### Próximas Versões
- [ ] Validação de email SMTP
- [ ] Hash de senhas (bcrypt)
- [ ] Recuperação de senha
- [ ] Integração com APIs de editais reais
- [ ] Chat com mentoras
- [ ] Certificados digitais
- [ ] Blog de artigos
- [ ] Análise avançada no admin
- [ ] Mobile app (React Native)
- [ ] Machine Learning para recomendações

---

## 📞 Suporte

### Frequentes Perguntas (FAQ)

**P: Como faço para candidatar a um edital?**
R: Acesse `/editals`, escolha o edital desejado e clique em "Candidatar".

**P: Posso alterar dados da minha empresa?**
R: Sim, através do dashboard. Funcionalidade de edição em desenvolvimento.

**P: Os cursos têm certificados?**
R: Sim! Após completar, aparece na aba "Completados" com certificado.

**P: Preciso de banco de dados real?**
R: Não, por enquanto usa JSON. Migração para PostgreSQL em roadmap.

**P: Posso usar em produção?**
R: Ainda não. Segurança completa (HTTPS, bcrypt, etc) em desenvolvimento.

---

## 📊 Métricas e KPIs

### Dashboard Mostra
- Total de usuárias registradas
- Empresas cadastradas por tipo
- Editais aplicados
- Taxa de conclusão de cursos
- Média de pontuação
- Níveis alcançados

### Relatórios Disponíveis
- `/api/admin/analytics` - Estatísticas gerais
- Top 10 usuárias por pontuação
- Tipos de empresa mais comuns
- Editais mais procurados
- Cursos mais populares

---

## 🎓 Recursos de Aprendizado

### Documentação
- README.md - Visão técnica completa
- GUIA-USO.md - Este arquivo
- Comentários no código

### Código-fonte
- backendexpandido.js - Backend Express
- Páginas HTML com comentários
- Algoritmos de recomendação documentados

### Tutoriais em Vídeo (Planejado)
- Como registrar empresa
- Como buscar e candidatar a editais
- Como se matricular em cursos
- Como agendar mentorias

---

**Versão**: 1.0.0 (Hackathon)  
**Última atualização**: 28/03/2026  
**Status**: ✅ Funcionando Perfeitamente!

Boa sorte com seu empreendimento! 🚀💪👩‍💼
