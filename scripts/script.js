const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

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

let bars = document.getElementById("bars");
let cruz = document.getElementById("cruz");
let nav = document.querySelector("header nav");

bars.addEventListener("click", () => {
    nav.classList.remove("defaultMenu")
    bars.classList.remove("activo");
    cruz.classList.add("activo");
})
cruz.addEventListener("click", () => {
    nav.classList.add("defaultMenu")
    cruz.classList.remove("activo");
    bars.classList.add("activo");
})

//Giphy Trendings

let gifsCtn = document.getElementById("gifsTrending");
const giphys = [];

async function showGifs() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKeyGiphy}&limit=30`;
    fetch(url)
        .then(resp => resp.json())
        .then(content => {
            for (let i = 0; i <= 26; i++) {

                let urlImg = content.data[i].images.downsized.url;;
                giphys.push(urlImg);
                createImg(giphys)
            }
        })
        .catch(err => console.log(err))
}
showGifs()

function createImg(g) {
    if (g.length === 27) {
        for (let i = 0; i <= 2; i++) {
            let gifCreated = document.createElement("img");
            gifCreated.src = g[i];
            gifsCtn.appendChild(gifCreated);
        }
    }
}

//Carrusel Trending

let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");

btnRight.addEventListener("click", swipeRight);
function swipeRight(e) {

    e.preventDefault()
    let imgs = document.querySelectorAll("#gifsTrending img");
    console.log(imgs)

}



