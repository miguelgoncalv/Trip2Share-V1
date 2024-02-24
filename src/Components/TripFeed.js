import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase-config';
import './TripFeed.css';

function TripFeed() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const getTrips = async () => {
            const querySnapshot = await getDocs(collection(db, "trips"));
            const storage = getStorage();
            const tripsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
                const trip = doc.data();
                const tripWithPhoto = { ...trip, id: doc.id };

                // Check if the userId exists in the trip data
                if (trip.userId) {
                    try {
                        const photoRef = ref(storage, `profiles/${trip.userId}/profilePic`);
                        tripWithPhoto.userPhotoURL = await getDownloadURL(photoRef);
                    } catch (error) {
                        console.error("Error fetching user photo URL", error);
                        // Fallback image if there's an error or if the profile picture doesn't exist
                        tripWithPhoto.userPhotoURL = './Images/user.png';
                    }
                } else {
                    // Fallback image if the userId is not found in the trip data
                    console.log(`Missing userId for trip with ID: ${doc.id}`);
                    tripWithPhoto.userPhotoURL = './Images/user.png';
                }
                return tripWithPhoto;
            }));

            setTrips(tripsData);
        };

        getTrips();
    }, []);

    return (
        <div className="trip-feed-container">
            <h2 className="trip-feed-title">Join Adventures</h2>
            {trips.map((trip) => (
                <div key={trip.id} className="trip-entry">
                    <div className="trip-header">
                        <img src={trip.userPhotoURL || './Images/user.png'} alt={trip.name} className="trip-user-photo"/>
                        <p className="trip-name">{trip.name}</p>
                    </div>
                    <div className="trip-body">
                        <h3 className="trip-destination">{trip.destination}</h3>
                        <p className="trip-description">{trip.description}</p>
                        <p className="trip-date">{trip.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
    
}

export default TripFeed;
