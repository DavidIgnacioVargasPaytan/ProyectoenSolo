document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando script de Soundtracks (Modo API)...");

    const container = document.getElementById('soundtrack-grid');

    if(container) {
        fetch('/api/soundtracks')
            .then(response => response.json()) 
            .then(data => {
                
                container.innerHTML = ''; 

                data.forEach(album => {
                    const card = document.createElement('div');
                    card.className = 'spotify-card';

                    const imagePath = `static/${album.cover}`;

                    card.innerHTML = `
                        <a href="${album.spotifyUrl}" target="_blank" class="spotify-link" title="Escuchar en Spotify">
                            <img src="${imagePath}" 
                                 alt="Portada ${album.title}" 
                                 onerror="this.src='https://via.placeholder.com/250x250/000000/FFFFFF?text=Sin+Imagen';">
                            <div class="spotify-icon">🎧</div>
                        </a>
                        <h3 class="album-title">${album.title}</h3>
                    `;

                    container.appendChild(card);
                });
                console.log("Soundtracks cargados desde Python API.");
            })
            .catch(error => {
                console.error("Error cargando soundtracks:", error);
                container.innerHTML = '<p style="text-align:center; color:red;">Error al cargar la música.</p>';
            });

    } else {
        console.error("No se encontró el contenedor 'soundtrack-grid'");
    }
});