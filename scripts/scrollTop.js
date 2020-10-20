//SCROLL TOP

let header = document.querySelector("header")
window.addEventListener("scroll", myFunction)

function myFunction() {
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        header.className = "onScroll"
    } else {
        header.classList.remove("onScroll")
    }
}