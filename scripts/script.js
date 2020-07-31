const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

let modoNocturno = document.getElementById("modos");

modoNocturno.addEventListener("click", (e)=>{
    e.preventDefault();

    let body = document.querySelector("body");
    body.classList.toggle("body_nocturno");

    modoNocturno.textContent="MODO DIURNO";
})

