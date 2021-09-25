
let send = document.querySelector('#send');
let message=document.querySelector('#type-message');
let chatBackground=document.querySelector('.chat-background');

let name = prompt('Enter your name:')
if(name!=null){
    socket.emit('user-joined',name);
}

send.addEventListener('click',function(){
    let messageValue=message.value;

    socket.emit('send-chat',{message:messageValue,name:name});

    apppendText(messageValue,name,"send");
    message.value=""; 
    
})

function apppendText(messageValue,name,flag){
    if(messageValue){
        let sendMessage=document.createElement('div');
        if(flag=="send")
        sendMessage.setAttribute('class','send-message');
        else
        sendMessage.setAttribute('class','received-message');

        let chatName=document.createElement('div');
        chatName.setAttribute('class','chat-name');
        chatName.innerHTML=name;

        let chatMessage=document.createElement('div');
        chatMessage.setAttribute('class','chat-message');
        chatMessage.innerHTML=messageValue;

        sendMessage.appendChild(chatName);
        sendMessage.appendChild(chatMessage);
        chatBackground.appendChild(sendMessage);
        
        
        chatBackground.scrollTop = chatBackground.scrollHeight;
    }
}