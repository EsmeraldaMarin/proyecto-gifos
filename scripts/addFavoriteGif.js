//Agregar Gifs a favoritos

let favoritosCtn = document.getElementById("favoritos_con_resultados");
let gifsCtn = document.getElementById("flex_gifs");

let btnVerMas = document.querySelector("#favoritos_con_resultados button")

let bodyFavorite = document.getElementById("bodyFav")

function createGiphysCards() {
    for (let i = 0; i <= giphysGrid.length - 1; i++) {

        let urlImg = giphysGrid[i].images.downsized.url;
        let username = giphysGrid[i].username
        let title = giphysGrid[i].title
        let gifToDownload = giphysGrid[i].images.original.mp4;


        let gifCardCtn = document.createElement("div");
        let gifCreated = document.createElement("img");
        gifCreated.src = urlImg;
        gifCreated.className = "gifcard";
        gifCardCtn.appendChild(gifCreated);
        gifsCtn.appendChild(gifCardCtn);
        favoritosCtn.style.display = "flex"

        //create info gifs card

        let gifInfoCard = document.createElement("div");
        gifInfoCard.innerHTML = `
                        <div> 
                            <a>
                            <img src= "../assets/icon-fav-active.svg">
                            </a>
                            <a href= "${gifToDownload}" download><img src= "../assets/icon-download.svg"></a>
                            <a class= "max_btn"><img src= "../assets/icon-max.svg"></a>
                        </div>
                        <div> 
                            <span>${username}</span>
                            <span>${title}</span>
                        </div>
                    `
        gifInfoCard.className = "gifCardInfo";
        gifCreated.before(gifInfoCard);
    }

}
