
function misGifos() {
    let newGif = localStorage.getItem("TMBXnMR1VSOP4UUCtB")
    console.log(newGif)
    let urlSearchId = `https://api.giphy.com/v1/gifs/${newGif}?api_key=${apiKeyGiphy}`
    fetch(urlSearchId)
        .then(res => res.json())
        .then(content => {
            console.log(content)
            createMyGifo(content.data)
        })

}
misGifos()

let misGifsCtn = document.querySelector(".flex_misgifs");
let misGifosMaxCtn = document.getElementById("misgifos_con_resultados")
function createMyGifo(info) {
    misGifosMaxCtn.style.display="block"
    let urlImg = info.images.downsized.url;

    let gifCardCtn = document.createElement("div");
    let gifCreated = document.createElement("img");
    gifCreated.src = urlImg;
    gifCreated.className = "gifcard";
    gifCardCtn.appendChild(gifCreated)
    misGifsCtn.appendChild(gifCardCtn);

    createInfoCards(gifCreated, info)
    allMyGifs(info, urlImg, misGifsCtn)
}

function allMyGifs(info, urlImg, ctn){
    let allGifs = document.querySelectorAll(".flex_misgifs>div")
    for(let i = 0; i<=allGifs.length - 1; i++){
        
        //downloadGif

        let dwnBtn = document.querySelectorAll("#misgifos_con_resultados #downloadBtn")
        downloadGif(urlImg, dwnBtn[i])
        console.log(dwnBtn[i])


        //add favorite function

        let btnFav = document.querySelectorAll("#misgifos_con_resultados .favorito_btn");

        btnFav[i].addEventListener("click", () => {
            addFavoriteGif(i, info, btnFav[i])
        })


        //MAXIMIZAR FUNCION

        let btnMax = document.querySelectorAll("#misgifos_con_resultados .max_btn");
        btnMax[i].addEventListener("click", () => {

            maxFuncion(i, btnMax[i], ctn, info)
        })

    }
}
