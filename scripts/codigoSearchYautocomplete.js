
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
        return false;

    }
})

function searchGif(e) {

    while(searchResultCtn.firstChild){
        searchResultCtn.removeChild(searchResultCtn.firstChild)
    }
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

        let gifSearched = document.createElement("img");
        gifSearched.className = "gifCard";
        gifSearched.src = urlImg
        searchResultCtn.appendChild(gifSearched);


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

        return false;

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
            for (let i = 0; i < liArray.length; i++) {

                if (content.data[i] == undefined) {
                    return false
                }

                liArray[i].textContent = content.data[i].name;
                ulAutocomplete.appendChild(liArray[i]);
            }
        })
        .catch(err => console.log(err));

}


//AGREGAR BOTON CLOSE
let btnClose = document.querySelector(".formularios svg")
btnClose.addEventListener("click", () => {
    inputSearch.value = "";
    ulAutocomplete.classList.add("removeElement");
    inputSearch.classList.remove("autocompleteActive");

})

