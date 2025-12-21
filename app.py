from flask import Flask, render_template, request, url_for, jsonify
import json
import os

app = Flask(__name__)

def cargar_datos(archivo):
    ruta_archivo = os.path.join('data', archivo)
    with open(ruta_archivo, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/bosses.html')
def bosses():
    lista_bosses = cargar_datos('bosses.json')
    
    page = request.args.get('page', 1, type=int)
    per_page = 3
    start = (page - 1) * per_page
    end = start + per_page
    
    total_items = len(lista_bosses)
    bosses_paginados = lista_bosses[start:end]
    
    has_next = end < total_items
    has_prev = start > 0
    
    return render_template('bosses.html', 
                           bosses=bosses_paginados, 
                           page=page, 
                           has_next=has_next, 
                           has_prev=has_prev)

@app.route('/api/soundtracks')
def api_soundtracks():
    data = cargar_datos('soundtracks.json')
    return jsonify(data)

@app.route('/soundtracks.html')
def soundtracks():
    return render_template('soundtracks.html')

@app.route('/arsenal.html')
def arsenal():
    data_arsenal = cargar_datos('arsenal.json')
    return render_template('arsenal.html', arsenal=data_arsenal)

@app.route('/personajes.html')
def personajes():
    return render_template('personajes.html')

@app.route('/galeria.html')
def galeria():
    return render_template('galeria.html')

@app.route('/registro_gow.html')
def registro():
    return render_template('registro_gow.html')

@app.route('/noticias.html')
def noticias():
    return render_template('noticias.html')

if __name__ == '__main__':
    app.run(debug=True)