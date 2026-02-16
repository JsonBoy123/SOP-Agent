import React, { useState, useRef, useEffect } from 'react';
import { queryAgentStream } from '../services/apiService';
import SourceCitations from './SourceCitations';
import '../styles/ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m OpsMind AI, your corporate knowledge assistant. Ask me anything about your company\'s SOPs and I\'ll provide accurate answers with sources.',
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // Stream response from backend
      const response = await queryAgentStream(inputValue);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: '',
        sources: [],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                botMessage.text += parsed.text;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...botMessage };
                  return updated;
                });
              } else if (parsed.sources) {
                botMessage.sources = parsed.sources;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...botMessage };
                  return updated;
                });
              }
            } catch (e) {
              // Skip parsing errors
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: `Sorry, I encountered an error: ${error.message}`,
        sources: [],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>💬 OpsMind AI Assistant</h2>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message message-${message.type}`}>
            <div className="message-content">
              {message.type === 'bot' && <span className="bot-avatar">🤖</span>}
              {message.type === 'user' && <span className="user-avatar">👤</span>}
              <div className="message-text">
                <p>{message.text}</p>
                {message.sources && message.sources.length > 0 && (
                  <SourceCitations sources={message.sources} />
                )}
              </div>
            </div>
            <span className="message-time">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        {loading && (
          <div className="message message-bot">
            <div className="message-content">
              <span className="bot-avatar">🤖</span>
              <div className="message-text">
                <p className="typing-indicator">
                  <span></span><span></span><span></span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="input-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Ask a question about SOPs..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !inputValue.trim()}
          >
            {loading ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
