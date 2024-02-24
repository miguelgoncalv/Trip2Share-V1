import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../firebase-config';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation

function ProfileSetup() {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    age: '',
    sex: '',
    pronouns: '', // Correct the spelling here
    languages: '',
    nationality: '',
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("No user is signed in.");
      setLoading(false);
      return;
    }

    try {
      let imageURL = '';
      if (imageUpload) {
        const imageRef = ref(storage, `profiles/${user.uid}/profilePic`);
        const uploadResult = await uploadBytes(imageRef, imageUpload);
        imageURL = await getDownloadURL(uploadResult.ref);
      }

      await setDoc(doc(db, "users", user.uid), {
        ...userInfo,
        photoURL: imageURL,
      }, { merge: true });

      alert("Profile updated successfully!");
      navigate('/homepage'); // Use navigate function to redirect
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          value={userInfo.displayName}
          onChange={handleChange}
          placeholder="Display Name"
          required
        />
        {/* Replace textareas with input for single-line text fields */}
        <input
          type="text"
          name="age"
          value={userInfo.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="sex"
          value={userInfo.sex}
          onChange={handleChange}
          placeholder="Sex"
        />
        <input
          type="text"
          name="pronouns"
          value={userInfo.pronouns}
          onChange={handleChange}
          placeholder="Pronouns"
        />
        <input
          type="text"
          name="languages"
          value={userInfo.languages}
          onChange={handleChange}
          placeholder="Languages"
        />
        <input     
          type="text"
          name="nationality"
          value={userInfo.nationality}
          onChange={handleChange}
          placeholder="Nationality"
        />
      <input
       type="file"
       onChange={handleImageChange}
       />
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Complete Profile'}
        </button>
      </form>
</div>
);
}

export default ProfileSetup;