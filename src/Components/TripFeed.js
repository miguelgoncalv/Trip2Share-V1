import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase-config';
import { useAuth } from '../Contexts/AuthContext';
import { serverTimestamp } from 'firebase/firestore';
import './TripFeed.css';

function TripFeed() {
    const [trips, setTrips] = useState([]);
    const [comments, setComments] = useState({});
    const [newCommentText, setNewCommentText] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        const getTripsAndComments = async () => {
            const tripsSnapshot = await getDocs(collection(db, "trips"));
            const storage = getStorage();

            const tripsWithPhotos = await Promise.all(tripsSnapshot.docs.map(async (doc) => {
                const trip = doc.data();
                trip.id = doc.id;
                try {
                    const photoRef = ref(storage, `profiles/${trip.userId}/profilePic`);
                    trip.userPhotoURL = await getDownloadURL(photoRef);
                } catch {
                    trip.userPhotoURL = './Images/user.png';
                }
                return trip;
            }));

            setTrips(tripsWithPhotos);

            // Fetch comments for each trip and include user profile pictures
            for (let trip of tripsWithPhotos) {
                const commentsSnapshot = await getDocs(query(collection(db, "comments"), where("tripId", "==", trip.id)));
                const commentsWithUserPhotos = await Promise.all(commentsSnapshot.docs.map(async (doc) => {
                    const comment = doc.data();
                    try {
                        // Assuming each comment includes a userId field
                        const userPhotoRef = ref(storage, `profiles/${comment.userId}/profilePic`);
                        comment.userPhotoURL = await getDownloadURL(userPhotoRef);
                    } catch {
                        comment.userPhotoURL = './Images/user.png'; // Fallback image
                    }
                    return comment;
                }));
    
                setComments((prevComments) => ({
                    ...prevComments,
                    [trip.id]: commentsWithUserPhotos
                }));
            }
        };
    
        getTripsAndComments();
    }, []);

    const handleNewCommentChange = (tripId, text) => {
        setNewCommentText({ ...newCommentText, [tripId]: text });
    };

    const handleAddComment = async (tripId) => {
        if (!newCommentText[tripId] || !currentUser) return;
    
        const newComment = {
            tripId,
            text: newCommentText[tripId],
            userId: currentUser.uid, // Include the user ID
            createdAt: serverTimestamp() // Use Firebase server timestamp
        };
    
        // Add a new comment to the "comments" collection
        const commentRef = await addDoc(collection(db, "comments"), newComment);
    
        // Clear the comment input field and update comments state
        setNewCommentText(prevText => ({ ...prevText, [tripId]: '' }));
        setComments(prevComments => ({
            ...prevComments,
            [tripId]: [...(prevComments[tripId] || []), { ...newComment, id: commentRef.id }]
        }));
    };
    

    return (
        <div className="trip-feed-container">
            <h2 className="trip-feed-title">Join Adventures</h2>
            {trips.map((trip) => (
                <div key={trip.id} className="trip-entry">
                    <div className="trip-header">
                        <img src={trip.userPhotoURL} alt={trip.name} className="trip-user-photo"/>
                        <p className="trip-name">{trip.name}</p>
                    </div>
                    <div className="trip-body">
                        <h3 className="trip-destination">{trip.destination}</h3>
                        <p className="trip-date">{trip.date}</p>
                        <p className="trip-description">{trip.description}</p>
                        
                        {/* Comments Section */}
                        <div className="comments-section">
                            {comments[trip.id] && comments[trip.id].map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newCommentText[trip.id] || ''}
                                onChange={(e) => handleNewCommentChange(trip.id, e.target.value)}
                            />
                            <button onClick={() => handleAddComment(trip.id)}>Comment</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TripFeed;
