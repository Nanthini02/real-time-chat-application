
let username = 'User';

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText === '') {
        alert('Message cannot be empty!');
        return;
    }

    if (messageText.length > 200) {
        alert('Message is too long (max 200 characters).');
        return;
    }

    const chatMessages = document.querySelector('.chat-messages');
    const timestamp = new Date().toLocaleTimeString();

    // Create message element for the user
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user');
    messageElement.innerHTML = `<strong>${username}:</strong> ${messageText} <div class="timestamp">${timestamp}</div>`;
    chatMessages.appendChild(messageElement);

 
    chatMessages.scrollTop = chatMessages.scrollHeight;
    messageInput.value = '';
    setTimeout(() => {
        const botReply = generateBotResponse(messageText);  
        receiveMessage('Bot', botReply);
    }, 1000);
}


function receiveMessage(sender, text) {
    const chatMessages = document.querySelector('.chat-messages');
    const timestamp = new Date().toLocaleTimeString();

    // Create message element for the bot/other user
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text} <div class="timestamp">${timestamp}</div>`;
    chatMessages.appendChild(messageElement);


    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function generateBotResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();

    
    if (messageLower.includes('hello')) {
        return 'Hello! How can I help you?';
    } else if (messageLower.includes('help')) {
        return 'I am here to assist you. What do you need help with?';
    } else if (messageLower.includes('time')) {
        return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (messageLower.includes('date')) {
        return `Today's date is ${new Date().toLocaleDateString()}.`;
    } else if (messageLower.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else if (messageLower.includes('hii')) {
        return 'Hii!';
    } else if (messageLower.includes('welcome')) {
        return 'Welcome To The chatbot!'; 
    } else {
        return "Sorry, I don't understand that.";
    }
}


document.getElementById('set-username-button').addEventListener('click', () => {
    const usernameInput = document.getElementById('username-input').value.trim();
    if (usernameInput !== '') {
        username = usernameInput;
        document.querySelector('.username-container').style.display = 'none';
        document.querySelector('.chat-window').style.display = 'flex';
    } else {
        alert('Please enter a valid username.');
    }
});

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMessage();
    }
});

// Handle clearing the chat
document.getElementById('clear-button').addEventListener('click', () => {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';
});

// Typing indicator functionality
let typingTimeout;
document.getElementById('message-input').addEventListener('input', () => {
    const typingIndicator = document.querySelector('.typing-indicator');
    typingIndicator.style.display = 'block';

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000);  // Hide typing indicator after 1 second of inactivity
});
