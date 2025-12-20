document.addEventListener('DOMContentLoaded', function() {
    
    const galleryImages = [
        { src: "imagenes/bosses/kratos-ragnarok.png", category: "nordica", caption: "Kratos: El Padre de Todo (Ragnarök)" },
        { src: "imagenes/bosses/kratos-2018.png", category: "nordica", caption: "Kratos en Midgard (2018)" },
        { src: "imagenes/bosses/atreus.png", category: "nordica", caption: "Atreus / Loki" },
        { src: "imagenes/bosses/thor.png", category: "nordica", caption: "Thor, Dios del Trueno" },
        { src: "imagenes/bosses/odin.png", category: "nordica", caption: "Odín, Padre de Todos" },
        { src: "imagenes/bosses/freya.jpg", category: "nordica", caption: "Freya, Diosa Vanir" },
        { src: "imagenes/bosses/baldur.png", category: "nordica", caption: "Baldur, El Invulnerable" },
        { src: "imagenes/bosses/mimir.jpg", category: "nordica", caption: "Mimir, El Hombre más Listo" },
        { src: "imagenes/bosses/brok-y-sindri.png", category: "nordica", caption: "Brok y Sindri, Hermanos Huldra" },
        { src: "imagenes/bosses/sigrun.jpg", category: "nordica", caption: "Sigrun, Reina Valquiria" },
        { src: "imagenes/bosses/gna.jpg", category: "nordica", caption: "Gná, Nueva Reina Valquiria" },
        { src: "imagenes/bosses/Nidhogg.png", category: "nordica", caption: "Nidhogg, Dragón del Mundo" },
        { src: "imagenes/bosses/faye.png", category: "nordica", caption: "Faye (Laufey), La Guardiana" },

        { src: "imagenes/bosses/kratos-gow1.png", category: "griega", caption: "Kratos, General Espartano (2005)" },
        { src: "imagenes/bosses/kratos-gow2y3.png", category: "griega", caption: "Kratos, Dios de la Guerra (GOW III)" },
        { src: "imagenes/bosses/ZEUS.png", category: "griega", caption: "Zeus, Rey del Olimpo" },
        { src: "imagenes/bosses/ares.png", category: "griega", caption: "Ares, Dios de la Guerra Original" },
        { src: "imagenes/bosses/POSEIDON.png", category: "griega", caption: "Poseidón, Dios del Mar" },
        { src: "imagenes/bosses/HADES.png", category: "griega", caption: "Hades, Señor del Inframundo" },
        { src: "imagenes/bosses/athena.png", category: "griega", caption: "Atenea, Diosa de la Sabiduría" },
        { src: "imagenes/bosses/HELIOS.jpg", category: "griega", caption: "Helios, Dios del Sol" },
        { src: "imagenes/bosses/hermanas-del-destino.jpg", category: "griega", caption: "Las Hermanas del Destino" },
        { src: "imagenes/bosses/cronos.png", category: "griega", caption: "Cronos, Titán del Tiempo" },
        { src: "imagenes/bosses/gaia.png", category: "griega", caption: "Gaia, Madre Tierra" },
        { src: "imagenes/bosses/coloso-de-rodas.jpg", category: "griega", caption: "El Coloso de Rodas" },
        { src: "imagenes/bosses/hidra.png", category: "griega", caption: "La Hidra del Egeo" },
        { src: "imagenes/bosses/escorpion.png", category: "griega", caption: "Escorpión Gigante" },
        { src: "imagenes/bosses/pandora.png", category: "griega", caption: "Pandora" },
        { src: "imagenes/bosses/deimos.jpg", category: "griega", caption: "Deimos, Hermano de Kratos" },
        { src: "imagenes/bosses/lisandra.png", category: "griega", caption: "Lysandra, Primera Esposa" },
        { src: "imagenes/bosses/calliope.png", category: "griega", caption: "Calliope, Hija Perdida" },

        { src: "imagenes/hacha-leviatan.png", category: "arte", caption: "Hacha Leviatán" },
        { src: "imagenes/espada-del-caos-6036405_1920.png", category: "arte", caption: "Espadas del Caos" },
        { src: "imagenes/lanza-draupnir.png", category: "arte", caption: "Lanza de Draupnir" },
        { src: "imagenes/escudo-guardian.png", category: "arte", caption: "Escudo Guardián" },
        { src: "imagenes/espada-del-olimpo-6038769_1920.png", category: "arte", caption: "Espada del Olimpo" },
        { src: "imagenes/nemean-cestus-6034867_1920.png", category: "arte", caption: "Cestus de Nemea" },
        { src: "imagenes/hades-claws.png", category: "arte", caption: "Garras de Hades" },
        { src: "imagenes/espada-de-artemisa.png", category: "arte", caption: "Espada de Artemisa" },
        { src: "imagenes/Bow of Apollo(1).png", category: "arte", caption: "Arco de Apolo" },
        { src: "imagenes/armas-de-esparta.png", category: "arte", caption: "Armas de Esparta" },
        { src: "imagenes/martillo-barbaro.png", category: "arte", caption: "Martillo Bárbaro" },
        { src: "imagenes/vellocino.png", category: "arte", caption: "Vellocino de Oro" },
        { src: "imagenes/uroboros.png", category: "arte", caption: "Amuleto de Uroboros" }
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    function renderGallery(filter = 'all') {
        galleryContainer.innerHTML = '';
        
        const filteredImages = filter === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === filter);

        filteredImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
            
            // AQUI ESTA EL CAMBIO DEL ICONO
            item.innerHTML = `
                <img src="${img.src}" 
                     alt="${img.caption}" 
                     loading="lazy" 
                     onerror="this.parentElement.style.display='none'">
                <div class="gallery-overlay">
                    <span><i class="fa-solid fa-magnifying-glass-plus"></i> Ver</span>
                </div>
            `;
            
            item.addEventListener('click', () => openLightbox(img.src, img.caption));
            
            galleryContainer.appendChild(item);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            renderGallery(filterValue);
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    function openLightbox(src, caption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    renderGallery();
});