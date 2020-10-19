const button = document.querySelector("#switch");
const login  = document.querySelector("#login");
const words  = document.querySelector("#words")
const smallElement = document.querySelector("#smallElement");

button.addEventListener("click", () => {
    if (smallElement.classList.contains("moved")){
        smallElement.classList.remove("moved");
        login.style.display = "inherit";
        words.style.display = "none";
    }
    else {
        smallElement.classList.add("moved");
        login.style.display = "none";
        words.style.display = "inherit";
    }
})