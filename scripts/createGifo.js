// CREAR GIFOS
const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

let btnStart = document.getElementById("comenzar");
let btnRecord = document.getElementById("grabar");
let btnStop = document.getElementById("finalizar");
let btnUpload = document.getElementById("subir");
let ctnVideo = document.getElementById("contenedorVideo");
let video = document.querySelector("video");
let urlUpload = `https://upload.giphy.com/v1/gifs?api_key=${apiKeyGiphy}`
let timerGif = document.getElementById("aditionaltext")
let contadores = document.querySelectorAll(".ul_creargifos .contador_pasos")

btnStart.addEventListener("click", ()=>{
    contadores[0].classList.add("contador_activo")
    getStreamAndRecord()
});

function getStreamAndRecord() {

    btnStart.classList.remove("activo");

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
btnUpload.addEventListener("click", uploadGif)

function uploadGif() {
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
    
    fetch(urlUpload, parametros)
        .then(data => data.json())
        .then(info => {
            localStorage.setItem(info.data.id, info.data.id)
            misGifos(info.data.id)
            console.log(info.data.id)
        }
        )
        .catch(err => console.log(err))
}
