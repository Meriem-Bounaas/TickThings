import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth-context";

const auth = getAuth()
export const AuthProvider = ({ children }) => {
  const navigate= useNavigate()
 const [user, setUser] = useState(null);
 useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setUser(user)
      if (user )
        navigate("/dashboard");
   })
 }, []);

 return (
 <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
 );
 };