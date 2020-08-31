const apiKeyGiphy = "v6GX2EfRqxwiexQZkHhYu6ZrteDkFt6Z";

//Giphy Trendings

let gifsCtnTrending = document.getElementById("gifsTrending");
let limitTGifos = 28;
const giphys = [];

function showGifs() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKeyGiphy}&limit=${limitTGifos}`;
    fetch(url)
        .then(resp => resp.json())
        .then(content => {
            for (let i = 0; i <= limitTGifos - 1; i++) {

                let urlImg = content.data[i].images.downsized.url;
                giphys.push(urlImg);

                let gifCardCtn = document.createElement("div");
                let gifCreated = document.createElement("img");
                gifCreated.src = giphys[i];
                gifCreated.className = "gifcard";
                gifCardCtn.appendChild(gifCreated)
                gifsCtnTrending.appendChild(gifCardCtn);
            }
            //getInfoCards(content.data)


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

    let imgs = document.querySelectorAll("#gifsTrending img");

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


