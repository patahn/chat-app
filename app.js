const socket = new WebSocket('ws://localhost:5501');
const messageList = document.querySelector("ul")
const messageForm = document.querySelector("#msg");
const nickForm = document.querySelector("#nn");

function makeMsg(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

socket.addEventListener('open', () => {
    console.log("Connected to server");
});

socket.addEventListener('message', (msg) => {
    console.log(`${msg.data}`);
});

socket.addEventListener('close', () => {
    console.log("Disconnected to the server");
});

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    console.log(input.value);
    socket.send(makeMsg("new_message", input.value));
    input.value = '';
});

socket.addEventListener('message', (message) => {
    const br = document.createElement("br");
    const div = document.createElement("div");
    const li = document.createElement('li');
    div.prepend(li);
    li.innerText = message.data;
    messageList.prepend(div);
    messageList.prepend(br);

    if(li.innerText.length >= screen.width){
        li.appendChild(br);
    }
});

nickForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(makeMsg("nickname", input.value));
});