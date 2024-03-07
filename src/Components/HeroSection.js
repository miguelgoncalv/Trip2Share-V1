import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh', 
    color: 'white',
    textAlign: 'center',
    backgroundImage: "url('/Images/TravelBanner.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

const headingStyle = {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '6rem',
    fontWeight: 'extrabold',
    textTransform: 'uppercase',
    marginBottom: '4rem', 
};

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '50px',
    cursor: 'pointer',
  };
  

  return (
    <div style={heroStyle}>
        <h1 style={headingStyle}>Explore </h1>
      <div>
        <button style={buttonStyle} onClick={() => navigate('/SignUp')}>Sign Up</button>
        <button style={buttonStyle} onClick={() => navigate('/Login')}>Find an Adventure</button>
      </div>
    </div>
  );
}

export default HeroSection;
