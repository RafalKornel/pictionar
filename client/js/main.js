const button = document.querySelector("#switch");
const loginContent = document.querySelector("#loginContent");
const loginForm = document.querySelector("#loginForm")
const words = document.querySelector("#wordsContent");
const wordsForm = document.querySelector("#wordsForm");
const messages = document.querySelector("#messages");
const smallElement = document.querySelector("#smallElement");
const rows = document.getElementsByClassName("row");
const loginButton = document.querySelector("#loginButton");
const getWordsButton = document.querySelector("#dbButton");

let messagesNumber = 20;
let entries = [];
let data = [];
let isLoggedIn = false;
let loading = false;

function fetchAndAddWords() {
    loading = true;

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < messagesNumber; i++) {
                let index = Math.floor(Math.random() * data.length);
                entries.push(data[index]);
            }

            return fetch("https://jsonplaceholder.typicode.com/users");
        })
        .then(response => response.json())
        .then(users => {

            for (let i = 0; i < entries.length; i++) {
                data.push({
                    user: users.find(e => e.id == entries[i].userId).name.split(" ")[0],
                    entry: entries[i].body.split(" ")[0]
                })
            }

            attachMessages(data);
            loading = false;
        })
        .catch(err => console.error("Unable to fetch data. Error: " + err.message));
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
        let rowId = i % 3;
        let message = createMessage(messages[i].user, messages[i].entry)
        rows[rowId].appendChild(message);
    }
}

function sendWord() {
    
    alert("hi")
}

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();
    console.log(loginForm);

    /*  here goes
        code doing login
        part 
    */
    
    let name = document.querySelector("#name").value;
    let pass = document.querySelector("#password").value;

    console.log(name, pass);
    
    isLoggedIn = name == "admin" && pass == "admin";

    if (isLoggedIn) {
        fetchAndAddWords();
        smallElement.classList.add("moved");
        loginContent.classList.add("hidden");
        words.classList.remove("hidden");
        info.classList.add("hidden");
    }
    else {
        smallElement.classList.remove("moved");
        loginContent.classList.remove("hidden");
        words.classList.add("hidden");
        info.classList.remove("hidden");
    }
})

getWordsButton.addEventListener("click", () => {
    window.open("https://jsonplaceholder.typicode.com/posts");
})

wordsForm.addEventListener("submit", event => {
    event.preventDefault();
    let words = document.querySelector("#words").value;
    console.log(words);
})