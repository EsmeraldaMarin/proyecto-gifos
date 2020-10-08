
//SEARCH GIFOS

let inputSearch = document.querySelector("#buscador");//corregir esto
//Cambiar clase en evento scroll
let btnSearch = document.querySelector(".searchbtn"); //corregir esto
let searchResultCtn = document.getElementById("searchResults")
let limitSGifos = 12;
let offset = 0;
let seeMoreBtn = document.getElementById("seeMoreResults")
let trendingTerms = document.querySelectorAll("p.trendingTerms span")
let spanTerm = document.getElementById("termBuscado")
let infoSearch = document.querySelector(".infoSearch")


btnSearch.addEventListener("click", newSearch);
inputSearch.addEventListener("keyup", (event) => {

    if (event.key == "Enter") {

        event.preventDefault();
        newSearch(event);

    }
})

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

    //nueva busqueda
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&limit=${limitSGifos}&offset=${offset}`;

    let busqueda = inputSearch.value;
    let newUrlSearch = `${urlSearch}&q=${busqueda}`;

    fetch(newUrlSearch)
        .then(resp => resp.json())
        .then(content => {

            createCtnGifs(content.data);
        })
        .catch(err => console.log(err))

}

function createCtnGifs(arrayGifs) {

    seeMoreBtn.classList.add("seeMoreActive")
    infoSearch.style.display = "block"
    spanTerm.textContent = inputSearch.value;

    for (let i = 0; i <= limitSGifos - 1; i++) {

        let urlImg = arrayGifs[i].images.downsized.url;

        let gifCardCtn = document.createElement("div");
        let gifSearched = document.createElement("img");
        gifSearched.className = "gifCard";
        gifSearched.src = urlImg
        searchResultCtn.classList.add("searchActive")
        gifCardCtn.appendChild(gifSearched)
        searchResultCtn.appendChild(gifCardCtn);

        //crear info cards

        createInfoCards(gifSearched, arrayGifs[i])
        
        //Download Function 

        let dwnBtn = document.querySelectorAll("#searchResults #downloadBtn")
        downloadGif(urlImg, dwnBtn[i])

        //Agregar a favorito

        let btnFav = document.querySelectorAll("#searchResults .favorito_btn");
        btnFav[i].addEventListener("click", () => {
            addFavoriteGif(i, arrayGifs, btnFav[i])
        })

        //maximizar gifo

        let btnMax = document.querySelectorAll("#searchResults .max_btn");
        btnMax[i].addEventListener("click", () => {

            maxFuncion(i, btnMax[i], searchResultCtn, arrayGifs)
        })
    }
}

//SEE MORE GIFOS 


seeMoreBtn.addEventListener("click", () => {
    limitGifos = limitTGifos + 12;
    offset = offset + 12;
    searchGif(limitTGifos, offset)

})

//AUTOCOMPLETAR


let urlAutocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKeyGiphy}&limit=4&q=`;
let formularioCtn = document.querySelector("div.formulario");
let ulAutocomplete = document.createElement("ul");

let liArray = [];
for (let i = 0; i <= 3; i++) {
    let liTags = document.createElement("li");
    liArray.push(liTags)
}


inputSearch.addEventListener("keyup", autocomplete);

function autocomplete(e) {
    e.preventDefault()

    if (e.key == "Backspace") {

        ulAutocomplete.remove();
        inputSearch.classList.remove("autocompleteActive");

        return;

    }
    inputSearch.value.trim()
    inputSearch.classList.add("autocompleteActive");//corregir con el otro input
    ulAutocomplete.className = "ulActive"

    formularioCtn.after(ulAutocomplete);

    let busqueda = inputSearch.value

    let newUrlAutocomplete = urlAutocomplete + busqueda;
    console.log(newUrlAutocomplete)
    fetch(newUrlAutocomplete)
        .then(resp => resp.json())
        .then(content => {
            for (let i = 0; i <= liArray.length - 1; i++) {

                liArray[i].textContent = content.data[i].name;
                ulAutocomplete.appendChild(liArray[i]);

            }

        })
        .catch(err => console.log(err));

}

//evento al seleccionar una opcion del autocompletar


ulAutocomplete.addEventListener("click", (e) => {

    inputSearch.value = e.target.textContent
    ulAutocomplete.remove();
    inputSearch.classList.remove("autocompleteActive");
    newSearch()
})

//AGREGAR BOTON CLOSE
let btnClose = document.querySelector(".formularios.active svg.closeSearch")
btnClose.addEventListener("click", () => {
    inputSearch.value = "";
    ulAutocomplete.classList.add("removeElement");
    inputSearch.classList.remove("autocompleteActive");

})

//Trending Terminos

function trenTerms() {
    let urlTerms = `https://api.giphy.com/v1/trending/searches?api_key=${apiKeyGiphy}`;
    fetch(urlTerms)
        .then(resp => resp.json())
        .then(info => {

            for (let i = 0; i <= trendingTerms.length - 1; i++) {
                trendingTerms[i].textContent = info.data[i]

                trendingTerms[i].addEventListener("click", () => {
                    inputSearch.value = trendingTerms[i].textContent;
                    newSearch()
                })
            }

        })
        .catch(err => console.log(err))
}
trenTerms()