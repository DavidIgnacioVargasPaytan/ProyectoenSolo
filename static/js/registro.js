document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');

    if(form) {
        console.log("Sistema de registro listo."); 

        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const usuario = document.getElementById('username').value;
            const email = document.getElementById('email_reg').value;
            const password = document.getElementById('password_reg').value;
            const confirm = document.getElementById('password_confirm').value;

            if (!usuario || !email || !password) {
                alert("Kratos no deja campos vacíos.");
                return;
            }

            if(password !== confirm) {
                alert("Las contraseñas no coinciden, espartano.");
                return;
            }

            fetch('/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario,
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert(data.message);
                    form.reset();
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error de conexión con el servidor.");
            });
        });
    } else {
        console.error("No se encontró el formulario 'registroForm'");
    }
});