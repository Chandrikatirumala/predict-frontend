import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import FlippableCard from './FlippableCard';
import './TarotReading.css';
import foolImage from '../assets/images/fool.jpg';
import magicianImage from '../assets/images/magician.jpg';
import highPriestessImage from '../assets/images/highPriestess.jpg';
import empressImage from '../assets/images/empress.jpg';
import theEmperorImage from '../assets/images/the-emperor.png';
import loversImage from '../assets/images/lovers.jpg';
import starImage from '../assets/images/star.jpg';
import worldImage from '../assets/images/world.jpg';

const tarotImages = {
  'The Fool': foolImage,
  'The Magician': magicianImage,
  'The High Priestess': highPriestessImage,
  'The Empress': empressImage,
  'The Emperor': theEmperorImage,
  'The Lovers': loversImage,
  'The Star': starImage,
  'The World': worldImage
};

const tarotCards = Object.keys(tarotImages);

function getRandomCards() {
  const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function LoadingCard({ label }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardLabel}>{label}</h3>
      <div className="shimmer shimmer-title" />
      <div className="shimmer shimmer-text" />
    </div>
  );
}

export default function TarotReading() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const drawCards = async () => {
    setLoading(true);
    setShowReading(true);
    setShowConfetti(false);
    setFlipped(false);

    const drawn = getRandomCards();
    setCards(drawn.map(name => ({ name, meaning: null })));

    // Fetch AI-generated meanings from backend
    const predictions = await Promise.all(
      drawn.map(async (name) => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: `Give a tarot interpretation for ${name}` })
          });
          const data = await res.json();
          return { name, meaning: data.prediction || 'Mystical silence... try again!' };
        } catch {
          return { name, meaning: 'Could not fetch meaning.' };
        }
      })
    );

    setCards(predictions);
    setLoading(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const toggleFlip = () => setFlipped(prev => !prev);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h1>🔮 Predict My Future: Tarot Card Reading</h1>
      <p>Focus on your question, then click “Draw Cards” to reveal your destiny!</p>

      <button onClick={drawCards} style={styles.drawButton}>
        Draw Cards
      </button>

      {showReading && (
        <>
          <div style={styles.cardContainer}>
            {["Past", "Present", "Future"].map((label, idx) => {
              const card = cards[idx];
              return loading || !card?.meaning ? (
                <LoadingCard key={label} label={label} />
              ) : (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FlippableCard
                    label={label}
                    name={card.name}
                    meaning={card.meaning}
                    image={tarotImages[card.name]}
                    flipped={flipped}
                    onClick={toggleFlip}
                  />
                </motion.div>
              );
            })}
          </div>

          <button onClick={() => setShowReading(false)} style={styles.tryAgainButton}>
            Try Again
          </button>
        </>
      )}

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
}

const styles = {
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
    flexWrap: 'wrap',
  },
  card: {
    width: 220,
    height: 320,
    borderRadius: 16,
    backgroundColor: '#6d28d9',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  cardLabel: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  drawButton: {
    backgroundColor: '#6b21a8',
    color: 'white',
    padding: '12px 24px',
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginBottom: 20
  },
  tryAgainButton: {
    marginTop: 20,
    backgroundColor: '#d946ef',
    color: 'white',
    padding: '10px 20px',
    borderRadius: 12,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 10
  }
};
