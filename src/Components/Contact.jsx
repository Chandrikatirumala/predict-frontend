import React, { useState } from "react";
import './Contact.css';
import { FaMagic } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    question: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Thank you! We'll reach out with your prediction soon. 🔮");
        setFormData({ name: '', birthDate: '', email: '', question: '' });
      } else {
        alert(`❌ Failed to send message: ${data.error}`);
      }
    } catch (error) {
      alert('❌ Error sending message. Please try again later.');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1 className="contact-hero-title">🔮 Contact for Future Prediction</h1>
        <p className="contact-hero-description">
          Have a question for the cosmos? Fill in the details and our seers will get back to you!
        </p>
      </section>

      <section className="contact-main-section">
        <div className="contact-main-container">
          <div className="contact-form-card">
            <h2 className="contact-form-title">Get in Touch</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  className="form-input"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Question</label>
                <textarea
                  name="question"
                  rows="4"
                  className="form-textarea"
                  placeholder="What would you like to know about your future?"
                  value={formData.question}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit-button" disabled={loading}>
                <FaMagic /> {loading ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
