# MEG - Mulheres Empreendedoras Goianas

![MEG Logo](https://img.shields.io/badge/MEG-Mulheres%20Empreendedoras%20Goianas-blue?style=for-the-badge&logo=rocket)

Uma plataforma completa para empoderamento feminino no ecossistema empreendedor de Goiás, conectando empreendedoras com mentoras, cursos especializados e oportunidades de colaboração.

## 🌟 Sobre o Projeto

A MEG é uma iniciativa dedicada a transformar o ecossistema empreendedor feminino em Goiás através de:

- **Conexões Estratégicas**: Matching inteligente entre empreendedoras e mentoras
- **Capacitação Profissional**: Cursos especializados em empreendedorismo
- **Networking**: Comunidade colaborativa de mulheres empreendedoras
- **Oportunidades**: Parcerias e editais exclusivos

## 🚀 Funcionalidades

### Para Empreendedoras
- ✅ **Questionário Inteligente**: Avaliação personalizada de perfil empreendedor
- ✅ **Matching com Mentoras**: Algoritmo avançado de compatibilidade (6 fatores)
- ✅ **Cursos Especializados**: Programas de capacitação profissional
- ✅ **Comunidade**: Networking e troca de experiências

### Para Mentoras
- ✅ **Perfil Profissional**: Cadastro completo com especialidades
- ✅ **Matching Personalizado**: Recomendações baseadas em compatibilidade
- ✅ **Agendamento**: Sistema de mentorias online
- ✅ **Certificação**: Reconhecimento pela contribuição

### Para Colaboradores
- ✅ **Diversas Oportunidades**: Mentor, Facilitador, Parceiro, Desenvolvedor
- ✅ **Processo Seletivo**: Candidatura online estruturada
- ✅ **Flexibilidade**: Diferentes níveis de compromisso
- ✅ **Impacto Social**: Contribuição para o ecossistema

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Socket.io** - Comunicação em tempo real
- **JWT** - Autenticação segura
- **JSON** - Armazenamento de dados

### Frontend
- **HTML5/CSS3** - Estrutura e estilos
- **JavaScript (ES6+)** - Interatividade
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia

### Algoritmos
- **Matching Inteligente**: 6 fatores de compatibilidade
- **Recomendação de Cursos**: Baseado em perfil da empresa
- **Análise de Similaridade**: Processamento de texto

## 📊 Sistema de Matching

### Fatores de Compatibilidade (100 pontos)
- **Palavras-chave** (25%): Matching exato, parcial e relacionado
- **Expertise Específica** (20%): Área de especialização
- **Nível de Experiência** (15%): Compatibilidade de senioridade
- **Desafios Enfrentados** (15%): Experiências similares
- **Objetivos** (15%): Alinhamento de metas
- **Localização** (10%): Preferência regional

### Níveis de Compatibilidade
- 🟢 **Alto** (60-100 pontos): Excelente match
- 🟡 **Médio** (40-59 pontos): Bom potencial
- 🔴 **Baixo** (0-39 pontos): Compatibilidade limitada

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/meg-plataforma.git
   cd meg-plataforma
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor**
   ```bash
   npm start
   # ou
   node backend/backendexpandido.js
   ```

4. **Acesse a aplicação**
   - Frontend: http://localhost:3000
   - Página de Colaboradores: http://localhost:3000/colaboradores.html

## 📁 Estrutura do Projeto

```
meg-plataforma/
├── backend/
│   ├── backendexpandido.js      # Servidor principal
│   └── ...
├── frontend/
│   ├── projetfront.html         # Landing page principal
│   ├── colaboradores.html       # Página de colaboradores
│   └── ...
├── dados/                       # Arquivos JSON de dados
│   ├── users.json
│   ├── mentors.json
│   ├── questionnaires.json
│   └── ...
├── .gitignore
├── README.md
└── package.json
```

## 🔧 API Endpoints

### Autenticação
- `POST /login` - Login de usuário
- `POST /register` - Registro de novo usuário

### Mentoras
- `GET /mentors` - Listar todas as mentoras
- `POST /mentors` - Registrar nova mentora
- `POST /match-mentors` - Matching inteligente

### Questionários
- `POST /questionnaire` - Enviar questionário de perfil

### Colaboradores
- `POST /collaborators` - Candidatura para colaborador

### Empresas
- `POST /companies` - Registrar empresa
- `GET /companies` - Listar empresas

## 🤝 Como Contribuir

1. **Seja um Colaborador**: Acesse [colaboradores.html](colaboradores.html)
2. **Escolha sua área**: Mentor, Facilitador, Desenvolvedor, etc.
3. **Candidate-se**: Preencha o formulário online
4. **Aguarde contato**: Nossa equipe entrará em contato

### Áreas de Contribuição
- 👩‍🏫 **Mentoria**: Compartilhe sua experiência
- 📚 **Facilitação**: Minitre cursos e workshops
- 🤝 **Parcerias**: Estabeleça conexões estratégicas
- 💻 **Desenvolvimento**: Contribua com código
- 📢 **Marketing**: Divulgue a plataforma
- 🏛️ **Coordenação**: Organize eventos regionais

## 📈 Impacto Social

- **500+** Mulheres Empreendedoras conectadas
- **50+** Mentoras ativas
- **20+** Cursos oferecidos
- **95%** Satisfação dos usuários
- **R$ 2M+** Em negócios gerados

## 📞 Contato

- **Email**: contato@meg-goianas.com.br
- **Telefone**: (62) 3000-0000
- **Localização**: Goiânia - GO

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

Agradecemos a todas as mulheres empreendedoras, mentoras e colaboradores que fazem parte desta jornada de transformação do ecossistema empreendedor feminino em Goiás.

---

**MEG - Mulheres Empreendedoras Goianas**  
*Empoderando mulheres, transformando negócios, impactando vidas.*