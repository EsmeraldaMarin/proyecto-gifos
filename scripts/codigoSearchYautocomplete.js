
//SEARCH GIFOS

let inputSearch = document.getElementById("buscador");//corregir esto
//Cambiar clase en evento scroll
let btnSearch = document.getElementById("searchbtn"); //corregir esto
let searchResultCtn = document.getElementById("searchResults")
let limitSGifos = 12;
let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&limit=${limitSGifos}`;

btnSearch.addEventListener("click", searchGif);
inputSearch.addEventListener("keyup", (event) => {

    console.log("Entre a la funcion")

    if (event.key == "Enter") {

        event.preventDefault();
        console.log("aprete el enter")

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
let formularioCtn = document.querySelector("div.formulario");

inputSearch.addEventListener("keyup", autocomplete);

function autocomplete(e) {
    e.preventDefault()


    ulAutocomplete = document.createElement("ul");
    searchResultCtn.before(ulAutocomplete);
    inputSearch.classList.add("autocompleteActive");//corregir con el otro input

    ulAutocomplete.className = "ulActive"
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
        .catch(err => console.log(err));

}


//AGREGAR BOTON CLOSE
let btnClose = document.querySelector(".formularios i")
btnClose.addEventListener("click", () => {
    inputSearch.value = "";
    ulAutocomplete.classList.add("removeElement")
})

