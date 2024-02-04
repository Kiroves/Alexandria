import React from 'react'
import dotenv from 'dotenv'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/util/firebase";
import { useRouter } from 'next/router';
dotenv.config();
export const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("email", result.user.email);
        router.push("/library");
    } catch (error) {
        console.log("error", error);
    }
};
const Auth = ({ }) => {
    const router = useRouter();

    const handleGoogleClick = async (e) => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("email", result.user.email);
            router.push("/library");
        } catch (error) {
            console.log("error", error);
        }
    };
    const handleSignOut = async () => {
        try {
            // Call the provided callback from props
            window.localStorage.removeItem("token");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };
  return (
    <div>
          <button onClick={handleGoogleClick} variant="ghost" className="w-full px-4 py-2 border border-white rounded-md text-white text-xl font-medium font-['Satoshi']-medium">
            Sign in with Google
        </button>
    </div>
  )
}

export default Auth
