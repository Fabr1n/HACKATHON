from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Data files
USERS_FILE = 'users.json'
QUESTIONNAIRES_FILE = 'questionnaires.json'

# Initialize data
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump([{'email': 'admin@exemplo.com', 'password': '123456'}], f)

if not os.path.exists(QUESTIONNAIRES_FILE):
    with open(QUESTIONNAIRES_FILE, 'w') as f:
        json.dump([], f)

def read_data(file):
    with open(file, 'r') as f:
        return json.load(f)

def write_data(file, data):
    with open(file, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def home():
    return send_file('projetfront.html')

@app.route('/dashboard')
def dashboard():
    return send_file('dashboard.html')

@app.route('/admin')
def admin():
    return send_file('admin.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    users = read_data(USERS_FILE)
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    if user:
        return jsonify({'success': True, 'message': 'Login bem-sucedido!'})
    else:
        return jsonify({'success': False, 'message': 'Credenciais inválidas.'})

@app.route('/questionnaire', methods=['POST'])
def questionnaire():
    data = request.get_json()
    questionnaires = read_data(QUESTIONNAIRES_FILE)
    questionnaires.append({
        'name': data.get('name'),
        'age': data.get('age'),
        'experience': data.get('experience'),
        'goals': data.get('goals'),
        'submittedAt': str(data.get('submittedAt', ''))
    })
    write_data(QUESTIONNAIRES_FILE, questionnaires)
    return jsonify({'success': True, 'message': 'Questionário enviado com sucesso!'})

@app.route('/api/questionnaires')
def get_questionnaires():
    return jsonify(read_data(QUESTIONNAIRES_FILE))

if __name__ == '__main__':
    app.run(debug=True, port=3000)