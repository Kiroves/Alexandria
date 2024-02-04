import app from "../util/firebase.js"
import { useRouter } from "next/router";
import axios from 'axios'

import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar.jsx";

const CHAT_ROUTE = "/textbook"

export default function Library() {
    const [ name, setName ] = useState("");
    const [ library, setLibrary ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false);

    // const db = getFirestore(app);
    const router = useRouter();

    const docsData = [
	{ title: 'Document 1' },
	{ title: 'Document 2' },
	{ title: 'Document 3' },
	{ title: 'Document 1' },
	{ title: 'Document 2' },
	{ title: 'Document 3' },
    ];

    useEffect(() => {
	// const fetchDocument = async () => {
	//     try {
	// 	const userInfoRef = doc(db, "alexandria-user-test", "penelope-id");
	// 	const userInfoSnap = await getDoc(userInfoRef);

	// 	if (userInfoSnap.exists()) {
	// 	}
	//     } catch (err) {
	// 	console.error("There is an error with this request: " + err);
	//     }
	// }

	const getTextbooks = async () => {
	    let cookieEmail = window.localStorage.getItem("email");
	    console.log(cookieEmail);
	    try {
		const res = await axios.get("http://127.0.0.1:5000/textbooks/" + cookieEmail);
		setLibrary(res.data.textbooks);
		console.log(cookieEmail);
	    } catch (err) {
		console.error(err);
	    }
	}

	getTextbooks();

    }, []);

    
    
    return (
	<div className="flex flex-row h-screen">
	    <Sidebar/>
	    <div className="grow h-full">
		<h1>Hello, {name}</h1>
		{library.map((document) => {
		    return (
			<div key={document.bookId}>
			    <button
				type="button"
				onClick={() => router.push({
				    pathname: `${CHAT_ROUTE}/${document.bookId}`,
				    query: { textbookId : document.bookId },
				})
					}>
				{document.bookName}
			    </button>
			</div>
		    );
		})}

		<div className="p-5 text-center">
		    <input className="p-4 rounded-lg w-4/5" type="text"
			   placeholder="Search"></input>
		</div>

		<div className="grid grid-cols-3 gap-16 mt-10 ml-28 mr-28">

		    <div className="bg-white text-white rounded-lg flex justify-center items-center overflow-hidden min-h-44 border border-dashed bg-transparent hover:border-blue-600 transition-all hover:text-blue-600 duration-100 hover:cursor-pointer text-5xl border-2"
			 onClick={() => {setIsOpen(true)}}
		    > + </div>
		    {library.map((doc, index) => (
			<div className="bg-white text-black overflow-hidden rounded-lg min-h-44 p-4" >
			    <h1 className="mb-2 font-bold text-lg">{doc.name}</h1>
			    <p>{doc.desc}</p>
			</div>
		    ))}
		</div>
	    </div>
	    <div className={"modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg pl-20 pr-20 pt-8 pb-8 bg-white flex flex-col text-center drop-shadow-2xl "
			    + (isOpen ? "opacity-100 z-50" : "opacity-0 hidden")}>
		<div className="p-4">
		    <p className="text-right cursor-pointer" onClick={()=>{setIsOpen(false)}}>&#x2715;</p>
		    <h1 className="text-2xl font-bold mb-4 text-left">Alexandria</h1>
		    <p className="pt-5">Type out the name and the description of the textbook</p>
		    <p className="text-gray-500 pt-5 pb-5 text-left">Click save when you're done</p>
		    <div className="mb-4">
			<input
			    type="text"
			    className="form-input mt-1 block w-full p-2 border border-gray-700 rounded-md"
			    placeholder="Name"
			/>
		    </div>
		    <div className="mb-4">
			<input
			    type="text"
			    className="form-input mt-1 block w-full p-2 mb-10 border border-gray-700 rounded-md"
			    placeholder="Description"
			/>
		    </div>
		    <button
			className="bg-blue-500 text-white py-3 px-24 rounded-md hover:bg-blue-600"
		    >
			Save Changes
		    </button>
		</div>
	    </div>
	</div>

    );
}
