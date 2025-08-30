import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../Firebase/FirebaseInit";
 
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Sign Im
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Sign Out
  const logOut = () => {
    return signOut(auth);
  };

  //   Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   Update User
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //   Google SignIn
  const googleProvider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };


const resetPassword= (email) => {
  setLoading(true);
  return sendPasswordResetEmail(auth, email)
    .finally(() => setLoading(false));
};


  const authData = {
    createUser,
    signIn,
    logOut,
    user,
    setUser,
    loading,
    setLoading,
    updateUser,
    SignInWithGoogle,
    resetPassword
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
