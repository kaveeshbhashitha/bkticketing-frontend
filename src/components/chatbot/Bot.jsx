import React, { useState } from "react";
import '../../styles/chatbot.css';

// Google Gemini API Key (replace with your actual key)
const GEMINI_API_KEY = "YOUR API KEY";

// Function to load JSON data
const loadJSON = async () => {
    try {
        const response = await fetch('./response.json'); // Adjust the path if needed
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON file:', error);
        return null;
    }
};

// Function to find the best response from the JSON data
const findResponse = (data, userMessage) => {
    const messageLower = userMessage.toLowerCase();
    let bestMatch = { score: 0, answer: "Sorry, Please contact us for more details." };

    // Loop through each entry in the JSON data
    for (const entry of data) {
        const questionLower = entry.question.toLowerCase();
        const words = questionLower.split(" ");
        let score = 0;

        // Calculate score based on keyword matches
        words.forEach(word => {
            if (messageLower.includes(word)) {
                score++;
            }
        });

        // If a stronger match is found, update the bestMatch object
        if (score > bestMatch.score) {
            bestMatch = { score, answer: entry.answer };
        }
    }

    // Only return a response from JSON if the score is greater than a threshold (e.g., 2 matches)
    if (bestMatch.score > 2) {
        return bestMatch.answer;
    } else {
        return "Sorry, Please contact us for more details."; // Default fallback
    }
}

// Function to fetch response from Google Gemini API
const fetchGoogleGeminiResponse = async (userMessage) => {
    try {
        const response = await fetch('https://gemini.googleapis.com/v1/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify({
                query: userMessage,
                lang: 'en'
            })
        });

        const data = await response.json();
        return data.answer || "Sorry, I couldn't find an answer.";
    } catch (error) {
        console.error("Error communicating with Google Gemini:", error);
        return "Sorry, I couldn't fetch the answer from Google.";
    }
};

const Bot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Handle sending messages (user input and bot response)
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
            let botResponse = jsonData ? findResponse(jsonData, input) : "Error: Unable to fetch data.";
    
            // If no answer is found in JSON, fetch it from Google Gemini API
            if (botResponse === "Sorry, Please contact us for more details.") {
                botResponse = await fetchGoogleGeminiResponse(input);
            }
    
            // Update the chat with the bot's response
            setMessages(prevMessages => [
                ...prevMessages.slice(0, -1), // Remove the "thinking..." message
                { text: botResponse, sender: 'bot' }
            ]);
        }
    };
    

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
                    <button onClick={() => setIsOpen(false)} className="close-button"><i className="fa-solid fa-xmark"></i></button>
                </div>
            ) : (
                <div className="minimized-button" onClick={() => setIsOpen(true)}>
                    <i className="fa-regular fa-message"></i>
                </div>
            )}
        </div>
    );
};

export default Bot;



