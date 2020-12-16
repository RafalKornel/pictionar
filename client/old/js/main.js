const button                = document.querySelector("#switch");
const loginContent          = document.querySelector("#loginContent");
const loginForm             = document.querySelector("#loginForm")
const words                 = document.querySelector("#wordsContent");
const wordsForm             = document.querySelector("#wordsForm");
const messages              = document.querySelector("#messages");
const smallElement          = document.querySelector("#smallElement");
const rows                  = document.getElementsByClassName("row");
const loginButton           = document.querySelector("#loginButton");
const getWordsButton        = document.querySelector("#dbButton");
const wordsCounter          = document.querySelector("#num");
const addedWordsContainer   = document.querySelector("#addedWordsContainer")
const addedWords            = document.querySelector("#addedWords");
const msgElements           = document.getElementsByClassName("message");
const retrieveWords         = document.querySelector("#retrievedWords");

let RAF;
let speed = 1;


function animateMessages() {
    let w = msgElements[0].offsetParent.offsetWidth;
    
    for (let msg of msgElements) {
        // if msg element has animIndex, then increment it by speed, else set it to 0
        msg.animIndex = msg.animIndex + speed || 0;

        if (msg.offsetLeft >= w) {
            msg.animIndex = msg.animIndex -w;
        }
        msg.style.left = `${msg.animIndex}px`
        
    }

    RAF = requestAnimationFrame(animateMessages);
}


function createMessage(user, message) {
    let div = document.createElement("div");
    div.classList.add("message");
    let word = document.createElement("p");
    word.classList.add("word");
    word.textContent = message;
    let author = document.createElement("p");
    author.classList.add("author");
    author.textContent = user;
    div.appendChild(word);
    div.appendChild(author);

    return div;
}


function attachMessages(messages) {

    for (let id = 0; id < rows.length; id++) {
        while (rows[id].firstChild) {
            rows[id].firstChild.remove();
        }
    }

    for (let i = 0; i < messages.length; i++) {
        let rowId = i % rows.length;
        let message = createMessage(messages[i].user, messages[i].word)
        rows[rowId].appendChild(message);
    }
}


function switchViews() {
    smallElement.classList.add("moved");
    loginContent.classList.add("hidden");
    words.classList.remove("hidden");
}


async function updateCounter() {
    let countResponse = await fetch("/count");

    if (countResponse.ok) {
        let count = await countResponse.json();
        wordsCounter.textContent = count;
    }
}


async function updateWordsSlider() {
    let wordsResponse = await fetch("/words");

    if (wordsResponse.ok) {
        let words = await wordsResponse.json();
        attachMessages(words);
    
        if (RAF) cancelAnimationFrame(RAF);
        requestAnimationFrame(animateMessages);
    }
}


function loginError() {
    const err = document.querySelector("#error");
    err.classList.remove("hidden");
    throw Error("Invalid credentials")
}


async function login(loginForm) {

    let data = {
        user_name: loginForm.name.value,
        user_pass: loginForm.password.value,
        csrf_token: loginForm.csrf_token.value,
    }

    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": data.csrf_token,
        },
        body: JSON.stringify(data),
    }

    let response = await fetch("/login", options);

    if (!response.ok) {
        loginError();
        return;
    }

    updateWordsSlider()
    updateCounter();

    switchViews();
}


loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    login(loginForm);
})


getWordsButton.addEventListener("click", () => {
    fetch("/bank")
    .then( res => res.json() )
    .then( data => {
        let el = document.createElement("textarea");
        el.value = data;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        retrieveWords.classList.remove("hidden");
        setTimeout( () => retrieveWords.classList.add("hidden"), 5000)
    })
    .catch( err => console.error(err) )
})


wordsForm.addEventListener("submit", event => {
    event.preventDefault();

    let words_unfiltered = wordsForm.words.value.split(",");
    let words = words_unfiltered.filter( (s) => s.match("^[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ ]+$"))

    fetch("/add", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": wordsForm.csrf_token.value,
        },
        body: JSON.stringify({ words: words }),
    })
    .then(res => {

        if (res.ok)  return res.json()
        else                    throw Error(`Bad response, status ${res.status}`)

    })
    .then(data => {

        addedWordsContainer.classList.remove("hidden");
        let message = data["added_words"].reduce( (c, w) => c += (", " + w))
        addedWords.textContent = message;

        setTimeout( () => addedWordsContainer.classList.add("hidden"), 10000);

        const bar = document.querySelector("#wordsBar");
        let color = bar.style.backgroundColor;
        bar.style.backgroundColor = "green";
        setTimeout(() =>  bar.style.backgroundColor = color, 2000);

        updateWordsSlider()
        updateCounter();

    })
    .catch(err => console.error(err))
})