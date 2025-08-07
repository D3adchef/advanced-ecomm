import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as { name: string; email: string });
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async () => {
    if (auth.currentUser) {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, {
        name: userData.name,
        email: userData.email,
      });
      alert('Profile updated!');
    }
  };

  const handleDelete = async () => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      try {
        await deleteDoc(doc(db, 'users', uid));        // Delete Firestore doc
        await deleteUser(auth.currentUser);            // Delete auth user
        alert('Your account has been deleted.');
        navigate('/signup');
      } catch (error: any) {
        alert('Error deleting account: ' + error.message);
      }
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="auth-form">
      <h2>Edit Profile</h2>
      <input
        type="text"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        placeholder="Email"
      />
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleDelete} style={{ background: 'red', color: 'white', marginTop: '1rem' }}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
