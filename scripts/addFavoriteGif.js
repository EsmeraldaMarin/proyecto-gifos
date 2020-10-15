//Agregar Gifs a favoritos

let favoritosCtn = document.getElementById("favoritos_con_resultados");
let favoritosSinRtados = document.getElementById("favoritos_sin_resultados");
let gifsCtn = document.getElementById("flex_gifs");
let btnVerMas = document.querySelector("#favoritos_con_resultados button");
let bodyFavorite = document.getElementById("bodyFav");

let limitGifos = 12;
let indexArray = 0;
let giphysGrid = [];

let favoriteOnStorage = localStorage.getItem("gifos")
let favoriteOnStorage2 = JSON.parse(favoriteOnStorage)


function seeFavoriteGifs(limitGifos, indexArray) {
    let favoriteOnStorage = localStorage.getItem("gifos")
    let favoriteOnStorage2 = JSON.parse(favoriteOnStorage)

    if (!favoriteOnStorage2) {
        console.log("NO HAY GIFOS")
        return false
    }

    for (let i = indexArray; i <= limitGifos - 1; i++) {

        if (!favoriteOnStorage2[i]) {
            return false
        }

        let giphyFav = localStorage.getItem(favoriteOnStorage2[i]);
        let giphyJson = JSON.parse(giphyFav);

        giphysGrid.push(giphyJson);
        createGiphysCards(i)

    }

};

function createGiphysCards(i) {

    resultados()

    btnVerMas.innerHTML = `VER MÁS`

    let urlImg = giphysGrid[i].images.downsized.url;

    let gifCardCtn = document.createElement("div");
    let gifCreated = document.createElement("img");
    gifCreated.src = urlImg;
    gifCreated.className = "gifcard";
    gifCardCtn.appendChild(gifCreated);
    gifsCtn.appendChild(gifCardCtn);
    favoritosCtn.style.display = "flex"

    //create info gifs card

    createInfoCards(gifCreated, giphysGrid[i])

    //Download Function 

    let dwnBtn = document.querySelectorAll("#flex_gifs #downloadBtn")
    downloadGif(urlImg, dwnBtn[i])

    //MAXIMIZAR FUNCION

    let btnMax = document.querySelectorAll("#flex_gifs .max_btn");
    btnMax[i].addEventListener("click", () => {

        maxFuncion(i, btnMax[i], gifsCtn, giphysGrid)
    })


    //add favorite function

    let btnFav = document.querySelectorAll("#flex_gifs .favorito_btn");
    btnFav[i].classList.add("cardBtnActive")
    btnFav[i].addEventListener("click", () => {
        let item = giphysGrid[i].title
        localStorage.removeItem(item)
        gifCardCtn.remove()

        resultados()
    })

}
seeFavoriteGifs(limitGifos, indexArray)

function resultados() {
    let allGifos = document.querySelectorAll(".flex_gifs>div")
    if (allGifos.length != 0) {
        
        favoritosSinRtados.style.display = "none"
        favoritosCtn.style.display = "flex"
    } else {
        favoritosSinRtados.style.display = "flex"
        favoritosCtn.style.display = "none"
    }
}

if (favoriteOnStorage2.length > 12) {
    btnVerMas.style.display = "block"
    btnVerMas.addEventListener("click", () => {
        btnVerMas.innerHTML = `
        <svg role="img" class = "loadSvg">
            <use href="assets/loader.svg#path-1">
        </svg>
        `
        if (favoriteOnStorage2.length % limitGifos > 12) {
            btnVerMas.style.display = "none"
            return
        }
        limitGifos = limitGifos + 12
        indexArray = indexArray + 12
        seeFavoriteGifs(limitGifos, indexArray)
    })
}

