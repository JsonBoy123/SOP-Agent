import React from 'react';
import ChatInterface from '../components/ChatInterface';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>🧠 OpsMind AI</h1>
          <p className="lead">Enterprise SOP Agent - Your Corporate Knowledge Brain</p>
          <p className="subtitle">
            Instantly find answers to your operational questions with accurate sources
          </p>
        </div>
      </div>

      <div className="features-section">
        <div className="row">
          <div className="col-md-4 feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>
              Semantic search through all your SOPs to find exactly what you need
            </p>
          </div>
          <div className="col-md-4 feature-card">
            <div className="feature-icon">📚</div>
            <h3>Source Citation</h3>
            <p>
              Every answer includes exact sources with page numbers and sections
            </p>
          </div>
          <div className="col-md-4 feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Powered</h3>
            <p>
              Powered by Gemini AI with RAG technology for accurate responses
            </p>
          </div>
        </div>
      </div>

      <div className="chat-section">
        <ChatInterface />
      </div>

      <div className="footer-section">
        <p className="text-muted">
          OpsMind AI.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
