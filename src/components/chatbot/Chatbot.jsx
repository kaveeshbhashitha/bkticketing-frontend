import React, { useState } from "react";
import '../../styles/chatbot.css';

const loadJSON = async () => {
    try {
        const response = await fetch('./response.json'); // Adjust the path if needed
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON file:', error);
        return null;
    }
}

// Function to find the best response from the JSON data (similar to the first code)
const findResponse = (data, userMessage) => {
    const messageLower = userMessage.toLowerCase();
    let bestMatch = { score: 0, answer: "Sorry, Please contact us for more details." };

    for (const entry of data) {
        const questionLower = entry.question.toLowerCase();
        const words = questionLower.split(" ");
        let score = 0;

        words.forEach(word => {
            if (messageLower.includes(word)) {
                score++;
            }
        });

        if (score > bestMatch.score) {
            bestMatch = { score, answer: entry.answer };
        }
    }

    return bestMatch.answer;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // const handleSend = () => {
    //     if (input.trim()) {
    //         setMessages([...messages, { text: input, sender: 'user' }]);
    //         setInput('');
    //         setTimeout(() => {
    //             setMessages(prevMessages => [...prevMessages, { text: 'Hello! How can I help you?', sender: 'bot' }]);
    //         }, 1000);
    //     }
    // };

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, sender: 'user' }];
            setMessages(newMessages);
            setInput('');

            // Simulate a "thinking" response
            setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Thinking...', sender: 'bot' }
            ]);

            // Get the response from the JSON file
            const jsonData = await loadJSON();
            const botResponse = jsonData ? findResponse(jsonData, input) : "Error: Unable to fetch data.";

            // Update the chat with the bot's response
            setMessages(prevMessages => [
                ...prevMessages.slice(0, -1), // Remove the "thinking..." message
                { text: botResponse, sender: 'bot' }
            ]);
        }
    }

    return (
        <div className="minimized-chatbot">
            {isOpen ? (
                <div className="chatbot-container">
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="chatbot-input"
                    />
                    <button onClick={handleSend} className="send-button">Send</button>
                    <button onClick={() => setIsOpen(false)} className="close-button"><i class="fa-solid fa-xmark"></i></button>
                </div>
            ) : (
                <div className="minimized-button" onClick={() => setIsOpen(true)}>
                    <i class="fa-regular fa-message"></i>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
