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
const wordsCount = document.querySelector("#num");

let messagesNumber = 27;
let entries = [];
let data = [];
let isLoggedIn = false;
let loading = false;

const msgElements = document.getElementsByClassName("message");

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


loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    data = {
        user_name: loginForm.name.value,
        user_pass: loginForm.password.value,
        csrf_token: loginForm.csrf_token.value,
    }

    fetch("/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": data.csrf_token,
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (res.status == 200) {
            return fetch("/words").then(res => res.json())
        }
        else {
            const err = document.querySelector("#error");
            err.classList.remove("hidden");
            throw Error("Invalid credentials")
        }
    })
    .then(data => {
        attachMessages(data)

        fetch("/count").then(count => count.json())
        .then(data => wordsCount.textContent =data); 

        requestAnimationFrame(animateMessages);

        smallElement.classList.add("moved");
        loginContent.classList.add("hidden");
        words.classList.remove("hidden");
    })
    .catch(err => console.error(err))

})


getWordsButton.addEventListener("click", () => {
    window.open("bank");
})


wordsForm.addEventListener("submit", event => {
    event.preventDefault();

    let words_unfiltered = wordsForm.words.value.split(",");
    let words = words_unfiltered.filter( (s) => s.match("^[A-Za-z0-9 ]+$"))

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
        if (res.status == 200)  return res.json()
        else                    throw Error(`Bad response, status ${res.status}`)})
    .then(data => {
        // here would be code that will reload values on page
        alert(`${data.added_words} len: ${data.count}`)
    })
    .catch(err => console.error(err))
})

    /* 


    function fetchAndAddWords() {
    loading = true;

    return fetch('https://jsonplaceholder.typicode.com/posts')
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
            requestAnimationFrame(animateMessages);

        })
        .catch(err => console.error("Unable to fetch data. Error: " + err.message));
}
        if (!isLoggedIn) {
        const err = document.querySelector("#error");
        console.log(err);
        err.classList.remove("hidden");
    }
    
    


        isLoggedIn = name == "admin" && pass == "admin";

    if (isLoggedIn) {


    }
    else {

    }
    
    here goes
        code doing login
        part 
    

    const data = {
        user: name,
        pass: pass,
    }

    const params = {
        headers: {
            "content-type":"application/json; charset=UTF-8"
        },
        body: data,
        method:"POST",
    }

    fetch("https://reqbin.com/echo/post/json", params)
    .then(response => console.log(response))
    .catch(err => console.error(err)); */