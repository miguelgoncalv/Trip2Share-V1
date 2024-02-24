// src/components/PlacesRecommended.js
import React from 'react';
import './PlacesRecommended.css'; 

function PlacesRecommended() {
  // Placeholder data or fetch the places from an API or database
  const places = [
    { 
      name: 'Capri Island, Italy 🇮🇹', 
      description: 'A picturesque island with rugged landscapes, azure waters, and historic charm.',
      imagePath: '/Images/capri.png' // Update the path as needed
    },
    { 
      name: 'Mount Fuji, Japan 🇯🇵', 
      description: 'Land of contrasts, blending ancient traditions with cutting-edge modernity.',
      imagePath: '/Images/japan.png' // Update the path as needed
    },
    { 
      name: 'São Paulo, Brazil 🇧🇷', 
      description: 'Brazil s bustling metropolis, rich in culture and diversity.',
      imagePath: '/Images/sao.png' // Update the path as needed
    },
    // ...more places
  ];

  return (
    <div className="places-recommended">
      <h2>Places Recommended</h2>
      {places.map((place, index) => (
        <div key={index} className="place">
          <img src={place.imagePath} alt={place.name} className="place-image" />
          <h3>{place.name}</h3>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PlacesRecommended;
