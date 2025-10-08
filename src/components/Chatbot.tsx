import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import ChatbotIcon from "./ChatBotIcon/ChatBotIcon.tsx";
import { COMPANY_CONTEXT, getCompanyInsight } from '../data/companyContext';

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
            text: `Welcome to ${COMPANY_CONTEXT.name}! How can I assist you today?\n\n1. Property Search & Market Information\n2. Our Services & Specialties\n3. Team & Agent Information\n4. Contact & Office Hours\n\nPlease type the number or ask me anything!`,
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage: string): { text: string; setFollowUp: boolean } => {
        const lowerMessage = userMessage.toLowerCase();
        const trimmedMessage = userMessage.trim();

        // Handle follow-up responses when awaiting
        if (awaitingFollowUp) {
            if (trimmedMessage === '1') {
                return {
                    text: `How can I assist you today?\n\n1. Property Search & Market Information\n2. Our Services & Specialties\n3. Team & Agent Information\n4. Contact & Office Hours\n\nPlease type the number or ask me anything!`,
                    setFollowUp: false
                };
            } else if (trimmedMessage === '2') {
                return {
                    text: `Thank you for contacting ${COMPANY_CONTEXT.name}! It was great helping you today. Feel free to reach out anytime you need assistance with your real estate needs. Have a wonderful day! 😊`,
                    setFollowUp: false
                };
            }
        }

        // Handle numbered options
        if (trimmedMessage === '1') {
            return {
                text: `🏠 **Property Search & Market Information**\n\nCurrent Market Data:\n• Average home price: ${COMPANY_CONTEXT.marketData.averageHomePrice}\n• Market trend: ${COMPANY_CONTEXT.marketData.marketTrend}\n• Hot neighborhoods: ${COMPANY_CONTEXT.marketData.hotNeighborhoods.join(', ')}\n• Luxury market: ${COMPANY_CONTEXT.marketData.luxuryMarket}\n\nWe serve: ${COMPANY_CONTEXT.serviceAreas.join(', ')}\n\n---\n\nDo you need more assistance?\n1 - Yes, show main menu\n2 - No, I'm all set`,
                setFollowUp: true
            };
        } else if (trimmedMessage === '2') {
            return {
                text: `🏢 **Our Services & Specialties**\n\n**Residential Services:**\n• ${COMPANY_CONTEXT.services.residential.buying}\n• ${COMPANY_CONTEXT.services.residential.selling}\n• ${COMPANY_CONTEXT.services.residential.rentals}\n\n**Commercial Services:**\n• ${COMPANY_CONTEXT.services.commercial.office}\n• ${COMPANY_CONTEXT.services.commercial.retail}\n• ${COMPANY_CONTEXT.services.commercial.industrial}\n\n**Specialties:**\n${COMPANY_CONTEXT.services.specialties.map(s => `• ${s}`).join('\n')}\n\n---\n\nDo you need more assistance?\n1 - Yes, show main menu\n2 - No, I'm all set`,
                setFollowUp: true
            };
        } else if (trimmedMessage === '3') {
            return {
                text: `👥 **Team & Agent Information**\n\n• **Total Agents:** ${COMPANY_CONTEXT.team.totalAgents}\n• **Senior Specialists:** ${COMPANY_CONTEXT.team.seniorAgents}\n• **Languages:** ${COMPANY_CONTEXT.team.languages.join(', ')}\n\n**Our Performance:**\n• Annual Sales: ${COMPANY_CONTEXT.metrics.annualSales}\n• Transactions/Year: ${COMPANY_CONTEXT.metrics.transactionsPerYear}\n• Client Satisfaction: ${COMPANY_CONTEXT.metrics.clientSatisfactionRate}\n• Average Days on Market: ${COMPANY_CONTEXT.metrics.averageDaysOnMarket}\n\n---\n\nDo you need more assistance?\n1 - Yes, show main menu\n2 - No, I'm all set`,
                setFollowUp: true
            };
        } else if (trimmedMessage === '4') {
            return {
                text: `📞 **Contact & Office Information**\n\n**Office Hours:** ${COMPANY_CONTEXT.contact.hours}\n**Phone:** ${COMPANY_CONTEXT.contact.phone}\n**Email:** ${COMPANY_CONTEXT.contact.email}\n**Emergency Line:** ${COMPANY_CONTEXT.contact.emergencyLine}\n\n**Address:**\n${COMPANY_CONTEXT.contact.address}\n\n**Website:** ${COMPANY_CONTEXT.contact.website}\n\n---\n\nDo you need more assistance?\n1 - Yes, show main menu\n2 - No, I'm all set`,
                setFollowUp: true
            };
        }

        // Handle general inquiries using company context
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return {
                text: `Hello! Welcome to ${COMPANY_CONTEXT.name}. We've been serving the Miami area since ${COMPANY_CONTEXT.established}. How can I assist you with your real estate needs today?`,
                setFollowUp: false
            };
        } else if (lowerMessage.includes('market') || lowerMessage.includes('price')) {
            return {
                text: getCompanyInsight(userMessage),
                setFollowUp: false
            };
        } else if (lowerMessage.includes('service') || lowerMessage.includes('area')) {
            return {
                text: getCompanyInsight(userMessage),
                setFollowUp: false
            };
        } else if (lowerMessage.includes('team') || lowerMessage.includes('agent')) {
            return {
                text: getCompanyInsight(userMessage),
                setFollowUp: false
            };
        } else if (lowerMessage.includes('performance') || lowerMessage.includes('stats')) {
            return {
                text: getCompanyInsight(userMessage),
                setFollowUp: false
            };
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('hours')) {
            return {
                text: `You can reach us at ${COMPANY_CONTEXT.contact.phone} or email ${COMPANY_CONTEXT.contact.email}. Our office hours are ${COMPANY_CONTEXT.contact.hours}. We're located at ${COMPANY_CONTEXT.contact.address}.`,
                setFollowUp: false
            };
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return {
                text: `Thank you for contacting ${COMPANY_CONTEXT.name}! Feel free to reach out anytime. Have a great day!`,
                setFollowUp: false
            };
        } else if (lowerMessage.includes('thank')) {
            return {
                text: 'You\'re welcome! Is there anything else about our real estate services I can help you with?',
                setFollowUp: false
            };
        } else {
            // Check FAQ first
            const faqMatch = COMPANY_CONTEXT.faq.find(item =>
                lowerMessage.includes(item.question.toLowerCase().split(' ')[0]) ||
                item.question.toLowerCase().includes(lowerMessage.split(' ')[0])
            );

            if (faqMatch) {
                return {
                    text: faqMatch.answer,
                    setFollowUp: false
                };
            }

            return {
                text: `I'd be happy to help you with "${userMessage}". For detailed information about our real estate services, please contact us at ${COMPANY_CONTEXT.contact.phone} or choose from the options above. Our expert agents are ready to assist you!`,
                setFollowUp: false
            };
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
            const response = getBotResponse(inputValue);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.text,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setAwaitingFollowUp(response.setFollowUp);
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