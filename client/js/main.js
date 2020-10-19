const button = document.querySelector("#switch");
const smallElement = document.querySelector("#smallElement");

button.addEventListener("click", () => {
    if (smallElement.classList.contains("moved")){
        smallElement.classList.remove("moved");
    }
    else {
        smallElement.classList.add("moved");
    }
})