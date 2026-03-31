// MEG - Componentes Compartilhados
// Injeta navbar e footer automaticamente nas páginas

class MEGComponents {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
    }

    // Criar navbar
    createNavbar() {
        const isAuthenticated = megAuth && megAuth.isAuthenticated();
        const user = isAuthenticated ? megAuth.getCurrentUser() : null;

        const nav = document.createElement('nav');
        nav.className = 'glass sticky top-0 z-50 shadow-md';
        nav.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <a href="landing-meg.html" class="flex items-center space-x-3">
                    <img src="/logos/2-removebg-preview.png" alt="MEG" class="h-10 w-auto drop-shadow">
                    <div>
                        <h1 class="text-2xl font-bold text-meg-primary">MEG</h1>
                        <p class="text-xs text-gray-600">Mulheres Empreendedoras Goianas</p>
                    </div>
                </a>

                <div class="hidden md:flex space-x-6 items-center">
                    <a href="landing-meg.html" class="text-gray-700 hover:text-meg-primary transition ${this.isActive('landing-meg.html')}">Home</a>
                    <a href="como-funciona-novo.html" class="text-gray-700 hover:text-meg-primary transition ${this.isActive('como-funciona-novo.html')}">Como Funciona</a>
                    <a href="contact.html" class="text-gray-700 hover:text-meg-primary transition ${this.isActive('contact.html')}">Contato</a>

                    ${isAuthenticated ? `
                        <div class="relative">
                            <button id="navUserBtn" class="flex items-center gap-2 text-gray-700 hover:text-meg-primary transition">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style="background: linear-gradient(135deg, #15803d, #ca8a04);">
                                    ${(user.name || user.email).charAt(0).toUpperCase()}
                                </div>
                                <span>${user.name || user.email.split('@')[0]}</span>
                                <i class="fas fa-chevron-down text-xs"></i>
                            </button>
                        </div>
                    ` : `
                        <a href="login-novo.html" class="nav-login-btn bg-meg-primary text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
                            Entrar
                        </a>
                    `}
                </div>

                <button class="md:hidden text-meg-primary text-2xl" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden bg-white border-t">
                <div class="px-4 py-3 space-y-2">
                    <a href="landing-meg.html" class="block py-2 text-gray-700 hover:text-meg-primary">Home</a>
                    <a href="como-funciona-novo.html" class="block py-2 text-gray-700 hover:text-meg-primary">Como Funciona</a>
                    <a href="contact.html" class="block py-2 text-gray-700 hover:text-meg-primary">Contato</a>
                    ${isAuthenticated ? `
                        <a href="dashboard-novo.html" class="block py-2 text-gray-700 hover:text-meg-primary">Dashboard</a>
                        <a href="matching-novo.html" class="block py-2 text-gray-700 hover:text-meg-primary">Matches</a>
                        <button onclick="megAuth.logout(); window.location.href='landing-meg.html';" class="block py-2 text-red-600 w-full text-left">Sair</button>
                    ` : `
                        <a href="login-novo.html" class="block py-2 text-meg-primary font-bold">Entrar</a>
                    `}
                </div>
            </div>
        `;

        // Adicionar event listeners
        setTimeout(() => {
            const mobileMenuBtn = nav.querySelector('#mobileMenuBtn');
            const mobileMenu = nav.querySelector('#mobileMenu');

            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Dropdown do usuário
            const navUserBtn = nav.querySelector('#navUserBtn');
            if (navUserBtn) {
                navUserBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (megAuth) megAuth.showUserMenu();
                });
            }
        }, 0);

        return nav;
    }

    // Criar footer
    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'bg-gray-900 text-gray-300 py-12 px-4 border-t-4 border-meg-accent';
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <img src="/logos/2-removebg-preview.png" alt="MEG" class="h-10 w-auto">
                        <div>
                            <p class="font-bold text-white">MEG</p>
                            <p class="text-xs">Goianas</p>
                        </div>
                    </div>
                    <p class="text-sm">Hub de inteligência para mulheres empreendedoras de Goiás.</p>
                </div>

                <div>
                    <h5 class="font-bold text-white mb-3">Plataforma</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="dashboard-novo.html" class="hover:text-meg-accent transition">Dashboard</a></li>
                        <li><a href="matching-novo.html" class="hover:text-meg-accent transition">Matches</a></li>
                        <li><a href="courses-novo.html" class="hover:text-meg-accent transition">Cursos</a></li>
                        <li><a href="mentor-register-novo.html" class="hover:text-meg-accent transition">Mentorias</a></li>
                    </ul>
                </div>

                <div>
                    <h5 class="font-bold text-white mb-3">Links Úteis</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="landing-meg.html" class="hover:text-meg-accent transition">Início</a></li>
                        <li><a href="como-funciona-novo.html" class="hover:text-meg-accent transition">Como Funciona</a></li>
                        <li><a href="contact.html" class="hover:text-meg-accent transition">Contato</a></li>
                        <li><a href="esg-programs-novo.html" class="hover:text-meg-accent transition">ESG</a></li>
                    </ul>
                </div>

                <div>
                    <h5 class="font-bold text-white mb-3">Siga-nos</h5>
                    <div class="flex space-x-4">
                        <a href="#" class="text-2xl hover:text-meg-accent transition" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-2xl hover:text-meg-accent transition" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-2xl hover:text-meg-accent transition" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            <div class="max-w-7xl mx-auto border-t border-gray-700 pt-8 text-center text-sm">
                <p>&copy; ${new Date().getFullYear()} MEG - Mulheres Empreendedoras Goianas. Todos os direitos reservados. 💚</p>
            </div>
        `;
        return footer;
    }

    // Verificar se página está ativa
    isActive(page) {
        return this.currentPage === page ? 'text-meg-primary font-bold' : '';
    }

    // Injetar componentes na página
    inject() {
        // Verificar se já existem
        const existingNav = document.querySelector('nav');
        const existingFooter = document.querySelector('footer');

        // Injetar navbar no início do body
        if (!existingNav) {
            const nav = this.createNavbar();
            document.body.insertBefore(nav, document.body.firstChild);
        }

        // Injetar footer no final do body
        if (!existingFooter) {
            const footer = this.createFooter();
            document.body.appendChild(footer);
        }
    }
}

// Instância global
let megComponents;

// Injetar componentes quando o DOM estiver pronto
if (typeof megAuth !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        megComponents = new MEGComponents();
        megComponents.inject();
    });
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MEGComponents;
}
