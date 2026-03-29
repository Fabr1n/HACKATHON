# 🗺️ Mapa de Navegação - MEG Frontend

## 📌 Fluxo Principal do Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LANDING PAGE (landing-meg.html)                   │
├─────────────────────────────────────────────────────────────────────┤
│ Hero Section → CTA "Começar Agora"                                   │
│ Navigation Bar: Home | Funcionalidades | Seja Mentor | Contato       │
│ Features Grid: 4 benefícios principais                               │
│ Mentor Section: 4 cards de benefício para mentoras                  │
│ CTAs: "Registrar" | "Login" | "Seja Mentora"                       │
└─────────────────────────────────────────────────────────────────────┘
              ⬇️ Click "Começar Agora" ou "Registrar"
┌─────────────────────────────────────────────────────────────────────┐
│               REGISTRATION (register-novo.html)                      │
├─────────────────────────────────────────────────────────────────────┤
│ Step 1/3: Personal Data (nome, email, phone, CPF, password)         │
│ Step 2/3: Company Data (razão social, CNPJ, segmento, necessity)   │
│ Step 3/3: Terms (terms, privacy, notifications)                    │
│ Submit → POST /api/auth/register                                    │
│ Success → "Confirme seu email!" → Redirect to login                │
└─────────────────────────────────────────────────────────────────────┘
              ⬇️ User checks email & clicks confirmation link
┌─────────────────────────────────────────────────────────────────────┐
│                   EMAIL CONFIRMATION (via link)                      │
├─────────────────────────────────────────────────────────────────────┤
│ Email Service envia link com token: /api/confirm-email/<token>     │
│ GET /api/confirm-email/<token> → Valida e marca como confirmado    │
│ Response: "✅ Email confirmado com sucesso!"                       │
└─────────────────────────────────────────────────────────────────────┘
              ⬇️ Click "Login" na landing page
┌─────────────────────────────────────────────────────────────────────┐
│                  LOGIN (login-novo.html)                            │
├─────────────────────────────────────────────────────────────────────┤
│ Email input                                                          │
│ Password input                                                       │
│ "Esqueceu a senha?" link                                           │
│ Submit → POST /api/auth/login                                      │
│ Success → megAuth.saveSession(token, user)                         │
│ Redirect → dashboard-meg.html                                      │
│ localStorage agora contém: meg_session + meg_user (7 dias TTL)     │
└─────────────────────────────────────────────────────────────────────┘
              ⬇️ Automatic page load check
┌─────────────────────────────────────────────────────────────────────┐
│                 DASHBOARD (dashboard-meg.html)                      │
├─────────────────────────────────────────────────────────────────────┤
│ megAuth.checkSession() → If not logged, redirect to login           │
│ Stats Box: 3 oportunidades | 2 mentorias | 5 créditos | 12 conexões│
│ Oportunidades: 3 cards com deadline, valor, status                 │
│ Mentorias: 2 mentores com link "Agendar" → videochamadas-novo     │
│ Sidebar:                                                            │
│  └─ Perfil Card (nome, email, telefone, edit button)              │
│  └─ Quick Actions (videochamada, virar mentora, oportunidades)    │
│  └─ Notificações (2 items)                                        │
│ Footer: Links para todas as páginas                               │
└─────────────────────────────────────────────────────────────────────┘
              ⬇️ Multiple path options from dashboard
              │
    ┌─────────┴────────┬──────────────┬──────────────┐
    ⬇️                ⬇️               ⬇️              ⬇️
┌────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐
│ Video Call │  │ Mentor Reg.  │  │ Opportunities│  │Contact Page│
│(video...)  │  │(mentor-reg..)│  │  (landing)   │  │(contact..)  │
└────────────┘  └──────────────┘  └──────────────┘  └────────────┘
```

---

## 📄 Mapa Detalhado de Cada Página

### 1. **landing-meg.html** (Página de Marketing)
#### Objetivo: Atrair novo usuários e apresentar plataforma
```
URL: file:///.../ frontend/landing-meg.html
├─ Componentes:
│  ├─ Navigation Bar (navbar)
│  │  ├─ Logo MEG
│  │  ├─ Links: Home | Funcionalidades | Seja Mentor | Contato
│  │  └─ Botão: Login / [Usuário] Menu (dinâmico com auth.js)
│  │
│  ├─ Hero Section
│  │  ├─ Título: "Mulheres Empreendedoras Goianas"
│  │  ├─ Subtítulo: "Plataforma de mentoria, crédito e networks"
│  │  └─ CTA: "Começar Agora" → register-novo.html
│  │
│  ├─ Features Grid (4 cards)
│  │  ├─ Mentoria por Vídeo
│  │  ├─ Linhas de Crédito
│  │  ├─ Matching B2B
│  │  └─ Certificações
│  │
│  ├─ Mentor Section (ID: #mentor)
│  │  ├─ Heading: "Seja Mentora MEG"
│  │  ├─ 4 Benefit Cards:
│  │  │  ├─ ⭐ Visibilidade Premium
│  │  │  ├─ 👥 Rede de Mentoras
│  │  │  ├─ 📹 Mentorias por Vídeo
│  │  │  └─ 🏆 Certificação MEG
│  │  └─ CTA Button: "Quiero Ser Mentora" → mentor-register.html
│  │
│  ├─ Testimonials Section
│  │
│  └─ Footer
│     ├─ Links rápidos
│     ├─ Social media
│     └─ Copyright
│
├─ Scripts:
│  └─ <script src="js/auth.js"></script>
│     └─ Auto-initialize megAuth
│     └─ Update navbar on page load
│
├─ Eventos:
│  └─ DOMContentLoaded
│     └─ megAuth.checkSession()
│     └─ megAuth.updateUIAccordingToLogin()
│
└─ Links Internos:
   ├─ #mentor → Scroll para mentor section
   ├─ /register-novo.html → Página de registro
   ├─ /login-novo.html → Página de login
   ├─ /mentor-register.html → Formulário mentor
   └─ /videochamadas-novo.html → Videochamadas
```

### 2. **register-novo.html** (Registro de Usuária)
#### Objetivo: Onboarding de novas empreendedoras
```
URL: http://localhost:5000/register-novo.html
├─ Layout: 3-Step Form com progress indicator
│  ├─ Step 1: Personal Information
│  │  ├─ Full Name (required)
│  │  ├─ Email (required, format validation)
│  │  ├─ Phone (optional, masked)
│  │  ├─ CPF (optional, masked)
│  │  ├─ Password (required, strength indicator)
│  │  └─ Confirm Password (required, match validation)
│  │
│  ├─ Step 2: Company Data
│  │  ├─ Company Name (required)
│  │  ├─ CNPJ (optional, masked)
│  │  ├─ Industry (dropdown: Tech, Alimentos, Serviços, etc)
│  │  ├─ Business Need (dropdown: Crédito, Mentoria, Parceria)
│  │  └─ Brief Description
│  │
│  └─ Step 3: Terms & Conditions
│     ├─ ☑️ Aceito os Termos (required)
│     ├─ ☑️ Aceito a Política de Privacidade (required)
│     ├─ ☑️ Desejo receber notificações (optional)
│     └─ Botão: "Finalizar Registro"
│
├─ Navigation:
│  ├─ Botão "Voltar" em Step 2 e 3
│  ├─ Botão "Próximo" em Step 1 e 2
│  └─ Visual progress (3 circles, 1 active)
│
├─ Form Validation (JavaScript):
│  ├─ Email format regex
│  ├─ Password strength regex
│  ├─ Password match check
│  ├─ Required fields
│  └─ CPF format (111.111.111-11)
│
├─ Form Submission:
│  ├─ Event: form.submit + preventDefault
│  ├─ Collect FormData from all steps
│  ├─ POST /api/auth/register
│  ├─ On success:
│  │  ├─ Alert: "Seu registro foi recebido! Confirme seu email..."
│  │  ├─ setTimeout 2 seconds
│  │  └─ window.location.href = 'login-novo.html'
│  └─ On error:
│     └─ Alert: Error message from API
│
├─ Scripts:
│  ├─ <script src="js/auth.js"></script>
│  └─ Form handling script (at footer)
│     └─ showStep(n), nextStep(), prevStep()
│     └─ Form submit handler
│
└─ localStorage:
   └─ megAuth.ls keys available (não marca como logado)
```

### 3. **login-novo.html** (Login)
#### Objetivo: Autenticar usuária e criar sessão
```
URL: http://localhost:5000/login-novo.html
├─ Layout: Simple login box
│  ├─ Email input (required)
│  ├─ Password input (required, type="password")
│  ├─ "Esqueceu a senha?" link → forgot-password (future)
│  ├─ "Criar conta" link → register-novo.html
│  └─ Botão: "Entrar"
│
├─ Social Login Placeholder (buttons only):
│  ├─ "Login com Google"
│  ├─ "Login com LinkedIn"
│  └─ "Login com Microsoft"
│
├─ Info Box (MEG Benefits):
│  ├─ Mentoria especializada
│  ├─ Acesso a crédito
│  └─ Rede de empreendedoras
│
├─ Form Validation:
│  ├─ Email required
│  ├─ Password required
│  └─ No format validation (backend validates)
│
├─ Form Submission:
│  ├─ Event: form.submit + preventDefault
│  ├─ Collect email + password
│  ├─ POST /api/auth/login
│  │  ├─ Body: { email, password }
│  │  └─ Response: { success: true, token, user: { id, name, email } }
│  │
│  ├─ On success:
│  │  ├─ megAuth.saveSession(token, user)
│  │  │  └─ localStorage['meg_session'] = JSON with 7-day TTL
│  │  │  └─ localStorage['meg_user'] = parsed user object
│  │  ├─ Alert: "✅ Bem-vinda, [First Name]!"
│  │  └─ window.location.href = 'dashboard-meg.html'
│  │
│  └─ On error (403 - Email not confirmed):
│     ├─ Alert: "⚠️ Email não confirmado. Verifique seu inbox."
│     └─ Link to resend confirmation
│
├─ Scripts:
│  ├─ <script src="js/auth.js"></script>
│  └─ Form handling at footer
│     └─ Form submit event listener
│
└─ Auto-redirect (if already logged in):
   └─ DOMContentLoaded → megAuth.checkSession()
      └─ If session exists → redirect to dashboard-meg.html
```

### 4. **dashboard-meg.html** (Main Dashboard)
#### Objetivo: Central de controle pós-login
```
URL: http://localhost:5000/dashboard-meg.html
├─ Authentication Check (JavaScript):
│  └─ DOMContentLoaded
│     └─ megAuth.checkSession()
│        ├─ If not logged → alert + redirect to login-novo.html
│        └─ If logged → populate user data
│
├─ Layout: 3-Column Grid (LG screens)
│  ├─ HEADER Section:
│  │  ├─ Background gradient: #15803d → #ca8a04
│  │  ├─ "Bem-vinda ao Dashboard!"
│  │  └─ "Acompanhe suas oportunidades e mentorias"
│  │
│  ├─ STATS Row (4 cards):
│  │  ├─ 3 - Oportunidades B2B
│  │  ├─ 2 - Mentorias Agendadas
│  │  ├─ 5 - Linhas de Crédito
│  │  └─ 12 - Conexões Ativas
│  │
│  ├─ LEFT COLUMN (2/3 width):
│  │  ├─ Card 1: Oportunidades Recentes
│  │  │  ├─ 3 opportunity items (border-left colored)
│  │  │  ├─ Item 1: "Fornecedor Alimentos Orgânicos" (yellow, 5 dias)
│  │  │  ├─ Item 2: "Crédito BNDES" (green, pré-aprovado)
│  │  │  ├─ Item 3: "Parceria B2B" (blue, nova)
│  │  │  └─ CTA: "Ver todas" link
│  │  │
│  │  └─ Card 2: Suas Mentorias
│  │     ├─ Item 1: "Beatriz Alves" (Confeitaria)
│  │     │  ├─ Avatar circle with "B"
│  │     │  └─ Button: "Agendar" → videochamadas-novo.html
│  │     ├─ Item 2: "Ana Paula Santos" (Tecnologia)
│  │     │  ├─ Avatar circle with "A"
│  │     │  └─ Button: "Agendar" → videochamadas-novo.html
│  │     └─ CTA: "Ver todas" → videochamadas-novo.html
│  │
│  └─ RIGHT COLUMN (1/3 width):
│     ├─ Card 1: Meu Perfil
│     │  ├─ Avatar circle (auto-generated from first letter)
│     │  ├─ Nome: [from megAuth.getCurrentUser()]
│     │  ├─ Email: [from megAuth.getCurrentUser()]
│     │  ├─ Telefone: [from megAuth.getCurrentUser()]
│     │  └─ Button: "Editar Perfil" → profile.html (future)
│     │
│     ├─ Card 2: Ações Rápidas
│     │  ├─ Iniciar Videochamada → videochamadas-novo.html
│     │  ├─ Virar Mentora → mentor-register.html
│     │  ├─ Buscar Oportunidades → landing-meg.html#features
│     │  └─ Entrar em Contato → contact.html
│     │
│     └─ Card 3: Notificações
│        ├─ "Novo matching B2B!" (blue)
│        └─ "Crédito BNDES pré-aprovado" (green)
│
├─ Navigation Bar:
│  ├─ Logo MEG
│  ├─ Links: Dashboard | Mentorias | Home
│  ├─ User button (dropdown):
│  │  ├─ megAuth.showUserMenu()
│  │  ├─ Dashboard
│  │  ├─ Editar Perfil
│  │  ├─ Minha Mentoria
│  │  └─ Logout
│  │     └─ megAuth.logout()
│  │        └─ Clears localStorage + redirects to landing
│  │
│  └─ Mobile menu (hamburger)
│
├─ Footer:
│  ├─ Quick links
│  ├─ Social media
│  └─ Copyright
│
├─ Scripts:
│  ├─ <script src="js/auth.js"></script>
│  └─ Initialization script:
│     ├─ DOMContentLoaded
│     ├─ Check session
│     ├─ Get user: const user = megAuth.getCurrentUser()
│     ├─ Populate: #profileName, #profileEmail, #profilePhone
│     ├─ Set avatar: #avatarInitial = user.name[0].toUpperCase()
│     └─ Update navbar: #userName = user.name.split(' ')[0]
│
└─ User Menu Handler:
   └─ #userMenuBtn.click
      └─ megAuth.showUserMenu()
         └─ Creates dropdown with logout option
```

### 5. **videochamadas-novo.html** (Video Conferencing)
#### Objetivo: Interface para chamadas de vídeo com mentoras
```
URL: http://localhost:5000/videochamadas-novo.html
├─ VideoChatConfig Class (JavaScript):
│  ├─ Constructor()
│  │  ├─ Initialize device lists (empty)
│  │  └─ Load devices on first interaction
│  │
│  ├─ Methods:
│  │  ├─ loadDevices()
│  │  │  └─ navigator.mediaDevices.enumerateDevices()
│  │  │     ├─ Filter: videoinput (cameras)
│  │  │     ├─ Filter: audioinput (microphones)
│  │  │     └─ Filter: audiooutput (speakers)
│  │  │
│  │  ├─ populateSelect(selectId, availableDevices)
│  │  │  └─ <select> dropdown population
│  │  │
│  │  ├─ toggleVideo()
│  │  │  ├─ getUserMedia({ video: { deviceId } })
│  │  │  ├─ Get video stream
│  │  │  ├─ Display in <video> element
│  │  │  ├─ Update status badge (red ↔ green)
│  │  │  └─ Stop all tracks on toggle
│  │  │
│  │  ├─ toggleAudio()
│  │  │  ├─ getUserMedia({ audio: { deviceId } })
│  │  │  ├─ Get audio stream (no display)
│  │  │  ├─ Update status badge (red ↔ green)
│  │  │  └─ Stop all tracks on toggle
│  │  │
│  │  ├─ toggleScreen()
│  │  │  ├─ getDisplayMedia() for screen sharing
│  │  │  ├─ Display as secondary video
│  │  │  └─ Placeholder for future implementation
│  │  │
│  │  ├─ endCall()
│  │  │  ├─ Stop all video/audio tracks
│  │  │  ├─ Clear video elements
│  │  │  ├─ Reset all status badges to red
│  │  │  └─ Clear device selections
│  │  │
│  │  └─ testAudio()
│  │     ├─ Play test .wav/.mp3 file
│  │     └─ Verify speaker output
│
├─ Layout:
│  ├─ Header: "Videochamadas MEG"
│  │
│  ├─ Video Section:
│  │  ├─ Left: "Seu Vídeo"
│  │  │  ├─ <video> element (autoplay, muted)
│  │  │  └─ Status: 🔴 Camera Desligada
│  │  │
│  │  ├─ Right: "Vídeo Mentora"
│  │  │  ├─ <video> element (placeholder)
│  │  │  └─ Status: 🔴 Aguardando Conexão
│  │
│  ├─ Controls Section:
│  │  ├─ Device Selectors (3 dropdowns):
│  │  │  ├─ <select> Câmera
│  │  │  ├─ <select> Microfone
│  │  │  └─ <select> Altofalante
│  │  │
│  │  ├─ Control Buttons:
│  │  │  ├─ 🎥 Toggle Vídeo
│  │  │  │  └─ onclick: videoChatConfig.toggleVideo()
│  │  │  │     └─ Update status badge
│  │  │  │
│  │  │  ├─ 🎤 Toggle Áudio
│  │  │  │  └─ onclick: videoChatConfig.toggleAudio()
│  │  │  │
│  │  │  ├─ 💻 Compartilhar Tela
│  │  │  │  └─ onclick: videoChatConfig.toggleScreen()
│  │  │  │
│  │  │  ├─ 🔊 Testar Áudio
│  │  │  │  └─ onclick: videoChatConfig.testAudio()
│  │  │  │
│  │  │  └─ 🔴 Encerrar Chamada
│  │  │     └─ onclick: videoChatConfig.endCall()
│  │  │        └─ Closes connection, returns to list
│  │
│  ├─ Status Indicators:
│  │  ├─ Camera: 🟢 Ativa / 🔴 Desligada
│  │  ├─ Microfone: 🟢 Ativo / 🔴 Desligado
│  │  └─ Connection: 🟢 Conectado / 🔴 Aguardando
│  │
│  └─ Mentor List Section:
│     ├─ Heading: "Mentoras Disponíveis"
│     ├─ 3 Mentor Cards:
│     │  ├─ Card 1:
│     │  │  ├─ Avatar: "B" (Beatriz Alves)
│     │  │  ├─ Name: "Beatriz Alves"
│     │  │  ├─ Specialty: "Especialista em Confeitaria"
│     │  │  ├─ Rating: ⭐⭐⭐⭐⭐ (5.0)
│     │  │  ├─ Experience: "15 anos"
│     │  │  └─ Button: "Agendar Mentoria"
│     │  │     └─ onclick: Set mentor focus + loadDevices()
│     │  │
│     │  ├─ Card 2: "Ana Paula Santos" (Tech, 4.9 stars)
│     │  └─ Card 3: (Placeholder for 3rd mentor)
│
├─ Scripts:
│  ├─ <script src="js/auth.js"></script>
│  └─ VideoChatConfig initialization:
│     ├─ const videoChatConfig = new VideoChatConfig()
│     └─ DOMContentLoaded
│        └─ Attach event listeners to buttons
│           └─ Load devices on first button click (permission prompt)
│
└─ WebRTC Integration:
   ├─ getUserMedia() for camera/microphone
   ├─ getDisplayMedia() for screen sharing
   ├─ RTCPeerConnection (placeholder for future Jitsi/Agora)
   └─ Stream track management (stop on end call)
```

### 6. **mentor-register.html** (Mentor Application)
#### Objetivo: Onboarding de mentoras
```
URL: http://localhost:5000/mentor-register.html
├─ Layout: 3-Step Form com progress indicator
│
│  ├─ Step 1/3: Personal Data
│  │  ├─ Full Name (required)
│  │  ├─ Email (required, format validation)
│  │  ├─ Phone (required, masked)
│  │  ├─ CPF (optional, masked)
│  │  ├─ Bio/Description (textarea, 500 chars)
│  │  └─ Photo Upload (file input, avatar)
│  │
│  ├─ Step 2/3: Expertise
│  │  ├─ Expertise Areas (5 checkboxes):
│  │  │  ├─ ☑ Gestão de Negócios
│  │  │  ├─ ☑ Planejamento Financeiro
│  │  │  ├─ ☑ Marketing & Vendas
│  │  │  ├─ ☑ Tecnologia
│  │  │  └─ ☑ Recursos Humanos
│  │  ├─ Experience (number input, 1-60 years)
│  │  ├─ Availability (dropdown):
│  │  │  ├─ Flexível
│  │  │  ├─ Fins de semana
│  │  │  ├─ Dias úteis
│  │  │  └─ À noite
│  │  └─ Hourly Rate (optional, R$ input)
│  │
│  └─ Step 3/3: Confirmation
│     ├─ 3 Required Checkboxes:
│     │  ├─ ☑ Aceito os Termos
│     │  ├─ ☑ Aceito a Política de Privacidade
│     │  └─ ☑ Desejo receber notificações
│     ├─ Green Benefit Box:
│     │  ├─ 📍 Perfil Visível para Empreendedoras
│     │  ├─ 🏆 Certificação MEG
│     │  ├─ 👥 Rede de Mentoras
│     │  └─ 🤝 Oportunidades de Networking
│     └─ Submit Button: "Finalizar Registro"
│
├─ Step Navigation:
│  ├─ Visual indicator: 3 circles (active = green)
│  ├─ Botão "Anterior" (hidden on step 1)
│  ├─ Botão "Próximo" (shown on step 1-2)
│  └─ Botão "Confirmar" (shown on step 3)
│
├─ Form Validation:
│  ├─ All required fields
│  ├─ Email format regex
│  ├─ At least 1 expertise checkbox
│  └─ All 3 term checkboxes required for step 3
│
├─ Form Submission:
│  ├─ Collect FormData from all steps
│  ├─ POST /api/auth/mentor-register
│  │  ├─ Body: { fullName, email, phone, cpf, bio, photo, expertise[], experience, hourlyRate, ... }
│  │  └─ Response: { success: true, mentor_id, message }
│  │
│  ├─ On success:
│  │  ├─ Alert: "✅ Registro enviado com sucesso!"
│  │  ├─ Alert: "Verifique seu email para confirmar..."
│  │  ├─ console.log(form data)
│  │  └─ setTimeout → redirect to landing-meg.html
│  │
│  └─ On error:
│     └─ Alert: Error message
│
├─ Scripts:
│  ├─ <script src="js/auth.js"></script> (for consistency)
│  └─ Form handling:
│     ├─ showStep(n) - display step and hide others
│     ├─ nextStep() - validate and go forward
│     ├─ prevStep() - go back
│     └─ Form submit handler
│        └─ POST to /api/auth/mentor-register
│
├─ Email Confirmation (Backend):
│  └─ After form submission:
│     ├─ Email sent with 7-day confirmation link
│     ├─ /api/auth/confirm-mentor/<token>
│     └─ Mentor status set to "approved"
│
└─ navbar (shared):
   └─ Links to landing, dashboard, etc
   └─ User menu (if already logged in)
```

---

## 🔗 Navigation Links Map

### From landing-meg.html
- "Começar Agora" → register-novo.html
- "Login" button (navbar) → login-novo.html
- "Seja Mentor" (hero) → mentor-register.html
- "Seja Mentora" (mentor section) → mentor-register.html
- Navigation: Home → landing-meg.html
- Navigation: Funcionalidades → #features (scroll)
- Navigation: Seja Mentor → #mentor (scroll)
- Footer links → various pages

### From register-novo.html
- "Já tenho conta" → login-novo.html
- Back arrow → landing-meg.html

### From login-novo.html
- "Criar conta" → register-novo.html
- "Esqueceu a senha" → (future: forgot-password.html)
- On login success → dashboard-meg.html
- Back arrow → landing-meg.html

### From dashboard-meg.html
- Navigation: Dashboard → dashboard-meg.html (reload)
- Navigation: Mentorias → videochamadas-novo.html
- Navigation: Home → landing-meg.html
- Quick Action: Videochamada → videochamadas-novo.html
- Quick Action: Virar Mentora → mentor-register.html
- Quick Action: ver Oportunidades → landing-meg.html#features
- Mentor cards: "Agendar" → videochamadas-novo.html
- User menu: Logout → landing-meg.html + clear localStorage

### From videochamadas-novo.html
- Mentor card button: "Agendar Mentoria" → Start video session
- Navigation: Home → landing-meg.html
- Back button → dashboard-meg.html

### From mentor-register.html
- Back arrow → landing-meg.html
- Navigation: Home → landing-meg.html
- After success → landing-meg.html

---

## 🎨 Shared Components

### 1. Navigation Bar (em todas páginas)
```html
<nav class="glass sticky top-0">
  - Logo MEG
  - Links (dinâmico conforme página)
  - User button (se logado) com dropdown menu
</nav>
```

### 2. Footer (em todas páginas)
```html
<footer style="background: #1a1a1a; border-top: 2px solid #ca8a04">
  - Links rápidos
  - Social media (Instagram, LinkedIn, WhatsApp)
  - Email: contato@meggoianas.com.br
  - Copyright
</footer>
```

### 3. Auth.js Integration (todas páginas)
```javascript
<script src="js/auth.js"></script>
// Auto-initializes MEGAuth
// Provides: megAuth.checkSession(), megAuth.getCurrentUser(), etc
```

### 4. Color System (todas páginas)
```css
--primary: #15803d (Verde Cerrado)
--accent: #ca8a04 (Dourado Ipê)
--dark: #1a1a1a
--light: #f5f5f5
```

---

## ✅ Checklist de Links Funcionando

- ✅ landing-meg.html → register-novo.html (CTA)
- ✅ landing-meg.html → login-novo.html (navbar)
- ✅ landing-meg.html → mentor-register.html (mentor section)
- ✅ register-novo.html → login-novo.html (já tenho conta)
- ✅ register-novo.html → landing-meg.html (back)
- ✅ login-novo.html → dashboard-meg.html (on success)
- ✅ login-novo.html → landing-meg.html (back)
- ✅ dashboard-meg.html → videochamadas-novo.html (quick actions)
- ✅ dashboard-meg.html → mentor-register.html (quick actions)
- ✅ dashboard-meg.html → landing-meg.html (nav)
- ✅ videochamadas-novo.html → dashboard-meg.html (back)
- ✅ mentor-register.html → landing-meg.html (on success)

---

## 📱 Responsive Design

Todas as páginas usam **Tailwind CSS** com breakpoints:
- Mobile: < 768px (full width, single column)
- Tablet: md (768px+): 2 columns quando apropriado
- Desktop: lg (1024px+): 3+ columns para dashboard

Grid classes:
- `grid-cols-1` (mobile)
- `md:grid-cols-2` (tablet)
- `lg:grid-cols-3` (desktop)

---

Você agora tem um mapa completo de como todas as páginas se conectam! 🗺️
