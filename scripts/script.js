const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

let body = document.querySelector("body");
let buttonModoN = document.querySelector(".m_noc");
let buttonModoD = document.querySelector(".m_di")


buttonModoN.addEventListener("click", modoNocturno);
buttonModoD.addEventListener("click", modoNocturno);


function modoNocturno(){
    body.classList.toggle("body_nocturno");
    buttonModoD.classList.toggle("modo_noc");
    buttonModoD.classList.toggle("m_di");
    buttonModoN.classList.toggle("modo_noc");
    buttonModoN.classList.toggle("m_noc");

}
