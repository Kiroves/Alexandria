import fb from "../config/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc } from "firebase/firestore";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";

const CHAT_ROUTE = "/chat"

export default function Library() {
    const db = getFirestore(fb);
    const router = useRouter();
    
    const [ library, setLibrary ] = useState([]);

    useEffect(() => {
	const fetchDocument = async () => {
	    try {
		const userInfoRef = doc(db, "alexandria-user-test", "penelope-id");
		const userInfoSnap = await getDoc(userInfoRef);

		if (userInfoSnap.exists()) {
		    setLibrary(userInfoSnap.data());
		    console.log(userInfoSnap.data());
		}
	    } catch (err) {
		console.error("There is an error with this request: " + err);
	    }
	}

	fetchDocument();
    }, []);
   

    // const userInfoSnap = await getDoc(userInfoRef);
    
    const myBooks = [
	{ name : "b1", id : '3' },
	{ name : "b2", id : "1" },
	{ name : "b3", id : "2" },
    ];
    
    return (
	<div>
	    <h1>
		This is my library of things
	    </h1>
	    
	    {myBooks.map((book) => {
		return (
		    <div key={book.id}>
			<button
			    type="button"
			    onClick={() => router.push({
				    pathname: `${CHAT_ROUTE}/${book.id}`,
				    query: { chatId : book.id },
				})
			    }>
			    {book.name}
			</button>
		    </div>
		);
	    })}
	</div>

    );
}
