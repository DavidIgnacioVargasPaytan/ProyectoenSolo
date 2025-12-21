document.addEventListener('DOMContentLoaded', function() {
    
    const articles = document.querySelectorAll('article');
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateX(-30px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            article.style.opacity = '1';
            article.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletter-email');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterEmail.value.trim();
            
            if (!email) {
                showNotification('⚠️ Por favor ingresa tu correo electrónico', 'error');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showNotification('⚠️ Por favor ingresa un correo válido', 'error');
                return;
            }
            
            const subscribers = JSON.parse(localStorage.getItem('gow_subscribers') || '[]');
            
            if (subscribers.includes(email)) {
                showNotification('ℹ️ Este correo ya está suscrito', 'info');
                return;
            }
            
            subscribers.push(email);
            localStorage.setItem('gow_subscribers', JSON.stringify(subscribers));
            
            showNotification('✅ ¡Suscripción exitosa! Recibirás noticias de God of War', 'success');
            newsletterForm.reset();
        });
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = 'linear-gradient(135deg, #1a5a1a 0%, #0a3a0a 100%)';
                break;
            case 'error':
                backgroundColor = 'linear-gradient(135deg, var(--dark-red) 0%, #5a0a0a 100%)';
                break;
            case 'info':
                backgroundColor = 'linear-gradient(135deg, #1a3a5a 0%, #0a1a3a 100%)';
                break;
            default:
                backgroundColor = 'linear-gradient(135deg, var(--card-bg) 0%, var(--dark-bg) 100%)';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${backgroundColor};
            color: var(--text-light);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 2px solid var(--gold);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
            z-index: 10000;
            max-width: 350px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    const timeElements = document.querySelectorAll('time');
    timeElements.forEach(time => {
        const datetime = time.getAttribute('datetime');
        if (datetime) {
            const date = new Date(datetime);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let relativeTime = '';
            if (diffDays === 0) {
                relativeTime = 'Hoy';
            } else if (diffDays === 1) {
                relativeTime = 'Ayer';
            } else if (diffDays < 7) {
                relativeTime = `Hace ${diffDays} días`;
            } else if (diffDays < 30) {
                const weeks = Math.floor(diffDays / 7);
                relativeTime = `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
            } else if (diffDays < 365) {
                const months = Math.floor(diffDays / 30);
                relativeTime = `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
            }
            
            if (relativeTime) {
                time.setAttribute('title', time.textContent);
                time.textContent = `${time.textContent} (${relativeTime})`;
            }
        }
    });
    
    const fanComments = document.querySelectorAll('[style*="border-left: 4px solid"]');
    fanComments.forEach(comment => {
        comment.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        comment.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    console.log('%c📰 Noticias God of War Cargadas', 'color: #d4af37; font-size: 16px; font-weight: bold;');
});
