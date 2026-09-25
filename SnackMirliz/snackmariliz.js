/*=========================================
        SNACKS MIRLIZ
        SCRIPT.JS
==========================================*/

"use strict";

/*=========================================
        LOADER
==========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },500);

    }

});


/*=========================================
        BOTÓN SUBIR
==========================================*/

const btnArriba = document.getElementById("btn-arriba");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        btnArriba.style.display="block";

    }else{

        btnArriba.style.display="none";

    }

});

btnArriba.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=========================================
        HEADER SCROLL
==========================================*/

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.style.padding="0px";

        header.style.background="#ffffff";

        header.style.boxShadow="0 5px 20px rgba(0,0,0,.10)";

    }else{

        header.style.background="rgba(255,255,255,.95)";

        header.style.boxShadow="none";

    }

});


/*=========================================
        MENÚ RESPONSIVE
==========================================*/

const menu=document.getElementById("menu");

const nav=document.querySelector("nav");

menu.addEventListener("click",()=>{

    nav.classList.toggle("activo");

});


/*=========================================
        FAVORITOS
==========================================*/

const favoritos=document.querySelectorAll(".favorito");

favoritos.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        boton.classList.toggle("activo");

        if(boton.classList.contains("activo")){

            boton.style.background="#ff4d4d";

            boton.style.color="#fff";

        }else{

            boton.style.background="#fff";

            boton.style.color="#222";

        }

    });

});


/*=========================================
        BUSCADOR
==========================================*/

const buscar=document.getElementById("buscarProducto");

if(buscar){

buscar.addEventListener("keyup",()=>{

    let texto=buscar.value.toLowerCase();

    let productos=document.querySelectorAll(".producto");

    productos.forEach((producto)=>{

        let nombre=producto.innerText.toLowerCase();

        if(nombre.indexOf(texto)>-1){

            producto.style.display="block";

        }else{

            producto.style.display="none";

        }

    });

});

}
/*=========================================
        CARRITO DE COMPRAS
==========================================*/

const carrito = document.querySelector(".carrito");
const iconoCarrito = document.querySelector(".fa-shopping-cart");
const cerrarCarrito = document.querySelector(".cerrar");
const botonesCarrito = document.querySelectorAll(".btn-carrito");
const listaCarrito = document.querySelector(".lista-carrito");
const totalCarrito = document.querySelector(".total h2");

let total = 10;

/*=========================================
        ABRIR CARRITO
==========================================*/

if(iconoCarrito){

    iconoCarrito.addEventListener("click",()=>{

        carrito.classList.add("activo");

    });

}

/*=========================================
        CERRAR CARRITO
==========================================*/

if(cerrarCarrito){

    cerrarCarrito.addEventListener("click",()=>{

        carrito.classList.remove("activo");

    });

}

/*=========================================
        AGREGAR PRODUCTOS
==========================================*/

botonesCarrito.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        const tarjeta = boton.parentElement;

        const nombre = tarjeta.querySelector("h3").textContent;

        const precio = tarjeta.querySelector(".nuevo").textContent;

        const imagen = tarjeta.parentElement.querySelector("img").src;

        agregarProducto(nombre,precio,imagen);

    });

});

/*=========================================
        FUNCIÓN AGREGAR
==========================================*/

function agregarProducto(nombre,precio,imagen){

    const item = document.createElement("div");

    item.classList.add("item-carrito");

    item.innerHTML = `

        <img src="${imagen}">

        <div>

            <h4>${nombre}</h4>

            <p>${precio}</p>

        </div>

        <i class="fas fa-trash eliminar"></i>

    `;

    listaCarrito.appendChild(item);

    actualizarTotal(precio);

    eliminarProducto();

    mostrarMensaje(nombre);

}

/*=========================================
        ACTUALIZAR TOTAL
==========================================*/

function actualizarTotal(precio){

    let numero = parseFloat(precio.replace("Bs.",""));

    total += numero;

    totalCarrito.textContent = "Bs. " + total;

}

/*=========================================
        ELIMINAR PRODUCTOS
==========================================*/

function eliminarProducto(){

    const eliminar = document.querySelectorAll(".eliminar");

    eliminar.forEach((boton)=>{

        boton.onclick=()=>{

            boton.parentElement.remove();

        }

    });

}

/*=========================================
        MENSAJE
==========================================*/

function mostrarMensaje(nombre){

    const mensaje = document.createElement("div");

    mensaje.classList.add("mensaje");

    mensaje.innerHTML = `

        ${nombre} agregado al carrito

    `;

    document.body.appendChild(mensaje);

    setTimeout(()=>{

        mensaje.remove();

    },2500);

}

/*=========================================
        BOTÓN COMPRAR
==========================================*/

const comprar = document.querySelector(".btn-comprar");

if(comprar){

comprar.addEventListener("click",()=>{

    alert("Gracias por comprar en Snacks Mirliz.");

});

}
/*=========================================
        FILTROS DE PRODUCTOS
==========================================*/

const botonesFiltro = document.querySelectorAll(".filtros button");
const productos = document.querySelectorAll(".producto");

botonesFiltro.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        botonesFiltro.forEach((b)=>{

            b.classList.remove("activo");

        });

        boton.classList.add("activo");

        const categoria = boton.textContent.toLowerCase();

        productos.forEach((producto)=>{

            const nombre = producto.querySelector("h3").textContent.toLowerCase();

            if(categoria==="todos"){

                producto.style.display="block";

            }else{

                if(nombre.includes(categoria)){

                    producto.style.display="block";

                }else{

                    producto.style.display="none";

                }

            }

        });

    });

});


/*=========================================
        CONTADOR ANIMADO
==========================================*/

const numeros = document.querySelectorAll(".item h2");

numeros.forEach((numero)=>{

    let inicio = 0;

    let objetivo = parseInt(numero.textContent.replace(/\D/g,""));

    let velocidad = Math.max(20, Math.floor(2000/objetivo));

    const contador = setInterval(()=>{

        inicio += Math.ceil(objetivo/100);

        if(inicio >= objetivo){

            inicio = objetivo;

            clearInterval(contador);

        }

        if(numero.textContent.includes("+")){

            numero.textContent = inicio + "+";

        }else{

            numero.textContent = inicio;

        }

    },velocidad);

});


/*=========================================
        ANIMACIÓN AL HACER SCROLL
==========================================*/

const elementos = document.querySelectorAll(
".card,.producto,.categoria,.cliente,.servicio,.item"
);

function mostrarElementos(){

    elementos.forEach((elemento)=>{

        const posicion = elemento.getBoundingClientRect().top;

        const pantalla = window.innerHeight;

        if(posicion < pantalla - 100){

            elemento.style.opacity="1";

            elemento.style.transform="translateY(0)";

        }

    });

}

window.addEventListener("scroll",mostrarElementos);

mostrarElementos();


/*=========================================
        NEWSLETTER
==========================================*/

const formularioNewsletter = document.querySelector(".newsletter form");

if(formularioNewsletter){

formularioNewsletter.addEventListener("submit",(e)=>{

    e.preventDefault();

    const correo = formularioNewsletter.querySelector("input").value;

    if(correo===""){

        alert("Ingrese un correo.");

        return;

    }

    alert("Gracias por suscribirte.");

    formularioNewsletter.reset();

});

}


/*=========================================
        FORMULARIO CONTACTO
==========================================*/

const formulario = document.querySelector(".formulario form");

if(formulario){

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Mensaje enviado correctamente.");

    formulario.reset();

});

}


/*=========================================
        FAQ
==========================================*/

const preguntas = document.querySelectorAll(".pregunta");

preguntas.forEach((pregunta)=>{

    pregunta.addEventListener("click",()=>{

        pregunta.classList.toggle("abierta");

    });

});


/*=========================================
        IMÁGENES GALERÍA
==========================================*/

const imagenes = document.querySelectorAll(".contenedor-galeria img");

imagenes.forEach((imagen)=>{

    imagen.addEventListener("click",()=>{

        window.open(imagen.src);

    });

});


/*=========================================
        MENSAJE FINAL
==========================================*/

console.log("Snacks Mirliz cargado correctamente.");
/*=========================================
        MODO OSCURO
==========================================*/

const botonModo = document.createElement("button");

botonModo.innerHTML = '<i class="fas fa-moon"></i>';

botonModo.className = "modo-oscuro";

document.body.appendChild(botonModo);

botonModo.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        botonModo.innerHTML='<i class="fas fa-sun"></i>';

        localStorage.setItem("modo","oscuro");

    }else{

        botonModo.innerHTML='<i class="fas fa-moon"></i>';

        localStorage.setItem("modo","claro");

    }

});

if(localStorage.getItem("modo")=="oscuro"){

    document.body.classList.add("dark");

    botonModo.innerHTML='<i class="fas fa-sun"></i>';

}

/*=========================================
        GUARDAR FAVORITOS
==========================================*/

const favoritosGuardados=[];

document.querySelectorAll(".favorito").forEach((favorito,index)=>{

    favorito.addEventListener("click",()=>{

        if(favorito.classList.contains("activo")){

            favoritosGuardados.push(index);

        }

        localStorage.setItem("favoritos",
        JSON.stringify(favoritosGuardados));

    });

});

/*=========================================
        RELOJ
==========================================*/

function actualizarHora(){

    const ahora=new Date();

    const hora=ahora.toLocaleTimeString();

    console.log("Hora:",hora);

}

setInterval(actualizarHora,1000);

/*=========================================
        BOTÓN ESC
==========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        if(carrito){

            carrito.classList.remove("activo");

        }

    }

});

/*=========================================
        ANIMACIÓN BOTONES
==========================================*/

const botones=document.querySelectorAll("button");

botones.forEach((boton)=>{

    boton.addEventListener("mouseenter",()=>{

        boton.style.transform="scale(1.05)";

    });

    boton.addEventListener("mouseleave",()=>{

        boton.style.transform="scale(1)";

    });

});

/*=========================================
        MENÚ ACTIVO
==========================================*/

const enlaces=document.querySelectorAll("nav a");

enlaces.forEach((link)=>{

    link.addEventListener("click",()=>{

        enlaces.forEach((l)=>{

            l.classList.remove("activo");

        });

        link.classList.add("activo");

    });

});

/*=========================================
        MENSAJE BIENVENIDA
==========================================*/

setTimeout(()=>{

    console.log("Bienvenido a Snacks Mirliz");

},1500);

/*=========================================
        EFECTO EN LOGO
==========================================*/

const logo=document.querySelector(".logo");

if(logo){

logo.addEventListener("mouseenter",()=>{

    logo.style.transform="rotate(-3deg) scale(1.05)";

});

logo.addEventListener("mouseleave",()=>{

    logo.style.transform="rotate(0deg)";

});

}

/*=========================================
        EFECTO IMÁGENES
==========================================*/

document.querySelectorAll("img").forEach((imagen)=>{

    imagen.addEventListener("mouseenter",()=>{

        imagen.style.transition=".4s";

        imagen.style.transform="scale(1.04)";

    });

    imagen.addEventListener("mouseleave",()=>{

        imagen.style.transform="scale(1)";

    });

});

/*=========================================
        SCROLL SUAVE
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(ancla=>{

    ancla.addEventListener("click",(e)=>{

        e.preventDefault();

        const destino=document.querySelector(
            ancla.getAttribute("href")
        );

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*=========================================
        FIN
==========================================*/

console.log("===================================");

console.log("SNACKS MIRLIZ");

console.log("Proyecto cargado correctamente");

console.log("HTML + CSS + JavaScript");

console.log("===================================");
