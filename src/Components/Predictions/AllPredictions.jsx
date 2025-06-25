import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllPredictions.css';

const AllPredictions = () => {
  const [activeTab, setActiveTab] = useState('tarot');
  const [userQuestion, setUserQuestion] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const navigate = useNavigate();

  const dummyPredictions = {
    tarot: [
      "The cards reveal an unexpected opportunity—embrace the unknown.",
      "A twist in your path will lead to personal growth. Be brave.",
      "The energy of transformation surrounds you—release the past."
    ],
    numerology: [
      "Your number shows you are entering a time of clarity and purpose.",
      "Balance is the key. Align your decisions with your inner voice.",
      "A new cycle is beginning—trust the flow of life."
    ],
    astrology: [
      "The stars favor reflection—meditate on your next move.",
      "Planetary shifts bring fresh insights. Stay open.",
      "A cosmic doorway opens—step through it with intention."
    ],
    love: [
      "A familiar face may hold the key to your heart.",
      "Your heart is attracting kindred energy—love is near.",
      "Be vulnerable; love often blooms when least expected."
    ],
    career: [
      "Professional change is on the horizon. Stay confident.",
      "Collaboration leads to success. Trust your allies.",
      "A bold step will bring career growth. Don’t hesitate."
    ]
  };

  const calculateZodiac = (dateString) => {
    const date = new Date(dateString);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  useEffect(() => {
    if (birthDate) {
      setZodiacSign(calculateZodiac(birthDate));
    } else {
      setZodiacSign('');
    }
  }, [birthDate]);

  // Updated generatePrediction with real backend call
  const generatePrediction = async (type) => {
    if (!userQuestion.trim()) {
      alert("Please enter a question first!");
      return;
    }

    // If astrology type requires birthDate
    if (type === 'astrology' && (!birthDate || birthDate.trim() === '')) {
      alert("Please enter your birth date for Astrology predictions.");
      return;
    }

    setIsLoading(true);
    setPrediction(null);

    try {
      // Build payload to send to backend
      const payload = {
        type,
        question: userQuestion.trim()
      };

      if (birthDate) {
        payload.birthDate = birthDate.trim();
      }

      if (zodiacSign) {
        payload.zodiacSign = zodiacSign;
      }

      const response = await fetch('http://localhost:3000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Try to get detailed error from response
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData?.error) errorMessage = `Server error: ${errorData.error}`;
        } catch {}

        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.prediction) {
        setPrediction(data.prediction);
      } else {
        // fallback to dummy prediction if no prediction received
        const options = dummyPredictions[type] || [];
        const result = options[Math.floor(Math.random() * options.length)];
        setPrediction(result);
      }
    } catch (error) {
      // On error, fallback to dummy prediction + error message appended
      const options = dummyPredictions[type] || [];
      const fallback = options[Math.floor(Math.random() * options.length)];
      setPrediction(`${fallback}\n\n(Error: ${error.message})`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="predictions-container">
      <div className="row">
        <div className="col-md-3">
          <div className="prediction-sidebar card mystic-glass p-3">
            <h3 className="text-center mb-4">
              <i className="fas fa-crystal-ball me-2"></i>
              Oracle Tools
            </h3>

            <div className="nav flex-column nav-pills">
              {['tarot', 'numerology', 'astrology', 'love', 'career'].map((tab) => (
                <button
                  key={tab}
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setPrediction(null);
                    setUserQuestion('');
                    setBirthDate('');
                  }}
                >
                  <i className={`fas ${
                    tab === 'tarot' ? 'fa-chess-knight' :
                    tab === 'numerology' ? 'fa-calculator' :
                    tab === 'astrology' ? 'fa-star' :
                    tab === 'love' ? 'fa-heart' :
                    'fa-briefcase'
                  } me-2`}></i>
                  {{
                    tarot: 'Tarot',
                    numerology: 'Numerology',
                    astrology: 'Astrology',
                    love: 'Love Oracle',
                    career: 'Career Forecast'
                  }[tab]}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <button 
                className="btn btn-mystic w-100"
                onClick={() => navigate('/tarot-reading')}
              >
                <i className="fas fa-arrow-right me-2"></i>
                Detailed Tarot Reading
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="prediction-main card mystic-glass p-4">
            <h2 className="text-center mb-4 mystic-text">
              <i className={`fas ${
                activeTab === 'tarot' ? 'fa-chess-knight' :
                activeTab === 'numerology' ? 'fa-calculator' :
                activeTab === 'astrology' ? 'fa-star' :
                activeTab === 'love' ? 'fa-heart' :
                'fa-briefcase'
              } me-2`}></i>
              {{
                tarot: 'Tarot Wisdom',
                numerology: 'Numerology Secrets',
                astrology: 'Astrology Guidance',
                love: 'Love Oracle',
                career: 'Career Forecast'
              }[activeTab]}
            </h2>

            {activeTab === 'astrology' && (
              <div className="mb-4">
                <label className="form-label mystic-text">Enter Your Birth Date:</label>
                <input
                  type="date"
                  className="form-control mystic-input"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                {zodiacSign && (
                  <div className="mt-2 mystic-text">
                    <i className="fas fa-star me-2"></i>
                    Your zodiac: <strong>{zodiacSign}</strong>
                  </div>
                )}
              </div>
            )}

            <div className="mb-4">
              <label className="form-label mystic-text">
                {{
                  tarot: 'Ask the cards a question:',
                  numerology: 'What do you seek in numbers?',
                  astrology: 'What guidance do you seek from the stars?',
                  love: 'Ask about your romantic future:',
                  career: 'Ask about your professional path:'
                }[activeTab]}
              </label>
              <textarea
                className="form-control mystic-input"
                rows="3"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Type your question here..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                className="btn btn-mystic-lg"
                onClick={() => generatePrediction(activeTab)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Consulting the Universe...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic me-2"></i>
                    Reveal My {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Prediction
                  </>
                )}
              </button>
            </div>

            {prediction && (
              <div className="prediction-result mt-4">
                <div className="card mystic-glass-inner p-4">
                  <h4 className="text-center mystic-text">
                    <i className="fas fa-scroll me-2"></i>
                    The Universe Speaks:
                  </h4>
                  <p className="mystic-prediction" style={{ whiteSpace: 'pre-wrap' }}>{prediction}</p>
                  <div className="text-center mt-3">
                    <button 
                      className="btn btn-mystic-sm"
                      onClick={() => generatePrediction(activeTab)}
                      disabled={isLoading}
                    >
                      <i className="fas fa-redo me-2"></i>
                      Ask Again
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPredictions;
