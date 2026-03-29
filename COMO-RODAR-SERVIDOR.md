# 🚀 Como Rodar o Servidor MEG

## Problema: localhost:3000 fora do ar?

Seguindo este guia, você consegue rodar o servidor em segundos!

---

## OPÇÃO 1: Rodar Frontend (HTML + CSS)

### Via Python (Mais rápido ✅)
```bash
cd frontend
python -m http.server 8000
```
Depois acesse: **http://localhost:8000**

### Via Node.js (se tiver npm instalado)
```bash
cd frontend
npx http-server -p 3000
```
Depois acesse: **http://localhost:3000**

---

## OPÇÃO 2: Rodar Backend (API Flask)

```bash
cd backend
python backend.py
```

O servidor vai rodar em: **http://localhost:5000**

---

## OPÇÃO 3: Rodar TUDO JUNTO (Frontend + Backend)

### Terminal 1 (Backend)
```bash
cd backend
python backend.py
```
Vai rodar em: **http://localhost:5000**

### Terminal 2 (Frontend)
```bash
cd frontend
python -m http.server 8000
```
Vai rodar em: **http://localhost:8000**

---

## ⚡ Comando Rápido (Windows - PowerShell)

### Iniciar Backend:
```powershell
# Na pasta projeto-hackathon-main
cd backend; python backend.py
```

### Iniciar Frontend (novo PowerShell):
```powershell
# Na pasta projeto-hackathon-main
cd frontend; python -m http.server 8000
```

---

## 🌐 Portas Utilizadas

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend (Python) | 8000 | http://localhost:8000 |
| Frontend (npm) | 3000 | http://localhost:3000 |
| Backend (Flask) | 5000 | http://localhost:5000 |

---

## ✅ Checklist de Funcionamento

- [ ] Backend rodando em 5000
- [ ] Frontend rodando em 8000 (ou 3000)
- [ ] Página landing-meg.html carrega em http://localhost:8000
- [ ] Botões são visíveis (cores não brancas)
- [ ] Cards têm imagens/cores (Hub azul, Match verde, Capacitação amarela)
- [ ] Registre o Perfil está em verde e visível

---

## 🔧 Troubleshooting

### "Port XXX already in use"
**Solução:** Mude a porta:
```bash
python -m http.server 9000  # Usa 9000 em vez de 8000
```

### "No module named 'python'"
**Solução:** Use `python3`:
```bash
python3 -m http.server 8000
```

### Página blank/branca
1. Abra `http://localhost:8000/landing-meg.html`
2. Pressione `F12` (Developer Tools)
3. Veja a aba "Console" - há erros?
4. Se há, reporte o erro

---

## 📝 Nota

- **Frontend** é estático: abra arquivo .html direto ou via servidor
- **Backend** é dinâmico: PRECISA rodar via `python backend.py`
- Ambos rodando = funcionalidade total (login, registro, API)

Qualquer dúvida, reporte o erro exato! 🚀
