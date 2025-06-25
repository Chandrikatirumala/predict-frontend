import React, { useState } from 'react';
import './CareerPrediction.css';

const CareerPrediction = () => {
  const [formData, setFormData] = useState({
    educationLevel: '',
    skills: '',
    experienceYears: '',
    currentRole: '',
    interests: '',
    industry: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const educationLevels = [
    'High School', 'Associate Degree', 'Bachelor\'s Degree',
    'Master\'s Degree', 'PhD', 'School of Hard Knocks'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education',
    'Manufacturing', 'Retail', 'Professional Couch Potato'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Funny career predictions
  const generateFunnyPrediction = () => {
    const funnyRoles = [
      {
        role: 'Professional Cat Herder',
        confidence: Math.min(100, Math.floor(80 + Math.random() * 20)),
        description: 'Perfect for those who enjoy impossible tasks. Your experience trying to organize group projects makes you uniquely qualified!',
        skills_to_improve: ['Patience', 'Treats Distribution', 'Yarn Management'],
        meme_reference: 'Like herding cats meme'
      },
      {
        role: 'Chief Snack Officer',
        confidence: Math.min(100, Math.floor(90 + Math.random() * 10)),
        description: 'Your extensive research in snack foods qualifies you for this prestigious position. Must be able to identify optimal chip-to-dip ratios.',
        skills_to_improve: ['Microwave Timing', 'Pizza Slice Geometry', 'Avoiding Crumbs'],
        meme_reference: 'Distracted boyfriend looking at snack meme'
      },
      {
        role: 'Digital Overlord',
        confidence: Math.min(100, Math.floor(70 + Math.random() * 30)),
        description: 'Rule the internet with an iron fist (but mostly just delete spam comments). Your LinkedIn says "strategic visionary" but we know the truth.',
        skills_to_improve: ['Evil Laugh', 'Minion Recruitment', 'World Domination for Beginners'],
        meme_reference: 'One Does Not Simply meme'
      },
      {
        role: 'Professional Napper',
        confidence: Math.min(100, Math.floor(95 + Math.random() * 5)),
        description: 'Your ability to fall asleep anywhere is legendary. Turn your napping skills into a career testing mattresses, hammocks, and office chairs.',
        skills_to_improve: ['Pillow Fluffing', 'Snore Volume Control', 'Sleeping Through Alarms'],
        meme_reference: 'Sleeping cat at work meme'
      },
      {
        role: 'Emoji Translator',
        confidence: Math.min(100, Math.floor(60 + Math.random() * 40)),
        description: 'Help Boomers understand what "😂👉👌💯" means in professional settings. Warning: May cause permanent facepalming.',
        skills_to_improve: ['Eye Rolling', 'Sarcasm Detection', 'Explaining Memes to Parents'],
        meme_reference: 'Boomer vs. Zoomer meme'
      }
    ];

    // Add some industry-specific humor
    if (formData.industry === 'Technology') {
      funnyRoles.push({
        role: 'Blockchain Whisperer',
        confidence: 42,
        description: 'No one knows what you do, but you get paid in crypto and mysterious head nods from executives.',
        skills_to_improve: ['Buzzword Generation', 'Whiteboard Scribbling', 'Pretending to Understand NFTs'],
        meme_reference: 'Dogecoin meme'
      });
    }

    if (formData.experienceYears > 10) {
      funnyRoles.push({
        role: 'Office Gandalf',
        confidence: 99,
        description: '"You shall not pass... this deadline!" Use your ancient wisdom to terrify interns and confuse new software.',
        skills_to_improve: ['Grey Beard Maintenance', 'Staff Turning', 'Disappearing When Needed'],
        meme_reference: 'Gandalf "I have no memory of this place" meme'
      });
    }

    // Select 2-3 random funny roles
    const selectedRoles = [];
    const numRoles = Math.floor(2 + Math.random() * 2); // 2 or 3 roles
    
    while (selectedRoles.length < numRoles) {
      const randomIndex = Math.floor(Math.random() * funnyRoles.length);
      const role = funnyRoles[randomIndex];
      if (!selectedRoles.some(r => r.role === role.role)) {
        selectedRoles.push(role);
      }
    }

    return {
      recommended_roles: selectedRoles,
      disclaimer: "Disclaimer: These predictions are 100% accurate (according to our magic 8-ball). Results may vary based on caffeine intake."
    };
  };

  const validateForm = () => {
    if (!formData.educationLevel) {
      setError('Please select your education level (or make one up)');
      return false;
    }
    if (!formData.skills.trim()) {
      setError('Please enter your skills (even if it\'s just "excellent napper")');
      return false;
    }
    if (!formData.experienceYears || isNaN(formData.experienceYears)) {
      setError('Please enter valid years of experience (we won\'t check your resume)');
      return false;
    }
    if (!formData.currentRole.trim()) {
      setError('Please enter your current role ("Professional Netflix Binger" is acceptable)');
      return false;
    }
    if (!formData.interests.trim()) {
      setError('Please enter your interests (we know it\'s just memes)');
      return false;
    }
    if (!formData.industry) {
      setError('Please select your industry (or the one you Google during Zoom calls)');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    
    // Simulate "serious" algorithm processing
    setTimeout(() => {
      const funnyPrediction = generateFunnyPrediction();
      setPrediction(funnyPrediction);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="career-prediction-container">
      <h2>✨ Absolutely Scientific Career Predictor ✨</h2>
      <p>Get 100% accurate career advice (results may contain traces of sarcasm)</p>
      
      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-group">
          <label>Education Level:</label>
          <select 
            name="educationLevel" 
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <option value="">Where did you pretend to pay attention?</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Key Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., Advanced Googling, Microwave Timing, Ctrl+C/Ctrl+V"
          />
        </div>

        <div className="form-group">
          <label>Years of Experience:</label>
          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
            min="0"
            max="99"
            placeholder="How long have you been faking it?"
          />
        </div>

        <div className="form-group">
          <label>Current Role:</label>
          <input
            type="text"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleChange}
            placeholder="What's on your LinkedIn?"
          />
        </div>

        <div className="form-group">
          <label>Interests:</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Be honest: memes and snacks?"
          />
        </div>

        <div className="form-group">
          <label>Industry:</label>
          <select 
            name="industry" 
            value={formData.industry}
            onChange={handleChange}
          >
            <option value="">What field do you zone out during meetings about?</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Consulting the career gods...' : 'Predict My Future (Please)'}
        </button>
      </form>

      {error && <div className="error-message">⚠️ {error}</div>}

      {prediction && (
        <div className="prediction-results">
          <h3>🚀 Your Future Careers (According to Our Magic 8-Ball):</h3>
          <ul>
            {prediction.recommended_roles.map((role, index) => (
              <li key={index}>
                <strong>{role.role}</strong> - {role.confidence}% match<br />
                <em>{role.description}</em>
                {role.skills_to_improve && (
                  <div className="skills-improvement">
                    <h4>Skills to "Improve":</h4>
                    <ul>
                      {role.skills_to_improve.map((skill, i) => (
                        <li key={i}>✔️ {skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="meme-reference">
                  <small>Relevant meme: {role.meme_reference}</small>
                </div>
              </li>
            ))}
          </ul>
          <div className="disclaimer">
            {prediction.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPrediction;