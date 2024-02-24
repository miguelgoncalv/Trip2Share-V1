import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import getAuth to access authentication
import { db } from '../firebase-config'; 
import './TripPlanner.css'; 

function TripPlanner() {
    const [trip, setTrip] = useState({
        name: '', 
        destination: '',
        date: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(); // Initialize Firebase Auth
        const user = auth.currentUser; // Get the currently signed-in user

        if (user) {
            try {
                // Add the userId to the trip object before saving
                await addDoc(collection(db, "trips"), {
                    ...trip,
                    userId: user.uid, // Add the current user's UID to the trip document
                });
                alert("You have a new trip planned!");
                setTrip({ name: '', destination: '', date: '', description: '' });
            } catch (error) {
                console.error("Error adding trip: ", error);
                alert("Error planning trip.");
            }
        } else {
            // If no user is signed in, handle accordingly
            alert("You must be signed in to share a trip.");
        }
    };

    
    return (
        <div className="container">
            <div className='trip-planner'>
                <h2>Ready to share your next Trip?</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={trip.name}
                        onChange={(e) => setTrip({ ...trip, name: e.target.value })}
                        placeholder="Call me by"
                        required
                    />
                    <input
                        type="text"
                        value={trip.destination}
                        onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
                        placeholder="Destination"
                        required
                    />
                    <input
                        type="date"
                        value={trip.date}
                        onChange={(e) => setTrip({ ...trip, date: e.target.value })}
                        required
                    />
                    <textarea
                        value={trip.description}
                        onChange={(e) => setTrip({ ...trip, description: e.target.value })}
                        placeholder="What's the plan?"
                        required
                    />
                    <button type="submit">Share Trip</button>
                </form>
            </div>
        </div>
    );
}

export default TripPlanner;
