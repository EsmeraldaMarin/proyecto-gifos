
//**SEARCH GIFOS**//

//VARIABLES

let formularioCtn = document.querySelector(".formulario.mainForm");
let inputSearch = document.querySelector(".mainSearch input");
let btnSearch = document.querySelector(".mainSearch .searchbtn");
let btnClose = document.querySelector(".mainSearch svg.closeSearch");

let searchResultCtn = document.getElementById("searchResults")
let limitSGifos = 12;
let offset = 0;
let seeMoreBtn = document.getElementById("seeMoreResults")
let trendingTerms = document.querySelectorAll("p.trendingTerms span")
let spanTerm = document.getElementById("termBuscado")
let infoSearch = document.querySelector(".infoSearch")
let sectionBuscador = document.querySelector(".section_buscador")
let articleTrending = document.querySelector("article.trending")


//FUNCIONES

function newSearch() {

    //eliminar resultados de la busqueda anterior

    while (searchResultCtn.firstChild) {
        searchResultCtn.removeChild(searchResultCtn.firstChild)
        searchResultCtn.classList.remove("searchActive")
        infoSearch.style.display = "none"
        seeMoreBtn.classList.remove("seeMoreActive")
    }
    searchGif()
}

function searchGif() {
    console.log("funcion buscar iniciada")
    //nueva busqueda
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&limit=${limitSGifos}&offset=${offset}`;
    let busqueda = inputSearch.value
    let newUrlSearch = `${urlSearch}&q=${busqueda}`;
    fetch(newUrlSearch)
        .then(resp => resp.json())
        .then(content => {

            if (content.data[0] == undefined) {
                sinResultados()
                return
            }
            createCtnGifs(content.data);
        })
        .catch(err => {
            if(err){
                searchGif()
            }
            console.log(err)
        })

}

function createCtnGifs(arrayGifs) {
    seeMoreBtn.innerHTML = `VER MÁS`

    if (searchResultCtn.className = "sinResultados") {
        searchResultCtn.classList.remove("sinResultados")
    }
    seeMoreBtn.classList.add("seeMoreActive")
    infoSearch.style.display = "block"
    spanTerm.textContent = inputSearch.value;
    articleTrending.style.display = "none"

    for (let i = 0; i <= 11; i++) {

        let index = i + offset
        let urlImg = arrayGifs[i].images.downsized.url;

        let gifCardCtn = document.createElement("div");
        let gifSearched = document.createElement("img");
        gifCardCtn.className = "gif"
        gifSearched.className = "gifCard";
        gifSearched.src = urlImg
        searchResultCtn.classList.add("searchActive")
        gifCardCtn.appendChild(gifSearched)
        searchResultCtn.appendChild(gifCardCtn);

        //crear info cards

        createInfoCards(gifSearched, arrayGifs[i])

        //Download Function 

        let dwnBtn = document.querySelectorAll("#searchResults #downloadBtn")
        downloadGif(urlImg, dwnBtn[index])

        //Agregar a favorito

        let btnFav = document.querySelectorAll("#searchResults .favorito_btn");
        btnFav[index].addEventListener("click", () => {
            addFavoriteGif(i, arrayGifs, btnFav[index])
        })

        //maximizar gifo

        let btnMax = document.querySelectorAll("#searchResults .max_btn");
        btnMax[index].addEventListener("click", () => {

            maxFuncion(btnMax[index])
        })
    }
}

//Autocompletar

let urlAutocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKeyGiphy}&limit=4&q=`;
let ulAutocomplete = document.createElement("ul");
let liArray = [];
for (let i = 0; i <= 3; i++) {
    let liTags = document.createElement("li");
    liArray.push(liTags)
}

function autocomplete(e) {

    if (e.key == "Backspace") {

        ulAutocomplete.remove();
        inputSearch.classList.remove("autocompleteActive");

        return;

    }
    inputSearch.value.trim()
    ulAutocomplete.className = "ulActive"
    inputSearch.classList.add("autocompleteActive");

    inputSearch.after(ulAutocomplete);

    let busqueda = inputSearch.value

    let newUrlAutocomplete = urlAutocomplete + busqueda;
    fetch(newUrlAutocomplete)
        .then(resp => resp.json())
        .then(content => {
            for (let i = 0; i <= liArray.length - 1; i++) {

                if (content.data[i] == undefined) {
                    return false
                }
                liArray[i].textContent = content.data[i].name;
                ulAutocomplete.appendChild(liArray[i]);

            }

        })
        .catch(err => console.log(err));

}
//Trending Terminos

function trenTerms() {
    let urlTerms = `https://api.giphy.com/v1/trending/searches?api_key=${apiKeyGiphy}`;
    fetch(urlTerms)
        .then(resp => resp.json())
        .then(info => {

            for (let i = 0; i <= trendingTerms.length - 1; i++) {
                trendingTerms[i].textContent = info.data[i]

                trendingTerms[i].addEventListener("click", () => {
                    inputSearch.value = trendingTerms[i].textContent
                    newSearch()
                })
            }

        })
        .catch(err => console.log(err))
}
trenTerms()

//function sin resultados

function sinResultados() {
    console.log("sin resultados")
    infoSearch.style.display = "block"
    spanTerm.textContent = inputSearch.value;
    searchResultCtn.classList.add("sinResultados")
    searchResultCtn.innerHTML = `
    <img src="assets/icon-busqueda-sin-resultado.svg" alt="busqueda sin resultado">
    <span class="sinRtados">Intenta con otra búsqueda.</span>
    `
    articleTrending.style.display = "block"
    sectionBuscador.insertBefore(articleTrending, infoSearch)
}

//EVENT LISTENERS

//busqueda y autocomplete

btnSearch.addEventListener("click", newSearch);
inputSearch.addEventListener("keyup", (event) => {

    if (event.key == "Enter") {

        event.preventDefault();
        newSearch();

    }
})
inputSearch.addEventListener("keyup", autocomplete);

//evento al seleccionar una opcion del autocompletar


ulAutocomplete.addEventListener("click", (e) => {

    inputSearch.value = e.target.textContent
    ulAutocomplete.remove();
    inputSearch.classList.remove("autocompleteActive");
    newSearch()
})

//btn close
btnClose.addEventListener("click", () => {
    inputSearch.value = "";
    ulAutocomplete.classList.add("removeElement");
    inputSearch.classList.remove("autocompleteActive");
})


//See more gifos

seeMoreBtn.addEventListener("click", () => {
    offset = offset + 12;
    seeMoreBtn.innerHTML = `
    <svg role="img" class = "loadSvg">
        <use href="assets/loader.svg#path-1">
    </svg>
    `
    searchGif()
})