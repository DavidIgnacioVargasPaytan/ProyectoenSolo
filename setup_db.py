import sqlite3
import json
import os

print("Conectando a la base de datos 'godofwar.db'...")
conexion = sqlite3.connect('godofwar.db')
cursor = conexion.cursor()

cursor.execute('DROP TABLE IF EXISTS bosses')
cursor.execute('''
    CREATE TABLE bosses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        juego TEXT,
        estrellas TEXT,
        diff_class TEXT,
        tipo TEXT,
        contexto TEXT,
        img TEXT,
        saga TEXT
    )
''')

cursor.execute('DROP TABLE IF EXISTS usuarios')
print("Creando tabla 'usuarios'...")
cursor.execute('''
    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

cursor.execute('DROP TABLE IF EXISTS noticias')
print("Creando tabla 'noticias'...")
cursor.execute('''
    CREATE TABLE noticias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        fecha TEXT,
        contenido TEXT,
        icono TEXT,
        tipo TEXT
    )
''')

ruta_bosses = os.path.join('data', 'bosses.json')
try:
    with open(ruta_bosses, 'r', encoding='utf-8') as f:
        lista_bosses = json.load(f)
        for boss in lista_bosses:
            cursor.execute('INSERT INTO bosses (nombre, juego, estrellas, diff_class, tipo, contexto, img, saga) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                           (boss['nombre'], boss['juego'], boss['estrellas'], boss['diff_class'], boss['tipo'], boss['contexto'], boss['img'], boss['saga']))
    print(f"Bosses migrados.")
except:
    print("No se encontró bosses.json (Saltando...)")

print("Insertando noticias de ejemplo...")
noticias_ejemplo = [
    ("God of War Ragnarök: Valhalla", "12 de Diciembre, 2024", "Santa Monica Studio sorprendió a los fans con el lanzamiento de Valhalla, una expansión gratuita que explora la psique de Kratos.", "fa-solid fa-bolt", "destacado"),
    ("Serie de Amazon Prime Video", "20 Oct, 2024", "La adaptación live-action confirma su fase de producción para 2025. Se espera que explore tanto la era griega como la nórdica.", "fa-solid fa-film", "normal"),
    ("Hito Histórico: 15 Millones", "15 Sep, 2024", "Ragnarök supera las 15 millones de copias vendidas. La comunidad de PC celebra el rendimiento optimizado.", "fa-solid fa-trophy", "normal"),
    ("Novela Gráfica Anunciada", "30 Ago, 2024", "Dark Horse Comics lanzará una historia inédita que conecta los eventos de 2018 con el Fimbulvetr.", "fa-solid fa-book-journal-whills", "normal")
]

cursor.executemany('INSERT INTO noticias (titulo, fecha, contenido, icono, tipo) VALUES (?, ?, ?, ?, ?)', noticias_ejemplo)

conexion.commit()
conexion.close()
print("¡BASE DE DATOS ACTUALIZADA AL 100%!")