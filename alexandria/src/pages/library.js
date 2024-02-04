import app from "../util/firebase.js";
import { useRouter } from "next/router";
import axios from "axios";

import Image from "next/image";

import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar.jsx";

const CHAT_ROUTE = "/textbook";

export default function Library() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [library, setLibrary] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [change, setChange] = useState(false);

  const fileRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  // const db = getFirestore(app);
  const router = useRouter();

  const docsData = [
    { title: "Document 1" },
    { title: "Document 2" },
    { title: "Document 3" },
    { title: "Document 1" },
    { title: "Document 2" },
    { title: "Document 3" },
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
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/textbooks/" + cookieEmail
        );
        setLibrary(res.data.textbooks);
      } catch (err) {
        console.error(err);
      }
    };

    getTextbooks();
  }, [change]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileRef.current.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("email", window.localStorage.getItem("email"));
    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsOpen(false);
      setChange(!change);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="grow h-full">
        {library.map((document) => {
          return (
            <div key={document.bookId}>
              <button
                type="button"
                onClick={() =>
                  router.push({
                    pathname: `${CHAT_ROUTE}/${document.bookId}`,
                    query: { textbookId: document.bookId },
                  })
                }
              >
                {document.bookName}
              </button>
            </div>
          );
        })}

        <div className="p-5 text-center">
          <input
            className="p-4 rounded-lg w-4/5"
            type="text"
            placeholder="Search"
          ></input>
        </div>

        <div className="grid grid-cols-3 gap-16 mt-10 ml-28 mr-28">
          <div
            className=" text-white rounded-lg flex justify-center items-center overflow-hidden min-h-44 border border-dashed bg-transparent hover:border-blue-600 transition-all hover:text-blue-600 duration-100 hover:cursor-pointer text-5xl border-2"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {" "}
            +{" "}
          </div>
          {library.map((doc, index) => (
            <div className="bg-white text-black overflow-hidden rounded-lg min-h-44 p-4">
              <h1 className="mb-2 font-bold text-lg">{doc.name}</h1>
              <p>{doc.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg pl-20 pr-20 pt-8 pb-8 bg-white flex flex-col text-center drop-shadow-2xl " +
          (isOpen ? "opacity-100 z-50" : "opacity-0 hidden")
        }
      >
        <div className="p-4">
          <p
            className="text-right cursor-pointer"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &#x2715;
          </p>
          <div className="flex flex-row align-center gap-2">
            <Image width={35} height={35} src="/book.png" />
            <h1 className="text-2xl font-bold text-left">Alexandria</h1>
          </div>
          <p className="pt-5">
            Type out the name and the description of the textbook
          </p>
          <p className="text-gray-500 pt-5 pb-5 text-left">
            Click save when you're done
          </p>
          <div className="mb-4">
            <input
              type="text"
              className="form-input mt-1 block w-full p-2 border border-gray-700 rounded-md"
              placeholder="Name"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-input mt-1 block w-full p-2 border border-gray-700 rounded-md"
              placeholder="Description"
              onChange={handleDescChange}
            />
          </div>
          <div className="mb-4">
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-50 hover:bg-gray-100 dark:border-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-200"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="mb-4 text-xs text-gray-500 dark:text-gray-400">
                    PDF File
                  </p>
                  {fileRef.current && fileRef.current.files[0] ? (
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {fileRef.current.files[0].name}
                    </p>
                  ) : null}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={handleFileChange}
                  accept=".pdf"
                  ref={fileRef}
                />
              </label>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-3 px-24 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
