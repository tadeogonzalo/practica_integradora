const socket = io();

let username;

const usernameInput = document.getElementById("username");

Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa tu nombre de usuario.",
    inputValidator: (value) => {
        return !value && "Es obligatorio un nombre de usuario.";
    },
    allowOutsideClick: false,
}).then((result)=>{
    username = result.value;
    usernameInput.value = username;
    socket.emit("new-user", username);
    console.log(username);
})

const chatInput = document.getElementById("message");

chatInput.addEventListener("keyup", async (ev)=>{

    if(ev.key === "Enter"){
        const inputMessage = chatInput.value;

        if(inputMessage.trim().length > 0){

                socket.emit("chat-message", {username, message: inputMessage});
                chatInput.value = "";

        }
    }
})

socket.on("new-user",(username)=>{
    Swal.fire({
        title: `${username} se ha unido al chat`,
        toast: true,
        position:"top-end"
    })
})