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
let limit = 28;
const giphys = [];

function showGifs() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKeyGiphy}&limit=${limit}`;
    fetch(url)
        .then(resp => resp.json())
        .then(content => {
            console.log(content)
            for (let i = 0; i <= 26; i++) {

                let urlImg = content.data[i].images.downsized.url;;
                giphys.push(urlImg);
                // createImg(giphys);

                let gifCreated = document.createElement("img");
                gifCreated.src = giphys[i];
                gifsCtn.appendChild(gifCreated);


            }
        })
        .catch(err => console.log(err))
}
showGifs()



//CARRUSEL TRENDING

let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");


let index = 0;

window.show = function (increase) {

    let imgs = document.querySelectorAll("#gifsTrending img");

    index = index + (increase * 3);

    index = Math.min(
        Math.max(index, 0),
        imgs.length - 1
    );

    imgs[index].scrollIntoView({ behavior: 'smooth' });
}



