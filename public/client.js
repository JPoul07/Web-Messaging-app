const socket = new io()
const form = document.querySelector("#form")
const username = document.querySelector("#username")
const input = document.querySelector("#input")
const messages = document.querySelector("#messages")

function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16)
    return `#${hex.padStart(6, '0')}`
}

form.addEventListener('submit', (event => {
    event.preventDefault()
    if (username.value != "" && input.value != "") {
        socket.emit("message", {
            "username": username.value,
            "message": input.value
        })

    input.value = ""
    }
}))

socket.addEventListener('message', (msg) => {
    const li = document.createElement("li")
    const span = document.createElement("span")

    span.classList.add("username")
    span.style.color = getRandomHexColor()
    span.textContent = msg.username
    li.appendChild(span)
    li.append(msg.message)
    messages.appendChild(li)
})