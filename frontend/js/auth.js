// MEG - Sistema de Autenticação com Persistência de Sessão
// Este arquivo gerencia login, registro e persistência de dados

class MEGAuth {
    constructor() {
        this.usersKey = 'meg_users';
        this.currentUserKey = 'meg_current_user';
        this.init();
    }

    init() {
        this.ensureStorageInitialized();
        this.checkSession();
        this.updateUIAccordingToLogin();
    }

    // Garantir que o storage existe
    ensureStorageInitialized() {
        if (!localStorage.getItem(this.usersKey)) {
            localStorage.setItem(this.usersKey, JSON.stringify([]));
        }
    }

    // Registrar novo usuário
    register(userData) {
        try {
            const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
            
            // Verificar se email já existe
            if (users.some(u => u.email === userData.email)) {
                return { success: false, error: 'Email já cadastrado!' };
            }

            // Criar novo usuário
            const newUser = {
                id: Date.now().toString(),
                ...userData,
                createdAt: new Date().toISOString(),
                favorites: []
            };

            users.push(newUser);
            localStorage.setItem(this.usersKey, JSON.stringify(users));
            
            // Auto-login
            this.saveCurrentUser(newUser);
            
            console.log('✅ Usuário registrado:', newUser.name);
            return { success: true, user: newUser };
        } catch (error) {
            console.error('Erro no registro:', error);
            return { success: false, error: error.message };
        }
    }

    // Fazer login
    login(email, password) {
        try {
            const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                return { success: false, error: 'Email ou senha incorretos!' };
            }

            this.saveCurrentUser(user);
            console.log('✅ Login realizado:', user.name);
            return { success: true, user };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: error.message };
        }
    }

    // Fazer logout
    logout() {
        localStorage.removeItem(this.currentUserKey);
        console.log('❌ Logout realizado');
        this.updateUIAccordingToLogin();
    }

    // Salvar usuário atual
    saveCurrentUser(user) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }

    // Obter usuário logado
    getCurrentUser() {
        const userData = localStorage.getItem(this.currentUserKey);
        return userData ? JSON.parse(userData) : null;
    }

    // Verificar se há sessão ativa
    checkSession() {
        const user = this.getCurrentUser();
        if (user) {
            console.log('✅ Sessão ativa:', user.name);
            return true;
        }
        return false;
    }

    // Obter todos os usuários
    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
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
                
                <a href="dashboard-novo.html" style="display: block; padding: 10px; color: #333; text-decoration: none; border-radius: 8px; margin-bottom: 8px;">
                    <i class="fas fa-chart-line" style="color: #15803d; margin-right: 8px;"></i> Dashboard
                </a>
                <a href="#profile" style="display: block; padding: 10px; color: #333; text-decoration: none; border-radius: 8px; margin-bottom: 8px;">
                    <i class="fas fa-user" style="color: #15803d; margin-right: 8px;"></i> Perfil
                </a>
                <a href="matching-novo.html" style="display: block; padding: 10px; color: #333; text-decoration: none; border-radius: 8px; margin-bottom: 8px;">
                    <i class="fas fa-heart" style="color: #15803d; margin-right: 8px;"></i> Matches
                </a>
                <hr style="margin: 8px 0; border: none; border-top: 1px solid #f0f0f0;">
                <button onclick="megAuth.logout(); window.location.href='landing-meg.html';" style="width: 100%; padding: 10px; background-color: #f5f5f5; border: none; border-radius: 8px; color: #d32f2f; font-weight: bold; cursor: pointer;">
                    <i class="fas fa-sign-out-alt"></i> Sair
                </button>
            </div>
        `;

        const oldMenu = document.getElementById('userMenu');
        if (oldMenu) oldMenu.remove();

        document.body.appendChild(menu);

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#navLoginBtn') && !e.target.closest('#userMenu')) {
                const menu = document.getElementById('userMenu');
                if (menu) menu.remove();
            }
        });
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.getCurrentUser();
    }
}

// Instância global
const megAuth = new MEGAuth();

// Auto-executar ao carregar o documento
document.addEventListener('DOMContentLoaded', () => {
    megAuth.init();
});
