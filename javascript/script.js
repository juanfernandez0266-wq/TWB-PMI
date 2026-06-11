/* MENÚ FIJO: SE OCULTA AL BAJAR Y APARECE AL SUBIR */

let posicionAnterior = 0;
const menuPrincipal = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    let posicionActual = window.pageYOffset;

    if (posicionActual > posicionAnterior && posicionActual > 120) {
        menuPrincipal.classList.add("menu-oculto");
    } else {
        menuPrincipal.classList.remove("menu-oculto");
    }

    if (posicionActual > 80) {
        menuPrincipal.classList.add("menu-con-fondo");
    } else {
        menuPrincipal.classList.remove("menu-con-fondo");
    }

    posicionAnterior = posicionActual;
});

















function marcarValido(campo) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
}

function marcarInvalido(campo) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
}

function validarNombre() {
    let nombre = document.getElementById("nombreCompleto");
    let valor = nombre.value.trim();

    let letrasPermitidas = "abcdefghijklmnñopqrstuvwxyzáéíóú ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ ";
    let valido = true;

    if (valor.length < 3 || valor.length > 70) {
        valido = false;
    }

    if (valor.indexOf("  ") !== -1) {
        valido = false;
    }

    for (let i = 0; i < valor.length; i++) {
        if (letrasPermitidas.indexOf(valor[i]) === -1) {
            valido = false;
        }
    }

    if (valido) {
        marcarValido(nombre);
    } else {
        marcarInvalido(nombre);
    }

    return valido;
}


function validarFechaNacimiento() { 
    let fechaNacimiento = document.getElementById("fechaNacimiento");
    let valor = fechaNacimiento.value;
    if (valor === "") {
        marcarInvalido(fechaNacimiento);
        return false;
    } 
    let fechaIngresada = new Date(valor);
    if (isNaN(fechaIngresada.getTime())){ 
        marcarInvalido(fechaNacimiento); 
        return false; 
     } 
    marcarValido(fechaNacimiento);
    return true;
}

function validarTelefono() {
    let telefono = document.getElementById("telefono");
    let valor = telefono.value.trim();

    let numerosPermitidos = "0123456789";
    let valido = true;

    if (valor.length !== 10) {
        valido = false;
    }

    for (let i = 0; i < valor.length; i++) {
        if (numerosPermitidos.indexOf(valor[i]) === -1) {
            valido = false;
        }
    }

    if (valido) {
        marcarValido(telefono);
    } else {
        marcarInvalido(telefono);
    }

    return valido;
}


function validarGmail() {
    let gmail = document.getElementById("gmail");
    let valor = gmail.value.trim();

    if (valor === "") {
        gmail.classList.remove("is-valid");
        gmail.classList.remove("is-invalid");
        return true;
    }

    let valido = true;
    let posicionArroba = valor.indexOf("@");

    if (posicionArroba === -1) {
        valido = false;
    }

    if (valor.indexOf(" ") !== -1) {
        valido = false;
    }

    if (!valor.endsWith(".com")) {
        valido = false;
    }

    if (posicionArroba <= 0) {
        valido = false;
    }

    if (valido) {
        let nombreUsuario = valor.substring(0, posicionArroba);
        let dominio = valor.substring(posicionArroba + 1);

        if (nombreUsuario.length < 6 || nombreUsuario.length > 30) {
            valido = false;
        }

        if (nombreUsuario.startsWith(".") || nombreUsuario.endsWith(".")) {
            valido = false;
        }

        if (nombreUsuario.indexOf("..") !== -1) {
            valido = false;
        }

        let caracteresPermitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.";

        for (let i = 0; i < nombreUsuario.length; i++) {
            if (caracteresPermitidos.indexOf(nombreUsuario[i]) === -1) {
                valido = false;
            }
        }

        if (dominio.indexOf(".") === -1) {
            valido = false;
        }
    }

    if (valido) {
        marcarValido(gmail);
    } else {
        marcarInvalido(gmail);
    }

    return valido;
}


function actualizarPlan() {
    let plan = document.getElementById("plan");
    let detallePlan = document.getElementById("detallePlan");

    let actividades = document.getElementsByClassName("actividad-opcion");

    for (let i = 0; i < actividades.length; i++) {
        actividades[i].checked = false;
        actividades[i].disabled = false;
    }

    if (plan.value === "inicial") {
        detallePlan.innerHTML = "Plan Inicial: desde $18.700. Permite elegir 1 actividad y realizar hasta 2 clases por semana.";
        marcarValido(plan);
    } else if (plan.value === "activo") {
        detallePlan.innerHTML = "Plan Activo: desde $25.300. Permite elegir hasta 2 actividades y repartir 3 clases semanales.";
        marcarValido(plan);
    } else if (plan.value === "libre") {
        detallePlan.innerHTML = "Pase Libre: desde $34.100. Permite elegir cualquier actividad disponible, según horarios.";
        marcarValido(plan);
    } else {
        detallePlan.innerHTML = "Seleccioná un plan para ver la condición correspondiente.";
        marcarInvalido(plan);
    }

    validarActividades();
}


function obtenerLimiteActividades() {
    let plan = document.getElementById("plan").value;

    if (plan === "inicial") {
        return 1;
    }

    if (plan === "activo") {
        return 2;
    }

    if (plan === "libre") {
        return 5;
    }

    return 0;
}


function contarActividadesSeleccionadas() {
    let actividades = document.getElementsByClassName("actividad-opcion");
    let cantidad = 0;

    for (let i = 0; i < actividades.length; i++) {
        if (actividades[i].checked) {
            cantidad++;
        }
    }

    return cantidad;
}


function validarActividades() {
    let plan = document.getElementById("plan");
    let mensaje = document.getElementById("mensajeActividades");
    let actividades = document.getElementsByClassName("actividad-opcion");

    let limite = obtenerLimiteActividades();
    let seleccionadas = contarActividadesSeleccionadas();

    if (plan.value === "") {
        mensaje.style.display = "block";
        mensaje.innerHTML = "Primero seleccione un plan.";
        return false;
    }

    if (seleccionadas === 0) {
        mensaje.style.display = "block";
        mensaje.innerHTML = "Seleccione al menos una actividad.";
        return false;
    }

    if (seleccionadas > limite) {
        mensaje.style.display = "block";
        mensaje.innerHTML = "La cantidad de actividades seleccionadas supera el límite del plan elegido.";

        for (let i = 0; i < actividades.length; i++) {
            if (!actividades[i].checked) {
                actividades[i].disabled = true;
            }
        }

        return false;
    }

    if (seleccionadas === limite) {
        for (let i = 0; i < actividades.length; i++) {
            if (!actividades[i].checked) {
                actividades[i].disabled = true;
            }
        }
    } else {
        for (let i = 0; i < actividades.length; i++) {
            actividades[i].disabled = false;
        }
    }

    mensaje.style.display = "none";
    return true;
}


function validarPlan() {
    let plan = document.getElementById("plan");

    if (plan.value === "") {
        marcarInvalido(plan);
        return false;
    }

    marcarValido(plan);
    return true;
}


function validarFormulario() {
    let nombreValido = validarNombre();
    let fechaValida = validarFechaNacimiento();
    let telefonoValido = validarTelefono();
    let gmailValido = validarGmail();
    let planValido = validarPlan();
    let actividadesValidas = validarActividades();

    if (nombreValido && fechaValida && telefonoValido && gmailValido && planValido && actividadesValidas) {
        alert("Formulario enviado correctamente, pronto nos pondremos en contacto.");
        limpiarFormulario();
        return false;
    } else {
        alert("Revise los datos ingresados.");
        return false;
    }
}

function limpiarFormulario() {
    let formulario = document.getElementById("formularioInscripcion");
    formulario.reset();

    let campos = document.getElementsByClassName("form-control");

    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("is-valid");
        campos[i].classList.remove("is-invalid");
    }

    let actividades = document.getElementsByClassName("actividad-opcion");

    for (let i = 0; i < actividades.length; i++) {
        actividades[i].checked = false;
        actividades[i].disabled = false;
    }

    let plan = document.getElementById("plan");
    plan.classList.remove("is-valid");
    plan.classList.remove("is-invalid");

    let detallePlan = document.getElementById("detallePlan");
    detallePlan.innerHTML = "Seleccioná un plan para ver la condición correspondiente.";

    let mensajeActividades = document.getElementById("mensajeActividades");
    mensajeActividades.style.display = "none";
}





/* =====================================================
   CONTACTO - VALIDACIÓN DEL FORMULARIO DE VALE
===================================================== */

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-contacto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        validarContacto();
    });
});

function validarContacto() {
    let formularioValido = true;

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

    let correoValido = correoCont.includes("@") && correoCont.indexOf("@") > 0 && correoCont.endsWith(".com");
    aplicarValidacion(inputCorreo, correoValido);

    if (formularioValido) {
        const datosContacto = {
            nombre: nomCont,
            apellido: apeCont,
            telefono: telCont,
            email: correoCont,
            mensaje: mensCont
        };

        let lista = JSON.parse(localStorage.getItem("misContactos")) || [];
        lista.push(datosContacto);
        localStorage.setItem("misContactos", JSON.stringify(lista));

        alert("Formulario enviado y datos guardados con éxito.");

        document.getElementById("formulario-contacto").reset();

        document.querySelectorAll("#formulario-contacto .form-control").forEach(function(elemento) {
            elemento.classList.remove("is-valid");
        });
    } else {
        alert("Por favor, revisa los errores en el formulario.");
    }
}









/* =====================================================
   HORARIOS JS VALE - CAMBIO ENTRE TABLA E IMAGEN 
===================================================== */

function alternar(vista) {
    const tabla = document.getElementById("vista-tabla");
    const imagen = document.getElementById("vista-imagen");

    if (!tabla || !imagen) {
        return;
    }

    if (vista === "tabla") {
        tabla.classList.remove("d-none");
        imagen.classList.add("d-none");
    } else if (vista === "imagen") {
        tabla.classList.add("d-none");
        imagen.classList.remove("d-none");
    }
}


/* =====================================================
    JS DE RAMIRO - CAMBIO DE CLASE DESTACADA
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const mainImg = document.getElementById("main-card-img");
    const mainTitle = document.getElementById("main-card-title");
    const mainDesc = document.getElementById("main-card-desc");

    const tabs = document.querySelectorAll(".tab-item");

    if (!mainImg || !mainTitle || !mainDesc || tabs.length === 0) {
        return;
    }

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {

            if (tab.classList.contains("active")) {
                return;
            }

            const tabActiva = document.querySelector(".tab-item.active");

            if (tabActiva) {
                tabActiva.classList.remove("active");
            }

            tab.classList.add("active");

            const nuevoTitulo = tab.getAttribute("data-title");
            const nuevaDescripcion = tab.getAttribute("data-desc");
            const nuevaImagen = tab.getAttribute("data-img");

            mainImg.style.opacity = 0;
            mainTitle.style.opacity = 0;
            mainDesc.style.opacity = 0;

            setTimeout(function () {
                mainImg.src = nuevaImagen;
                mainTitle.innerText = nuevoTitulo;
                mainDesc.innerText = nuevaDescripcion;

                mainImg.style.opacity = 1;
                mainTitle.style.opacity = 1;
                mainDesc.style.opacity = 1;
            }, 150);
        });
    });
});





/* =====================================================
    JS DE RAMIRO - CAMBIO DE CLASE DESTACADA
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const mainImg = document.getElementById("main-card-img");
    const mainTitle = document.getElementById("main-card-title");
    const mainDesc = document.getElementById("main-card-desc");

    const tabs = document.querySelectorAll(".tab-item");

    if (!mainImg || !mainTitle || !mainDesc || tabs.length === 0) {
        return;
    }

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {

            if (tab.classList.contains("active")) {
                return;
            }

            const tabActiva = document.querySelector(".tab-item.active");

            if (tabActiva) {
                tabActiva.classList.remove("active");
            }

            tab.classList.add("active");

            const nuevoTitulo = tab.getAttribute("data-title");
            const nuevaDescripcion = tab.getAttribute("data-desc");
            const nuevaImagen = tab.getAttribute("data-img");

            mainImg.style.opacity = 0;
            mainTitle.style.opacity = 0;
            mainDesc.style.opacity = 0;

            setTimeout(function () {
                mainImg.src = nuevaImagen;
                mainTitle.innerText = nuevoTitulo;
                mainDesc.innerText = nuevaDescripcion;

                mainImg.style.opacity = 1;
                mainTitle.style.opacity = 1;
                mainDesc.style.opacity = 1;
            }, 150);
        });
    });
});





/* =====================================================
   ACTIVIDADES JSON - CARGAR, FILTRAR Y ELIMINAR
===================================================== */
/* VARIABLES GLOBALES PARA GUARDAR LAS ACTIVIDADES */
let actividades = [];
let actividadesFiltradas = [];
let categoriaActual = "Todas";


/*  Espera a que el html este completamente cargado para ejecutar el código */
document.addEventListener("DOMContentLoaded", function () {
    const contenedorActividades = document.getElementById("contenedorActividades");

    if (!contenedorActividades) {
        return;
    }
    /* Cuando esta todo cargado, llama a cargar las actividades desde el archivo JSON */
    cargarActividadesDesdeJson();
});


function cargarActividadesDesdeJson() {
    /* Solicita el archivo JSON con las actividades, lo convierte a un objeto JavaScript y lo guarda en la variable global "actividades".
     Luego muestra las actividades en la página. Si hay un error al cargar el archivo, muestra una alerta. */
    fetch("datos/actividades.json")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            actividades = datos;
            actividadesFiltradas = actividades;

            mostrarActividades();
            mostrarPrimeraActividad();
        })
        .catch(function () {
            alert("No se pudieron cargar las actividades desde el archivo JSON.");
        });
}

/* Muestra todas las actividades que están en la variable "actividadesFiltradas" dentro del contenedor HTML.*/
function mostrarActividades() {
    const contenedor = document.getElementById("contenedorActividades");

    if (!contenedor) {
        return;
    }
    /* Borra cualquier contenido previo a ese contenedor para evitar duplicados.*/
    contenedor.innerHTML = "";

    /* Si no hay actividades para mostrar, muestra un mensaje indicando que no hay actividades disponibles para esa categoría. */
    if (actividadesFiltradas.length === 0) {
        contenedor.innerHTML = "<p class='text-center text-muted'>No hay actividades disponibles para esta categoría.</p>";
        limpiarActividadPrincipal();
        return;
    }
    /* Recorre la lista de actividades filtradas y crea un elemento HTML para cada una, agregándolos al contenedor. 
    Cada elemento incluye una imagen, el nombre de la actividad y un botón para eliminarla de la vista. 
    Al hacer clic en el elemento, se muestra la información detallada de esa actividad. */
   
    for (let i = 0; i < actividadesFiltradas.length; i++) {
        const actividad = actividadesFiltradas[i];

        contenedor.innerHTML +=
            "<div class='tab-item' onclick='mostrarActividad(" + actividad.id + ")'>" +
                "<img src='" + actividad.imagen + "' alt='" + actividad.nombre + "'>" +
                "<span>" + actividad.nombre + "</span>" +
                "<button type='button' class='boton-eliminar-actividad' onclick='eliminarActividad(event, " + actividad.id + ")'>Eliminar</button>" +
            "</div>";
    }
}

/* Muestra la información detallada de una actividad específica en la sección principal de la página.*/
function mostrarActividad(idActividad) {
    let actividadEncontrada = null;
    /* Busca la actividad que coincida con el id que se pasa, cuando la encuentra, la guarda para luego mostrar sus detalles. */
    for (let i = 0; i < actividades.length; i++) {
        if (actividades[i].id === idActividad) {
            actividadEncontrada = actividades[i];
        }
    }

    if (actividadEncontrada === null) {
        return;
    }
    /* Si lo encuentra, acutaliza la imagen, el titulo, la descripción, el nivel y la categoría de la actividad en la sección principal.*/
    const imagen = document.getElementById("main-card-img");
    const titulo = document.getElementById("main-card-title");
    const descripcion = document.getElementById("main-card-desc");
    const nivel = document.getElementById("nivelActividad");
    const categoria = document.getElementById("categoriaActividad");

    if (!imagen || !titulo || !descripcion) {
        return;
    }

    imagen.style.opacity = 0;
    titulo.style.opacity = 0;
    descripcion.style.opacity = 0;

    /* Despues de un pequeño retraso, actualiza la informacion para que la actividad se muestre con un efecto de transición suave. */
    setTimeout(function () {
        imagen.src = actividadEncontrada.imagen;
        imagen.alt = actividadEncontrada.nombre;

        titulo.innerHTML = actividadEncontrada.nombre;
        descripcion.innerHTML = actividadEncontrada.descripcion + "<br><br>" + actividadEncontrada.detalle;

        if (nivel) {
            nivel.innerHTML = actividadEncontrada.nivel;
        }

        if (categoria) {
            categoria.innerHTML = actividadEncontrada.categoria;
        }

        imagen.style.opacity = 1;
        titulo.style.opacity = 1;
        descripcion.style.opacity = 1;
    }, 150);

    const opciones = document.getElementsByClassName("tab-item");

    for (let i = 0; i < opciones.length; i++) {
        opciones[i].classList.remove("active");
    }

    for (let j = 0; j < actividadesFiltradas.length; j++) {
        if (actividadesFiltradas[j].id === idActividad && opciones[j]) {
            opciones[j].classList.add("active");
        }
    }
}

/* Filtra las actividades según la categoría seleccionada. Si se selecciona "Todas", muestra todas las actividades.*/
function filtrarActividades(categoria, boton) {
    categoriaActual = categoria;

    /* Si la categoría seleccionada es "Todas", asigna todas las actividades a la variable "actividadesFiltradas".*/
    if (categoria === "Todas") {
        actividadesFiltradas = actividades;
    } else {
        actividadesFiltradas = [];
    
    /*Si la cateogoría es diferente a "Todas", recorre la lista completa de actividades y agrega a "actividadesFiltradas" 
    solo aquellas que coincidan con la categoría seleccionada. */
        for (let i = 0; i < actividades.length; i++) {
            if (actividades[i].categoria === categoria) {
                actividadesFiltradas.push(actividades[i]);
            }
        }
    }
   
    /* Actualiza la clase "activo" en los botones de filtro para resaltar el botón seleccionado.
     Luego muestra las actividades filtradas y la primera actividad de esa categoría. */
    const botonesFiltro = document.getElementsByClassName("btn-filtro-actividad");
    
    /* Botones de filtro de actividades, para que se resalte la categoria que elegimos, las otras no se resaltan.*/
    for (let j = 0; j < botonesFiltro.length; j++) {
        botonesFiltro[j].classList.remove("activo");
    }

    if (boton) {
        boton.classList.add("activo");
    }

    mostrarActividades();
    mostrarPrimeraActividad();
}


/* Elimina una actividad de la vista al hacer clic en el botón "Eliminar" de esa actividad.
    Recibe como parámetros el evento del clic y el id de la actividad a eliminar. */
function eliminarActividad(evento, idActividad) {
    evento.stopPropagation();

    let confirmar = confirm("¿Desea eliminar esta actividad de la vista?");

    if (!confirmar) {
        return;
    }

    let nuevasActividades = [];

    /* Recorre la lista actividades, si es distinta a la que se quiere eliminar, la agrega a una nueva lista "nuevasActividades". */
    for (let i = 0; i < actividades.length; i++) {
        /*Si el id de la actividad actual no coicide con el id de la actividad a eliminar, se agrega a la nueva lista "nuevasActividades".*/
        if (actividades[i].id !== idActividad) {
            nuevasActividades.push(actividades[i]);
        }
    }

    actividades = nuevasActividades;
    aplicarFiltroActual();
}

/* Aplica el filtro actual para actualizar la vista después de eliminar una actividad.
    Si la categoría actual es "Todas", asigna todas las actividades a "actividadesFiltradas".*/

function aplicarFiltroActual() {
    
    if (categoriaActual === "Todas") {
        actividadesFiltradas = actividades;
    } else {
        actividadesFiltradas = [];

        for (let i = 0; i < actividades.length; i++) {
            if (actividades[i].categoria === categoriaActual) {
                actividadesFiltradas.push(actividades[i]);
            }
        }
    }
    /* Después de actualizar la lista de actividades filtradas, muestra las actividades y la primera actividad de esa categoría. */
    mostrarActividades();
    mostrarPrimeraActividad();
}

/* Muestra la primera actividad de la lista de actividades filtradas en la sección principal de la página.*/
function mostrarPrimeraActividad() {
    if (actividadesFiltradas.length > 0) {
        mostrarActividad(actividadesFiltradas[0].id);
    } else {
        limpiarActividadPrincipal();
    }
}

/* Limpia la sección principal de la página cuando no hay actividades para mostrar, 
restableciendo la imagen, el título, la descripción, el nivel y la categoría a valores 
predeterminados que indican que no hay actividades disponibles. */
function limpiarActividadPrincipal() {
    const imagen = document.getElementById("main-card-img");
    const titulo = document.getElementById("main-card-title");
    const descripcion = document.getElementById("main-card-desc");
    const nivel = document.getElementById("nivelActividad");
    const categoria = document.getElementById("categoriaActividad");

    if (!imagen || !titulo || !descripcion) {
        return;
    }

    imagen.removeAttribute("src");
    imagen.alt = "Sin actividad";
    titulo.innerHTML = "Sin actividades";
    descripcion.innerHTML = "No hay actividades disponibles para mostrar.";

    if (nivel) {
        nivel.innerHTML = "Sin nivel";
    }

    if (categoria) {
        categoria.innerHTML = "Sin categoría";
    }
}
