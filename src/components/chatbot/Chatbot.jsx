import React, { useState } from "react";
import '../../styles/chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: 'Hello! How can I help you?', sender: 'bot' }]);
            }, 1000);
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
