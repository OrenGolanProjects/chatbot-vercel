import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import ChatbotIcon from "./ChatBotIcon/ChatBotIcon.tsx";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi! How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you today?';
        } else if (lowerMessage.includes('help')) {
            return 'I\'m here to help! You can ask me about our services, pricing, or any other questions you might have.';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return 'Our pricing varies depending on your needs. Would you like to schedule a consultation to discuss options?';
        } else if (lowerMessage.includes('contact')) {
            return 'You can reach us at contact@example.com or call us at (555) 123-4567.';
        } else if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
            return 'We\'re open Monday through Friday, 9 AM to 6 PM EST.';
        } else if (lowerMessage.includes('feature')) {
            return 'Our platform offers instant responses, smart automation, and enterprise-grade security. Which feature would you like to know more about?';
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return 'Goodbye! Feel free to reach out if you need anything else!';
        } else if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        } else {
            return 'I understand you\'re asking about "' + userMessage + '". Let me connect you with a team member who can provide more detailed information.';
        }
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chatbot-container">
            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="chat-header-title">Chat Support</h3>
                                <p className="chat-header-status">We're online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="chat-close-btn">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
                            >
                                <div className="message-bubble">
                                    <p className="message-text">{message.text}</p>
                                    <p className="message-time">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message message-bot">
                                <div className="message-bubble">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chat-input-container">
                        <div className="chat-input-wrapper">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="chat-input"
                            />
                            <button
                                onClick={handleSend}
                                className="chat-send-btn"
                                disabled={!inputValue.trim()}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Icon - using new component */}
            <ChatbotIcon onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
    );
}