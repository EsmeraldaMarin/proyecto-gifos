const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

//MODO NOCTURNO

let body = document.querySelector("body");
let buttonModoN = document.querySelector(".m_noc");
let buttonModoD = document.querySelector(".m_di");

body.className = localStorage.getItem("theme");

function modoNocturno(){
    body.classList.toggle("body_nocturno");
    let bodyClass = body.className
    saveTheme(bodyClass);
}
let saveTheme = (bodyClass)=>{
    localStorage.setItem("theme", bodyClass)
}

buttonModoN.addEventListener("click", modoNocturno);
buttonModoD.addEventListener("click", modoNocturno);

//MENU HAMBURGUESA

let bars = document.getElementById("bars");
let cruz = document.getElementById("cruz");
let nav = document.querySelector("header nav");

bars.addEventListener("click", ()=>{
    nav.classList.remove("defaultMenu")
    bars.classList.remove("activo");
    cruz.classList.add("activo");
})
cruz.addEventListener("click", ()=>{
    nav.classList.add("defaultMenu")
    cruz.classList.remove("activo");
    bars.classList.add("activo");
})