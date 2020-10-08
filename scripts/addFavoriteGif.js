//Agregar Gifs a favoritos

let favoritosCtn = document.getElementById("favoritos_con_resultados");
let gifsCtn = document.getElementById("flex_gifs");

let btnVerMas = document.querySelector("#favoritos_con_resultados button")

let bodyFavorite = document.getElementById("bodyFav")

function createGiphysCards() {
    for (let i = 0; i <= giphysGrid.length - 1; i++) {

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
        btnFav[i].addEventListener("click", ()=>{
            let item = giphysGrid[i].title
            localStorage.removeItem(item)
            gifCardCtn.remove()
        })

    }

}
