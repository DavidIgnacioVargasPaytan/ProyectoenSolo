document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de registro cargado.");

    const form = document.getElementById('registroForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email_reg');
    const passwordInput = document.getElementById('password_reg');
    const confirmInput = document.getElementById('password_confirm');
    const terminosCheck = document.getElementById('terminos');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');

    function showError(element, message) {
        if(element) {
            element.textContent = message;
            element.style.display = 'block';
            element.style.color = '#ff5252'; 
        }
    }

    function clearError(element) {
        if(element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }

    function checkUsername() {
        const val = usernameInput.value.trim();
        if(val.length < 3) {
            showError(usernameError, 'Mínimo 3 caracteres.');
            return false;
        }
        clearError(usernameError);
        return true;
    }

    function checkEmail() {
        const val = emailInput.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!pattern.test(val)) {
            showError(emailError, 'Correo inválido.');
            return false;
        }
        clearError(emailError);
        return true;
    }

    function checkPassword() {
        const val = passwordInput.value;
        if(val.length < 6) {
            showError(passwordError, 'Mínimo 6 caracteres.');
            return false;
        }
        clearError(passwordError);
        return true;
    }

    function checkConfirm() {
        if(passwordInput.value !== confirmInput.value) {
            showError(confirmError, 'Las contraseñas no coinciden.');
            return false;
        }
        clearError(confirmError);
        return true;
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const v1 = checkUsername();
            const v2 = checkEmail();
            const v3 = checkPassword();
            const v4 = checkConfirm();
            const v5 = terminosCheck.checked;

            if(!v5) {
                alert("Debes aceptar los términos y condiciones.");
                return;
            }

            if (v1 && v2 && v3 && v4 && v5) {
                const userData = {
                    user: usernameInput.value,
                    email: emailInput.value,
                    date: new Date().toISOString()
                };
                
                localStorage.setItem('gow_last_user', JSON.stringify(userData));

                alert(`¡Bienvenido, ${usernameInput.value}! Tu registro ha sido exitoso.`);
                form.reset();
                window.location.href = "index.html";
            } else {
                console.log("Validación fallida");
            }
        });
    } else {
        console.error("No se encontró el formulario 'registroForm'");
    }
});