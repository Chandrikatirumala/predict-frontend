import React, { useState } from 'react';
import './LovePrediction.css';

const LovePrediction = () => {
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [age, setAge] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePrediction = () => {
    setIsLoading(true);
    
    // Simulate loading/calculation time
    setTimeout(() => {
      const compatibility = Math.floor(Math.random() * 51) + 50; // 50-100%
      const meetingTime = [
        "within a week", 
        "within a month", 
        "within a year", 
        "when you least expect it"
      ][Math.floor(Math.random() * 4)];
      
      const qualities = [
        "kindness", "intelligence", "humor", "adventurous spirit", 
        "creativity", "mystery", "passion", "loyalty"
      ].sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const challenges = [
        "miscommunication", "distance", "timing", 
        "external pressures", "personal growth differences", 
        "none - it will be smooth sailing"
      ][Math.floor(Math.random() * 6)];
      
      const outcome = [
        "lasting happiness", "a valuable life lesson", 
        "a whirlwind romance", "a deep friendship that blossoms into love", 
        "an unexpected connection"
      ][Math.floor(Math.random() * 5)];
      
      const colorMessages = {
        'red': "Passionate encounters are in your future!",
        'blue': "Deep, meaningful connections await you.",
        'green': "Growth and harmony will blossom in your relationships.",
        'yellow': "Joyful and lighthearted romantic experiences are coming.",
        'purple': "You will attract someone with a mysterious, spiritual energy.",
        'pink': "Sweet, tender romantic moments are on the horizon.",
        'black': "Someone intense and powerful will enter your life.",
        'white': "A pure, honest connection will form when you're ready."
      };
      
      setPrediction({
        name,
        partnerName,
        compatibility,
        meetingTime,
        qualities,
        challenges,
        outcome,
        colorMessage: colorMessages[favoriteColor.toLowerCase()] || 
                     "Your chosen color reveals unique romantic energies around you."
      });
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="love-prediction-container">
      <h1>✨ Love Prediction Oracle ✨</h1>
      <p>Answer these questions to receive your love prediction...</p>
      
      <div className="form-group">
        <label>Your Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>Crush/Partner's Name (optional):</label>
        <input 
          type="text" 
          value={partnerName} 
          onChange={(e) => setPartnerName(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>Favorite Color:</label>
        <input 
          type="text" 
          value={favoriteColor} 
          onChange={(e) => setFavoriteColor(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>Your Age:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
      </div>
      
      <button 
        onClick={generatePrediction} 
        disabled={!name || isLoading}
      >
        {isLoading ? 'Consulting the Stars...' : 'Get Prediction'}
      </button>
      
      {isLoading && (
        <div className="loading">
          <div className="crystal-ball">
            <div className="sparkles"></div>
          </div>
        </div>
      )}
      
      {prediction && !isLoading && (
        <div className="prediction-result">
          <h2>🌟 Love Prediction for {prediction.name} 🌟</h2>
          
          {prediction.partnerName ? (
            <p>Your compatibility with {prediction.partnerName} is: {prediction.compatibility}%</p>
          ) : (
            <p>Your next love connection will appear {prediction.meetingTime}</p>
          )}
          
          <p>You will be drawn to their {prediction.qualities.join(', ')}.</p>
          <p>Potential challenges: {prediction.challenges}</p>
          <p>Ultimate outcome: {prediction.outcome}</p>
          <p className="color-message">{prediction.colorMessage}</p>
          
          <div className="final-note">
            <p>Remember: The stars impel, they do not compel. Your choices shape your destiny.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LovePrediction;