const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu_segredo_jwt_aqui'; // Change to a secure secret

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Data files
const usersFile = '../dados/users.json';
const questionnairesFile = '../dados/questionnaires.json';

// Initialize data
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([{ email: 'admin@exemplo.com', password: '123456' }]));
}
if (!fs.existsSync(questionnairesFile)) {
    fs.writeFileSync(questionnairesFile, JSON.stringify([]));
}

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token necessário' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = decoded;
        next();
    });
}

// Helper functions
function readData(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'projetfront.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/questionnaire', (req, res) => {
    res.sendFile(path.join(__dirname, 'questionnaire.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        const users = readData(usersFile);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const token = jwt.sign({ email: user.email, userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
            res.json({ success: true, message: 'Login bem-sucedido!', token });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erro ao processar login.' });
    }
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    try {
        const users = readData(usersFile);
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ success: false, message: 'Email já registrado.' });
        }
        const newUser = { id: users.length + 1, email, password };
        users.push(newUser);
        writeData(usersFile, users);
        res.json({ success: true, message: 'Registro realizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erro ao registrar usuário.' });
    }
});

app.get('/dashboard', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

app.get('/admin', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

app.post('/questionnaire', (req, res) => {
    const { name, age, location, education, experience, challenges, goals, support, industry } = req.body;
    try {
        const questionnaires = readData(questionnairesFile);
        questionnaires.push({ 
            id: questionnaires.length + 1,
            name, 
            age, 
            location,
            education, 
            experience, 
            challenges, 
            goals, 
            support, 
            industry,
            submittedAt: new Date().toLocaleString('pt-BR') 
        });
        writeData(questionnairesFile, questionnaires);
        res.json({ success: true, message: 'Questionário enviado com sucesso!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erro ao salvar questionário.' });
    }
});

app.get('/api/questionnaires', verifyToken, (req, res) => {
    res.json(readData(questionnairesFile));
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});