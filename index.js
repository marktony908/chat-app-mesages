document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('messageInput');
    const message = inputField.value.trim();
    
    if (message) {
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: message })
        })
        .then(response => response.json())
        .then(data => {
            inputField.value = '';
            addMessageToChat(data);
        })
        .catch(error => console.error('Error:', error));
    }
}

function fetchMessages() {
    fetch('http://localhost:3000/messages')
        .then(response => response.json())
        .then(data => {
            data.forEach(message => addMessageToChat(message));
        })
        .catch(error => console.error('Error:', error));
}

function addMessageToChat(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    messagesDiv.appendChild(messageElement);
}

// Fetch existing messages when the page loads
fetchMessages();