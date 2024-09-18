document.getElementById('send-btn').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const languageSelector = document.getElementById('language-selector');
    const chatbox = document.getElementById('chatbox');

    const message = messageInput.value;
    const language = languageSelector.value;

    if (message.trim() === '') return;

    // Display the user's message
    const userMessage = document.createElement('div');
    userMessage.className = 'message';
    userMessage.textContent = message;
    chatbox.appendChild(userMessage);

    // Clear input
    messageInput.value = '';

    // Send the message to the server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, language: language })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message';
        botMessage.textContent = data.response;
        chatbox.appendChild(botMessage);
    });
});
