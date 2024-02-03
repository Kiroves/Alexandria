import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Navbar from "@/components/Auth";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const LIB_ROUTE = "/library"

export default function Home() {

    const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    let cookieToken = window.localStorage.getItem("token");
    if (cookieToken) {
      setToken(cookieToken);
    }

    let cookieEmail = window.localStorage.getItem("email");
    console.log(cookieEmail);
    if (cookieEmail) {
      setEmail(cookieEmail);
    }
  }, []);
    return (
	<div>
	    <h1>Hello World</h1>
	    <button type="button"
		    onClick={() => router.push(LIB_ROUTE)}>
		My Library
	    </button>
	</div>
    );	
}
