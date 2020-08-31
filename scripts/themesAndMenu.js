//MODO NOCTURNO

let body = document.querySelector("body");
let buttonModoN = document.querySelector(".m_noc");
let buttonModoD = document.querySelector(".m_di");

body.className = localStorage.getItem("theme");

function modoNocturno() {
    body.classList.toggle("body_nocturno");
    let bodyClass = body.className
    saveTheme(bodyClass);
}
let saveTheme = (bodyClass) => {
    localStorage.setItem("theme", bodyClass)
}

buttonModoN.addEventListener("click", modoNocturno);
buttonModoD.addEventListener("click", modoNocturno);

//MENU HAMBURGUESA

let menuHamburguesa = document.querySelector("div.iconosMenu")
let nav = document.querySelector("header nav");

menuHamburguesa.addEventListener("click", ()=>{
    menuHamburguesa.classList.toggle("menuActivo");
    nav.classList.toggle("defaultMenu")

})
