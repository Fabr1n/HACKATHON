// MEG - Sistema de Autenticação com Persistência de Sessão
// Este arquivo gerencia login, registro e persistência de dados

class MEGAuth {
    constructor() {
        this.storageKey = 'meg_session';
        this.userKey = 'meg_user';
        this.init();
    }

    init() {
        // Verificar sessão ao carregar página
        this.checkSession();
        // Atualizar UI baseado no estado de login
        this.updateUIAccordingToLogin();
    }

    // Salvar sessão no localStorage
    saveSession(token, user) {
        const session = {
            token: token,
            user: user,
            timestamp: Date.now(),
            expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 dias
        };
        localStorage.setItem(this.storageKey, JSON.stringify(session));
        localStorage.setItem(this.userKey, JSON.stringify(user));
        
        // Registrar no arquivo de log (simulado)
        console.log('✅ Sessão salva:', user.name);
    }

    // Recuperar sessão
    getSession() {
        const sessionData = localStorage.getItem(this.storageKey);
        if (!sessionData) return null;

        try {
            const session = JSON.parse(sessionData);
            // Verificar se expirou
            if (Date.now() - session.timestamp > session.expiresIn) {
                this.clearSession();
                return null;
            }
            return session;
        } catch (e) {
            console.error('Erro ao recuperar sessão:', e);
            return null;
        }
    }

    // Obter usuário logado
    getCurrentUser() {
        const userData = localStorage.getItem(this.userKey);
        if (!userData) return null;
        
        try {
            return JSON.parse(userData);
        } catch (e) {
            return null;
        }
    }

    // Limpar sessão
    clearSession() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.userKey);
        console.log('❌ Sessão removida');
    }

    // Verificar se há sessão ativa
    checkSession() {
        const session = this.getSession();
        if (session) {
            console.log('✅ Sessão ativa:', session.user.name);
            return true;
        }
        return false;
    }

    // Fazer login
    async login(email, password) {
        try {
            // Chamar API de login
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Falha no login');
            }

            const data = await response.json();
            
            // Salvar sessão
            this.saveSession(data.token, data.user);
            
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: error.message };
        }
    }

    // Fazer logout
    logout() {
        this.clearSession();
        this.updateUIAccordingToLogin();
        window.location.href = 'landing-meg.html';
    }

    // Registrar novo usuário
    async register(userData) {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Falha no registro');
            }

            const data = await response.json();
            
            // Salvar sessão após registro bem-sucedido
            this.saveSession(data.token, data.user);
            
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Erro no registro:', error);
            return { success: false, error: error.message };
        }
    }

    // Atualizar UI baseado em estado de login
    updateUIAccordingToLogin() {
        const user = this.getCurrentUser();
        const navLoginBtn = document.getElementById('navLoginBtn');
        
        if (user && navLoginBtn) {
            navLoginBtn.innerHTML = `<i class="fas fa-user-circle mr-2"></i>${user.name} <i class="fas fa-chevron-down ml-1"></i>`;
            navLoginBtn.href = '#';
            navLoginBtn.style.background = 'linear-gradient(to right, #15803d, #ca8a04)';
            
            // Adicionar menu dropdown
            navLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showUserMenu();
            });
        } else if (navLoginBtn) {
            navLoginBtn.innerHTML = 'Login <i class="fas fa-sign-in-alt ml-1"></i>';
            navLoginBtn.href = 'login-novo.html';
        }
    }

    // Menu de usuário
    showUserMenu() {
        const user = this.getCurrentUser();
        if (!user) return;

        const menu = document.createElement('div');
        menu.id = 'userMenu';
        menu.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            min-width: 250px;
        `;

        menu.innerHTML = `
            <div style="padding: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; border-bottom: 2px solid #f0f0f0; padding-bottom: 16px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(to right, #15803d, #ca8a04); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p style="margin: 0; font-weight: bold; color: #333;">${user.name}</p>
                        <p style="margin: 0; font-size: 12px; color: #999;">${user.email}</p>
                    </div>
                </div>
                
                <a href="dashboard.html" style="display: block; padding: 10px; color: #333; text-decoration: none; border-radius: 8px; margin-bottom: 8px;">
                    <i class="fas fa-chart-line" style="color: #15803d; margin-right: 8px;"></i> Meu Dashboard
                </a>
                <a href="profile.html" style="display: block; padding: 10px; color: #333; text-decoration: none; border-radius: 8px; margin-bottom: 8px;">
                    <i class="fas fa-user" style="color: #15803d; margin-right: 8px;"></i> Meu Perfil
                </a>
                <a href="videochamadas.html" style="display: block; padding: 10px; color: #333; text-decoration: none; border-radius: 8px; margin-bottom: 8px;">
                    <i class="fas fa-video" style="color: #15803d; margin-right: 8px;"></i> Mentorias
                </a>
                <hr style="margin: 8px 0; border: none; border-top: 1px solid #f0f0f0;">
                <button onclick="megAuth.logout()" style="width: 100%; padding: 10px; background-color: #f5f5f5; border: none; border-radius: 8px; color: #d32f2f; font-weight: bold; cursor: pointer;">
                    <i class="fas fa-sign-out-alt"></i> Sair
                </button>
            </div>
        `;

        // Remover menu anterior se existir
        const oldMenu = document.getElementById('userMenu');
        if (oldMenu) oldMenu.remove();

        document.body.appendChild(menu);

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#navLoginBtn') && !e.target.closest('#userMenu')) {
                const menu = document.getElementById('userMenu');
                if (menu) menu.remove();
            }
        });
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.getSession();
    }
}

// Instância global
const megAuth = new MEGAuth();

// Auto-executar ao carregar o documento
document.addEventListener('DOMContentLoaded', () => {
    megAuth.init();
});
