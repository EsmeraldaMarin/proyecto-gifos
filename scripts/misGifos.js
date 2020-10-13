let ctnSinResultados = document.getElementById("misgifos_sin_resultados")
let ctnConResultados = document.getElementById("misgifos_con_resultados")
let misGifsCtn = document.querySelector(".flex_misgifs");
let btnVerMas = document.querySelector("#misgifos_con_resultados button")
let xx = JSON.stringify(["TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB", "TMBXnMR1VSOP4UUCtB"])
localStorage.setItem("myGifos", xx)
let limitGifos = 12;
let indexArray = 0;
let newGif = localStorage.getItem("myGifos")
let myGifosOnStorage = JSON.parse(newGif)

function misGifos(limitGifos, indexArray) {
    console.log(limitGifos)
    let newGif = localStorage.getItem("myGifos")
    let myGifosOnStorage = JSON.parse(newGif)

    if (!myGifosOnStorage) {
        console.log("NO HAY GIFOS")
        return false
    }

    for (let i = indexArray; i <= limitGifos - 1; i++) {
        if(!myGifosOnStorage[i]){
            return false
        }

        let urlSearchId = `https://api.giphy.com/v1/gifs/${myGifosOnStorage[i]}?api_key=${apiKeyGiphy}`
        fetch(urlSearchId)
            .then(res => res.json())
            .then(content => {
                createMyGifo(content.data)
            })
    }
}
misGifos(limitGifos, indexArray)

if (myGifosOnStorage.length > 12) {
    btnVerMas.style.display = "block"
    btnVerMas.addEventListener("click", () => {
        if(myGifosOnStorage.length % limitGifos > 12){
            btnVerMas.style.display = "none"
            return 
        }
        limitGifos = limitGifos + 12
        indexArray = indexArray + 11
        misGifos(limitGifos, indexArray)
    })

    console.log("mas de 12")
}

function createMyGifo(info) {
    ctnConResultados.style.display = "block"
    let urlImg = info.images.downsized.url;

    let gifCardCtn = document.createElement("div");
    let gifCreated = document.createElement("img");
    gifCreated.src = urlImg;
    gifCreated.className = "gifcard";
    gifCardCtn.appendChild(gifCreated)
    misGifsCtn.appendChild(gifCardCtn);

    createInfoCards(gifCreated, info)
    resultados();
    allMyGifs(info, urlImg)

}

function allMyGifs(info, urlImg) {
    let allGifs = document.querySelectorAll(".flex_misgifs>div")

    for (let i = 0; i <= allGifs.length - 1; i++) {

        //downloadGif

        let dwnBtn = document.querySelectorAll("#misgifos_con_resultados #downloadBtn")
        downloadGif(urlImg, dwnBtn[i])

        //Delete gifo function

        let btnTrash = document.querySelectorAll("#misgifos_con_resultados a:first-child");
        btnTrash[i].innerHTML = `
        <svg role="img" alt="favorito">
            <use href="assets/icon_trash.svg#path-1">
        </svg>
        `
        btnTrash[i].addEventListener("click", () => {
            deleteMyGifo(allGifs[i], info.id)
        })
        btnTrash[i].className = "trash";

        //MAXIMIZAR FUNCION

        let btnMax = document.querySelectorAll("#misgifos_con_resultados .max_btn");
        btnMax[i].addEventListener("click", () => {
            maxMisGifos(btnMax[i], allGifs[i], info)
        })

    }
}

function maxMisGifos(btnMax, gif, info) {

    btnMax.classList.add("btnMaxActive")
    let gifMax = gif.cloneNode(true);
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

    let btnTrash = document.querySelector(".ctnMax .trash");
    btnTrash.addEventListener("click", () => {
        deleteMyGifo(gif, info.id)
    })
}

function deleteMyGifo(gifToDelete, id) {
    localStorage.removeItem(id);
    gifToDelete.remove();
    resultados();
}

function resultados() {
    let allGifos = document.querySelectorAll(".flex_misgifs>div")
    if (allGifos.length != 0) {
        // console.log("hay gifs")
        ctnSinResultados.style.display = "none"
        ctnConResultados.style.display = "flex"
    } else {
        console.log("no hay gifs")
        ctnSinResultados.style.display = "flex"
        ctnConResultados.style.display = "none"
    }
}
