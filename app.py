from flask import Flask, render_template, request, url_for

app = Flask(__name__)

#BASE DE DATOS 1: BOSSES
lista_bosses = [
    #SAGA GRIEGA
    {
        "nombre": "La Hidra del Egeo",
        "juego": "God of War I",
        "estrellas": "★★★☆☆",
        "diff_class": "difficulty-medium",
        "tipo": "Bestia Mitológica",
        "contexto": "El primer gran desafío de Kratos. Una batalla naval brutal en medio de una tormenta.",
        "img": "bosses/hidra.png",
        "saga": "Griega"
    },
    {
        "nombre": "Ares - Dios de la Guerra",
        "juego": "God of War I",
        "estrellas": "★★★★★",
        "diff_class": "difficulty-extreme",
        "tipo": "Dios Olímpico",
        "contexto": "La batalla final para salvar Atenas. Kratos usa la Caja de Pandora para volverse gigante y vengarse.",
        "img": "bosses/ares.png",
        "saga": "Griega"
    },
    {
        "nombre": "El Coloso de Rodas",
        "juego": "God of War II",
        "estrellas": "★★★★☆",
        "diff_class": "difficulty-hard",
        "tipo": "Autómata Divino",
        "contexto": "Animado por Zeus para destruir a Kratos. La batalla ocurre dentro y fuera del gigante.",
        "img": "bosses/coloso-de-rodas.jpg",
        "saga": "Griega"
    },
    {
        "nombre": "Las Hermanas del Destino",
        "juego": "God of War II",
        "estrellas": "★★★★★",
        "diff_class": "difficulty-extreme",
        "tipo": "Entidades Primordiales",
        "contexto": "Lákesis, Átropos y Cloto. Kratos lucha a través del tiempo para cambiar su propia muerte.",
        "img": "bosses/hermanas-del-destino.jpg",
        "saga": "Griega"
    },
    {
        "nombre": "Poseidón - Dios de los Mares",
        "juego": "God of War III",
        "estrellas": "★★★★☆",
        "diff_class": "difficulty-hard",
        "tipo": "Dios Olímpico",
        "contexto": "Kratos y Gaia enfrentan al Dios del Mar en su forma de constructo acuático gigante.",
        "img": "bosses/POSEIDON.png",
        "saga": "Griega"
    },
    {
        "nombre": "Hades - Dios del Inframundo",
        "juego": "God of War III",
        "estrellas": "★★★★☆",
        "diff_class": "difficulty-hard",
        "tipo": "Dios Olímpico",
        "contexto": "Una lucha oscura en el infierno para arrebatarle su propia alma y sus garras.",
        "img": "bosses/HADES.png",
        "saga": "Griega"
    },
    {
        "nombre": "Helios - Dios del Sol",
        "juego": "God of War III",
        "estrellas": "★★★☆☆",
        "diff_class": "difficulty-medium",
        "tipo": "Dios Olímpico",
        "contexto": "Kratos usa un cíclope para derribarlo y luego lo elimina manualmente para usar su cabeza.",
        "img": "bosses/HELIOS.jpg",
        "saga": "Griega"
    },
    {
        "nombre": "Cronos - Rey de los Titanes",
        "juego": "God of War III",
        "estrellas": "★★★☆☆",
        "diff_class": "difficulty-medium",
        "tipo": "Titán",
        "contexto": "Una batalla de escala masiva donde Kratos es del tamaño de una pulga comparado con él.",
        "img": "bosses/cronos.png",
        "saga": "Griega"
    },
    {
        "nombre": "Zeus - Rey del Olimpo",
        "juego": "God of War III",
        "estrellas": "★★★★★★",
        "diff_class": "difficulty-legendary",
        "tipo": "Rey de los Dioses",
        "contexto": "El enfrentamiento final en el corazón de Gaia y luego en el abismo espiritual.",
        "img": "bosses/ZEUS.png",
        "saga": "Griega"
    },
    #SAGA NÓRDICA
    {
        "nombre": "Baldur - El Invulnerable",
        "juego": "God of War (2018)",
        "estrellas": "★★★★★",
        "diff_class": "difficulty-extreme",
        "tipo": "Dios Aesir",
        "contexto": "No siente dolor ni puede morir. Kratos lo enfrenta tres veces en batallas viscerales.",
        "img": "bosses/baldur.png",
        "saga": "Nórdica"
    },
    {
        "nombre": "Sigrun - Reina Valquiria",
        "juego": "God of War (2018)",
        "estrellas": "★★★★★★",
        "diff_class": "difficulty-legendary",
        "tipo": "Valquiria (Opcional)",
        "contexto": "Dificultad: Legendaria. Posee todos los ataques de las 8 valquirias anteriores. Requiere perfección.",
        "img": "bosses/sigrun.jpg",
        "saga": "Nórdica"
    },
    {
        "nombre": "Thor - Dios del Trueno",
        "juego": "God of War Ragnarök",
        "estrellas": "★★★★★",
        "diff_class": "difficulty-extreme",
        "tipo": "Dios Aesir",
        "contexto": "Una pelea inicial brutal donde Thor 'mata' y revive a Kratos solo para seguir peleando.",
        "img": "bosses/thor.png",
        "saga": "Nórdica"
    },
    {
        "nombre": "Nidhogg - Dragón del Mundo",
        "juego": "God of War Ragnarök",
        "estrellas": "★★★★☆",
        "diff_class": "difficulty-hard",
        "tipo": "Dragón Primordial",
        "contexto": "Protege las raíces del Yggdrasil. Kratos y Freya combinan fuerzas para sacarlo de su grieta.",
        "img": "bosses/Nidhogg.png",
        "saga": "Nórdica"
    },
    {
        "nombre": "Odín - Padre de Todos",
        "juego": "God of War Ragnarök",
        "estrellas": "★★★★★",
        "diff_class": "difficulty-extreme",
        "tipo": "Rey de Asgard",
        "contexto": "Maestro de la magia rúnica. La batalla final involucra a Kratos, Atreus y Freya luchando juntos.",
        "img": "bosses/odin.png",
        "saga": "Nórdica"
    },
    {
        "nombre": "Gná - Reina Valquiria",
        "juego": "God of War Ragnarök",
        "estrellas": "★★★★★★",
        "diff_class": "difficulty-legendary",
        "tipo": "Valquiria (Opcional)",
        "contexto": "El jefe más duro de Ragnarök. Extremadamente agresiva y rápida con ataques de Bifröst.",
        "img": "bosses/gna.jpg",
        "saga": "Nórdica"
    }
]

#BASE DE DATOS 2: SOUNDTRACKS (NUEVO)

lista_soundtracks = [
    {
        "title": "God of War: Ascension",
        "cover": "imagenes/portadas/gow-ascencion.jpg", 
        "spotifyUrl": "https://open.spotify.com/search/God%20of%20War%20Ascension" 
    },
    {
        "title": "God of War: Chains of Olympus",
        "cover": "imagenes/portadas/gow-chains.jpg", 
        "spotifyUrl": "https://open.spotify.com/search/God%20of%20War%20Chains%20of%20Olympus" 
    },
    {
        "title": "God of War (2005)",
        "cover": "imagenes/portadas/gowI.jpg", 
        "spotifyUrl": "https://open.spotify.com/album/3t01dM3C2v1h6yGg5e8s3d"
    },
    {
        "title": "God of War: Ghost of Sparta",
        "cover": "imagenes/portadas/gow-gos.jpg",
        "spotifyUrl": "https://open.spotify.com/search/God%20of%20War%20Ghost%20of%20Sparta"
    },
    {
        "title": "God of War II",
        "cover": "imagenes/portadas/gowII.jpg",
        "spotifyUrl": "https://open.spotify.com/album/2z8s9s9s9s9s9"
    },
    {
        "title": "God of War III",
        "cover": "imagenes/portadas/gow III.jpg",
        "spotifyUrl": "https://open.spotify.com/album/3GZ9q9q9q9q9q"
    },
    {
        "title": "God of War (2018)",
        "cover": "imagenes/portadas/gow4.jpg",
        "spotifyUrl": "https://open.spotify.com/album/3Aieu1l1l1l1l"
    },
    {
        "title": "God of War Ragnarök",
        "cover": "imagenes/portadas/gow-ragnarok.jpg",
        "spotifyUrl": "https://open.spotify.com/album/4Bz1z1z1z1z1z"
    },
    {
        "title": "GoW Ragnarök: Valhalla",
        "cover": "imagenes/portadas/gow-valhalla.jpg",
        "spotifyUrl": "https://open.spotify.com/album/5Cv1v1v1v1v1v"
    }
]

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/bosses.html')
def bosses():
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

@app.route('/soundtracks.html')
def soundtracks():
    return render_template('soundtracks.html', soundtracks=lista_soundtracks)

@app.route('/arsenal.html')
def arsenal(): return render_template('arsenal.html')

@app.route('/personajes.html')
def personajes(): return render_template('personajes.html')

@app.route('/galeria.html')
def galeria(): return render_template('galeria.html')

@app.route('/registro_gow.html')
def registro(): return render_template('registro_gow.html')

@app.route('/noticias.html')
def noticias(): return render_template('noticias.html')

if __name__ == '__main__':
    app.run(debug=True)