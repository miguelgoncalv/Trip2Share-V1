import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import TripPlanner from './TripPlanner';
import TripFeed from './TripFeed';
import PlacesRecommended from './PlacesRecommended'; // Make sure this component is created
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState(null);

    const redirectToUserProfile = () => {
        navigate('/userprofile'); // Adjust this path as needed
    };
    
    useEffect(() => {
        if (currentUser) {
            const fetchUserProfile = async () => {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };
            fetchUserProfile();
        }
    }, [currentUser]);

    return (
        <div className="home-page">
            {/* User Profile Section */}
            <div className='user-container'>
                {userProfile && (
                    <div>
                        <img src={userProfile.photoURL} alt="Profile" className="profile-image" />
                        <h2>{userProfile.displayName}</h2>
                        <p>Sex: {userProfile.sex}</p>
                        <p>Pronouns: {userProfile.pronouns}</p>
                        <p>Age: {userProfile.age}</p>
                        <p>Languages: {userProfile.languages}</p>
                        <p>Nationality: {userProfile.nationality}</p>
                        <button onClick={redirectToUserProfile}>
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Trip Planning and Feed Section */}
            <div className="trip-section">
                <TripPlanner />
                <TripFeed />
            </div>

            {/* Places Recommended Section */}
            <div className="places-recommended">
                <PlacesRecommended />
            </div>
        </div>
    );
}

export default HomePage;
