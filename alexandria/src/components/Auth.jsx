import React from 'react'
import dotenv from 'dotenv'
import { createClient } from "@supabase/supabase-js";
dotenv.config();
//console.log(process.env.SUPABASE_KEY);

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
const Auth = ({ setToken, setUser, setEmail, token }) => {
    const handleGoogle = async (e) => {
        try {
            async function handleSignInWithGoogle(response) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                })
            }
            console.log(data);
            //const result = await signInWithPopup(auth, provider);
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = response.credential;
            //window.localStorage.setItem("token", token);
            //window.localStorage.setItem("email", result.user.email);
            //setToken(token);
            //setUser(result.user.displayName);
            //setEmail(result.user.email);
        } catch (error) { }
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
          <button onClick={handleGoogle}>
              Click me
          </button>
    </div>
  )
}

export default Auth
