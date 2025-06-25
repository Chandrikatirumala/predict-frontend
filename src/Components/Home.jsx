// src/Components/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <video autoPlay muted loop playsInline style={styles.videoBackground}>
        <source src="/videos/tarot.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.darkOverlay}></div>

      <div style={styles.overlay}>
        <h1 style={styles.heading}>
          <Typewriter
            words={["Welcome to Your Future", "Reveal What Awaits", "Unlock the Mysteries"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <p style={styles.subText}>Reveal your destiny with a single tap</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/predict")}
          style={styles.toggleButton}
        >
          🔮
        </motion.button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "serif",
  },
  videoBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    objectFit: "cover",
    zIndex: 0,
  },
  darkOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  overlay: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "0 1rem",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
    textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
    minHeight: "4rem",
  },
  subText: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
  },
  toggleButton: {
    fontSize: "1.2rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#6a0dad",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  },
};

export default Home;
