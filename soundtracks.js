document.addEventListener('DOMContentLoaded', function() {
    
    const soundtracks = [
        {
            title: "God of War (2005)",
            cover: "imagenes/portadas/gowI.jpg", 
            spotifyUrl: "https://open.spotify.com/intl-es/album/4tZGORVhBzO0Kzj5oaOOMn?si=9117337c078241b9"
        },
        {
            title: "God of War II",
            cover: "imagenes/portadas/gowII.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/17K3q2htUlMsSflM3XZxlw?si=4d13b5f04a3a4eb3"
        },
        {
            title: "God of War III",
            cover: "imagenes/portadas/gow III.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/1w9j0DZdI7oa6Fz0lPtHDC?si=b7e9e9f11f084d1d"
        },
        {
            title: "God of War (2018)",
            cover: "imagenes/portadas/gow4.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/3AieuV7WztobSMYG86Hdez?si=047baa93afa54d87"
        },
        {
            title: "God of War Ragnarök",
            cover: "imagenes/portadas/gow-ragnarok.jpg",
            spotifyUrl: "https://open.spotify.com/intl-es/album/7LmeRZOi905AochW9J9FAA?si=05a7b10488a94500"
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
                         onerror="this.src='https://via.placeholder.com/250x250?text=Imagen+No+Encontrada'; this.style.border='2px solid red';">
                    <div class="spotify-icon">🎧</div>
                </a>
                <h3 class="album-title">${album.title}</h3>
            `;

            container.appendChild(card);
        });
    }
});