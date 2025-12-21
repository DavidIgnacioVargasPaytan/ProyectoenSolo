document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                menuToggle.textContent = '✕';
                menuToggle.style.color = '#ff5252';
            } else {
                menuToggle.textContent = '☰';
                menuToggle.style.color = 'var(--gold)';
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            if (sidebar && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                    menuToggle.style.color = 'var(--gold)';
                }
            }
        }
    });

    const modal = document.getElementById('loginModal');
    const openBtn = document.getElementById('openLoginBtn'); 
    const loginLi = document.getElementById('loginLi');
    const userPanel = document.getElementById('userProfilePanel');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');

    function updateLoginUI() {
        const storedUser = localStorage.getItem('gow_user');
        
        if (storedUser) {
            if(loginLi) loginLi.style.display = 'none';
            if(userPanel) {
                userPanel.style.display = 'block';
                if(userNameDisplay) userNameDisplay.textContent = storedUser;
            }
        } else {
            if(loginLi) loginLi.style.display = 'block';
            if(userPanel) userPanel.style.display = 'none';
        }
    }

    updateLoginUI();

    if (openBtn && modal) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const submitBtn = document.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = "Verificando...";
                submitBtn.disabled = true;

                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const realUsername = data.username; 
                        
                        localStorage.setItem('gow_user', realUsername);
                        updateLoginUI();
                        
                        modal.style.display = 'none';
                        loginForm.reset();
                        alert(`¡Bienvenido guerrero, ${realUsername}!`);
                    } else {
                        alert("Error: " + (data.message || "Credenciales incorrectas"));
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Error de conexión con el servidor.");
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            });
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if(confirm("¿Deseas abandonar la batalla y cerrar sesión?")) {
                localStorage.removeItem('gow_user'); 
                updateLoginUI(); 
            }
        });
    }

    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            this.style.transition = 'all 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'transparent';
        });
    });

    console.log('%cGod of War Portal V2.3 - DB Connected', 'color: #d4af37; font-size: 20px; font-weight: bold;');
});