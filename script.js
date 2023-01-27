const messageInput = document.querySelector('#message')
const sendButton = document.querySelector('#send-message')
const chatArea = document.querySelector('.chat')
const closeButton = document.querySelector('.close-button')

load()

/* 
creates a message element on the screen with the text content of the input, if there's
no text in it, nothing is done.
everytime a new message is added, the localStorage data is appended with the new message content
(all the innerHTML of the div.message)
 */

function addNewMessage(e){
    e.preventDefault()
    const newMessage = messageInput.value
    if(newMessage){
        let messageElement = createMessageDiv()
        let data = JSON.parse(localStorage.getItem('boraCodar@Chat')) || []
        
        sendOrReceive(messageElement, newMessage)
        
        chatArea.appendChild(messageElement)

        data.push(messageElement.innerHTML)
        save(data)

        chatArea.scrollTop = chatArea.scrollHeight

        messageInput.value = ''
    }

}

/* 
//OLDER SCRIPT I WAS USING TO TRACK THE FORM SUBMIT
    sendButton.addEventListener('click', (e)=>{
    e.preventDefault()
    const newMessage = messageInput.value
    if(newMessage){
        let messageElement = createMessageDiv()
        let data = JSON.parse(localStorage.getItem('boraCodar@Chat')) || []
        
        sendOrReceive(messageElement, newMessage)
        
        chatArea.appendChild(messageElement)

        data.push(messageElement.innerHTML)
        save(data)

        chatArea.scrollTop = chatArea.scrollHeight

        messageInput.value = ''
    }
})
*/


/* 
returns the current time formated in pt-br
*/

function getTime(){
    let currentTime = new Date().toLocaleString('pt-br')
    return currentTime.slice(11, 16)
}

/* 
creates and returns a div with the .message class
*/

function createMessageDiv(){
    let messageElement = document.createElement('div')
    messageElement.classList.add('message')
    return messageElement
}

/* 
verify if the last message on the chat area was sent or received.
if it was a sent message, the new message will receive the .received class
if it was a received message, the new message will receive the .sent class

the message div is filled with the author, the time it was sent/received,
the message text, and the style classes are added to it based on it's type (received or sent)
*/

function sendOrReceive(messageElement, messageText){
    if(chatArea.lastElementChild.classList.contains('sent')){
        let sender = document.querySelector('.contact-name').innerHTML.split(' ')[0]

        messageElement.classList.add('received')
        messageElement.innerHTML = `<p class="p-regular">${sender} - ${getTime()}</p>
        <p class="message-content p-regular">${messageText}</p>`
    }
    else{
        messageElement.classList.add('sent')
        messageElement.innerHTML = `<p class="p-regular">Você - ${getTime()}</p>
        <p class="message-content p-regular">${messageText}</p>`
    }
}

/* 
deletes the chat history by removing all the elements that
contain the .message class and overwrites the existing data array
on the localStorage with an empty array
 */

function deleteChat(){
    let data = []
    let messages = document.querySelectorAll('.message')
    
    save(data)
    
    messages.forEach(message => {
        chatArea.removeChild(message)
    })


    // you can also simplify by just clearing de innerHTML:
    // chatArea.innerHTML = '' 

}

/* 
assigns the chat history to the key 'boraCodar@Chat' on localStorage
*/

function save(data){
    localStorage.setItem('boraCodar@Chat', JSON.stringify(data))
}

/* 
loads the chat history from the localStorage and appends the messages
div's on the chat area, switching between sent and received
*/

function load(){
    let data = JSON.parse(localStorage.getItem('boraCodar@Chat'))
    
    if(data){
        data.forEach(element => {
        let loadedMessage = createMessageDiv()
            if(chatArea.lastElementChild.classList.contains('sent')){
                loadedMessage.classList.add('received')
                loadedMessage.innerHTML = element
            }
            else if(chatArea.lastElementChild.classList.contains('received')){
                loadedMessage.classList.add('sent')
                loadedMessage.innerHTML = element
            }
            
            chatArea.appendChild(loadedMessage)
        });
    }
    chatArea.scrollTop = chatArea.scrollHeight
}