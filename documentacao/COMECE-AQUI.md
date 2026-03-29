# 🎯 COMECE AQUI - Quick Start Guide

## ⚡ Em 3 Passos

### 1️⃣ Abrir Terminal
```powershell
cd "c:\Users\jessi\OneDrive\Desktop\projeto hackathon"
```

### 2️⃣ Iniciar Servidor
```powershell
node backendexpandido.js
```

Você verá:
```
🚀 Servidor rodando em http://localhost:3000
📊 Dashboard: http://localhost:3000/dashboard
🏢 Registrar Empresa: http://localhost:3000/companies
```

### 3️⃣ Abrir Browser
```
http://localhost:3000
```

✅ **Pronto!** O site está no ar!

---

## 🎮 Como Usar

### Primeira Vez?

1. **Clique em "Registrar"**
   - Email: `sua.email@aqui.com`
   - Senha: `qualquersenha123`

2. **Faça Login**
   - Use as credenciais que acabou de criar

3. **Explore o Dashboard**
   - Veja o menu à esquerda
   - Clique em "Minha Empresa" para registrar

4. **Registre sua Empresa**
   - Preencha em 4 etapas
   - Escolha o tipo e estágio
   - Receba recomendações automáticas!

5. **Veja Oportunidades**
   - Clique em "Editais"
   - Veja o score de compatibilidade
   - Candidate-se aos que interessar

6. **Faça Cursos**
   - Clique em "Cursos"
   - Veja recomendações para você
   - Matricule-se gratuitamente!

---

## 🔑 Credenciais Admin

```
Email: admin@exemplo.com
Senha: 123456
```

(Já vem pré-criada!)

---

## 📍 Páginas Principais

| Página | URL | O Quê |
|--------|-----|-------|
| **Home** | http://localhost:3000 | Landing page com visão geral |
| **Login** | http://localhost:3000/login | Entrar na plataforma |
| **Registrar** | http://localhost:3000/register | Criar nova conta |
| **Dashboard** | http://localhost:3000/dashboard | Painel principal (protegido) |
| **Empresas** | http://localhost:3000/companies | Registrar empresa |
| **Editais** | http://localhost:3000/editals | Ver oportunidades de financiamento |
| **Cursos** | http://localhost:3000/courses | Plataforma de aprendizado |

---

## 🌟 Funcionalidades Principais

### 🏢 Registrar Empresa
- 4 etapas fáceis
- Tipos: Tech, Moda, Food, Beauty, Consultoria, etc.
- Estágios: Ideia até Consolidada
- Recomendações automáticas de cursos!

### 📚 Cursos Gratuitos + Pagos
- 10+ cursos
- Recomendados para seu perfil
- Filtros por nível e categoria
- Certificados ao completar

### 💰 Editais de Financiamento
- 8+ editais disponíveis
- Búsca inteligente de compatibilidade
- Score de match mostrando % de compatibilidade
- Candidate-se direto na plataforma

### 🎯 Mentoria
- Mentoras especializadas em: Tech, Marketing, Finanças
- Agende sessões facilmente
- Conecte-se com mulheres líderes

### 🏆 Gamificação
- Ganhe pontos por ações
- Suba de nível
- Desbloqueie achievements
- Veja seu progresso

---

## 💡 Exemplos de Uso

### Empreendedora de Tech

```
1. Registra conta → +10 pts
2. Registra startup de IA → +50 pts
3. Sistema recomenda:
   - "MVP - Desenvolvimento"
   - "Levantamento de Capital"
   - "Escalabilidade"
4. Vê edital FINEP compatível (95% match)
5. Candidata-se → +30 pts
6. Faz 2 cursos → +50 pts
7. Total: 190 pts = Nível 2 ⭐
```

### Empreendedora de Moda

```
1. Registra conta → +10 pts
2. Registra loja de roupas → +50 pts
3. Sistema recomenda:
   - "Produção em Moda"
   - "E-commerce Fashion"
   - "Sustentabilidade"
4. Vê edital Instituto Ethos (88% match)
5. Agendar mentoria com Patricia
6. Total: 150+ pts = Nível 2 ⭐
```

---

## 🆘 Problemas Comuns

### ❌ "Servidor não inicia"
```powershell
# Matar processo na porta 3000
Get-Process -Name node | Stop-Process -Force
# Tentar novamente
node backendexpandido.js
```

### ❌ "Porta 3000 já em uso"
```powershell
# Ver qual processo está usando
Get-NetTCPConnection -LocalPort 3000
# Matar by PID
taskkill /PID {PID} /F
```

### ❌ "Erro ao fazer login"
- Email correto?
- Senha correta?
- Já registrou a conta?
- Servidor está rodando?

### ❌ "Dados não salvam"
- Verifique permissões da pasta
- Tente rodar seed-data.js
- Verifique espaço livre em disco

---

## 🎓 O Que Você Pode Fazer

✅ **FAZER**:
- Registrar conta
- Registrar empresa
- Ver editais
- Fazer cursos
- Agendar mentorias
- Candidatar-se a editais
- Ver progresso

❌ **NÃO FAZER** (Ainda):
- Usar em produção (sem HTTPS)
- Compartilhar senhas
- Modificar dados manualmente
- Apagar arquivos JSON

---

## 📞 Precisa de Ajuda?

### Documentação Completa

1. **README.md** - Visão técnica
2. **GUIA-USO.md** - Como usar todas as funcionalidades
3. **TECNICO.md** - Para desenvolvedores que querem estender

### Passos Rápidos

1. Verificar se servidor está rodando
2. Abrir DevTools (F12) para ver erros
3. Checar console do Node.js
4. Reiniciar tudo

---

## 🚀 Próximos Passos

Depois que explorar:

1. **Registre sua empresa** - Dê contexto ao sistema
2. **Explore editais** - Veja as oportunidades
3. **Faça um curso** - Aprenda algo novo
4. **Agende mentoria** - Converse com especialistas

---

## 🎉 Você Está Pronto!

Agora é só:

1. ✅ Terminal aberto
2. ✅ Servidor rodando
3. ✅ Browser aberto em localhost:3000
4. ✅ Começar a explorar!

**Divirta-se desenvolvendo seu empreendimento!** 💪👩‍💼🚀

---

### Versão: 1.0.0 (Hackathon Edition)
### Status: ✅ Funcionando Perfeitamente!
### Data: 28/03/2026
