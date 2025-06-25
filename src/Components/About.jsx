import React from 'react';
import './About.css';
const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>🔮 About Mystic Oracle</h1>
        <p>Your Digital Window to the Future</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>✨ How It Works</h2>
          <p>
            Mystic Oracle uses ancient divination algorithms combined with modern AI to peer into your future. 
            Simply ask your question about love, career, wealth, or general destiny, and our digital seer will 
            consult the cosmic database to reveal what's coming.
          </p>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">💖</div>
              <h3>Love Predictions</h3>
              <p>Discover when you'll meet your soulmate or decode your current relationship</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Career Forecast</h3>
              <p>Learn about upcoming opportunities and professional growth</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Wealth Outlook</h3>
              <p>Find when financial blessings will come your way</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🌌 Our Mystical Methods</h2>
          <p>
            While we don't claim to be actual fortune tellers, our predictions are generated using:
          </p>
          <ul className="methods-list">
            <li>🔮 Algorithmic tarot card simulations</li>
            <li>✨ AI-powered astrology calculations</li>
            <li>🌙 Machine learning trained on ancient divination texts</li>
            <li>💫 Real-time cosmic energy analysis (just kidding... or are we?)</li>
          </ul>
        </section>

        <section className="about-section disclaimer">
          <h2>⚠️ Important Disclaimer</h2>
          <p>
            Mystic Oracle is designed for entertainment purposes only. Our predictions are not 
            meant to be taken as actual advice or factual forecasts of future events. We make no 
            claims about the accuracy of our divinations. Please consult real professionals for 
            important life decisions.
          </p>
          <p>
            Remember: The future is not set in stone - you create your own destiny!
          </p>
        </section>

        <section className="about-section">
          <h2>📜 The Legend of Zoltar</h2>
          <p>
            Our digital seer "Zoltar" is named after the legendary fortune telling machines of old. 
            While the original Zoltar spoke in vague prophecies, our AI-powered version provides 
            much more engaging (and occasionally accurate) predictions!
          </p>
          <div className="quote">
            "The stars whisper secrets, but only to those who know how to listen." 
            <span>- Zoltar, probably</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;