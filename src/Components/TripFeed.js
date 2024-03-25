import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, doc as firestoreDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase-config';
import { useAuth } from '../Contexts/AuthContext';
import './TripFeed.css';
import { useNavigate } from 'react-router-dom';

function TripFeed() {
    const [trips, setTrips] = useState([]);
    const [comments, setComments] = useState({});
    const [newCommentText, setNewCommentText] = useState({});
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Moved outside useEffect as it doesn't depend on the lifecycle hook
    const findOrCreateChat = async (currentUserId, otherUserId) => {
        const chatsRef = collection(db, "chats");
        const q = query(chatsRef, where("userIds", "array-contains", currentUserId));

        const querySnapshot = await getDocs(q);
        let chatDoc = querySnapshot.docs.find(doc => doc.data().userIds.includes(otherUserId));

        if (chatDoc) {
            return chatDoc.id; // Existing chat found
        } else {
            // Create a new chat
            const chatData = {
                userIds: [currentUserId, otherUserId],
                createdAt: serverTimestamp(),
            };
            const docRef = await addDoc(collection(db, "chats"), chatData);
            return docRef.id; // Return the new chat ID
        }
    };

    const handlePrivateMessage = async (tripUserId) => {
        if (!currentUser) {
            console.log("User not logged in");
            return;
        }

        let chatId = await findOrCreateChat(currentUser.uid, tripUserId);
        navigate(`/chatroom/${chatId}`);
    };

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

            for (let trip of tripsWithPhotos) {
                const commentsSnapshot = await getDocs(query(collection(db, "comments"), where("tripId", "==", trip.id)));
                const commentsWithUserDetails = await Promise.all(commentsSnapshot.docs.map(async (doc) => {
                    const comment = doc.data();
                    let userPhotoURL = './Images/user.png';
                    let userName = 'Anonymous';
                    if (comment.userId) {
                        try {
                            const userDocRef = firestoreDoc(db, "users", comment.userId);
                            const userDocSnap = await getDoc(userDocRef);
                            if (userDocSnap.exists()) {
                                userName = userDocSnap.data().displayName || 'Anonymous';
                                const userPhotoRef = ref(storage, `profiles/${comment.userId}/profilePic`);
                                userPhotoURL = await getDownloadURL(userPhotoRef);
                            }
                        } catch (error) {
                            console.error("Error fetching user details", error);
                        }
                    }
                    return { ...comment, userPhotoURL, userName, id: doc.id };
                }));

                setComments(prevComments => ({ ...prevComments, [trip.id]: commentsWithUserDetails }));
            }
        };

        getTripsAndComments();
    }, [currentUser]);

    const handleNewCommentChange = (tripId, text) => {
        setNewCommentText({ ...newCommentText, [tripId]: text });
    };

    const handleAddComment = async (tripId) => {
        if (!newCommentText[tripId] || !currentUser) return;

        const newComment = {
            tripId,
            text: newCommentText[tripId],
            userId: currentUser.uid,
            createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, "comments"), newComment);
        setNewCommentText(prev => ({ ...prev, [tripId]: '' }));

        // Optimally, here you'd update just the new comment rather than refetching all comments for efficiency.
        // This example is simplified and may not be the most efficient for a real application.
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
                                    <img src={comment.userPhotoURL} alt="User" className="comment-user-photo"/> {/* Display user photo */}
                                    <p><strong>{comment.userName}:</strong> {comment.text}</p>
                                </div>
                            ))}
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newCommentText[trip.id] || ''}
                                onChange={(e) => handleNewCommentChange(trip.id, e.target.value)}
                            />
                            <button onClick={() => handleAddComment(trip.id)}>Comment</button>
                            {/* Button for sending private messages */}
                            <button onClick={() => handlePrivateMessage(trip.userId)} style={{marginLeft: "10px"}}>Send Private Message</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TripFeed;

