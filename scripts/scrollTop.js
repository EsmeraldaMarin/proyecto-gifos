//SCROLL TOP

let header = document.querySelector("header"),
    formulario = document.querySelector("div.mainSearch"),
    indicador = document.querySelector("nav.defaultMenu"),
    ctnMain = document.querySelector(".mainform")

window.addEventListener("scroll", myFunction)

function myFunction() {
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        header.className = "onScroll"
        header.insertBefore(formulario, indicador)
    } else {
        header.className = "default"
        ctnMain.appendChild(formulario)
    }
}
