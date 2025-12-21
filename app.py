from flask import Flask, render_template, request, url_for, jsonify
import json
import os
import sqlite3

app = Flask(__name__)

def cargar_datos(archivo):
    ruta_archivo = os.path.join('data', archivo)
    with open(ruta_archivo, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_db_connection():
    conn = sqlite3.connect('godofwar.db')
    conn.row_factory = sqlite3.Row 
    return conn

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM usuarios WHERE email = ? AND password = ?', (email, password)).fetchone()
    conn.close()

    if user:
        return jsonify({'success': True, 'username': user['usuario']})
    else:
        return jsonify({'success': False, 'message': 'Credenciales incorrectas'}), 401

@app.route('/bosses.html')
def bosses():
    conn = get_db_connection()
    bosses_sql = conn.execute('SELECT * FROM bosses').fetchall()
    conn.close()
    
    page = request.args.get('page', 1, type=int)
    per_page = 3
    start = (page - 1) * per_page
    end = start + per_page
    total_items = len(bosses_sql)
    bosses_paginados = bosses_sql[start:end]
    has_next = end < total_items
    has_prev = start > 0
    
    return render_template('bosses.html', bosses=bosses_paginados, page=page, has_next=has_next, has_prev=has_prev)

@app.route('/noticias.html')
def noticias():
    conn = get_db_connection()
    noticias_db = conn.execute('SELECT * FROM noticias ORDER BY id DESC').fetchall()
    conn.close()
    return render_template('noticias.html', noticias=noticias_db)

@app.route('/api/registro', methods=['POST'])
def api_registro():
    datos = request.json 
    usuario = datos.get('usuario')
    email = datos.get('email')
    password = datos.get('password')
    
    if not usuario or not email or not password:
        return jsonify({'success': False, 'message': 'Faltan datos'}), 400

    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO usuarios (usuario, email, password) VALUES (?, ?, ?)',
                     (usuario, email, password))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': '¡Guerrero registrado en el Valhalla!'})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': f'Error en la base de datos: {str(e)}'}), 500

@app.route('/api/soundtracks')
def api_soundtracks():
    data = cargar_datos('soundtracks.json')
    return jsonify(data)

@app.route('/soundtracks.html')
def soundtracks():
    return render_template('soundtracks.html')

@app.route('/arsenal.html')
def arsenal():
    data = cargar_datos('arsenal.json')
    query = request.args.get('q') 
    if query:
        query = query.lower()
        filtered_principal = [arma for arma in data['principal'] if query in arma['nombre'].lower() or query in arma['desc'].lower()]
        filtered_legado = [arma for arma in data['legado'] if query in arma['nombre'].lower() or query in arma['desc'].lower()]
        return render_template('arsenal.html', arsenal={"principal": filtered_principal, "legado": filtered_legado}, busqueda=query)
    return render_template('arsenal.html', arsenal=data)

@app.route('/personajes.html')
def personajes(): return render_template('personajes.html')
@app.route('/galeria.html')
def galeria(): return render_template('galeria.html')
@app.route('/registro_gow.html')
def registro(): return render_template('registro_gow.html')

if __name__ == '__main__':
    app.run(debug=True)