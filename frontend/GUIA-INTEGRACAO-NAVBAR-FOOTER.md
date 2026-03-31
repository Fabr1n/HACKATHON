<!-- 
    GUIA DE INTEGRAÇÃO - MEG NAVBAR E FOOTER
    Copie e cole este código em todas as páginas do projeto
    
    INSTRUÇÕES:
    1. Coloque o NAVBAR logo após <body>
    2. Coloque o FOOTER logo antes de </body>
    3. Atualize os links conforme necessário
-->

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- NAVBAR MEG - COPIE ISSO LOGO APÓS <body> -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

<nav class="glass sticky top-0 z-50 p-4" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.2); font-family: 'Inter', sans-serif;">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
        <a href="landing-meg.html" class="flex items-center space-x-2">
            <div style="width: 40px; height: 40px; background: linear-gradient(to right, #15803d, #ca8a04); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <span style="font-size: 20px; font-weight: bold; color: white;">M</span>
            </div>
            <h1 style="font-size: 24px; font-weight: bold; color: #15803d; margin: 0;">MEG <span style="font-size: 12px; font-weight: normal; color: #999;">Goianas</span></h1>
        </a>
        
        <div class="hidden md:flex" style="display: none; gap: 24px; align-items: center; color: #555; font-family: 'Inter', sans-serif;">
            <a href="landing-meg.html" style="color: #555; text-decoration: none;">Início</a>
            <a href="landing-meg.html#about" style="color: #555; text-decoration: none;">O Que Somos</a>
            <a href="landing-meg.html#features" style="color: #555; text-decoration: none;">Funcionalidades</a>
            <a href="landing-meg.html#testimonials" style="color: #555; text-decoration: none;">Histórias</a>
            <a href="login-novo.html" style="background-color: #15803d; color: white; padding: 8px 20px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Login <i class="fas fa-sign-in-alt" style="margin-left: 4px;"></i></a>
        </div>
        <button class="md:hidden" style="background: none; border: none; color: #15803d; font-size: 24px; cursor: pointer;">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</nav>

<!-- Certifique-se de incluir no head: -->
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
</style>

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- FOOTER MEG - COPIE ISSO LOGO ANTES DE </body> -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

<footer style="padding: 40px; color: #999; border-top: 3px solid #ca8a04; background-color: #1a1a1a;">
    <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;">
        
        <!-- Logo e Descrição -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(to right, #15803d, #ca8a04); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <span style="font-size: 20px; font-weight: bold; color: white;">M</span>
                </div>
                <h1 style="font-size: 24px; font-weight: bold; color: white; margin: 0;">MEG <span style="font-size: 12px; font-weight: normal; color: #999;">Goianas</span></h1>
            </div>
            <p style="font-size: 14px;">O maior hub produtivo liderado por mulheres de Goiás. Empreendedorismo, Conexão e Crescimento.</p>
        </div>
        
        <!-- Links Rápidos -->
        <div>
            <h5 style="font-weight: bold; color: white; margin-bottom: 12px;">Links Rápidos</h5>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                <li><a href="landing-meg.html#hero" style="color: inherit; text-decoration: none;">Início</a></li>
                <li><a href="landing-meg.html#about" style="color: inherit; text-decoration: none;">Sobre</a></li>
                <li><a href="landing-meg.html#features" style="color: inherit; text-decoration: none;">Funcionalidades</a></li>
                <li><a href="landing-meg.html#testimonials" style="color: inherit; text-decoration: none;">Histórias</a></li>
            </ul>
        </div>
        
        <!-- Recursos -->
        <div>
            <h5 style="font-weight: bold; color: white; margin-bottom: 12px;">Recursos</h5>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                <li><a href="dashboard.html" style="color: inherit; text-decoration: none;">Dashboard</a></li>
                <li><a href="companies-register.html" style="color: inherit; text-decoration: none;">Área Corporativa</a></li>
                <li><a href="contact.html" style="color: inherit; text-decoration: none;">Contato</a></li>
                <li><a href="#" style="color: inherit; text-decoration: none;">Termos de Uso</a></li>
            </ul>
        </div>

        <!-- Redes Sociais -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <h5 style="font-weight: bold; color: white; margin: 0;">Siga-nos</h5>
            <div style="display: flex; gap: 16px;">
                <a href="#" style="font-size: 24px; color: #ca8a04; text-decoration: none;"><i class="fab fa-instagram"></i></a>
                <a href="#" style="font-size: 24px; color: #ca8a04; text-decoration: none;"><i class="fab fa-linkedin"></i></a>
                <a href="#" style="font-size: 24px; color: #ca8a04; text-decoration: none;"><i class="fab fa-whatsapp"></i></a>
            </div>
            <p style="margin: 0; font-size: 14px;">contato@meggoianas.com.br<br>Goiânia, Goiás - Brasil</p>
        </div>
    </div>
    
    <!-- Copyright -->
    <div style="max-width: 1280px; margin: 0 auto; margin-top: 40px; border-top: 1px solid #333; padding-top: 24px; text-align: center; font-size: 12px; color: #666;">
        &copy; 2026 MEG - Mulheres Empreendedoras Goianas. Todos os direitos reservados. Projeto inovador para Hackathon GO! UAI Tech / HUB CERRADO.
    </div>
</footer>

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- CHECKLIST DE PÁGINAS PARA ATUALIZAR -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

PÁGINAS A ATUALIZAR:
☐ dashboard.html        - Painel principal
☐ dashboard-new.html    - Novo painel
☐ courses.html          - Cursos
☐ editals.html          - Editais
☐ matching.html         - Matchmaking B2B
☐ chat-forum.html       - Chat/Fórum
☐ videochamadas.html    - Videochamadas
☐ companies-register.html - Registro de empresas
☐ admin.html            - Painel administrativo
☐ contact.html          - Contato
☐ about.html            - Sobre (se existir)
☐ questionnaire.html    - Questionário

<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- DICAS DE INTEGRAÇÃO -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

1. COPIAR O NAVBAR
   - Cole o código do navbar logo após <body>
   - Se a página tem um navbar antigo, remova-o primeiro
   - Atualize os links href conforme necessário

2. COPIAR O FOOTER
   - Cole o código do footer logo antes de </body>
   - Se a página tem um footer antigo, remova-o primeiro
   - Atualize os links href conforme necessário

3. VERIFICAR RECURSOS
   - Certifique-se que o <head> tem:
     a. Link do Tailwind CSS CDN
     b. Link do Font Awesome
     c. Meta charset UTF-8
     d. Meta viewport para responsividade

4. TESTAR RESPONSIVIDADE
   - Use F12 para abrir DevTools
   - Teste em diferentes tamanhos (mobile, tablet, desktop)
   - Verifique que o menu mobile funciona

5. VERIFICAR LINKS
   - Dashboard buttons → dashboard.html
   - Register buttons → register-novo.html OU register.html
   - Login buttons → login-novo.html OU login.html
   - Home buttons → landing-meg.html

<!-- ═══════════════════════════════════════════════════════════════════ -->
