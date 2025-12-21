document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando script de Galería...");

    const galleryImages = [
        { src: "static/imagenes/bosses/kratos-ragnarok.png", category: "nordica", caption: "Kratos: El Padre de Todo" },
        { src: "static/imagenes/bosses/kratos-2018.png", category: "nordica", caption: "Kratos en Midgard" },
        { src: "static/imagenes/bosses/atreus.png", category: "nordica", caption: "Atreus / Loki" },
        { src: "static/imagenes/bosses/thor.png", category: "nordica", caption: "Thor" },
        { src: "static/imagenes/bosses/odin.png", category: "nordica", caption: "Odín" },
        { src: "static/imagenes/bosses/freya.jpg", category: "nordica", caption: "Freya" },
        { src: "static/imagenes/bosses/baldur.png", category: "nordica", caption: "Baldur" },
        { src: "static/imagenes/bosses/sigrun.jpg", category: "nordica", caption: "Sigrun" },
        
        { src: "static/imagenes/bosses/kratos-gow1.png", category: "griega", caption: "Kratos (2005)" },
        { src: "static/imagenes/bosses/kratos-gow2y3.png", category: "griega", caption: "Kratos GOW III" },
        { src: "static/imagenes/bosses/ZEUS.png", category: "griega", caption: "Zeus" },
        { src: "static/imagenes/bosses/ares.png", category: "griega", caption: "Ares" },
        { src: "static/imagenes/bosses/POSEIDON.png", category: "griega", caption: "Poseidón" },
        { src: "static/imagenes/bosses/HADES.png", category: "griega", caption: "Hades" },
        
        { src: "static/imagenes/hacha-leviatan.png", category: "arte", caption: "Hacha Leviatán" },
        { src: "static/imagenes/espada-del-caos-6036405_1920.png", category: "arte", caption: "Espadas del Caos" },
        { src: "static/imagenes/lanza-draupnir.png", category: "arte", caption: "Lanza de Draupnir" }
    ];

    const galleryContainer = document.getElementById('gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    function renderGallery(filter = 'all') {
        if(!galleryContainer) return;

        galleryContainer.innerHTML = '';
        
        const filteredImages = filter === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === filter);

        filteredImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            
            item.innerHTML = `
                <img src="${img.src}" 
                     alt="${img.caption}" 
                     loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/300x300/111/FFF?text=Imagen+No+Encontrada'">
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

    function openLightbox(src, caption) {
        if(lightbox && lightboxImg) {
            lightboxImg.src = src;
            if(lightboxCaption) lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeLightbox() {
        if(lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { if(lightboxImg) lightboxImg.src = ''; }, 300);
        }
    }

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    renderGallery();
});