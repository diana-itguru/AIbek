import React, { useState, useRef, useEffect } from 'react';
import './chat.css';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/chat/';
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;
        
        setIsLoading(true);
        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        const typingMessage = { id: Date.now() + 1, text: 'ИИ печатает...', sender: 'ai-typing' };
        
        setMessages(prev => [...prev, userMessage, typingMessage]);
        setInput('');

        try {
            const response = await axios.post(API_URL, {
                messages: [
                    {
                        role: 'user',
                        content: input
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setMessages(prev => prev
                .filter(msg => msg.id !== typingMessage.id)
                .concat({
                    id: Date.now() + 2,
                    // Изменить эту строку, так как структура ответа другая
                    text: response.data.choices[0].message.content || 'Пустой ответ.',
                    sender: 'ai'
                })
        );
        } catch (error) {
            setMessages(prev => prev
                .filter(msg => msg.id !== typingMessage.id)
                .concat({ 
                    id: Date.now() + 2, 
                    text: 'Ошибка при запросе к API.', 
                    sender: 'ai' 
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chat-container" role="main">
            <div className="chat-window" role="log" aria-live="polite">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`message ${msg.sender}`}
                        role={msg.sender === 'user' ? 'listitem' : 'alert'}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    disabled={isLoading}
                    placeholder="Введите сообщение..."
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Поле ввода сообщения"
                />
                <button 
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    aria-label="Отправить сообщение"
                >
                    {isLoading ? 'Отправка...' : 'Отправить'}
                </button>
            </div>
        </div>
    );
}

export default Chat;