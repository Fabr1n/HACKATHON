-- Criar tabelas para a plataforma de mulheres empreendedoras

-- Tabela de usuários para login
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para questionários
CREATE TABLE IF NOT EXISTS questionnaires (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    experience TEXT,
    goals TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário de exemplo
INSERT OR IGNORE INTO users (email, password) VALUES ('admin@exemplo.com', '123456');