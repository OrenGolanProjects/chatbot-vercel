import { useState } from 'react';
import './ChatbotIcon.css';

interface ChatbotIconProps {
    onClick: () => void;
    isOpen: boolean;
}

export default function ChatbotIcon({ onClick, isOpen }: ChatbotIconProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`chatbot-icon-button ${isOpen ? 'open' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isOpen && (
                <>
                    <div className="icon-circle">
                        <svg
                            className="chat-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <div className={`icon-text ${isHovered ? 'visible' : ''}`}>
                        <span>Contact Us</span>
                    </div>
                </>
            )}
            {isOpen && (
                <div className="icon-circle">
                    <svg
                        className="close-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            )}
        </button>
    );
}