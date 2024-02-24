import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        submittedAt: new Date() 
      });
      console.log("Message received,Thank you for contacting us!");
      setIsSubmitted(true); 
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false); 
  };

  return (
    <div className="container-contact">
    <div className="contact-form">
      <h1>Contact Us</h1>
      {isSubmitted ? (
        <div>
          <div className="success-message">Your message has been sent successfully!</div>
          <button onClick={resetForm}>Send another message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
    </div>
  );
}

export default Contact;
