
socket.on('joined-user',function(name){
    let joinedUser=document.createElement('div');
    joinedUser.setAttribute('class','join');
    joinedUser.innerHTML=`${name} joined the chat !!`;
    chatBackground.appendChild(joinedUser);
})

socket.on('left-chat',function(name){
    let leftUser=document.createElement('div');
    leftUser.setAttribute('class','leave');
    leftUser.innerHTML=`${name} left the chat !!`;
    chatBackground.appendChild(leftUser);
})

socket.on('chats-send',function(obj){
    apppendText(obj.message,obj.name,"receive");
})

