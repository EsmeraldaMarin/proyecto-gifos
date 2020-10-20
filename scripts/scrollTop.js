//SCROLL TOP

let header = document.querySelector("header")
let inputHeaderCtn = document.querySelector("header div.formulario")
let inputMainCtn = document.querySelector("main div.formulario")

window.addEventListener("scroll", myFunction)

function myFunction() {
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        header.className = "onScroll"
        inputHeaderCtn.classList.add("active")
        inputMainCtn.classList.remove("active")
    } else {
        header.classList.remove("onScroll")
        inputHeaderCtn.classList.remove("active")
        inputMainCtn.classList.add("active")
    }
    elements()
}