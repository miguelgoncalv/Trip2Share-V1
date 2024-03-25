import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ChatList() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth(); // Assuming you have a hook to get the current user
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    // Reference to the chats collection
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("userIds", "array-contains", currentUser.uid));

    // Real-time listener for chats
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChats(chatsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentUser]);

  const goToChat = (chatId) => {
    navigate(`/chat/${chatId}`); // Navigate to the ChatRoom component for this chat
  };

  return (
    <div>
      <h2>Your Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => goToChat(chat.id)}>
            Chat with {chat.userIds.filter(id => id !== currentUser.uid).join(", ")} {/* Display other participant(s) */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
