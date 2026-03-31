"""
MEG - Mulheres Empreendedoras Goianas
Backend Main Application File
"""

from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
import logging
from datetime import datetime

# Import blueprints and services
from email_service import MEGEmailService
from auth_routes import auth_bp

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('meg_app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Configure CORS for frontend access
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:8000",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:8000",
            "http://localhost:5000",
            os.getenv('FRONTEND_URL', 'http://localhost:3000')
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize Email Service
email_config = {
    'SMTP_SERVER': os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
    'SMTP_PORT': int(os.getenv('SMTP_PORT', 587)),
    'SENDER_EMAIL': os.getenv('SENDER_EMAIL'),
    'SENDER_PASSWORD': os.getenv('SENDER_PASSWORD'),
    'USE_TLS': os.getenv('USE_TLS', 'True').lower() == 'true'
}

try:
    email_service = MEGEmailService(email_config)
    logger.info('✅ Email service initialized successfully')
except Exception as e:
    logger.warning(f'⚠️ Email service initialization warning: {str(e)}')

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# ===== HEALTH CHECKS & STATUS ENDPOINTS =====

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'MEG Backend API',
        'version': '1.0.0'
    }), 200

@app.route('/api/status', methods=['GET'])
def api_status():
    """API status endpoint"""
    return jsonify({
        'status': 'operational',
        'endpoints': {
            'auth': '/api/auth/*',
            'health': '/health',
            'status': '/api/status'
        },
        'environment': os.getenv('ENVIRONMENT', 'development')
    }), 200

# ===== ERROR HANDLERS =====

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Endpoint não encontrado',
        'status': 404,
        'timestamp': datetime.now().isoformat()
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f'Internal server error: {str(error)}')
    return jsonify({
        'error': 'Erro interno do servidor',
        'status': 500,
        'timestamp': datetime.now().isoformat()
    }), 500

@app.errorhandler(403)
def forbidden(error):
    """Handle 403 errors"""
    return jsonify({
        'error': 'Acesso proibido',
        'status': 403
    }), 403

# ===== MIDDLEWARE =====

@app.before_request
def log_request():
    """Log incoming requests"""
    logger.debug(f'{request.method} {request.path} - {request.remote_addr}')

@app.after_request
def log_response(response):
    """Log response status"""
    logger.debug(f'Response status: {response.status_code}')
    return response

# ===== PLACEHOLDER ENDPOINTS (To be implemented) =====

@app.route('/api/oportunidades', methods=['GET'])
def get_oportunidades():
    """Get list of opportunities (B2B, credits, partnerships)"""
    oportunidades = [
        {
            'id': 1,
            'title': 'Fornecedor de Alimentos Orgânicos',
            'company': 'Agricultura Sustentável GO',
            'deadline': '5 dias',
            'type': 'supplier',
            'status': 'open'
        },
        {
            'id': 2,
            'title': 'Crédito BNDES - Programa MPME',
            'value': 50000,
            'type': 'credit',
            'status': 'pre-approved'
        },
        {
            'id': 3,
            'title': 'Parceria B2B - Distribuidora Regional',
            'potential_revenue': 100000,
            'period': 'monthly',
            'type': 'partnership',
            'status': 'new'
        }
    ]
    return jsonify({'oportunidades': oportunidades}), 200

@app.route('/api/mentores', methods=['GET'])
def get_mentores():
    """Get list of available mentors"""
    mentores = [
        {
            'id': 1,
            'name': 'Beatriz Alves',
            'specialty': 'Confeitaria Premium',
            'expertise': ['Confeitaria', 'Marketing', 'Gestão'],
            'rating': 4.8,
            'experience_years': 15,
            'avatar_initial': 'B'
        },
        {
            'id': 2,
            'name': 'Ana Paula Santos',
            'specialty': 'Tecnologia & Inovação',
            'expertise': ['Tech', 'Startups', 'Digitalização'],
            'rating': 4.9,
            'experience_years': 12,
            'avatar_initial': 'A'
        }
    ]
    return jsonify({'mentores': mentores}), 200

@app.route('/api/videochamada/iniciar', methods=['POST'])
def iniciar_videochamada():
    """Initiate video call with mentor"""
    data = request.get_json()
    mentor_id = data.get('mentor_id')
    
    if not mentor_id:
        return jsonify({'error': 'mentor_id é obrigatório'}), 400
    
    # TODO: Integrate with Jitsi Meet, Agora.io, or Twilio
    return jsonify({
        'status': 'success',
        'message': 'Videochamada iniciada',
        'mentor_id': mentor_id,
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/notificacoes', methods=['GET'])
def get_notificacoes():
    """Get user notifications"""
    notificacoes = [
        {
            'id': 1,
            'type': 'b2b_matching',
            'title': 'Você tem uma nova oportunidade B2B!',
            'read': False
        },
        {
            'id': 2,
            'type': 'credit_approved',
            'title': 'Crédito BNDES pré-aprovado',
            'read': False
        }
    ]
    return jsonify({'notificacoes': notificacoes}), 200

# ===== STATIC FILES SERVING (for production with proper setup) =====

@app.route('/')
def serve_frontend():
    """Serve frontend landing page"""
    try:
        return send_from_directory(os.path.join(app.root_path, '..', 'frontend'), 'landing-meg.html')
    except:
        return jsonify({
            'message': 'MEG Backend API',
            'version': '1.0.0',
            'status': 'operational'
        }), 200

# ===== ADMIN ENDPOINTS (To be implemented with proper auth) =====

@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    """Get admin dashboard statistics"""
    # TODO: Add admin authentication
    return jsonify({
        'total_users': 150,
        'total_mentors': 42,
        'total_oportunidades': 25,
        'videochamadas_este_mes': 87,
        'confiracoes_pendentes': 12
    }), 200

# ===== DATABASE SETUP (When ready to migrate from in-memory) =====

def init_db():
    """Initialize database models"""
    # TODO: Implement SQLAlchemy models and database initialization
    logger.info('Database initialization placeholder - implement when ready')

# ===== CACHE SETUP (For production) =====

def init_cache():
    """Initialize cache (Redis)"""
    # TODO: Implement Redis cache for sessions and rate limiting
    logger.info('Cache initialization placeholder - implement when ready')

# ===== MAIN ENTRY POINT =====

if __name__ == '__main__':
    # Environment configuration
    env = os.getenv('ENVIRONMENT', 'development')
    debug_mode = env == 'development'
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')

    logger.info(f'🚀 Starting MEG Backend API')
    logger.info(f'📍 Environment: {env}')
    logger.info(f'🌐 Host: {host}:{port}')
    logger.info(f'🔧 Debug mode: {debug_mode}')
    
    # Initialize database and cache (when ready)
    # init_db()
    # init_cache()
    
    # Start Flask server
    app.run(
        host=host,
        port=port,
        debug=debug_mode,
        use_reloader=debug_mode
    )
