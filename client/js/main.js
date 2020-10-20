const button = document.querySelector("#switch");
const login  = document.querySelector("#loginContent");
const words  = document.querySelector("#wordsContent");
const messages = document.querySelector("#messages");
const smallElement = document.querySelector("#smallElement");

button.addEventListener("click", () => {
    if (! smallElement.classList.contains("moved")){
        smallElement.classList.add("moved");
        login.classList.add("hidden");
        words.classList.remove("hidden");
        info.classList.add("hidden");
    }
    else{
        smallElement.classList.remove("moved");
        login.classList.remove("hidden");
        words.classList.add("hidden"); 
        info.classList.remove("hidden");

    }

})