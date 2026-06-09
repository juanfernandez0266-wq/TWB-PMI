document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-contacto");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que la página se recargue
        validar(); // Llama a tu función de validación
    });
});

function validar() {
    let formularioValido = true;

    // ... (aquí van tus declaraciones de variables: inputNombre, inputApellido, etc.)
    let inputNombre = document.getElementById("nombre-contac");
    let inputApellido = document.getElementById("apellido-contac");
    let inputTel = document.getElementById("tel-contac");
    let inputCorreo = document.getElementById("correo-contac");
    let inputMensaje = document.getElementById("mens-contac");

    let nomCont = inputNombre.value.trim();
    let apeCont = inputApellido.value.trim();
    let telCont = inputTel.value.trim();
    let correoCont = inputCorreo.value.trim();
    let mensCont = inputMensaje ? inputMensaje.value.trim() : "";

    const Letras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/; 
    const Telefono = /^\d{10}$/; 

    // Función auxiliar para las clases de Bootstrap
    function aplicarValidacion(elemento, esValido) {
        if (esValido) {
            elemento.classList.remove("is-invalid");
            elemento.classList.add("is-valid");
        } else {
            elemento.classList.remove("is-valid");
            elemento.classList.add("is-invalid");
            formularioValido = false; // Si algo falla, el formulario no es válido
        }
    }

    // Ejecutar validaciones
    aplicarValidacion(inputNombre, Letras.test(nomCont));
    aplicarValidacion(inputApellido, Letras.test(apeCont));
    aplicarValidacion(inputTel, Telefono.test(telCont));

    let correoValido = correoCont.includes("@") && correoCont.indexOf("@") > 0 && correoCont.endsWith(".com");
    aplicarValidacion(inputCorreo, correoValido);

    // --- AQUÍ ESTÁ LA CLAVE: SOLO GUARDAR SI TODO ES VÁLIDO ---
    if (formularioValido) {
        const datosContacto = {
            nombre: nomCont,
            apellido: apeCont,
            telefono: telCont,
            email: correoCont,
            mensaje: mensCont
        };

        // Lógica de guardado en localStorage
        let lista = JSON.parse(localStorage.getItem('misContactos')) || [];
        lista.push(datosContacto);
        localStorage.setItem('misContactos', JSON.stringify(lista));

        console.log("¡Datos guardados correctamente!");
        alert("¡Formulario enviado y datos guardados con éxito!");

        // Limpiar el formulario después de guardar
        document.getElementById("formulario-contacto").reset();
        
        // Quitar las clases de "éxito" de los inputs
        document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-valid'));
    } else {
        alert("Por favor, revisa los errores en el formulario.");
    }
}
/* FUNCION DE LOS BOTONES DE LA TABLA */
function alternar(vista) {
    const tabla = document.getElementById('vista-tabla');
    const imagen = document.getElementById('vista-imagen');

    if (vista === 'tabla') {
        tabla.classList.remove('d-none');
        imagen.classList.add('d-none');
    } else if (vista === 'imagen') {
        tabla.classList.add('d-none');
        imagen.classList.remove('d-none');
    }
}