"""
MEG - Sistema de Envio de Emails
Configuração para envio de emails de confirmação via SMTP
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from typing import Optional

# Configuração de Email
EMAIL_CONFIG = {
    'SMTP_SERVER': os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
    'SMTP_PORT': int(os.getenv('SMTP_PORT', 587)),
    'SENDER_EMAIL': os.getenv('SENDER_EMAIL', 'contato@meggoianas.com.br'),
    'SENDER_PASSWORD': os.getenv('SENDER_PASSWORD', 'your_app_password'),
    'USE_TLS': True,
    'TIMEOUT': 10
}

class MEGEmailService:
    """Serviço de Email para MEG"""
    
    def __init__(self, config: dict = None):
        self.config = config or EMAIL_CONFIG
        self.sender_email = self.config.get('SENDER_EMAIL')
        self.sender_password = self.config.get('SENDER_PASSWORD')
        
    def send_confirmation_email(self, recipient_email: str, recipient_name: str, 
                               confirmation_token: str) -> bool:
        """Envia email de confirmação de registro"""
        
        try:
            subject = "✨ Confirme seu registro na MEG - Mulheres Empreendedoras Goianas"
            
            # Template HTML para email de confirmação
            html_template = f"""
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }}
                    .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
                    .header {{ background: linear-gradient(135deg, #15803d 0%, #ca8a04 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }}
                    .header h1 {{ margin: 0; font-size: 28px; }}
                    .header p {{ margin: 10px 0 0 0; opacity: 0.9; }}
                    .content {{ color: #333; line-height: 1.6; }}
                    .confirmation-btn {{ display: inline-block; background: linear-gradient(135deg, #15803d 0%, #ca8a04 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 20px 0; }}
                    .confirmation-btn:hover {{ opacity: 0.9; }}
                    .token-box {{ background: #f0f0f0; padding: 20px; border-radius: 6px; border-left: 4px solid #15803d; margin: 20px 0; font-family: monospace; word-break: break-all; }}
                    .footer {{ background: #f9f9f9; padding: 20px; border-radius: 6px; margin-top: 30px; text-align: center; font-size: 12px; color: #666; }}
                    .footer p {{ margin: 5px 0; }}
                    .benefits {{ background: #f0fdf4; padding: 20px; border-radius: 6px; margin: 20px 0; }}
                    .benefits h3 {{ color: #15803d; margin-top: 0; }}
                    .benefits ul {{ margin: 10px 0; padding-left: 20px; }}
                    .benefits li {{ margin: 8px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Bem-vinda à MEG!</h1>
                        <p>Mulheres Empreendedoras Goianas</p>
                    </div>

                    <div class="content">
                        <h2>Olá {recipient_name}!</h2>
                        <p>Obrigado por se registrar na MEG. Estamos muito felizes em tê-la conosco!</p>

                        <p>Para confirmar seu registro e começar a usar a plataforma, clique no botão abaixo:</p>

                        <center>
                            <a href="https://meggoianas.com/confirm-email?token={confirmation_token}" class="confirmation-btn" style="color: white;">
                                ✅ Confirmar meu Email
                            </a>
                        </center>

                        <p>Ou copie este código de confirmação:</p>
                        <div class="token-box">{confirmation_token}</div>

                        <h3 style="color: #15803d;">O que você pode fazer na MEG:</h3>
                        <div class="benefits">
                            <h3 style="margin-top: 0;">✨ Funcionalidades Disponíveis</h3>
                            <ul>
                                <li><strong>Matchmaking B2B:</strong> Conecte com grandes corporações</li>
                                <li><strong>Linhas de Crédito:</strong> Acesse financiamento personalizado</li>
                                <li><strong>Mentorias:</strong> Aprenda com líderes experientes</li>
                                <li><strong>Rede de Contatos:</strong> Expanda seus relacionamentos profissionais</li>
                                <li><strong>Recursos Exclusivos:</strong> Acesso a webinars e materiais de treinamento</li>
                            </ul>
                        </div>

                        <h3 style="color: #15803d;">Próximos Passos:</h3>
                        <ol>
                            <li>Confirme seu email clicando no botão acima</li>
                            <li>Faça login com suas credenciais</li>
                            <li>Complete seu perfil profissional</li>
                            <li>Comece a explorar oportunidades</li>
                        </ol>

                        <p>Se você encontrar qualquer dificuldade ou tiver dúvidas, não hesite em entrar em contato conosco.</p>
                    </div>

                    <div class="footer">
                        <p><strong>MEG - Mulheres Empreendedoras Goianas</strong></p>
                        <p>Goiânia, Goiás - Brasil</p>
                        <p>contato@meggoianas.com.br | (62) 3000-0000</p>
                        <p>&copy; 2026 - Todos os direitos reservados</p>
                        <p>Projeto inovador para Hackathon GO! UAI Tech / HUB CERRADO</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            return self._send_email(recipient_email, subject, html_template)
            
        except Exception as e:
            print(f"❌ Erro ao enviar email de confirmação: {e}")
            return False

    def send_mentor_confirmation_email(self, recipient_email: str, recipient_name: str,
                                      confirmation_token: str) -> bool:
        """Envia email de confirmação para mentor"""
        
        try:
            subject = "🌟 Seu Registro como Mentora MEG - Confirmação Necessária"
            
            html_template = f"""
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }}
                    .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; }}
                    .header {{ background: linear-gradient(135deg, #15803d 0%, #ca8a04 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }}
                    .confirmation-btn {{ display: inline-block; background: #15803d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 20px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌟 Bem-vinda como Mentora MEG!</h1>
                    </div>

                    <h2>Olá {recipient_name}!</h2>
                    <p>Seu registro como mentora foi recebido com sucesso! Estamos muito honrados com sua decisão de fazer parte de nossa comunidade de mentoras.</p>

                    <p>Para ativar seu perfil de mentora, clique no botão abaixo para confirmar:</p>

                    <center>
                        <a href="https://meggoianas.com/confirm-mentor?token={confirmation_token}" class="confirmation-btn">
                            ✅ Confirmar como Mentora
                        </a>
                    </center>

                    <h3>Benefícios de Ser Mentora MEG:</h3>
                    <ul>
                        <li>✨ Visibilidade Premium na plataforma</li>
                        <li>🤝 Rede exclusiva de mentoras</li>
                        <li>📹 Sessões de mentoria por vídeo seguras</li>
                        <li>🏅 Certificação MEG oficial</li>
                        <li>💼 Oportunidades de networking</li>
                    </ul>

                    <p>Após sua confirmação, você poderá começar a receber mentoradas interessadas em sua expertise.</p>

                    <p>Qualquer dúvida, entre em contato: contato@meggoianas.com.br</p>

                    <p>Um grande abraço,<br><strong>Equipe MEG</strong></p>
                </div>
            </body>
            </html>
            """
            
            return self._send_email(recipient_email, subject, html_template)
            
        except Exception as e:
            print(f"❌ Erro ao enviar email de mentor: {e}")
            return False

    def send_password_reset_email(self, recipient_email: str, recipient_name: str,
                                 reset_token: str) -> bool:
        """Envia email de recuperação de senha"""
        
        try:
            subject = "🔐 Recuperar Senha - MEG Goianas"
            
            html_template = f"""
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }}
                    .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; }}
                    .warning {{ background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 6px; margin: 20px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Recuperação de Senha</h2>
                    <p>Olá {recipient_name},</p>
                    <p>Recebemos uma solicitação para recuperar sua senha. Clique no link abaixo para redefinir:</p>

                    <a href="https://meggoianas.com/reset-password?token={reset_token}" style="display: inline-block; background: #15803d; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 20px 0;">
                        🔐 Recuperar Senha
                    </a>

                    <div class="warning">
                        <p><strong>⚠️ Importante:</strong> Este link expira em 24 horas. Se você não solicitou esta recuperação, ignore este email.</p>
                    </div>

                    <p>Equipe MEG</p>
                </div>
            </body>
            </html>
            """
            
            return self._send_email(recipient_email, subject, html_template)
            
        except Exception as e:
            print(f"❌ Erro ao enviar email de recuperação: {e}")
            return False

    def _send_email(self, recipient_email: str, subject: str, html_content: str) -> bool:
        """Método privado para enviar email via SMTP"""
        
        try:
            # Criar mensagem
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.sender_email
            message["To"] = recipient_email
            
            # Adicionar conteúdo HTML
            message.attach(MIMEText(html_content, "html", "utf-8"))
            
            # Conectar ao servidor SMTP e enviar
            with smtplib.SMTP(self.config['SMTP_SERVER'], self.config['SMTP_PORT'], 
                            timeout=self.config['TIMEOUT']) as server:
                if self.config['USE_TLS']:
                    server.starttls()
                
                server.login(self.sender_email, self.sender_password)
                server.send_message(message)
            
            print(f"✅ Email enviado para {recipient_email}")
            return True
            
        except Exception as e:
            print(f"❌ Erro ao enviar email: {e}")
            return False


# Exemplo de uso
if __name__ == "__main__":
    email_service = MEGEmailService()
    
    # Testar envio de email
    success = email_service.send_confirmation_email(
        recipient_email="test@example.com",
        recipient_name="João Silva",
        confirmation_token="ABC123XYZ789"
    )
    
    if success:
        print("✅ Email de teste enviado com sucesso!")
    else:
        print("❌ Falha ao enviar email de teste")
