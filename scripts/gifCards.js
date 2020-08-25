//Crear Gifcards

let arrayInfoGifs = [];


gifsCtnTrending.addEventListener("mouseover", createGifCards);
gifsCtnTrending.addEventListener("mouseout", (e)=>{
    e.target.classList.remove("gifHover");

});


function createGifCards(e){

    let gifs = document.querySelectorAll("img.gifcard");
    e.stopPropagation();
    e.target.classList.add("gifHover");


    for(let i = 0; i <= gifs.length - 1; i++){
    }
}








class InfoCard{
    constructor(userName, title){
        this.userName = userName;
        this.title = title;
    }
    createDivInfo(){
        let divInfo = document.createElement("div");
        let spanUser = document.createElement("span");
        spanUser.textContent = this.userName;
        let spanTitle = document.createElement("span");
        spanTitle.textContent = this.title;
        divInfo.appendChild(spanUser);
        divInfo.appendChild(spanTitle)
        gifCard.appendChild(divInfo);

    }
}

function getInfoCards(info){
    for(let i = 0; i <= info.length -1 ; i++){
        eachGif = new InfoCard(info[i].username, info[i].title)
        arrayInfoGifs.push(eachGif)

    }
    console.log(arrayInfoGifs)
}


