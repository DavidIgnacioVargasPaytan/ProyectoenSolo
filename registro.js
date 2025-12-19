document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email_reg');
    const password = document.getElementById('password_reg');
    const passwordConfirm = document.getElementById('password_confirm');
    const terminos = document.getElementById('terminos');
    
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = 'var(--primary-red)';
        element.style.fontSize = '0.9rem';
        element.style.marginTop = '0.5rem';
    }
    
    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    function validateUsername() {
        const value = username.value.trim();
        
        if (value.length === 0) {
            showError(usernameError, '⚠️ El nombre de usuario es obligatorio');
            return false;
        }
        
        if (value.length < 3) {
            showError(usernameError, '⚠️ El nombre debe tener al menos 3 caracteres');
            return false;
        }
        
        if (value.length > 20) {
            showError(usernameError, '⚠️ El nombre no puede exceder 20 caracteres');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            showError(usernameError, '⚠️ Solo se permiten letras, números y guiones bajos');
            return false;
        }
        
        clearError(usernameError);
        return true;
    }
    
    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value.length === 0) {
            showError(emailError, '⚠️ El correo electrónico es obligatorio');
            return false;
        }
        
        if (!emailPattern.test(value)) {
            showError(emailError, '⚠️ Ingresa un correo electrónico válido');
            return false;
        }
        
        clearError(emailError);
        return true;
    }
    
    function validatePassword() {
        const value = password.value;
        
        if (value.length === 0) {
            showError(passwordError, '⚠️ La contraseña es obligatoria');
            return false;
        }
        
        if (value.length < 8) {
            showError(passwordError, '⚠️ La contraseña debe tener al menos 8 caracteres');
            return false;
        }
        
        if (!/[A-Z]/.test(value)) {
            showError(passwordError, '⚠️ Debe contener al menos una mayúscula');
            return false;
        }
        
        if (!/[a-z]/.test(value)) {
            showError(passwordError, '⚠️ Debe contener al menos una minúscula');
            return false;
        }
        
        if (!/[0-9]/.test(value)) {
            showError(passwordError, '⚠️ Debe contener al menos un número');
            return false;
        }
        
        clearError(passwordError);
        return true;
    }
    
    function validatePasswordConfirm() {
        const value = passwordConfirm.value;
        
        if (value.length === 0) {
            showError(confirmError, '⚠️ Debes confirmar tu contraseña');
            return false;
        }
        
        if (value !== password.value) {
            showError(confirmError, '⚠️ Las contraseñas no coinciden');
            return false;
        }
        
        clearError(confirmError);
        return true;
    }
    
    username.addEventListener('blur', validateUsername);
    username.addEventListener('input', function() {
        if (this.value.length > 0) {
            validateUsername();
        }
    });
    
    email.addEventListener('blur', validateEmail);
    email.addEventListener('input', function() {
        if (this.value.length > 0) {
            validateEmail();
        }
    });
    
    password.addEventListener('blur', validatePassword);
    password.addEventListener('input', function() {
        if (this.value.length > 0) {
            validatePassword();
        }
        if (passwordConfirm.value.length > 0) {
            validatePasswordConfirm();
        }
    });
    
    passwordConfirm.addEventListener('blur', validatePasswordConfirm);
    passwordConfirm.addEventListener('input', function() {
        if (this.value.length > 0) {
            validatePasswordConfirm();
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validatePasswordConfirm();
        
        if (!terminos.checked) {
            alert('⚠️ Debes aceptar los términos y condiciones para continuar');
            return;
        }
        
        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            const userData = {
                username: username.value.trim(),
                email: email.value.trim(),
                newsletter: document.getElementById('newsletter').checked,
                registrationDate: new Date().toISOString()
            };
            
            localStorage.setItem('godofwar_user', JSON.stringify(userData));
            
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, var(--dark-red) 0%, var(--card-bg) 100%);
                padding: 2rem;
                border-radius: 12px;
                border: 2px solid var(--gold);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
                z-index: 10000;
                text-align: center;
                max-width: 400px;
            `;
            
            successMessage.innerHTML = `
                <h2 style="color: var(--gold); margin-bottom: 1rem;">⚔️ ¡Registro Exitoso! ⚔️</h2>
                <p style="color: var(--text-light); margin-bottom: 1.5rem;">Bienvenido a la comunidad de God of War, ${userData.username}!</p>
                <button onclick="this.parentElement.remove(); window.location.href='index.html'" 
                        style="padding: 0.8rem 2rem; background: var(--primary-red); color: var(--text-light); border: 2px solid var(--gold); border-radius: 5px; cursor: pointer; font-weight: bold;">
                    Continuar
                </button>
            `;
            
            document.body.appendChild(successMessage);
            
            form.reset();
        }
    });
    
    form.addEventListener('reset', function() {
        clearError(usernameError);
        clearError(emailError);
        clearError(passwordError);
        clearError(confirmError);
    });
});
