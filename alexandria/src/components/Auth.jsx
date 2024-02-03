import React from 'react'
import dotenv from 'dotenv'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/util/firebase";
dotenv.config();

const Auth = ({ setToken, setUser, setEmail, token }) => {
    const handleGoogle = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("email", result.user.email);
            setToken(token);
            setUser(result.user.displayName);
            setEmail(result.user.email);
        } catch (error) { 
            console.log("error")
        }
    };
    const handleSignOut = async () => {
        try {
            // Call the provided callback from props
            setToken(null);
            window.localStorage.removeItem("token");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };
  return (
    <div>
          {token ? (
              <button onClick={handleSignOut} variant="ghost" className="">
                  Sign Out
              </button>
          ) : (
              <button onClick={handleGoogle} variant="ghost" className="">
                  Sign in with Google
              </button>
          )}
    </div>
  )
}

export default Auth
