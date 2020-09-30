
//SEARCH GIFOS

let inputSearch = document.getElementById("buscador");//corregir esto
//Cambiar clase en evento scroll
let btnSearch = document.getElementById("searchbtn"); //corregir esto
let searchResultCtn = document.getElementById("searchResults")
let limitSGifos = 12;
let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&limit=${limitSGifos}`;

btnSearch.addEventListener("click", searchGif);
inputSearch.addEventListener("keyup", (event) => {

    if (event.key == "Enter") {

        event.preventDefault();
        searchGif(event);

    }
})

function searchGif() {

    //eliminar resultados de la busqueda anterior

    while (searchResultCtn.firstChild) {
        searchResultCtn.removeChild(searchResultCtn.firstChild)
    }

    //nueva busqueda

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

    for (let i = 0; i <= limitSGifos - 1; i++) {

        let urlImg = arrayGifs[i].images.downsized.url;

        let gifCardCtn = document.createElement("div");
        let gifSearched = document.createElement("img");
        gifSearched.className = "gifCard";
        gifSearched.src = urlImg
        gifCardCtn.appendChild(gifSearched)
        searchResultCtn.appendChild(gifCardCtn);

        //crear info cards

        createInfoCards(gifSearched, arrayGifs[i])


        //Agregar a favorito

        let btnFav = document.querySelectorAll("#searchResults .favorito_btn");
        btnFav[i].addEventListener("click", () => {
            addFavoriteGif(i, arrayGifs, btnFav[i])
        })

        //maximizar gifo

        let btnMax = document.querySelectorAll("#searchResults .max_btn");
        btnMax[i].addEventListener("click", () => {

            btnMax[i].classList.add("btnMaxActive")
            maxFuncion(i)
        })


    }
}

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

    searchResultCtn.before(ulAutocomplete);
    inputSearch.classList.add("autocompleteActive");//corregir con el otro input

    ulAutocomplete.className = "ulActive"

    let busqueda = inputSearch.value

    let newUrlAutocomplete = urlAutocomplete + busqueda;

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
    searchGif()
})

//AGREGAR BOTON CLOSE
let btnClose = document.querySelector(".formularios svg")
btnClose.addEventListener("click", () => {
    inputSearch.value = "";
    ulAutocomplete.classList.add("removeElement");
    inputSearch.classList.remove("autocompleteActive");

})

