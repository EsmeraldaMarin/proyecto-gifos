const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

//Giphy Trendings

let gifsCtnTrending = document.getElementById("gifsTrending");
let limitTGifos = 5;
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

                //create info gifs card

                let gifInfoCard = document.createElement("div");
                let gifToDownload = content.data[i].images.original.mp4;
                gifInfoCard.innerHTML = `
                        <div> 
                            <a class= "favorito_btn">
                            <img src= "../assets/icon-fav-hover.svg" class= "fav_active">
                            <img src= "../assets/icon-fav-active.svg">
                            </a>
                            <a href= "${gifToDownload}" download><img src= "../assets/icon-download.svg"></a>
                            <a class= "max_btn"><img src= "../assets/icon-max.svg"></a>
                        </div>
                        <div> 
                            <span>${content.data[i].username}</span>
                            <span>${content.data[i].title}</span>
                        </div>
                    `
                gifInfoCard.className = "gifCardInfo";
                gifCreated.before(gifInfoCard);

                //add favorite function

                let btnFav = document.getElementsByClassName("favorito_btn");

                btnFav[i].addEventListener("click", () => {

                    gifFav = `gif${i}`;
                    gifFavInfo = content.data[i];
                    localStorage.setItem(gifFav, JSON.stringify(gifFavInfo))
                    //console.log(localStorage.getItem(gifFav))

                    favGifos.push(gifFav)

                    favGifosStore = localStorage.setItem("gifos", JSON.stringify(favGifos))
                    btnFav[i].classList.add("cardBtnActive");
                })
            }
        })

        .catch(err => console.log(err))
}
showGifs()


//CARRUSEL TRENDING

let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");


btnLeft.addEventListener("click", () => show(-3));
btnRight.addEventListener("click", () => show(+3));
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





