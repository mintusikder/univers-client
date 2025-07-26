import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import useAxiosSecure from "../hook/useAxiosSecure";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  // Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // Update user profile
  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  // Google Sign In
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Reset password
  const resetUser = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // ✅ Check premium expiration here
      if (currentUser?.email) {
        try {
          const res = await axiosSecure.get(
            `/users/premium-status/${currentUser.email}`
          );
          const expiry = res.data.premiumTaken;

          if (expiry && new Date() > new Date(expiry)) {
            await axiosSecure.patch(`/users/${currentUser.email}`, {
              premiumTaken: null,
            });
          }
        } catch (err) {
          console.error("⛔ Premium check failed:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    resetUser,
    loading,
    logOutUser,
    createUser,
    loginUser,
    googleLogin,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
