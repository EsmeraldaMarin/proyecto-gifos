const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

//Giphy Trendings

let gifsCtnTrending = document.getElementById("gifsTrending");
let limitTGifos = 28;
const giphys = [];
let favGifos = [];

function showGifs() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKeyGiphy}&limit=${limitTGifos}`;
    fetch(url)
        .then(resp => resp.json())
        .then(content => {
            for (let i = 0; i <= limitTGifos - 1; i++) {

                //create gifs and ctn

                let urlImg = content.data[i].images.downsized.url;
                giphys.push(urlImg);

                let gifCardCtn = document.createElement("div");
                let gifCreated = document.createElement("img");
                gifCreated.src = giphys[i];
                gifCreated.className = "gifcard";
                gifCardCtn.appendChild(gifCreated)
                gifsCtnTrending.appendChild(gifCardCtn);

                createInfoCards(gifCreated, content.data[i])

                
                //Download Function 

                let dwnBtn = document.querySelectorAll("#gifsTrending #downloadBtn")
                downloadGif(urlImg, dwnBtn[i])

                //add favorite function

                let btnFav = document.querySelectorAll("#gifsTrending .favorito_btn");

                btnFav[i].addEventListener("click", () => {
                    addFavoriteGif(i, content.data, btnFav[i])
                })


                //MAXIMIZAR FUNCION

                let btnMax = document.querySelectorAll("#gifsTrending .max_btn");
                btnMax[i].addEventListener("click", () => {

                    maxFuncion(i, btnMax[i], gifsCtnTrending, content.data)
                })
            }
        })

        .catch(err => console.log(err))
}
showGifs()


//Crear un blob para descargaarr el gif

function downloadGif(urlDownload, btn) {

    fetch(urlDownload)
        .then(res => res.blob())
        .then(data => {

            btn.href = URL.createObjectURL(data);

        })
        return
}


//Create info cards

function createInfoCards(gifCreated, info) {

    let gifInfoCard = document.createElement("div");
    gifInfoCard.innerHTML = `
                            <div> 
                                <a class= "favorito_btn">
                                    <svg role="img" alt="favorito">
                                        <use href="assets/icon-fav-hover.svg#path-1">
                                    </svg>
                                    <svg role="img" alt="favorito-agregado">
                                        <use href="assets/icon-fav-active.svg#icon-favactive">
                                    </svg>
                                </a>
                                <a href= "" download id= "downloadBtn">
                                    <svg role="img" alt="descargar">
                                        <use href="assets/icon-download.svg#icon-download">
                                    </svg>
                                </a>
                                <a class= "max_btn">
                                    <svg role="img" alt="maximizar">
                                        <use href="assets/icon-max.svg#icon-max">
                                    </svg>

                                    <svg role="img" alt="closeMax">
                                        <use href="assets/close.svg#close-svg">
                                    </svg>
                                </a>
                            </div>
                            <div> 
                                <span>${info.username}</span>
                                <span>${info.title}</span>
                            </div>
                        `
    gifInfoCard.className = "gifCardInfo";
    gifCreated.before(gifInfoCard);
}


//Funcion agregar a favorito

function addFavoriteGif(i, info, btn) {

    gifFavInfo = info[i];
    gifFav = gifFavInfo.title;
    localStorage.setItem(gifFav, JSON.stringify(gifFavInfo))
    //console.log(localStorage.getItem(gifFav))

    favGifos.push(gifFav)

    favGifosStore = localStorage.setItem("gifos", JSON.stringify(favGifos))
    btn.classList.add("cardBtnActive");

}

//Funcion maximizar

function maxFuncion(i, btnMax, ctn, info) {
    let ctnGifsMax = ctn.childNodes;
    btnMax.classList.add("btnMaxActive")
    let gifMax = ctnGifsMax[i].cloneNode(true);
    let newCtn = document.createElement("div")

    newCtn.classList.add("ctnMax")
    gifMax.classList.add("gifMaximized")
    newCtn.appendChild(gifMax)
    document.body.insertBefore(newCtn, header)

    let closeMax = document.querySelector(".btnMaxActive")
    closeMax.addEventListener("click", () => {

        closeMax.classList.remove("btnMaxActive")
        document.body.removeChild(newCtn)
    })
    //agregar a favorito

    let btnFav = document.querySelector(".ctnMax .favorito_btn");
    console.log(btnFav)

    btnFav.addEventListener("click", () => {
        addFavoriteGif(i, info, btnFav)
    })

}

//CARRUSEL TRENDING

let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");


btnLeft.addEventListener("click", () => show(-1));
btnRight.addEventListener("click", () => show(+1));
let index = 0;

function show(increase) {

    let imgs = document.querySelectorAll("#gifsTrending>div");

    index = index + increase;

    index = Math.min(
        Math.max(index, 0),
        imgs.length - 1
    );

    let arr = imgs.length

    btnRight.classList.remove("inactive");

    if (arr == index + 1) {
        btnRight.classList.add("inactive")
    }

    imgs[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
}
//SCROLL TOP

let header = document.querySelector("header")

window.addEventListener("scroll", myFunction)

function myFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        header.className = "onScroll"
    } else {
        header.classList.remove("onScroll")
    }
}

//add to favorite

let giphysGrid = []

window.ondblclick = () => {
    let favoriteOnStorage = localStorage.getItem("gifos")
    let favoriteOnStorage2 = JSON.parse(favoriteOnStorage)
    console.log("pagina cargada")
    favoriteOnStorage2.forEach(
        element => {

            //corregir para que no solo aparezca el ultimo
            console.log(element)

            let giphyFav = localStorage.getItem(element);
            let giphyJson = JSON.parse(giphyFav);

            giphysGrid.push(giphyJson);
            console.log(giphysGrid);
        }
    )
    //quitar el Favoritos sin contenido
    let favoritosSinRtados = document.getElementById("favoritos_sin_resultados");
    console.log(giphysGrid.length)
    if (giphysGrid.length != 0) {

        favoritosSinRtados.style.display = "none"

    }

    createGiphysCards()
};

function addToFavorite() {
    let num = favGifos.length - 1
    let favorite = favGifos[num];
    console.log(favorite)

    let giphyFav = localStorage.getItem(favorite)
    let giphyJson = JSON.parse(giphyFav);

    giphysGrid.push(giphyJson);
    console.log(giphysGrid);
    createGiphysCards()
}





