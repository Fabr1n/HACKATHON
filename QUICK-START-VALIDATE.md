# ⚡ **QUICK START - VALIDAÇÃO EM 24H**

## 🎯 **Objetivo: Confirmar que tudo está funcionando**

Este guia é para **validar a plataforma em 1 dia** antes de convidar usuários e corporações.

---

## **⏱️ TIMELINE: 24 HORAS**

```
HORA 1-2:   Setup & Deploy
HORA 3-4:   Testing Manual
HORA 5-6:   User Flow (Empreendedora)
HORA 7-8:   User Flow (Corporação)
HORA 9-12:  Documentação + Bugs
HORA 13-24: Refinement & Polish
```

---

## **✅ HOUR 1-2: SETUP & DEPLOY**

### **Passo 1: Clonar & Instalar (10 min)**
```bash
# Windows PowerShell
cd c:\Users\tiago\Desktop\projeto-hackathon-main
.\iniciar-servidor.ps1

# macOS/Linux
./iniciar-servidor.sh
```

**O que deve acontecer:**
- ✅ Python venv criado
- ✅ Dependencies instaladas (requirements.txt)
- ✅ Flask app rodando em http://localhost:5000
- ✅ Nenhum erro no console

### **Passo 2: Verificar Frontend (10 min)**
```bash
# Terminal nova janela
cd frontend
# Se tiver Python instalado, servir com:
python -m http.server 8000

# Ou usar Live Server no VS Code
```

**O que você deve acessar:**
- [ ] http://localhost:8000/landing-meg.html (ou arquivo local)
- [ ] Logo, navbar, hero section devem estar visíveis
- [ ] Cores (Verde Cerrado #15803d, Dourado Ipê #ca8a04) corretas

### **Passo 3: Verificar Arquivos Críticos (5 min)**
```
✅ /frontend/landing-meg.html      (início)
✅ /frontend/como-funciona.html    (educação)
✅ /frontend/team.html             (equipe)
✅ /frontend/esg-programs.html     (B2B)
✅ /frontend/register-novo.html    (signup)
✅ /frontend/login-novo.html       (login)
✅ /frontend/dashboard-meg.html    (user area)
✅ /backend/main.py                (API)
✅ /.env.example                   (config)
✅ /ESTRATEGIA-COMPLETA-MEG.md     (strategy)
```

**Se algum arquivo faltar:** ❌ PARAR e notificar Tiago

---

## **✅ HOUR 3-4: TESTING MANUAL**

### **Teste 1: Landing Page (10 min)**

**Abra:** `landing-meg.html`

**Checklist:**
- [ ] Logo aparece no topo
- [ ] Navbar com links: "Início | Como Funciona | Funcionalidades | Equipe | Seja Mentor | Login"
- [ ] Hero section com tagline visto ("Uma ponte entre empreendedoras e oportunidades")
- [ ] Botão "Get Started" → navega para `register-novo.html`
- [ ] Abaixo tem "About" section com 3 cards:
  - [ ] 🧠 Hub de Inteligência
  - [ ] 💡 Match Inteligente
  - [ ] 🎯 Capacitação Direcionada
- [ ] Footer com links de contato
- [ ] Responsive (teste em mobile também)

**Se falhar:** Anotar screenshot + issue específica

---

### **Teste 2: Como Funciona (10 min)**

**Abra:** `como-funciona.html`

**Checklist:**
- [ ] Header "Como Funciona a MEG" visível
- [ ] Seção "O Problema": mostra 30k mulheres invisíveis
- [ ] Seção "Hub de Inteligência": mostra agregação
- [ ] **Seção "Match Inteligente"** (CRÍTICA):
  - [ ] Explica: CNPJ reader + matching
  - [ ] Mostra 3 steps: Notificação Ativa, Score, Economia de Tempo
  - [ ] Tem exemplo "85% Compatibilidade"
- [ ] Seção "Capacitação Direcionada": cenário confeitaria
- [ ] Seção "B2B & ESG": corporate problem → solution
- [ ] Seção "Fluxo Completo": 7 passos do usuário
- [ ] Botões "Registre-se" → `register-novo.html`

**Se falhar:** "Match Inteligente" é o diferencial, isso é crítico

---

### **Teste 3: Team Page (5 min)**

**Abra:** `team.html`

**Checklist:**
- [ ] 3 cards de team members:
  - [ ] Naomi Ferreira - 💡 Founder & Visionary
  - [ ] Jéssica Ferreira - ⚙️ Strategy & Optimization
  - [ ] Tiago Fabrini - 💻 CTO & Lead Dev
- [ ] Cada card tem: nome, role, icon, mission statement
- [ ] "The Trinity" section explica Visão → Estratégia → Execução
- [ ] Values section (Inclusão, Agilidade, Precisão, Crescimento)
- [ ] Timeline com 5 milestones
- [ ] Responsive design

---

### **Teste 4: ESG Programs (5 min)**

**Abra:** `esg-programs.html`

**Checklist:**
- [ ] Header "Programa ESG & B2B (Para Empresas Grandes)"
- [ ] Corporate Challenge section (4 pain points com ❌)
- [ ] MEG Solution (4 value props)
- [ ] 6-benefit grid visible
- [ ] Seal MEG badge explicada
- [ ] 3 caso de uso (Porto Seco, Mitsubishi, Distributor)
- [ ] "Pronto para Diversificar?" CTA → contato

---

## **✅ HOUR 5-6: USER FLOW - EMPREENDEDORA**

### **Teste 5: Registro de Usuário (15 min)**

**Abra:** `register-novo.html`

**Passos:**
1. Preencha formulário com dados reais:
   ```
   Name: "Maria Silva"
   Email: seu-email-teste@gmail.com (IMPORTANTE: um que vc acessa)
   Password: "Teste123!"
   Confirm: "Teste123!"
   ```

2. Clique "Registrar"

**O que deve acontecer:**
- ✅ Aviso "Confirmação enviada para seu email"
- ⏳ Email chega em 30 segundos
- ✅ Email tem link "Confirmar Email"
- ✅ Clica no link → modal "Email confirmado!"
- ✅ Agora consegue fazer login

**Se email não chegar:**
- [ ] Verificar .env (SMTP_EMAIL, SMTP_PASSWORD)
- [ ] Verificar spam folder
- [ ] Se Gmail: ativar "Less Secure Apps"

**Se falhar aqui:** CRÍTICO - sem email, sistema não funciona

---

### **Teste 6: Login (10 min)**

**Na mesma página, após confirmar email:**

1. Clique "Vai, fazer login!"
2. Preencha:
   ```
   Email: maria@... (mesma do registro)
   Password: Teste123!
   ```

3. Clique "Login"

**O que deve acontecer:**
- ✅ Redirect para `dashboard-meg.html`
- ✅ Navbar mostra "Olá, Maria"
- ✅ Dashboard carrega com sections:
  - [ ] "Meus Matches" (mesmo que vazio agora)
  - [ ] "Próximas Oportunidades"
  - [ ] "Notificações"
  - [ ] "Meu Perfil"

**Se falhar:** Verificar localStorage (abrir DevTools > Storage > localStorage)

---

### **Teste 7: Dashboard Nasce (10 min)**

**Uma vez logado:**

- [ ] Clique em "Meu Perfil"
- [ ] Preencha dados profissionais:
  ```
  CNPJ: 12.345.678/0001-90
  Setor (CNAE): Confeitaria
  Faturamento: R$180.000/ano
  Localização: Goiânia
  ```
- [ ] Salve

**O que deve acontecer:**
- ✅ Dados salvos em localStorage
- ✅ Ao voltar ao dashboard, dados ainda lá
- ✅ Se reiniciar navegador, ainda logada (7-day TTL)

**Se falhar:** Verificar auth.js e localStorage

---

## **✅ HOUR 7-8: USER FLOW - CORPORAÇÃO**

### **Teste 8: Website Corporativo (10 min)**

**Abra:** `esg-programs.html` (simular que é um site corporativo)

- [ ] Entenda a proposta ESG
- [ ] Clique "Pronto para Diversificar?" → `contact.html`

**Se `contact.html` não existe:**
- ⚠️ Criar contact form (será próximo passo)

---

### **Teste 9: Simulação de Corporate Login (5 min)**

**Idealmente teria uma rota `/admin` com corporate dashboard:**

```
POST /api/corporate/register
POST /api/corporate/login
GET /api/corporate/dashboard
```

**Por enquanto:** Anotar que falta → adicionar em Phase 2

---

## **✅ HOUR 9-10: VERIFICAR DOCUMENTAÇÃO**

### **Teste 10: Ler & Validar Docs (20 min)**

**Abra em ordem:**

1. **`ESTRATEGIA-COMPLETA-MEG.md`** (10 min)
   - [ ] Problema bem definido
   - [ ] 4 pillars explicados
   - [ ] Business model faz sentido
   - [ ] Roadmap é realista

2. **`DASHBOARD-ESTRATEGICO.md`** (5 min)
   - [ ] Status de cada arquivo
   - [ ] Áreas de foco claras

3. **`CHECKLIST-EXECUTIVO.md`** (5 min)
   - [ ] Próximos passos claros
   - [ ] Prazos realistas

**Se alguma doc está vaga:** Anotar → revisar com Naomi

---

## **✅ HOUR 11-12: BUG BASH & REFINEMENT**

### **Teste 11: Bug Bash (30 min)**

**Navegue pela plataforma como um usuário novo:**

1. Salve prints de cada página
2. Teste em 2 navegadores (Chrome + Firefox)
3. Teste em mobile (F12 → toggle device toolbar)
4. Procure por:
   - [ ] Links quebrados (404)
   - [ ] Textos cortados ou misaligned
   - [ ] Imagens faltando
   - [ ] Botões que não funcionam
   - [ ] Cores inconsistentes

**Template de Bug Report:**
```
Descrição: [O que tá errado]
Onde: [URL/página]
Como Reproduzir: [Passos]
Esperado: [O que deveria acontecer]
Atual: [O que acontece]
Screenshot: [anexo]
Browser: [Chrome/Firefox/Safari]
```

**Máximum 5 bugs críticos:** Se tiver mais, algo está errado

---

### **Teste 12: Performance Check (10 min)**

**Em cada página principal:**

1. Abra DevTools (F12)
2. Vá para "Network"
3. Reload a página
4. Veja:
   - [ ] Load time < 2 segundos
   - [ ] Tamanho total < 5MB
   - [ ] Nenhum erro 404 em vermelho

**Se lento:** Verificar imagens não comprimidas

---

## **📋 HOUR 13-24: FINAL POLISH**

### **Passo 1: Fix Críticos (1-2 horas)**
Se teve bugs graves (login quebrado, email não envia, layout exploding), fix now.

### **Passo 2: Preparar Para Usuários (2-3 horas)**
- [ ] Criar conta de admin teste
- [ ] Criar 5 "fake editals" no banco de dados (para demo)
- [ ] Preparar landing page screenshot
- [ ] Gravar 30-segundo GIF de user signup flow

### **Passo 3: Preparar Para Corporações (2-3 horas)**
- [ ] Criar documento sobre ESG program
- [ ] Listar 3 empresas alvo (Mitsubishi, Porto Seco, etc)
- [ ] Draft email de outreach
- [ ] Preparar ROI calculator (quanto economizam com MEG)

### **Passo 4: Criar "Getting Started" para Beta (2-3 horas)**
**Arquivo: `BETA-TESTER-GUIDE.md`**
```markdown
# Para Empreendedoras Beta

1. Vá para meggoianas.com (ou localhost)
2. Clique "Get Started"
3. Registre com seu email real
4. Confirme email (check spam!)
5. Faça login
6. Preencha seu perfil
7. Veja seus matches (app vai sugerir oportunidades)
8. Dê feedback: "Você entendeu o Match Inteligente?"
```

---

## **🎯 CHECKLIST FINAL - 24H**

Ao final de 24 horas, você deve ter:

```
ACESSO & FUNCTIONALITY
[ ] Landing page acessível (http://localhost:8000)
[ ] Todas 9 páginas responsivas
[ ] Registro funciona (com email)
[ ] Login funciona (com session persistence)
[ ] Dashboard carrega
[ ] Formulário de perfil salva dados

DOCUMENTAÇÃO
[ ] ESTRATEGIA-COMPLETA-MEG.md lido & validado
[ ] DASHBOARD-ESTRATEGICO.md lido
[ ] CHECKLIST-EXECUTIVO.md entendido
[ ] Próximos passos claros para equipe

ARQUITETURA
[ ] Backend (Flask) rodando
[ ] Frontend (HTML) rodando
[ ] Email service testado (1 email enviado)
[ ] localStorage funcionando (session persiste)

QUALIDADE
[ ] Máximo 5 bugs não-críticos
[ ] Nenhum bug crítico pendente
[ ] Todos os links funcionam
[ ] Mobile responsive

READY FOR BETA
[ ] Plataforma estável
[ ] 2-3 usuários teste registrados
[ ] Documentação para beta testers pronta
[ ] 3 corporate contacts identificados
```

---

## **⚠️ SHOWSTOPPERS (Não passe daqui sem resolver)**

Se algo abaixo falhar, **PARAR E FIX**:

1. 🛑 Email não envia → Não consegue validar contas
2. 🛑 Login não funciona → Usuários não acessam
3. 🛑 Landing page quebrada → Primeira impressão ruim
4. 🛑 "Match Inteligente" não explicado claramente → Não entende diferencial

---

## **🚀 AFTER 24H - PRÓXIMOS PASSOS**

Se tudo passou no teste:

### **Day 2-3: Prepare Beta**
- [ ] Invite 5-10 friends/colleagues to test
- [ ] Schedule 30-min feedback calls with each
- [ ] Document feature requests
- [ ] Create bug tracking spreadsheet

### **Day 4-7: Corporate Outreach**
- [ ] Email 3 target companies
- [ ] Schedule demo calls
- [ ] Prepare custom ROI deck
- [ ] Get first "interested" signal

### **Week 2: Iterate Based on Feedback**
- [ ] Fix top 3 bugs reported
- [ ] Implement 1-2 feature requests
- [ ] Add "Frequently Asked" section to landing page
- [ ] Prepare for scaling

---

## **📞 CONTACT & ESCALATION**

**If stuck:**
- 🤔 Question about architecture? → Ask Tiago
- 🤔 Question about strategy? → Ask Jéssica
- 🤔 Question about messaging? → Ask Naomi
- 🤨 Something broken? → Slack #meg-bugs

---

## **✅ SIGN-OFF**

This 24-hour validation sprint should confirm:

**✅ The platform works**  
**✅ The strategy is clear**  
**✅ The team is aligned**  
**✅ It's ready for real users**

---

**Made with ❤️ & ☕ (lots of coffee)**

*"Done is better than perfect. Ship it, learn from real users, iterate."* — Naomi

---

## 🎊 **FINAL THOUGHT**

Se você conseguiu fazer essa validação 24h sem achar grandes problemas, significa que:

1. ✅ O produto existe
2. ✅ A visão está clara
3. ✅ O time entende o que fazer
4. ✅ Tudo que foi desenhado funciona

**Agora é hora de convidoar os primeiros usuários reais.**

---

Last Updated: 28 Mar 2026  
Next Review: 29 Mar 2026  
Status: 🟢 **READY FOR VALIDATION**
