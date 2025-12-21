document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando script de Soundtracks...");

    const soundtracks = [
        {
            title: "God of War: Ascension",
            cover: "static/imagenes/portadas/gow-ascencion.jpg", 
            spotifyUrl: "https://open.spotify.com/intl-es/album/5HbN8AlVNXadPJglFJI8EC?si=952a8ff26efb441b" 
        },
        {
            title: "God of War: Chains of Olympus",
            cover: "static/imagenes/portadas/gow-chains.jpg", 
            spotifyUrl: "https://www.youtube.com/watch?v=r7YcBW2uwEA&list=PL1n4ES3x6XXbjurg1rZUbX0yi6GGHOoAk&pp=0gcJCbAEOCosWNin" 
        },
        {
            title: "God of War (2005)",
            cover: "static/imagenes/portadas/gowI.jpg", 
            spotifyUrl: "https://open.spotify.com/intl-es/album/4tZGORVhBzO0Kzj5oaOOMn?si=c33733b067b74e21"
        },
        {
            title: "God of War: Ghost of Sparta",
            cover: "static/imagenes/portadas/gow-gos.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/5yN2kJh22LtZVn55wVMH7h?si=739b37a3b7e746dc"
        },
        {
            title: "God of War II",
            cover: "static/imagenes/portadas/gowII.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/17K3q2htUlMsSflM3XZxlw?si=fb8baf18cde94f75"
        },
        {
            title: "God of War III",
            cover: "static/imagenes/portadas/gowIII.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/1w9j0DZdI7oa6Fz0lPtHDC?si=fe1d505fd0e047e3"
        },
        {
            title: "God of War (2018)",
            cover: "static/imagenes/portadas/gow4.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/3AieuV7WztobSMYG86Hdez?si=0eacd10084bf4e77"
        },
        {
            title: "God of War Ragnarök",
            cover: "static/imagenes/portadas/gow-ragnarok.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/7LmeRZOi905AochW9J9FAA?si=cad3b275bf2f4f95"
        },
        {
            title: "GoW Ragnarök: Valhalla",
            cover: "static/imagenes/portadas/gow-valhalla.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/2j8WG0EzaUgsmSy2iPIwJZ?si=268e566ca3024c85"
        }
    ];

    const container = document.getElementById('soundtrack-grid');

    if(container) {
        container.innerHTML = ''; 

        soundtracks.forEach(album => {
            const card = document.createElement('div');
            card.className = 'spotify-card';

            card.innerHTML = `
                <a href="${album.spotifyUrl}" target="_blank" class="spotify-link" title="Escuchar en Spotify">
                    <img src="${album.cover}" 
                         alt="Portada ${album.title}" 
                         onerror="this.src='https://via.placeholder.com/250x250/000000/FFFFFF?text=Sin+Imagen';">
                    <div class="spotify-icon">🎧</div>
                </a>
                <h3 class="album-title">${album.title}</h3>
            `;

            container.appendChild(card);
        });
        console.log("Soundtracks cargados correctamente.");
    } else {
        console.error("No se encontró el contenedor 'soundtrack-grid'");
    }
});