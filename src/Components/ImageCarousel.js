import React, { useState, useEffect } from 'react';
import './ImageCarousel.css'; 

const images = [
  '/Images/Banner1.png',
  '/Images/Banner2.png',
  '/Images/Banner3.png',
  '/Images/Banner4.png',
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <img src={images[currentIndex]} alt="Rotative Banner" className="image-fade" style={{   alignItems: 'center',
    justifyContent: 'center', width: '100%', height: 'auto' }} />
    </div>
  );
}

export default ImageCarousel;
