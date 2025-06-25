import React, { useState, useRef, useEffect } from 'react';
import './FortuneTeller.css';

const FortuneTeller = () => {
  const [messages, setMessages] = useState([
    {
      text: "✨ Welcome to Mystic AI! ✨\n\nI am Madame Zora, your digital seer. What would you like to know about your future?",
      sender: 'bot',
      type: 'welcome'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "Consulting the ancient algorithms...",
    "Reading the cosmic WiFi signals...",
    "Shaking my digital magic 8-ball...",
    "The spirits are typing... slowly...",
    "Divining your future (please hold)...",
    "Asking the universe (but it's on mute)..."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isTyping) return;

    const question = input.trim();
    if (!question) return;

    setMessages(prev => [...prev, { text: question, sender: 'user', type: 'question' }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    const thinking = botResponses[Math.floor(Math.random() * botResponses.length)];
    setMessages(prev => [...prev, { text: thinking, sender: 'bot', type: 'thinking' }]);

    try {
      const response = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          question,
          birthDate: "",
          zodiacSign: ""
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.prediction) {
        setMessages(prev => {
          const withoutThinking = prev.filter(msg => msg.type !== 'thinking');
          return [
            ...withoutThinking,
            {
              text: data.prediction,
              sender: 'bot',
              type: 'prediction',
              timestamp: new Date().toLocaleTimeString()
            }
          ];
        });
      } else {
        throw new Error(data.error || "Unexpected response");
      }
    } catch (err) {
      console.error('Prediction Error:', err.message);
      setError('🔮 The cosmic connection failed. Try again soon.');
      setMessages(prev => {
        const withoutThinking = prev.filter(msg => msg.type !== 'thinking');
        return [
          ...withoutThinking,
          {
            text: '🔮 The cosmic energies are disturbed... Try again later.',
            sender: 'bot',
            type: 'error'
          }
        ];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const formatMessage = (message) => {
    const messageLines = message.text.split('\n').map((line, i) => (
      <p key={i}>{line}</p>
    ));

    switch (message.type) {
      case 'welcome':
        return <div className="welcome-message">{messageLines}</div>;
      case 'prediction':
        return (
          <div className="prediction-message">
            <div className="crystal-ball">🔮</div>
            <div className="prediction-text">
              {messageLines}
              {message.timestamp && (
                <div className="timestamp">{message.timestamp}</div>
              )}
            </div>
          </div>
        );
      case 'error':
        return <div className="error-message">{messageLines}</div>;
      default:
        return <div className="message-text">{messageLines}</div>;
    }
  };

  return (
    <div className="fortune-teller-container">
      <div className="fortune-header">
        <h2>🔮 Mystic AI Fortune Teller</h2>
        <p>Peer into your digital destiny...</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {formatMessage(msg)}
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && <div className="error-notification">{error}</div>}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about love, career, wealth, or health..."
          disabled={isTyping}
        />
        <button type="submit" disabled={!input.trim() || isTyping}>
          <span role="img" aria-label="send">✨</span>
        </button>
      </form>

      <div className="disclaimer">
        <small>For entertainment purposes only. Accuracy not guaranteed (but fun is!).</small>
      </div>
    </div>
  );
};

export default FortuneTeller;
