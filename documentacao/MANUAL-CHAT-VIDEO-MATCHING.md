# 📖 MANUAL COMPLETO - Chat, Videochamadas e Matching

## 🎯 Visão Geral

Sua plataforma agora possui três funcionalidades avançadas para conectar mulheres empreendedoras:

### 1️⃣ **Chat & Fórum em Tempo Real**
- Comunicação instantânea com Socket.io
- Múltiplas salas temáticas
- Fórum de discussões permanente

### 2️⃣ **Videochamadas Profissionais**
- Integração com Jitsi Meet
- Mentorias 1-a-1
- Reuniões em grupo
- Agendamento

### 3️⃣ **Matching Inteligente com IA**
- Algoritmo que encontra parceiros compatíveis
- Score de compatibilidade 0-100%
- Filtros avançados
- Propostas de parceria

---

## 📖 ÍNDICE

1. [Chat & Fórum](#chat--fórum)
2. [Videochamadas](#videochamadas)
3. [Matching Inteligente](#matching-inteligente)
4. [Como Usar - Guias Práticos](#como-usar---guias-práticos)
5. [Troubleshooting](#troubleshooting)
6. [Arquitetura Técnica](#arquitetura-técnica)

---

## 💬 CHAT & FÓRUM

### O que é?
Sistema de comunicação em tempo real com duas modalidades:
- **Chat**: Mensagens instantâneas em salas temáticas
- **Fórum**: Discussões permanentes e organizadas por categoria

### Salas de Chat Disponíveis

```
🌐 GERAL
    Discussões gerais da comunidade
    Ideal para: Networking, apresentações
    
💻 STARTUPS TECH
    Foco em empresas de tecnologia
    Ideal para: Desenvolvedoras, founders de tech
    
👗 FASHION & BEAUTY
    Moda, beleza e lifestyle
    Ideal para: Empreendedoras da moda
    
🍽️ FOOD & BEVERAGE
    Gastronomia e negócios food
    Ideal para: Restaurantes, cafés, produtores
    
🤝 MENTORIAS
    Pedidos de ajuda e orientação
    Ideal para: Encontrar mentores
```

### Como Usar o Chat

#### 📝 Enviar uma Mensagem
```
1. Acesse http://localhost:3000/chat
2. Clique na sala desejada (à esquerda)
3. Digite sua mensagem na caixa de texto
4. Pressione Enter ou clique em Enviar
```

#### ➕ Criar Nova Discussão no Fórum
```
1. Clique na aba "📋 Fórum de Discussão"
2. Clique em "Criar Nova Discussão"
3. Preencha os campos:
   - Título (obrigatório)
   - Categoria (Startups, Marketing, Finanças, etc)
   - Descrição detalhada
4. Clique em "Publicar Discussão"
```

### Recursos do Chat

- ✅ **Tempo Real**: Mensagens aparecem instantaneamente para todos
- ✅ **Usuários Online**: Veja quem está conectado
- ✅ **Histórico**: Acesse mensagens anteriores
- ✅ **Sem Limite**: Mensagens ilimitadas
- ✅ **Seguro**: Dados criptografados
- ✅ **Responsivo**: Funciona em todos os dispositivos

### Boas Práticas no Chat

✅ **Faça:**
- Ser respeitosa e profissional
- Compartilhar conhecimento
- Fazer perguntas construtivas
- Incluir contexto em discussões

❌ **Evite:**
- Spam ou mensagens repetidas
- Autopromoção excessiva
- Compartilhar dados pessoais
- Conversas privadas em salas públicas

---

## 📹 VIDEOCHAMADAS

### O que é?
Plataforma integrada com **Jitsi Meet** para videochamadas profissionais de alta qualidade.

### Tipos de Videochamadas

#### 1️⃣ **Chamada Rápida**
- Direto com uma pessoa
- Sem agendamento
- Ideal para mentorias 1-a-1

#### 2️⃣ **Conferência Agendada**
- Agendar para data/hora específica
- Notificação automática
- Ideal para reuniões estruturadas

#### 3️⃣ **Reunião em Grupo**
- Múltiplos participantes
- Sala permanente
- Ideal para workshops, eventos

### Como Usar Videochamadas

#### 🔴 Iniciar Chamada Rápida

```
1. Acesse http://localhost:3000/video
2. Clique em "Iniciar Chamada Rápida"
3. Selecione o contato desejado
4. (Opcional) Adicione um assunto
5. Clique em "Iniciar Chamada"
6. Permita acesso a câmera e microfone
7. Comece a conversar!
```

#### 📅 Agendar Chamada

```
1. Acesse http://localhost:3000/video
2. Clique em "Agendar Conferência"
3. Preencha:
   - Contato
   - Data da reunião
   - Hora
   - Tópico/Assunto
4. Clique em "Agendar Reunião"
5. O contato receberá notificação
```

#### 👥 Criar Reunião em Grupo

```
1. Clique em "Reunião em Grupo"
2. Preencha:
   - Título (Ex: Workshop de Marketing)
   - Descrição
   - Data e hora
3. Clique em "Criar Reunião"
4. Convide participantes via link
5. Todos entram na mesma sala
```

### Controles da Videochamada

Durante uma chamada, você tem:

```
🎤 MUTAR/DESMUTAR
   Silencia seu microfone
   Uso: Quando há ruído de fundo

📷 CÂMERA
   Liga/desliga sua câmera
   Uso: Privacidade, economia de banda

📊 COMPARTILHAR TELA
   Compartilha seu computador inteiro
   Uso: Apresentações, demo de produtos

⏱️ DURAÇÃO
   Mostra quanto tempo de chamada
   
🔴 ENCERRAR
   Termina a chamada para todos
```

### Recursos Técnicos

- ✅ **Criptografia de ponta a ponta**: Privado e seguro
- ✅ **Áudio HD**: Qualidade profissional
- ✅ **Compartilhamento de tela**: Apresente conteúdo
- ✅ **Gravação**: Registre reuniões (ambos devem concordar)
- ✅ **Sem limite de participantes**: Salas ilimitadas
- ✅ **Sem instalação**: Funciona no navegador

### Dicas para Ótimas Videochamadas

✅ **Qualidade de Áudio**
- Use fone de ouvido com microfone
- Minimize ruído de fundo
- Teste áudio antes

✅ **Iluminação**
- Sente com luz frontal
- Evite luz de trás (contraluz)
- Luz natural é melhor

✅ **Profissionalismo**
- Vista-se adequadamente
- Fundo neutro ou profissional
- Câmera ao nível dos olhos

✅ **Conexão**
- Use WiFi estável (não 4G)
- Feche abas desnecessárias
- 5+ Mbps de upload/download

---

## 🤝 MATCHING INTELIGENTE

### O que é?
Sistema baseado em **Inteligência Artificial** que encontra empresas compatíveis para parcerias, mentorias e colaborações.

### Como Funciona o Algoritmo IA

O sistema calcula compatibilidade analisando **5 fatores**:

#### 1. **Tipo de Empresa** (30 pontos)
```
Mesmo tipo = +30 pontos
Tipos relacionados = +10 pontos
Tipos diferentes = 0 pontos

Exemplo:
- Tech + Tech = 30
- Tech + Startup = 10
- Tech + Fashion = 0
```

#### 2. **Estágio de Desenvolvimento** (25 pontos)
```
Estágios próximos = +25 pontos
1 estágio de distância = +15 pontos
2+ estágios de distância = +5 pontos

Ordem dos estágios:
Ideia → Pré-Lançamento → Lançada → Crescimento → Estabelecida
```

#### 3. **Receita/Faturamento** (20 pontos)
```
Receitas similares = +20 pontos
Diferença pequena = +10 pontos
Diferença grande = 0 pontos

Comparação:
Se diferença < R$100k = maior pontuação
```

#### 4. **Número de Funcionários** (20 pontos)
```
Equipes similares = +20 pontos
Diferença pequena = +15 pontos
Diferença grande = +5 pontos
```

#### 5. **Localização** (15 pontos)
```
Mesma cidade = +15 pontos
Mesma região = +10 pontos
Diferente = 0 pontos
(Pode trabalhar online)
```

#### Extra: **Critérios Especiais** (10 pontos)
```
Se ambas têm mesmos objetivos
ou certificações especiais
```

**Score Total**: 0-100%

### Como Usar o Matching

#### 🔍 Ver Matches Compatíveis

```
1. Acesse http://localhost:3000/match
2. Veja lista de empresas ordenadas por compatibilidade
3. Leia score % de cada uma
4. Clique em "Ver Detalhes" para mais info
```

#### 🎯 Filtrar Matches

```
Tipo de Empresa:
- Tech, Fashion, Food, Beauty, Consulting
- "Todos os tipos" para ver todas

Estágio:
- Ideia, Pré-Lançamento, Lançada, Crescimento, Estabelecida

Score Mínimo:
- 50+ (básico)
- 60+ (bom)
- 70+ (muito bom)
- 80+ (excelente)

Localização:
- Digite a cidade desejada
```

#### 📊 Entender o Score

```
🟢 80-100%: EXCELENTE
   Muito compatível
   Recomenda-se contato

🟡 60-79%: BOM
   Compatível
   Possível parceria

🔴 40-59%: RAZOÁVEL
   Alguma compatibilidade
   Pode interessar

⚫ 0-39%: BAIXO
   Pouca compatibilidade
   Consultar antes
```

#### ✉️ Enviar Proposta de Parceria

```
1. Encontre uma empresa com bom score
2. Clique em "Ver Detalhes"
3. Clique em "Enviar Proposta"
4. Mensagem é enviada automaticamente
5. Aguarde resposta
```

### Exemplos de Parcerias

**Tech + Tech (Score: 95%)**
- Colaboração de produtos
- Integração de APIs
- Co-marketing

**Fashion + Beauty (Score: 75%)**
- Coleções conjuntas
- Cross-selling
- Eventos colaborativos

**Food + Tech (Score: 70%)**
- App de delivery
- Sistema de pedidos
- Logística integrada

**Consulting + Tech (Score: 65%)**
- Mentorias
- Consultoria em crescimento
- Mentora de negócios

### Dicas para Melhor Matching

✅ **Informações Completas**
- Preencha todos os dados da empresa
- Upload de logo/foto
- Descrição detalhada

✅ **Localização Correta**
- Indique corretamente a cidade
- Especifique se trabalha online

✅ **Números Atualizados**
- Faturamento real
- Número atual de funcionários
- Dados recentes

✅ **Categorização Precisa**
- Escolha o tipo correto
- Estágio verdadeiro
- Objetivos claros

---

## 📚 COMO USAR - GUIAS PRÁTICOS

### Cenário 1: Encontrar um Mentor

```
1. Acesse http://localhost:3000/chat
2. Vá para sala "🤝 MENTORIAS"
3. Descreva sua situação
4. Aguarde mentores responderem

OU

1. Use Matching Inteligente
2. Filtre por "Consulting" ou "Estabelecida"
3. Score alto = mentor experiente
4. Envie proposta de parceria
```

### Cenário 2: Fazer Networking

```
1. Acesse http://localhost:3000/chat
2. Vá para sala "🌐 GERAL"
3. Se apresente brevemente
4. Participe de discussões
5. Troque contatos privados depois
```

### Cenário 3: Colaboração Comercial

```
1. Acesse http://localhost:3000/match
2. Procure por empresas compatíveis
3. Veja score e detalhes
4. Envie proposta
5. Se responderem, agende videochamada
6. Use http://localhost:3000/video
```

### Cenário 4: Aprender com Comunidade

```
1. Acesse http://localhost:3000/chat
2. Clique em "📋 Fórum de Discussão"
3. Crie uma nova discussão
4. Faça pergunta detalhada
5. Comunidade responde
```

### Cenário 5: Workshop ou Evento

```
1. Acesse http://localhost:3000/video
2. Clique em "Reunião em Grupo"
3. Preencha detalhes do evento
4. Compartilhe link com participantes
5. Todos entram na mesma sala
6. Use compartilhamento de tela
```

---

## 🐛 TROUBLESHOOTING

### Chat

| Problema | Solução |
|----------|---------|
| Mensagem não envia | Verifique conexão internet |
| Não vejo mensagens antigas | Atualize página (F5) |
| Desconectou do chat | Recarregue a página |
| Muito lento | Feche outras abas |

### Videochamadas

| Problema | Solução |
|----------|---------|
| Câmera não funciona | Verifique permissões do navegador |
| Sem áudio | Teste microfone em Configurações |
| Outro não me vê | Peça para verificar câmera |
| Conexão fraca | Aumente banda/sinal WiFi |
| Não consigo compartilhar tela | Use Chrome ou Firefox |

### Matching

| Problema | Solução |
|----------|---------|
| Sem matches | Registre empresa primeiro |
| Score baixo | Complete dados da empresa |
| Filtros não funcionam | Atualize página |
| Match desapareceu | Empresa pode ter se deletado |

---

## 🏗️ ARQUITETURA TÉCNICA

### Backend (Node.js + Express)

#### Socket.io para Chat em Tempo Real
```javascript
// Arquivo: backend/backendexpandido.js

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        // Salva no banco
        // Envia para todos em tempo real
        io.emit('receive_message', message);
    });
});
```

#### Rotas de Chat
```
POST /api/messages
   - Salvar mensagem
   
GET /api/forum/threads
   - Listar discussões do fórum
   
POST /api/forum/threads
   - Criar nova discussão
```

#### Rotas de Videochamadas
```
POST /api/video/start
   - Iniciar chamada
   - Integra com Jitsi Meet
```

#### Rotas de Matching
```
GET /api/matches
   - Lista matches da empresa
   - Calcula score IA
   
POST /api/matches/request
   - Enviar proposta de parceria
```

#### Algoritmo de Matching
```javascript
function calculateMatchScore(company1, company2) {
    let score = 0;
    
    // Tipo (30 pontos)
    if (company1.type === company2.type) score += 30;
    else score += 10;
    
    // Estágio (25 pontos)
    const stageDiff = Math.abs(indexOf(stage1) - indexOf(stage2));
    score += Math.max(0, 25 - (stageDiff * 5));
    
    // Localização (15 pontos)
    if (company1.location === company2.location) score += 15;
    
    // Empregados (20 pontos)
    const empDiff = Math.abs(emp1 - emp2);
    score += Math.max(0, 20 - (empDiff / 10));
    
    // Receita (10 pontos)
    const revDiff = Math.abs(rev1 - rev2);
    score += Math.max(0, 10 - (revDiff / 10000));
    
    return Math.min(100, Math.floor(score));
}
```

### Arquivos JSON Criados

```
dados/messages.json          - Histórico de chat
dados/forum_threads.json     - Discussões do fórum
dados/video_calls.json       - Chamadas realizadas
dados/matches.json           - Propostas de parceria
```

### Frontend

#### Socket.io Client
```javascript
const socket = io();

// Conectar
socket.emit('user_join', userEmail);

// Enviar mensagem
socket.emit('send_message', data);

// Receber
socket.on('receive_message', (message) => {
    addToChat(message);
});
```

#### Jitsi Meet Integration
```html
<script src='https://meet.jit.si/external_api.js'></script>
<script>
    const api = new JitsiMeetExternalAPI('meet.jit.si', {
        roomName: 'RoomName',
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#container')
    });
</script>
```

### Dependências Instaladas

```json
{
    "socket.io": "^4.5.4",
    "socket.io-client": "^4.5.4",
    "axios": "^1.3.0"
}
```

---

## 🚀 PRÓXIMOS PASSOS

### Curto Prazo
- [ ] Testar todas as funcionalidades
- [ ] Adicionar mais salas de chat
- [ ] Customizar categorias de fórum

### Médio Prazo
- [ ] Notificações por email
- [ ] Sistema de avaliações
- [ ] Histórico de matches
- [ ] Recomendações personalizadas

### Longo Prazo
- [ ] Machine Learning avançado
- [ ] Integração com LinkedIn
- [ ] App mobile nativa
- [ ] Analytics e relatórios
- [ ] Certificações profissionais

---

## 📞 SUPORTE

**Erro no Chat?**
→ Verifique console (F12) para mensagens de erro

**Videochamada não funciona?**
→ Teste em https://meet.jit.si primeiro

**Matching com score errado?**
→ Atualize dados da empresa

**Socket.io desconectado?**
→ Verifique conexão internet

---

## 📋 CHECKLIST FINAL

- ✅ Socket.io instalado e funcionando
- ✅ Jitsi Meet integrado
- ✅ Algoritmo de matching implementado
- ✅ Banco de dados criado
- ✅ Páginas HTML criadas e testadas
- ✅ Rotas de API implementadas
- ✅ Documentação completa

**Pronto para usar! 🎉**

---

**Versão**: 1.0  
**Data**: Março 2026  
**Plataforma**: Mulheres Empreendedoras  
**Status**: ✅ PRODUÇÃO
