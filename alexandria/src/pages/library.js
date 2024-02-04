import app from "../util/firebase.js"
import { useRouter } from "next/router";

import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { useState, useEffect } from "react";

const CHAT_ROUTE = "/chat"

export default function Library() {
    const [ name, setName ] = useState("");
    const [ library, setLibrary ] = useState([]);

    const db = getFirestore(app);
    const router = useRouter();

    useEffect(() => {
	const fetchDocument = async () => {
	    try {
		const userInfoRef = doc(db, "alexandria-user-test", "penelope-id");
		const userInfoSnap = await getDoc(userInfoRef);

		if (userInfoSnap.exists()) {
		    setName(userInfoSnap.data().name);
		    setLibrary(userInfoSnap.data().library);
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
	    <h1>Hello, {name}</h1>
	    {library.map((document) => {
		return (
		    <div key={document.bookId}>
			<button
			    type="button"
			    onClick={() => router.push({
				pathname: `${CHAT_ROUTE}/${document.bookId}`,
				query: { chatId : document.bookId },
			    })
				    }>
			    {document.bookName}
			</button>
		    </div>
		);
	    })}
	</div>

    );
}
