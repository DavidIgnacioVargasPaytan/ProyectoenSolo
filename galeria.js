document.addEventListener('DOMContentLoaded', function() {
    
    const galleryImages = [
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\bosses\\kratos-gow1.png",
            category: "griega",
            caption: "Kratos en su época de general espartano"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\bosses\\kratos-gow2y3.png",
            category: "griega",
            caption: "Kratos desafiando al Olimpo"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\bosses\\ares.png",
            category: "griega",
            caption: "Ares, el Dios de la Guerra original"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\bosses\\kratos-2018.png",
            category: "nordica",
            caption: "Un Kratos más viejo y sabio en Midgard"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\bosses\\atreus.png",
            category: "nordica",
            caption: "Atreus, hijo de Kratos"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\bosses\\thor.png",
            category: "nordica",
            caption: "Thor, Dios del Trueno"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\espada-del-caos-6036405_1920.png",
            category: "arte",
            caption: "Arte de las Espadas del Caos"
        },
        {
            src: "D:\\ing. de sistemas\\ProyectoIndividual\\imagenes\\hacha-leviatan.png",
            category: "arte",
            caption: "Detalle del Hacha Leviatán"
        }
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
            item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            item.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy">`;
            
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
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
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