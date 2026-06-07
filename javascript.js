
/* CONTROLES DE VALIDACION DE CONTACTO */ 

function validar() {
    let formularioValido = true;

    let inputNombre = document.getElementById("nombre-contac");
    let inputApellido = document.getElementById("apellido-contac");
    let inputTel = document.getElementById("tel-contac");
    let inputCorreo = document.getElementById("correo-contac");

    let nomCont = inputNombre.value.trim();
    let apeCont = inputApellido.value.trim();
    let telCont = inputTel.value.trim();
    let correoCont = inputCorreo.value.trim();

    
    const Letras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/; 
    const Telefono = /^\d{10}$/; 

    // colores de Bootstrap
    function aplicarValidacion(elemento, esValido) {
        if (esValido) {
            elemento.classList.remove("is-invalid");
            elemento.classList.add("is-valid");
        } else {
            elemento.classList.remove("is-valid");
            elemento.classList.add("is-invalid");
            formularioValido = false;
        }
    }

    
    aplicarValidacion(inputNombre, Letras.test(nomCont));
    aplicarValidacion(inputApellido, Letras.test(apeCont));

    
    aplicarValidacion(inputTel, Telefono.test(telCont));

  
   // Validamos Correo
 
let tieneArroba = correoCont.includes("@");
let tieneTextoAntes = correoCont.indexOf("@") > 0;//Verificamos que el @ no sea el primer carácter (indice > 0)
let terminaEnCom = correoCont.endsWith(".com");

let correoValido = tieneArroba && tieneTextoAntes && terminaEnCom;

aplicarValidacion(inputCorreo, correoValido);

   
    if (formularioValido) {
        alert("¡Formulario enviado correctamente!");
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
