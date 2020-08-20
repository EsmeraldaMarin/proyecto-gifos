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

let gifsCtnTrending = document.getElementById("gifsTrending");
let limitTGifos = 28;
const giphys = [];

function showGifs() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKeyGiphy}&limit=${limitTGifos}`;
    fetch(url)
        .then(resp => resp.json())
        .then(content => {
            for (let i = 0; i <= limitTGifos - 1; i++) {

                let urlImg = content.data[i].images.downsized.url;
                giphys.push(urlImg);
                // createImg(giphys);

                let gifCreated = document.createElement("img");
                gifCreated.src = giphys[i];
                gifsCtnTrending.appendChild(gifCreated);

            }
        })
        .catch(err => console.log(err))
}
showGifs()



//CARRUSEL TRENDING

let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");


btnLeft.addEventListener("click", ()=>show(-3));
btnRight.addEventListener("click", ()=>show(+3));
let index = 0;

function show(increase) {

    let imgs = document.querySelectorAll("#gifsTrending img");

    index = index + increase;

    index = Math.min(
        Math.max(index, 0),
        imgs.length - 1
    );

    imgs[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
}


//SEARCH GIFOS

let inputSearch = document.getElementById("buscador");//corregir esto
let btnSearch = document.getElementById("searchbtn"); //corregir esto
let searchResultCtn = document.getElementById("searchResults")
let limitSGifos = 12;
let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&limit=${limitSGifos}`;

btnSearch.addEventListener("click", searchGif);
inputSearch.addEventListener("keyup", (event) => {

    if (event.which == 13 || event.keyCode == 13) {

        event.preventDefault();
        searchGif(event);
        return false;

    }
})

function searchGif(e) {

    let busqueda = inputSearch.value;
    urlSearch = `${urlSearch}&q=${busqueda}`;
    fetch(urlSearch)
        .then(resp => resp.json())
        .then(content => {
            createCtnGifs(content.data);
        })
        .catch(err => console.log(err))

}

function createCtnGifs(arrayGifs) {

    for (let i = 0; i <= limitSGifos - 1; i++) {

        let urlImg = arrayGifs[i].images.downsized.url;

        let gifSearched = document.createElement("img");
        gifSearched.className = "gifCard";
        gifSearched.src = urlImg
        searchResultCtn.appendChild(gifSearched);


    }
}

//AUTOCOMPLETAR


 let urlAutocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKeyGiphy}&limit=4&q=`;
let ulAutocomplete = document.getElementById("autocompleteCtn")

function autocomplete() {
    let busqueda = inputSearch.value;
    urlAutocomplete = urlAutocomplete.concat(busqueda);
    fetch(urlAutocomplete)
        .then(resp => resp.json())
        .then(content => {
            console.log(content);
            for (let i = 0; i < content.data.length; i++) {
                let liTags = document.createElement("li");
                liTags.textContent = content.data[i].name;
                ulAutocomplete.appendChild(liTags);
            }
        })

}
inputSearch.addEventListener("keyup", autocomplete); 


//Scroll top

let buscadorHeader = document.getElementById("buscadorHeader")

window.addEventListener("scroll", myFunction)

function myFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      buscadorHeader.style.display = "block"
  }else{
    buscadorHeader.style.display = "none"

  }
}




