// ** FUNCIONES GENERALES **//

//VARIABLES

const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";
let gifsCtnTrending = document.getElementById("gifsTrending");
let limitTGifos = 28;
const giphys = [];
let favGifos = [];
let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");
let index = 0;

//FUNCIONES

//Giphy Trendings

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
                gifCardCtn.className = "gif";
                gifCreated.src = giphys[i];
                gifCreated.className = "gifcard";
                gifCardCtn.appendChild(gifCreated);
                gifsCtnTrending.appendChild(gifCardCtn);

                createInfoCards(gifCreated, content.data[i]);


                //Download Function 

                let dwnBtn = document.querySelectorAll("#gifsTrending #downloadBtn");
                downloadGif(urlImg, dwnBtn[i]);

                //add favorite function

                let btnFav = document.querySelectorAll("#gifsTrending .favorito_btn");

                btnFav[i].addEventListener("click", () => {
                    addFavoriteGif(i, content.data, btnFav[i]);
                });

                let btnMax = document.querySelectorAll("#gifsTrending .max_btn");
                btnMax[i].addEventListener("click", () => {
                    maxFuncion(btnMax[i]);
                });


            }
        })

        .catch(err => console.log(err));
}
showGifs();


//Crear un blob para descargaarr el gif

function downloadGif(urlDownload, btn) {

    fetch(urlDownload)
        .then(res => res.blob())
        .then(data => {
            btn.href = URL.createObjectURL(data);
        })
        .catch(err => console.log(err + " on downloadGif function"));
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
                                </a>
                            </div>
                            <div> 
                                <span>${info.username}</span>
                                <span>${info.title}</span>
                            </div>
                        `;
    gifInfoCard.className = "gifCardInfo";
    gifCreated.before(gifInfoCard);
}


//Funcion agregar a favorito

function addFavoriteGif(i, info, btn) {

    gifFavInfo = info[i];
    gifFav = gifFavInfo.title;
    localStorage.setItem(gifFav, JSON.stringify(gifFavInfo));

    favGifos.push(gifFav);

    favGifosStore = localStorage.setItem("gifos", JSON.stringify(favGifos));
    btn.classList.add("cardBtnActive");

}

//Funcion maximizar

function maxFuncion(btnMax) {

    let divCtn = btnMax.parentNode.parentNode.parentNode;
    divCtn.className = "maxActive";

    let clonBtn = btnMax.cloneNode();
    clonBtn.innerHTML = `
        <svg role="img" alt="closeMax">
            <use href="assets/close.svg#close-svg">
        </svg>`;
    btnMax.parentNode.replaceChild(clonBtn, btnMax);

    clonBtn.addEventListener("click", () => {
        btnMax.innerHTML = `
        <svg role="img" alt="maximizar">
            <use href="assets/icon-max.svg#icon-max">
        </svg>`;
        clonBtn.parentNode.replaceChild(btnMax, clonBtn);
        divCtn.className = "gif";
    });

}

//Carrusel trending

function show(increase) {

    let imgs = document.querySelectorAll("#gifsTrending>div");

    index = index + increase;

    index = Math.min(
        Math.max(index, 0),
        imgs.length - 1
    );

    let arr = imgs.length;

    btnRight.classList.remove("inactive");

    if (arr == index + 1) {
        btnRight.classList.add("inactive");
    }

    imgs[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
}

//EVENT LISTENERS

//carrusel

btnLeft.addEventListener("click", () => show(-1));
btnRight.addEventListener("click", () => show(+1));




