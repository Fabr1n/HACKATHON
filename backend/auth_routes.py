"""
MEG - API Routes para Autenticação, Registro e Email
Integração entre Frontend e Serviço de Email
"""

from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import uuid
import os
from email_service import MEGEmailService

# Inicializar blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/api')

# Inicializar serviço de email
email_service = MEGEmailService()

# Simulação de banco de dados (será substituído por acesso a DB real)
users_db = {}
confirmation_tokens = {}
mentor_applications = {}


@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Registrar novo usuário
    Recebe dados do formulário e envia email de confirmação
    """
    try:
        data = request.get_json()
        
        # Validação básica
        if not data.get('email') or not data.get('name'):
            return jsonify({'error': 'Email e nome são obrigatórios'}), 400
        
        # Verificar se usuário já existe
        if data['email'] in users_db:
            return jsonify({'error': 'Usuário já existe'}), 409
        
        # Gerar token de confirmação
        confirmation_token = str(uuid.uuid4())
        
        # Salvar usuário como não confirmado
        user_data = {
            'id': str(uuid.uuid4()),
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'cpf': data.get('cpf'),
            'company_name': data.get('company_name'),
            'cnpj': data.get('cnpj'),
            'industry': data.get('industry'),
            'need': data.get('need'),
            'password': data.get('password'),  # Em produção, hash a senha!
            'created_at': datetime.now().isoformat(),
            'confirmed': False
        }
        
        users_db[data['email']] = user_data
        confirmation_tokens[confirmation_token] = {
            'email': data['email'],
            'expires_at': (datetime.now() + timedelta(days=1)).isoformat(),
            'type': 'email_confirmation'
        }
        
        # Enviar email de confirmação
        email_sent = email_service.send_confirmation_email(
            recipient_email=data['email'],
            recipient_name=data.get('name'),
            confirmation_token=confirmation_token
        )
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Registrodoc realizado! Verifique seu email para confirmar.',
                'user_id': user_data['id'],
                'email': data['email']
            }), 201
        else:
            return jsonify({
                'success': False,
                'error': 'Erro ao enviar email de confirmação'
            }), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login de usuário
    Valida credenciais e retorna token de sessão
    """
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400
        
        # Verificar se usuário existe
        if email not in users_db:
            return jsonify({'error': 'Email ou senha incorretos'}), 401
        
        user = users_db[email]
        
        # Verificar se email foi confirmado
        if not user.get('confirmed'):
            return jsonify({'error': 'Por favor, confirme seu email primeiro'}), 403
        
        # Verificar senha (em produção, usar bcrypt)
        if user.get('password') != password:
            return jsonify({'error': 'Email ou senha incorretos'}), 401
        
        # Gerar token de sessão
        session_token = str(uuid.uuid4())
        
        return jsonify({
            'success': True,
            'token': session_token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'company_name': user.get('company_name')
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/confirm-email/<token>', methods=['GET', 'POST'])
def confirm_email(token):
    """
    Confirmar email do usuário
    Ativa a conta do usuário após verificar o token
    """
    try:
        # Verificar se token existe e é válido
        if token not in confirmation_tokens:
            return jsonify({'error': 'Token inválido ou expirado'}), 400
        
        token_data = confirmation_tokens[token]
        
        # Verificar expiração
        expires_at = datetime.fromisoformat(token_data['expires_at'])
        if datetime.now() > expires_at:
            return jsonify({'error': 'Token expirado'}), 400
        
        # Confirmar email do usuário
        email = token_data['email']
        if email in users_db:
            users_db[email]['confirmed'] = True
            users_db[email]['confirmed_at'] = datetime.now().isoformat()
            
            # Remover token após uso
            del confirmation_tokens[token]
            
            return jsonify({
                'success': True,
                'message': 'Email confirmado com sucesso! Você pode fazer login agora.'
            }), 200
        else:
            return jsonify({'error': 'Usuário não encontrado'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/mentor-register', methods=['POST'])
def mentor_register():
    """
    Registrar novo mentor
    Recebe dados do formulário de mentor e envia email de confirmação
    """
    try:
        data = request.get_json()
        
        # Validação
        if not data.get('email') or not data.get('fullName'):
            return jsonify({'error': 'Email e nome são obrigatórios'}), 400
        
        # Gerar ID e token
        mentor_id = str(uuid.uuid4())
        confirmation_token = str(uuid.uuid4())
        
        # Salvar aplicação de mentor
        mentor_data = {
            'id': mentor_id,
            'fullName': data.get('fullName'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'cpf': data.get('cpf'),
            'bio': data.get('bio'),
            'expertise': data.getlist('expertise'),  # Se enviado como array
            'experience': data.get('experience'),
            'availability': data.get('availability'),
            'hourlyRate': data.get('hourlyRate'),
            'created_at': datetime.now().isoformat(),
            'status': 'pending'  # Aguardando confirmação
        }
        
        mentor_applications[mentor_id] = mentor_data
        confirmation_tokens[confirmation_token] = {
            'mentor_id': mentor_id,
            'email': data['email'],
            'expires_at': (datetime.now() + timedelta(days=7)).isoformat(),
            'type': 'mentor_confirmation'
        }
        
        # Enviar email de confirmação para mentor
        email_sent = email_service.send_mentor_confirmation_email(
            recipient_email=data['email'],
            recipient_name=data.get('fullName'),
            confirmation_token=confirmation_token
        )
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Seu registro como mentora foi recebido! Confirme seu email para ativar.',
                'mentor_id': mentor_id
            }), 201
        else:
            return jsonify({
                'success': False,
                'error': 'Erro ao enviar email de confirmação'
            }), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/confirm-mentor/<token>', methods=['GET', 'POST'])
def confirm_mentor(token):
    """
    Confirmar mentora
    Ativa o perfil de mentora após confirmar o email
    """
    try:
        if token not in confirmation_tokens:
            return jsonify({'error': 'Token inválido ou expirado'}), 400
        
        token_data = confirmation_tokens[token]
        
        # Verificar se é um token de mentor
        if token_data.get('type') != 'mentor_confirmation':
            return jsonify({'error': 'Token inválido'}), 400
        
        # Verificar expiração
        expires_at = datetime.fromisoformat(token_data['expires_at'])
        if datetime.now() > expires_at:
            return jsonify({'error': 'Token expirado'}), 400
        
        # Aprovar mentor
        mentor_id = token_data['mentor_id']
        if mentor_id in mentor_applications:
            mentor_applications[mentor_id]['status'] = 'approved'
            mentor_applications[mentor_id]['confirmed_at'] = datetime.now().isoformat()
            
            # Remover token após uso
            del confirmation_tokens[token]
            
            return jsonify({
                'success': True,
                'message': 'Parabéns! Seu perfil como mentora foi ativado.',
                'mentor_id': mentor_id
            }), 200
        else:
            return jsonify({'error': 'Mentora não encontrada'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """
    Solicitar recuperação de senha
    Envia email com link de recuperação
    """
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email é obrigatório'}), 400
        
        # Verificar se usuário existe
        if email not in users_db:
            # Retornar sucesso mesmo se não existir (security best practice)
            return jsonify({
                'success': True,
                'message': 'Se este email existe, você receberá um link de recuperação'
            }), 200
        
        # Gerar token de recuperação
        reset_token = str(uuid.uuid4())
        confirmation_tokens[reset_token] = {
            'email': email,
            'expires_at': (datetime.now() + timedelta(hours=1)).isoformat(),
            'type': 'password_reset'
        }
        
        user = users_db[email]
        
        # Enviar email
        email_sent = email_service.send_password_reset_email(
            recipient_email=email,
            recipient_name=user['name'],
            reset_token=reset_token
        )
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': 'Email de recuperação enviado!'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Erro ao enviar email'
            }), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    """
    Resetar senha
    Valida token e permite definição de nova senha
    """
    try:
        data = request.get_json()
        new_password = data.get('password')
        
        if not new_password:
            return jsonify({'error': 'Nova senha é obrigatória'}), 400
        
        if token not in confirmation_tokens:
            return jsonify({'error': 'Token inválido ou expirado'}), 400
        
        token_data = confirmation_tokens[token]
        
        if token_data.get('type') != 'password_reset':
            return jsonify({'error': 'Token inválido'}), 400
        
        # Verificar expiração
        expires_at = datetime.fromisoformat(token_data['expires_at'])
        if datetime.now() > expires_at:
            return jsonify({'error': 'Token expirado'}), 400
        
        # Atualizar senha
        email = token_data['email']
        if email in users_db:
            users_db[email]['password'] = new_password  # Em produção, hash!
            users_db[email]['password_reset_at'] = datetime.now().isoformat()
            
            # Remover token
            del confirmation_tokens[token]
            
            return jsonify({
                'success': True,
                'message': 'Senha alterada com sucesso! Faça login com sua nova senha.'
            }), 200
        else:
            return jsonify({'error': 'Usuário não encontrado'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/check-session', methods=['GET'])
def check_session():
    """
    Verificar sessão ativa
    Retorna dados do usuário logado
    """
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        
        if not token:
            return jsonify({'authenticated': False}), 401
        
        # Em produção, verificar token no banco de dados
        return jsonify({
            'authenticated': True,
            'message': 'Sessão ativa'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
