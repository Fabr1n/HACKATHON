// MEG - Sistema de Autenticação com Backend API
// Este arquivo gerencia login, registro e comunicação com o backend

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

class MEGAuth {
    constructor() {
        this.usersKey = 'meg_users';
        this.currentUserKey = 'meg_current_user';
        this.tokenKey = 'meg_token';
        this.apiUrl = API_BASE_URL;
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

    // Registrar novo usuário via API
    async register(userData) {
        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Auto-login após registro
                if (result.token) {
                    localStorage.setItem(this.tokenKey, result.token);
                    this.saveCurrentUser({
                        email: userData.email,
                        name: userData.name,
                        type: userData.type || 'user'
                    });
                }
                console.log('✅ Usuário registrado:', userData.name);
                return { success: true, user: { email: userData.email, name: userData.name } };
            } else {
                return { success: false, error: result.message || 'Erro ao registrar' };
            }
        } catch (error) {
            console.error('Erro no registro:', error);
            // Fallback para modo offline
            return this.registerOffline(userData);
        }
    }

    // Registro offline (fallback)
    registerOffline(userData) {
        try {
            const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');

            // Verificar se email já existe
            if (users.some(u => u.email === userData.email)) {
                return { success: false, error: 'Email já cadastrado!' };
            }

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

            console.log('✅ Usuário registrado (offline):', newUser.name);
            return { success: true, user: newUser };
        } catch (error) {
            console.error('Erro no registro offline:', error);
            return { success: false, error: error.message };
        }
    }

    // Fazer login via API
    async login(email, password) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Salvar token
                if (result.token) {
                    localStorage.setItem(this.tokenKey, result.token);
                }

                // Buscar dados do usuário
                const userData = {
                    email: result.userEmail || email,
                    name: result.name || email.split('@')[0]
                };

                this.saveCurrentUser(userData);
                console.log('✅ Login realizado:', userData.email);
                return { success: true, user: userData };
            } else {
                // Tentar login offline
                return this.loginOffline(email, password);
            }
        } catch (error) {
            console.error('Erro no login:', error);
            // Fallback para modo offline
            return this.loginOffline(email, password);
        }
    }

    // Login offline (fallback)
    loginOffline(email, password) {
        try {
            const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                return { success: false, error: 'Email ou senha incorretos!' };
            }

            this.saveCurrentUser(user);
            console.log('✅ Login realizado (offline):', user.name);
            return { success: true, user };
        } catch (error) {
            console.error('Erro no login offline:', error);
            return { success: false, error: 'Erro ao fazer login. Tente novamente.' };
        }
    }

    // Registrar mentora via API
    async registerMentor(mentorData) {
        try {
            const response = await fetch(`${this.apiUrl}/register-mentor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mentorData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log('✅ Mentora registrada:', mentorData.name);
                return { success: true };
            } else {
                return { success: false, error: result.message || 'Erro ao registrar mentora' };
            }
        } catch (error) {
            console.error('Erro no registro de mentora:', error);
            return { success: false, error: 'Erro ao registrar mentora. Tente novamente.' };
        }
    }

    // Login de mentora via API
    async loginMentor(email, password) {
        try {
            const response = await fetch(`${this.apiUrl}/login-mentor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                if (result.token) {
                    localStorage.setItem(this.tokenKey, result.token);
                }

                const userData = {
                    email: result.mentorEmail || email,
                    name: result.name || email.split('@')[0],
                    type: 'mentor'
                };

                this.saveCurrentUser(userData);
                console.log('✅ Login de mentora realizado:', userData.email);
                return { success: true, user: userData };
            } else {
                return { success: false, error: result.message || 'Email ou senha incorretos!' };
            }
        } catch (error) {
            console.error('Erro no login de mentora:', error);
            return { success: false, error: 'Erro ao fazer login. Tente novamente.' };
        }
    }

    // Buscar mentoras da API
    async getMentors() {
        try {
            const response = await fetch(`${this.apiUrl}/mentors`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Erro ao buscar mentoras:', error);
            return [];
        }
    }

    // Fazer match de mentoras
    async matchMentors(criteria) {
        try {
            const response = await fetch(`${this.apiUrl}/match-mentors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(criteria)
            });

            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Erro ao fazer match:', error);
            return [];
        }
    }

    // Buscar cursos da API
    async getCourses() {
        try {
            const response = await fetch(`${this.apiUrl}/api/courses`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            return [];
        }
    }

    // Buscar editais da API
    async getEditals() {
        try {
            const response = await fetch(`${this.apiUrl}/api/editals/public`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Erro ao buscar editais:', error);
            return [];
        }
    }

    // Fazer logout
    logout() {
        localStorage.removeItem(this.currentUserKey);
        localStorage.removeItem(this.tokenKey);
        console.log('❌ Logout realizado');
        this.updateUIAccordingToLogin();
    }

    // Salvar usuário atual
    saveCurrentUser(user) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        this.updateUIAccordingToLogin();
    }

    // Obter usuário logado
    getCurrentUser() {
        const userData = localStorage.getItem(this.currentUserKey);
        return userData ? JSON.parse(userData) : null;
    }

    // Obter token
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    // Verificar se há sessão ativa
    checkSession() {
        const user = this.getCurrentUser();
        const token = this.getToken();
        if (user && token) {
            console.log('✅ Sessão ativa:', user.name || user.email);
            return true;
        }
        return false;
    }

    // Verificar autenticação e redirecionar se necessário
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login-novo.html';
            return false;
        }
        return true;
    }

    // Obter todos os usuários (apenas local)
    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    }

    // Atualizar UI baseado em estado de login
    updateUIAccordingToLogin() {
        const user = this.getCurrentUser();
        const navLoginBtns = document.querySelectorAll('.nav-login-btn');

        navLoginBtns.forEach(btn => {
            if (user) {
                btn.innerHTML = `<i class="fas fa-user-circle mr-2"></i>${user.name || user.email} <i class="fas fa-chevron-down ml-1"></i>`;
                btn.href = '#';
                btn.onclick = (e) => {
                    e.preventDefault();
                    this.showUserMenu();
                };
            } else {
                btn.innerHTML = 'Entrar <i class="fas fa-sign-in-alt ml-1"></i>';
                btn.href = 'login-novo.html';
                btn.onclick = null;
            }
        });
    }

    // Menu de usuário
    showUserMenu() {
        const user = this.getCurrentUser();
        if (!user) return;

        const existingMenu = document.getElementById('userMenu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.id = 'userMenu';
        menu.className = 'fixed top-20 right-4 bg-white rounded-xl shadow-2xl z-50 min-w-64 border border-gray-100';
        menu.style.cssText = 'animation: fadeIn 0.2s ease;';

        menu.innerHTML = `
            <div class="p-4">
                <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background: linear-gradient(135deg, #15803d, #ca8a04);">
                        ${(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="font-bold text-gray-900">${user.name || user.email.split('@')[0]}</p>
                        <p class="text-xs text-gray-500">${user.email}</p>
                    </div>
                </div>

                <nav class="space-y-1">
                    <a href="dashboard-novo.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition">
                        <i class="fas fa-chart-line text-green-600"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="matching-novo.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition">
                        <i class="fas fa-heart text-green-600"></i>
                        <span>Matches</span>
                    </a>
                    <a href="courses-novo.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition">
                        <i class="fas fa-graduation-cap text-green-600"></i>
                        <span>Cursos</span>
                    </a>
                    <a href="videochamadas-novo.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition">
                        <i class="fas fa-video text-green-600"></i>
                        <span>Videochamadas</span>
                    </a>
                </nav>

                <div class="mt-4 pt-4 border-t border-gray-100">
                    <button onclick="megAuth.logout(); window.location.href='landing-meg.html';" class="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sair da conta</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(menu);

        // Fechar ao clicar fora
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!e.target.closest('#userMenu') && !e.target.closest('.nav-login-btn')) {
                    const menu = document.getElementById('userMenu');
                    if (menu) menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    // Requisição autenticada
    async authenticatedRequest(endpoint, options = {}) {
        const token = this.getToken();
        if (!token) {
            throw new Error('Não autenticado');
        }

        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 403) {
            // Token expirado ou inválido
            this.logout();
            window.location.href = 'login-novo.html';
            return null;
        }

        return response;
    }
}

// Instância global
const megAuth = new MEGAuth();

// Auto-executar ao carregar o documento
document.addEventListener('DOMContentLoaded', () => {
    megAuth.init();
});

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MEGAuth;
}
