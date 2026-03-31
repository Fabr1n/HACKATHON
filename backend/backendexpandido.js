const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');

const JWT_SECRET = 'sua_chave_secreta_segura_aqui'; // Change in production
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });
const PORT = 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Static files - servir frontend e logos
app.use(express.static(path.join(__dirname, '..')));
app.use('/logos', express.static(path.join(__dirname, '../logos')));
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));

// Data files - usando caminhos absolutos para evitar erros
const DATA_DIR = path.join(__dirname, '../dados');
const FILES = {
    users: path.join(DATA_DIR, 'users.json'),
    mentors: path.join(DATA_DIR, 'mentors.json'),
    questionnaires: path.join(DATA_DIR, 'questionnaires.json'),
    companies: path.join(DATA_DIR, 'companies.json'),
    courses: path.join(DATA_DIR, 'courses.json'),
    editals: path.join(DATA_DIR, 'editals.json'),
    applications: path.join(DATA_DIR, 'applications.json'),
    mentoring_sessions: path.join(DATA_DIR, 'mentoring_sessions.json'),
    user_scores: path.join(DATA_DIR, 'user_scores.json'),
    messages: path.join(DATA_DIR, 'messages.json'),
    forum_threads: path.join(DATA_DIR, 'forum_threads.json'),
    video_calls: path.join(DATA_DIR, 'video_calls.json'),
    matches: path.join(DATA_DIR, 'matches.json'),
    collaborators: path.join(DATA_DIR, 'collaborators.json'),
    enrollments: path.join(DATA_DIR, 'enrollments.json')
};

// Criar pasta dados se não existir
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files
Object.values(FILES).forEach(file => {
    if (!fs.existsSync(file)) {
        let initialData = [];
        if (file === FILES.users) {
            initialData = [{
                id: 1,
                email: 'admin@exemplo.com',
                password: '123456',
                name: 'Administrador',
                type: 'admin',
                createdAt: new Date().toISOString()
            }];
        } else if (file === FILES.editals) {
            initialData = [
                { id: 1, title: "Edital SEBRAE Mulheres", organization: "SEBRAE", description: "Apoio financeiro para mulheres empreendedoras", amount: 50000, targetTypes: ['tech', 'fashion', 'food', 'beauty', 'consulting'], targetStages: ['idea', 'pre-launch', 'launched'], minRevenue: 0, maxRevenue: 500000, deadline: "2026-12-31", status: "open", requirements: "Empresa liderada por mulher" },
                { id: 2, title: "BNDES Crédito Feminino", organization: "BNDES", description: "Linha de crédito especial para mulheres", amount: 300000, targetTypes: ['tech', 'consulting'], targetStages: ['launched', 'growing', 'established'], minRevenue: 100000, maxRevenue: 5000000, deadline: "2026-06-30", status: "open", requirements: "CNPJ ativo há mais de 1 ano" },
                { id: 3, title: "FINEP Inovação Feminina", organization: "FINEP", description: "Inovação tecnológica para empresas femininas", amount: 500000, targetTypes: ['tech'], targetStages: ['growing', 'established'], minRevenue: 0, maxRevenue: 10000000, deadline: "2026-09-15", status: "open", requirements: "Projeto inovador" }
            ];
        } else if (file === FILES.courses) {
            initialData = [
                { id: 1, title: "Gestão Financeira", instructor: "Dra. Maria Silva", description: "Aprenda a gerenciar finanças", level: "beginner", category: "finance", duration: "4 semanas", price: 0, students: 250, rating: 4.8, icon: "💰", tags: ["Financeiro"], modules: 12 },
                { id: 2, title: "Marketing Digital", instructor: "Ana Santos", description: "Estratégias de marketing", level: "intermediate", category: "marketing", duration: "6 semanas", price: 199, students: 320, rating: 4.9, icon: "📱", tags: ["Marketing"], modules: 18 },
                { id: 3, title: "Liderança Feminina", instructor: "Carla Oliveira", description: "Desenvolvimento de liderança", level: "advanced", category: "leadership", duration: "8 semanas", price: 299, students: 150, rating: 4.7, icon: "👑", tags: ["Liderança"], modules: 24 }
            ];
        } else if (file === FILES.mentors) {
            initialData = [
                { id: 1, name: "Sandra Costa", email: "sandra@meg.com", password: "123456", specialty: "Tecnologia", expertise: "Desenvolvimento de Software", background: "20 anos em startups tech, CEO em 3 empresas", availability: "Disponível", isAvailable: true, experience_level: "expert", location: "Goiânia, Goiás", keywords: ["tech", "software", "inovação"], mentoring_goals: "Ajudar mulheres a criarem startups de sucesso", past_challenges: "Capacitação de equipes e gestão de crescimento" },
                { id: 2, name: "Patricia Oliveira", email: "patricia@meg.com", password: "123456", specialty: "Marketing", expertise: "Marketing Digital e Branding", background: "Fundadora de agência digital, 500+ clientes", availability: "Disponível", isAvailable: true, experience_level: "experiente", location: "Goiânia, Goiás", keywords: ["marketing", "branding", "vendas"], mentoring_goals: "Impulsionar marcas lideradas por mulheres", past_challenges: "Captação de clientes e posicionamento de mercado" },
                { id: 3, name: "Juliana Silva", email: "juliana@meg.com", password: "123456", specialty: "Finanças", expertise: "Gestão Financeira e Investimentos", background: "CFO em empresas Fortune 500, MBA Stanford", availability: "Disponível", isAvailable: true, experience_level: "expert", location: "Anápolis, Goiás", keywords: ["finanças", "investimentos", "gestão"], mentoring_goals: "Capacitar empreendedoras em gestão financeira", past_challenges: "Controle de caixa e acesso a capital" }
            ];
        }
        fs.writeFileSync(file, JSON.stringify(initialData, null, 2));
        console.log(`✅ Arquivo criado: ${file}`);
    }
});

// ======================== MIDDLEWARE ========================
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token necessário' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = decoded;
        next();
    });
}

// ======================== HELPER FUNCTIONS ========================
function readData(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
        return [];
    }
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ======================== AI RECOMMENDATION ENGINE ========================
class RecommendationEngine {
    // Algoritmo para recomendar cursos baseado no tipo de empresa e estágio
    static recommendCourses(company) {
        const courseDatabase = {
            tech: {
                idea: ['Validação de Ideia Tech', 'MVP - Desenvolvimento', 'Pitch para Investidores'],
                'pre-launch': ['Go-to-Market Tech', 'Tração Inicial', 'Proteção de IP'],
                launched: ['Escalabilidade', 'Produto-Market Fit', 'Levantamento de Capital'],
                growing: ['Liderança em Tech', 'Internacionalização', 'M&A Preparação'],
                established: ['Inovação Contínua', 'Transformação Digital', 'ESG em Tech']
            },
            fashion: {
                idea: ['Tendências de Moda', 'Prototipagem Rápida'],
                'pre-launch': ['Produção em Moda', 'Suprimentos', 'Branding Fashion'],
                launched: ['Varejo Moda', 'E-commerce Fashion', 'Influencer Marketing'],
                growing: ['Expansão Coleções', 'Logística Moda', 'Sustentabilidade'],
                established: ['Franquias', 'Inovação Produtos', 'Mercado Internacional']
            },
            food: {
                idea: ['Receita Perfeita', 'Regulamentações de Alimentos'],
                'pre-launch': ['Cozinha Comercial', 'Licenças e Alvarás'],
                launched: ['Embalagem e Rótulos', 'Distribuição', 'APPCC'],
                growing: ['Escalabilidade Produção', 'Franquias Food', 'Segurança Alimentar'],
                established: ['Inovação Menu', 'Sustentabilidade Ambiental', 'Exportação']
            },
            beauty: {
                idea: ['Cosmética Artesanal', 'Formulação'],
                'pre-launch': ['Regulação ANVISA', 'Produção Beauty'],
                launched: ['Marketing de Beleza', 'Distribuição Retail', 'E-commerce Beauty'],
                growing: ['Marcas Concorrentes', 'Influencer Parcerias', 'Inovação Produtos'],
                established: ['Internacionalização', 'Sustentabilidade', 'Premium Positioning']
            },
            consulting: {
                idea: ['Expertise Development', 'Nicho de Mercado'],
                'pre-launch': ['Plataforma de Vendas', 'Precificação'],
                launched: ['Atração de Clientes', 'Processos Escaláveis'],
                growing: ['Equipe e Cultura', 'Especialistas', 'Reputação'],
                established: ['Expansão de Serviços', 'Internacionalização', 'Thought Leadership']
            }
        };

        const courses = courseDatabase[company.type] ? 
            courseDatabase[company.type][company.stage] : 
            ['Gestão Básica', 'Marketing Digital', 'Finanças Pessoais'];

        return courses;
    }

    // Algoritmo para identificar editais compatíveis
    static recommendEditals(company, userProfile) {
        const allEditals = readData(FILES.editals);
        const scoreSystem = {};

        allEditals.forEach(edital => {
            let score = 0;
            
            // Compatibilidade por tipo
            if (edital.targetTypes && edital.targetTypes.includes(company.type)) score += 30;
            
            // Compatibilidade por estágio
            if (edital.targetStages && edital.targetStages.includes(company.stage)) score += 25;
            
            // Compatibilidade por faturamento
            if (edital.minRevenue && company.revenue >= edital.minRevenue) score += 20;
            if (edital.maxRevenue && company.revenue <= edital.maxRevenue) score += 20;
            
            // Compatibilidade por região
            if (edital.regions && userProfile.state && edital.regions.includes(userProfile.state)) score += 15;
            
            // Compatibilidade por setor específico
            if (edital.specialRequirements && edital.specialRequirements.includes(company.type)) score += 10;
            
            scoreSystem[edital.id] = { edital, score };
        });

        return Object.values(scoreSystem)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(item => item.edital);
    }

    // Algoritmo de score e gamificação
    static calculateUserScore(userEmail) {
        const users = readData(FILES.users);
        const companies = readData(FILES.companies);
        const questionnaires = readData(FILES.questionnaires);
        const applications = readData(FILES.applications);

        let score = 0;
        score += 10; // Perfil completo
        
        const userCompanies = companies.filter(c => c.userEmail === userEmail);
        score += userCompanies.length * 50; // Por empresa registrada
        
        const userApps = applications.filter(a => a.userEmail === userEmail);
        score += userApps.length * 30; // Por edital candidatado
        
        const userQuestionnaires = questionnaires.filter(q => q.email === userEmail);
        score += userQuestionnaires.length * 20; // Por questionário completo

        return Math.min(score, 1000); // Max 1000 points
    }
}

// ======================== ROTAS - AUTENTICAÇÃO ========================
app.post('/register', (req, res) => {
    try {
        const { email, password, name, age } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email e senha necessários' });

        const users = readData(FILES.users);
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ message: 'Email já registrado' });
        }

        const newUser = {
            id: Date.now(),
            email,
            password, // TODO: Hash com bcrypt em produção
            name: name || email.split('@')[0],
            age,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeData(FILES.users, users);

        // Initialize score
        const scores = readData(FILES.user_scores);
        scores.push({ email, score: 10, level: 1 });
        writeData(FILES.user_scores, scores);

        res.json({ success: true, message: 'Usuária registrada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar' });
    }
});

app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const users = readData(FILES.users);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) return res.status(400).json({ message: 'Email ou senha incorretos' });

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token, userEmail: email });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
});

// ======================== ROTAS - MENTORES ========================
app.post('/register-mentor', (req, res) => {
    try {
        const { email, password, name, age, expertise, experience, keywords, bio } = req.body;
        if (!email || !password || !name) return res.status(400).json({ message: 'Email, senha e nome necessários' });

        const mentors = readData(FILES.mentors);
        if (mentors.find(m => m.email === email)) {
            return res.status(400).json({ message: 'Email já registrado como mentor' });
        }

        const newMentor = {
            id: Date.now(),
            email,
            password, // TODO: Hash com bcrypt em produção
            name,
            age,
            expertise: expertise || [],
            experience: experience || '',
            keywords: keywords || [],
            bio: bio || '',
            createdAt: new Date().toISOString(),
            isAvailable: true
        };

        mentors.push(newMentor);
        writeData(FILES.mentors, mentors);

        res.json({ success: true, message: 'Mentora registrada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar mentora' });
    }
});

app.post('/login-mentor', (req, res) => {
    try {
        const { email, password } = req.body;
        const mentors = readData(FILES.mentors);
        const mentor = mentors.find(m => m.email === email && m.password === password);

        if (!mentor) return res.status(400).json({ message: 'Email ou senha incorretos' });

        const token = jwt.sign({ mentorId: mentor.id, email: mentor.email, role: 'mentor' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token, mentorEmail: email });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login como mentora' });
    }
});

app.get('/mentors', (req, res) => {
    try {
        const mentors = readData(FILES.mentors);
        // Retornar apenas mentoras disponíveis com informações públicas
        const publicMentors = mentors.filter(m => m.availability === 'Disponível' || m.isAvailable === true).map(m => ({
            id: m.id,
            name: m.name,
            expertise: m.expertise || [m.specialty],
            keywords: m.keywords || [m.specialty],
            bio: m.background || m.bio || '',
            experience: m.experience || m.experience_level || '',
            location: m.location || 'Goiás',
            specialty: m.specialty || ''
        }));
        res.json(publicMentors);
    } catch (err) {
        console.error('Erro ao buscar mentoras:', err);
        res.status(500).json({ message: 'Erro ao buscar mentoras' });
    }
});

app.post('/match-mentors', (req, res) => {
    try {
        const { keywords, expertise, experience, challenges, goals, location } = req.body;
        const mentors = readData(FILES.mentors);
        const availableMentors = mentors.filter(m => m.availability === 'Disponível');

        // Algoritmo avançado de matching com múltiplos fatores
        const matches = availableMentors.map(mentor => {
            let score = 0;
            let matchFactors = {
                keywords: 0,
                expertise: 0,
                experience: 0,
                challenges: 0,
                goals: 0,
                location: 0
            };

            // 1. Matching por palavras-chave (peso: 25%)
            if (keywords && keywords.length > 0) {
                const mentorKeywords = [
                    mentor.specialty?.toLowerCase() || '',
                    mentor.expertise?.toLowerCase() || '',
                    ...(mentor.keywords || []).map(k => k.toLowerCase())
                ].filter(k => k);

                const userKeywords = keywords.map(k => k.toLowerCase());
                let keywordMatches = 0;

                userKeywords.forEach(userKey => {
                    mentorKeywords.forEach(mentorKey => {
                        // Matching exato
                        if (mentorKey === userKey) {
                            keywordMatches += 3;
                        }
                        // Matching parcial
                        else if (mentorKey.includes(userKey) || userKey.includes(mentorKey)) {
                            keywordMatches += 2;
                        }
                        // Matching por categoria relacionada
                        else if (areRelatedTerms(userKey, mentorKey)) {
                            keywordMatches += 1;
                        }
                    });
                });

                matchFactors.keywords = Math.min(keywordMatches * 5, 25); // Máximo 25 pontos
                score += matchFactors.keywords;
            }

            // 2. Matching por expertise específica (peso: 20%)
            if (expertise && mentor.expertise) {
                if (mentor.expertise.toLowerCase().includes(expertise.toLowerCase())) {
                    matchFactors.expertise = 20;
                    score += 20;
                }
            }

            // 3. Matching por nível de experiência (peso: 15%)
            if (experience && mentor.experience_level) {
                const experienceCompatibility = calculateExperienceCompatibility(experience, mentor.experience_level);
                matchFactors.experience = experienceCompatibility * 15;
                score += matchFactors.experience;
            }

            // 4. Matching por desafios enfrentados (peso: 15%)
            if (challenges && mentor.past_challenges) {
                const challengeSimilarity = calculateTextSimilarity(challenges, mentor.past_challenges);
                matchFactors.challenges = challengeSimilarity * 15;
                score += matchFactors.challenges;
            }

            // 5. Matching por objetivos (peso: 15%)
            if (goals && mentor.mentoring_goals) {
                const goalAlignment = calculateTextSimilarity(goals, mentor.mentoring_goals);
                matchFactors.goals = goalAlignment * 15;
                score += matchFactors.goals;
            }

            // 6. Matching por localização (peso: 10%)
            if (location && mentor.location) {
                if (location.toLowerCase().includes('goiás') && mentor.location.toLowerCase().includes('goiás')) {
                    matchFactors.location = 10;
                    score += 10;
                } else if (location.toLowerCase() === mentor.location.toLowerCase()) {
                    matchFactors.location = 8;
                    score += 8;
                }
            }

            return {
                id: mentor.id,
                name: mentor.name,
                expertise: [mentor.expertise],
                keywords: mentor.keywords || [mentor.specialty],
                bio: mentor.background,
                location: mentor.location,
                experience_level: mentor.experience_level,
                matchScore: Math.round(score),
                matchFactors: matchFactors,
                compatibility: score >= 60 ? 'Alto' : score >= 40 ? 'Médio' : 'Baixo'
            };
        }).filter(m => m.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);

        res.json(matches.slice(0, 5)); // Top 5 matches
    } catch (err) {
        console.error('Erro no matching:', err);
        res.status(500).json({ message: 'Erro ao buscar matches' });
    }
});

// Funções auxiliares para matching avançado
function areRelatedTerms(term1, term2) {
    const relatedTerms = {
        'startup': ['empreendedorismo', 'inovação', 'negócios', 'empresa'],
        'tecnologia': ['tech', 'software', 'digital', 'inovação'],
        'marketing': ['vendas', 'comercial', 'branding', 'digital'],
        'finanças': ['contabilidade', 'investimento', 'capital', 'lucro'],
        'liderança': ['gestão', 'equipe', 'pessoas', 'administração'],
        'inovação': ['criatividade', 'tecnologia', 'startup', 'modernização']
    };

    const term1Lower = term1.toLowerCase();
    const term2Lower = term2.toLowerCase();

    for (const [key, values] of Object.entries(relatedTerms)) {
        if ((key === term1Lower && values.includes(term2Lower)) ||
            (key === term2Lower && values.includes(term1Lower))) {
            return true;
        }
    }
    return false;
}

function calculateExperienceCompatibility(userExperience, mentorLevel) {
    const levels = {
        'iniciante': 1,
        'intermediário': 2,
        'avançado': 3,
        'experiente': 4,
        'expert': 5
    };

    const userLevel = levels[userExperience.toLowerCase()] || 2;
    const mentorLevelNum = levels[mentorLevel.toLowerCase()] || 3;

    // Mentores com nível similar ou superior são preferidos
    if (mentorLevelNum >= userLevel) {
        return Math.min((mentorLevelNum - userLevel + 1) / 3, 1);
    } else {
        return 0.3; // Ainda compatível, mas com menor pontuação
    }
}

function calculateTextSimilarity(text1, text2) {
    if (!text1 || !text2) return 0;

    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);

    const commonWords = words1.filter(word => words2.includes(word));
    const similarity = commonWords.length / Math.max(words1.length, words2.length);

    return Math.min(similarity, 1);
}

// ======================== ROTAS - QUESTIONÁRIO ========================
app.post('/questionnaire', (req, res) => {
    try {
        const { name, age, education, experience, challenges, goals, support } = req.body;
        const questionnaires = readData(FILES.questionnaires);

        const newQuestionnaire = {
            id: Date.now(),
            name,
            age: parseInt(age),
            education,
            experience,
            challenges,
            goals,
            support,
            submittedAt: new Date().toISOString()
        };

        questionnaires.push(newQuestionnaire);
        writeData(FILES.questionnaires, questionnaires);

        res.json({ success: true, message: 'Questionário enviado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao enviar questionário' });
    }
});

// ======================== ROTAS - EMPRESAS ========================
app.post('/api/companies', verifyToken, (req, res) => {
    try {
        const { name, cnpj, type, stage, revenue, employees, description } = req.body;
        const companies = readData(FILES.companies);

        const newCompany = {
            id: Date.now(),
            userEmail: req.user.email,
            name,
            cnpj,
            type,
            stage,
            revenue: parseFloat(revenue) || 0,
            employees: parseInt(employees) || 0,
            description,
            createdAt: new Date().toISOString(),
            status: 'ativa'
        };

        companies.push(newCompany);
        writeData(FILES.companies, companies);

        // Add bonus points
        const scores = readData(FILES.user_scores);
        const userScore = scores.find(s => s.email === req.user.email);
        if (userScore) {
            userScore.score += 50;
            userScore.level = Math.floor(userScore.score / 100) + 1;
        }
        writeData(FILES.user_scores, scores);

        res.json({ success: true, company: newCompany });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar empresa' });
    }
});

app.get('/api/companies', verifyToken, (req, res) => {
    try {
        const companies = readData(FILES.companies);
        const userCompanies = companies.filter(c => c.userEmail === req.user.email);
        res.json(userCompanies);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar empresas' });
    }
});

// ======================== ROTAS - RECOMENDAÇÕES ========================
app.get('/api/recommendations/courses', verifyToken, (req, res) => {
    try {
        const companies = readData(FILES.companies);
        const userCompanies = companies.filter(c => c.userEmail === req.user.email);

        if (userCompanies.length === 0) {
            return res.json({ courses: ['Gestão Básica', 'Marketing Digital', 'Finanças'] });
        }

        const mainCompany = userCompanies[0];
        const recommendedCourses = RecommendationEngine.recommendCourses(mainCompany);
        res.json({ courses: recommendedCourses });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar recomendações' });
    }
});

app.get('/api/recommendations/editals', verifyToken, (req, res) => {
    try {
        const companies = readData(FILES.companies);
        const users = readData(FILES.users);
        
        const userCompanies = companies.filter(c => c.userEmail === req.user.email);
        const user = users.find(u => u.email === req.user.email);

        if (userCompanies.length === 0) {
            return res.json({ editals: [] });
        }

        const mainCompany = userCompanies[0];
        const recommendedEditals = RecommendationEngine.recommendEditals(mainCompany, user || {});
        res.json({ editals: recommendedEditals });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar editais' });
    }
});

// ======================== ROTAS - EDITAIS ========================
app.get('/api/editals', (req, res) => {
    try {
        const editals = readData(FILES.editals);
        res.json(editals);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar editais' });
    }
});

app.post('/api/editals/apply', verifyToken, (req, res) => {
    try {
        const { editalId } = req.body;
        const applications = readData(FILES.applications);

        const application = {
            id: Date.now(),
            userEmail: req.user.email,
            editalId,
            appliedAt: new Date().toISOString(),
            status: 'pendente'
        };

        applications.push(application);
        writeData(FILES.applications, applications);

        // Add points
        const scores = readData(FILES.user_scores);
        const userScore = scores.find(s => s.email === req.user.email);
        if (userScore) {
            userScore.score += 30;
            userScore.level = Math.floor(userScore.score / 100) + 1;
        }
        writeData(FILES.user_scores, scores);

        res.json({ success: true, application });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao candidatar' });
    }
});

// ======================== ROTAS - CURSOS ========================
app.post('/api/courses/enroll', verifyToken, (req, res) => {
    try {
        const { courseTitle } = req.body;
        
        // Simular matrícula em curso
        const enrollment = {
            id: Date.now(),
            userEmail: req.user.email,
            course: courseTitle,
            enrolledAt: new Date().toISOString(),
            progress: 0,
            status: 'em-andamento'
        };

        const courses = readData(FILES.courses);
        courses.push(enrollment);
        writeData(FILES.courses, courses);

        // Add points
        const scores = readData(FILES.user_scores);
        const userScore = scores.find(s => s.email === req.user.email);
        if (userScore) {
            userScore.score += 25;
        }
        writeData(FILES.user_scores, scores);

        res.json({ success: true, enrollment });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao matricular' });
    }
});

// ======================== ROTAS - MENTORIAS ========================
app.post('/api/mentoring/schedule', verifyToken, (req, res) => {
    try {
        const { mentorId, date, time } = req.body;

        const session = {
            id: Date.now(),
            userEmail: req.user.email,
            mentorId,
            scheduledDate: date,
            scheduledTime: time,
            status: 'agendada',
            createdAt: new Date().toISOString()
        };

        const sessions = readData(FILES.mentoring_sessions);
        sessions.push(session);
        writeData(FILES.mentoring_sessions, sessions);

        // Add points
        const scores = readData(FILES.user_scores);
        const userScore = scores.find(s => s.email === req.user.email);
        if (userScore) {
            userScore.score += 20;
        }
        writeData(FILES.user_scores, scores);

        res.json({ success: true, session });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao agendar mentoria' });
    }
});

// ======================== ROTAS - PERFIL E PONTUAÇÃO ========================
app.get('/api/user/profile', verifyToken, (req, res) => {
    try {
        const users = readData(FILES.users);
        const user = users.find(u => u.email === req.user.email);
        
        const scores = readData(FILES.user_scores);
        const userScore = scores.find(s => s.email === req.user.email);

        res.json({
            user: {
                email: user.email,
                name: user.name,
                age: user.age,
                createdAt: user.createdAt
            },
            score: userScore || { score: 0, level: 1 }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar perfil' });
    }
});

app.get('/api/user/dashboard-stats', verifyToken, (req, res) => {
    try {
        const companies = readData(FILES.companies).filter(c => c.userEmail === req.user.email);
        const courses = readData(FILES.courses).filter(c => c.userEmail === req.user.email);
        const applications = readData(FILES.applications).filter(a => a.userEmail === req.user.email);
        const editals = readData(FILES.editals);

        res.json({
            companiesCount: companies.length,
            coursesCount: courses.length,
            editalCount: editals.length,
            applicationsCount: applications.length,
            completionPercentage: 45
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar estatísticas' });
    }
});

// ======================== ROTAS - ADMIN E ANALYTICS ========================
app.get('/api/admin/analytics', verifyToken, (req, res) => {
    try {
        const users = readData(FILES.users);
        const companies = readData(FILES.companies);
        const scores = readData(FILES.user_scores);

        res.json({
            totalUsers: users.length,
            totalCompanies: companies.length,
            averageScore: Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length),
            topUsers: scores.sort((a, b) => b.score - a.score).slice(0, 10)
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar analytics' });
    }
});

// ======================== ROTAS - PAGES ========================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard-new.html'));
});

app.get('/questionnaire', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/questionnaire.html'));
});

app.get('/companies', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/companies-register.html'));
});

app.get('/editals', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/editals.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/courses.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/chat-forum.html'));
});

app.get('/video', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/videochamadas.html'));
});

app.get('/match', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/matching.html'));
});

// ======================== ROTAS - CHAT & FORUM ========================
app.get('/api/messages', verifyToken, (req, res) => {
    try {
        const messages = readData(FILES.messages);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar mensagens' });
    }
});

app.post('/api/messages', verifyToken, (req, res) => {
    try {
        const { content, threadId } = req.body;
        const messages = readData(FILES.messages);
        const message = {
            id: Date.now(),
            email: req.user.email,
            content,
            threadId,
            timestamp: new Date().toISOString(),
            likes: 0
        };
        messages.push(message);
        writeData(FILES.messages, messages);
        res.json({ success: true, message });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao salvar mensagem' });
    }
});

app.get('/api/forum/threads', (req, res) => {
    try {
        const threads = readData(FILES.forum_threads);
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar threads' });
    }
});

app.post('/api/forum/threads', verifyToken, (req, res) => {
    try {
        const { title, description, category } = req.body;
        const threads = readData(FILES.forum_threads);
        const thread = {
            id: Date.now(),
            title,
            description,
            category,
            author: req.user.email,
            createdAt: new Date().toISOString(),
            replies: 0,
            views: 0
        };
        threads.push(thread);
        writeData(FILES.forum_threads, threads);
        res.json({ success: true, thread });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar thread' });
    }
});

// ======================== ROTAS - MATCHING ========================
app.get('/api/matches', verifyToken, (req, res) => {
    try {
        const companies = readData(FILES.companies);
        const userCompany = companies.find(c => c.userEmail === req.user.email);
        
        if (!userCompany) {
            return res.json({ matches: [], message: 'Registre uma empresa primeiro' });
        }
        
        const allMatches = companies.filter(c => c.userEmail !== req.user.email);
        const scoredMatches = allMatches.map(company => ({
            ...company,
            matchScore: calculateMatchScore(userCompany, company)
        })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
        
        res.json(scoredMatches);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao calcular matches' });
    }
});

app.post('/api/matches/request', verifyToken, (req, res) => {
    try {
        const { targetCompanyId } = req.body;
        const matches = readData(FILES.matches);
        const match = {
            id: Date.now(),
            senderEmail: req.user.email,
            targetCompanyId,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        matches.push(match);
        writeData(FILES.matches, matches);
        res.json({ success: true, match });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao enviar solicitação' });
    }
});

// ======================== ROTAS - VIDEOCHAMADAS ========================
app.post('/api/video/start', verifyToken, (req, res) => {
    try {
        const { targetEmail } = req.body;
        const videoCalls = readData(FILES.video_calls);
        const callId = 'call_' + Date.now();
        const call = {
            id: callId,
            initiator: req.user.email,
            participant: targetEmail,
            status: 'initiated',
            startedAt: new Date().toISOString()
        };
        videoCalls.push(call);
        writeData(FILES.video_calls, videoCalls);
        res.json({ success: true, callId });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao iniciar chamada' });
    }
});

// ======================== HELPER - MATCHING ALGORITHM ========================
function calculateMatchScore(company1, company2) {
    let score = 0;
    
    // Compatibilidade de tipo
    if (company1.type === company2.type) score += 30;
    else score += 10;
    
    // Compatibilidade de estágio
    const stageOrder = ['idea', 'pre-launch', 'launched', 'growing', 'established'];
    const stageDiff = Math.abs(stageOrder.indexOf(company1.stage) - stageOrder.indexOf(company2.stage));
    score += Math.max(0, 25 - (stageDiff * 5));
    
    // Localização
    if (company1.location === company2.location) score += 15;
    
    // Tamanho compatível
    const empDiff = Math.abs(company1.employees - company2.employees);
    score += Math.max(0, 20 - (empDiff / 10));
    
    // Receita similar
    const revDiff = Math.abs(company1.revenue - company2.revenue);
    score += Math.max(0, 10 - (revDiff / 10000));
    
    return Math.min(100, Math.floor(score));
}

// ======================== SOCKET.IO - CHAT EM TEMPO REAL ========================
const onlineUsers = {};

io.on('connection', (socket) => {
    console.log(`📱 Usuário conectado: ${socket.id}`);
    
    socket.on('user_join', (email) => {
        onlineUsers[socket.id] = email;
        io.emit('user_online', { email, count: Object.keys(onlineUsers).length });
    });
    
    socket.on('send_message', (data) => {
        const { email, content, threadId } = data;
        const message = {
            id: Date.now(),
            email,
            content,
            threadId,
            timestamp: new Date().toISOString()
        };
        
        // Salvar no banco
        try {
            const messages = readData(FILES.messages);
            messages.push(message);
            writeData(FILES.messages, messages);
        } catch (err) {
            console.log('Erro ao salvar mensagem');
        }
        
        io.emit('receive_message', message);
    });
    
    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
        io.emit('user_offline', { count: Object.keys(onlineUsers).length });
        console.log(`📴 Usuário desconectado: ${socket.id}`);
    });
});

// ======================== ROTAS - COLABORADORES ========================
app.post('/collaborators', (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            city,
            interest,
            experience,
            motivation,
            availability,
            source
        } = req.body;

        // Validação básica
        if (!name || !email || !interest || !experience || !motivation) {
            return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
        }

        // Verificar se já existe candidatura com este email
        const collaborators = readData(FILES.collaborators);
        const existingApplication = collaborators.find(c => c.email === email && c.type === 'collaborator');

        if (existingApplication) {
            return res.status(409).json({ message: 'Já existe uma candidatura com este email' });
        }

        const newCollaborator = {
            id: Date.now(),
            type: 'collaborator',
            name,
            email,
            phone: phone || '',
            city: city || '',
            interest,
            experience,
            motivation,
            availability: availability || 'flexivel',
            source: source || 'outro',
            status: 'pending',
            appliedAt: new Date().toISOString(),
            notes: ''
        };

        collaborators.push(newCollaborator);
        writeData(FILES.collaborators, collaborators);

        console.log(`Nova candidatura de colaborador: ${name} - ${interest}`);

        res.json({
            success: true,
            message: 'Candidatura recebida com sucesso! Entraremos em contato em breve.',
            applicationId: newCollaborator.id
        });
    } catch (err) {
        console.error('Erro ao processar candidatura:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// ======================== ROTAS - CURSOS PÚBLICOS ========================
app.get('/api/courses', (req, res) => {
    try {
        const courses = readData(FILES.courses);
        res.json(courses);
    } catch (err) {
        console.error('Erro ao buscar cursos:', err);
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
});

// ======================== ROTAS - EDITAIS PÚBLICOS ========================
app.get('/api/editals/public', (req, res) => {
    try {
        const editals = readData(FILES.editals);
        res.json(editals);
    } catch (err) {
        console.error('Erro ao buscar editais:', err);
        res.status(500).json({ message: 'Erro ao buscar editais' });
    }
});

// ======================== HEALTH CHECK ========================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// ======================== INICIAR SERVIDOR ========================
console.log('Iniciando servidor...');
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`💬 Chat disponível em http://localhost:${PORT}/chat`);
    console.log(`📹 Videochamadas em http://localhost:${PORT}/video`);
    console.log(`🤝 Matching em http://localhost:${PORT}/match`);
    console.log(`✅ Socket.io conectado para comunicação em tempo real`);
});

module.exports = app;
