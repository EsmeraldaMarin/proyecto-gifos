//**CREAR GIFOS**//

//VARIABLES

const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";
let btnStart = document.getElementById("comenzar");
let btnRecord = document.getElementById("grabar");
let btnStop = document.getElementById("finalizar");
let btnUpload = document.getElementById("subir");
let ctnVideo = document.getElementById("contenedorVideo");
let video = document.querySelector("video");
let urlUpload = `https://upload.giphy.com/v1/gifs?api_key=${apiKeyGiphy}`;
let timerGif = document.getElementById("aditionaltext");
let contadores = document.querySelectorAll(".ul_creargifos .contador_pasos");

let myGifosArray = [];

let maxCtn = document.querySelector(".contenedor_video");
let loadCard = document.createElement("div");

//FUNCIONES

//record function

function getStreamAndRecord() {

    btnStart.classList.remove("activo");

    //permiso de acceso
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {

            ctnVideo.innerHTML = ""
            btnRecord.classList.add("activo");

            video.srcObject = stream;
            video.play()

            contadores[0].classList.remove("contador_activo")
            contadores[1].classList.add("contador_activo")

            //grabar gif
            btnRecord.addEventListener("click", () => {
                recorder = RecordRTC(stream, {
                    type: 'gif',
                    frameRate: 1,
                    quality: 10,
                    width: 360,
                    hidden: 240,
                    onGifRecordingStarted: function () {
                        console.log('started')
                    },
                });
                recorder.startRecording();

                btnRecord.classList.remove("activo");
                btnStop.classList.add("activo");

                function timer() {
                    var tope = 0;
                    var intervalo;

                    function seconds() {
                        tope++;
                        timerGif.textContent = `00:00:0${tope}`

                        if (tope >= 9) {
                            clearInterval(intervalo);
                            pararGrabacion();
                        }
                    }

                    function intervalo() {
                        intervalo = setInterval(seconds, 1000);
                    }
                    intervalo();

                    //parar grabacion (mediante callback)

                    btnStop.addEventListener("click", () => {
                        clearInterval(intervalo);
                        pararGrabacion()

                    })
                }
                timer();
            })

        })


    ctnVideo.innerHTML = `<h2><span>¿Nos das acceso</span><span>a tu cámara?</span></h2>
        <p>
        <span>El acceso de tu cámara será válido solo</span>
        <span>Por el tiempo en el que estés creando el GIFO</span></p>`

}


function pararGrabacion() {
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
    });

    timerGif.textContent = `REPETIR CAPTURA`;

    btnStop.classList.remove("activo");
    btnUpload.classList.add("activo");

    timerGif.addEventListener("click", () => {
        contadores[2].classList.remove("contador_activo")
        btnUpload.classList.remove("activo");

        getStreamAndRecord();

    })

}
function uploadGif() {

    btnUpload.classList.remove("activo");
    timerGif.remove()

    contadores[1].classList.remove("contador_activo")
    contadores[2].classList.add("contador_activo")

    let form = new FormData()
    form.append('file', recorder.getBlob(), 'myGif.gif')
    console.log(form.get('file'))

    let parametros = {
        method: 'POST',
        body: form,
        type: 'no-cors'
    }

    loadCardF()

    fetch(urlUpload, parametros)
        .then(data => data.json())
        .then(info => {
            //corregir push en el array, guarda el ultimo resultado unicamente
            myGifosArray.push(info.data.id)
            console.log(myGifosArray)
            let mygifos = JSON.stringify(myGifosArray)
            localStorage.setItem("myGifos", mygifos)

            console.log(info)
            letUrlNewGif(info.data.id)
        }
        )
        .catch(err => console.log(err))
}


function letUrlNewGif(id) {
    let urlSearchId = `https://api.giphy.com/v1/gifs/${id}?api_key=${apiKeyGiphy}`
    console.log(urlSearchId)

    fetch(urlSearchId)
        .then(res => res.json())
        .then(content => {
            console.log(content)
            loadedCardF(content.data.url, content)
        })
        .catch(err => console.log(err))

}

function loadCardF() {
    loadCard.className = "loadCard"
    loadCard.innerHTML = `
        <svg role="img">
            <use href="assets/loader.svg#path-1">
        </svg>
        <span>Estamos subiendo tu GIFO</span>
     `
    maxCtn.insertBefore(loadCard, video)

}
function loadedCardF(url, info) {
    loadCard.className = "loadedCard"
    loadCard.innerHTML = `
    <div class="btnsLoadedCard">
        <div>Copiado</div>
        <a href= "" download id= "downloadBtn">
            <svg role="img">
                <use href="assets/icon-download.svg#icon-download">
            </svg>
        </a>
        <a id="linkBtn">
            <input id="urlToCopy" type="text" value="${url}">
            <svg role="img">
                <use href="assets/icon-link.svg#path-1">
            </svg>
        </a>
    </div>
        <svg role="img" class="check">
            <use href="assets/check.svg#path-1">
        </svg>
        <span>GIFO subido con éxito</span>
    `
    maxCtn.insertBefore(loadCard, video)
    let inputUrl = document.getElementById("urlToCopy")
    let linkBtn = document.getElementById("linkBtn")
    let copiedText = document.querySelector(".btnsLoadedCard >div")
    linkBtn.addEventListener("click", () => {
        copyUrl(inputUrl)
        copiedText.className = "active"
        setTimeout(() => { copiedText.classList.remove("active"); }, 500)
    })
    //downloadGif

    let dwnBtn = document.querySelector(".btnsLoadedCard #downloadBtn")
    downloadGif(info.data.images.downsized.url, dwnBtn)

}
function copyUrl(inputUrl) {
    let url = inputUrl.select()
    document.execCommand('copy')
}

function downloadGif(urlDownload, btn) {

    fetch(urlDownload)
        .then(res => res.blob())
        .then(data => {

            btn.href = URL.createObjectURL(data);

        })
    return
}

//EVENT LISTENERS

//Comenzar grabacion

btnStart.addEventListener("click", () => {
    contadores[0].classList.add("contador_activo")
    getStreamAndRecord()
});

//subir gif

btnUpload.addEventListener("click", uploadGif)