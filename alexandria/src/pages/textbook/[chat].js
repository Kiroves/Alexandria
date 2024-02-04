import Message from "@/components/Message";
import Sidebar2 from "@/components/Sidebar2";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
const LIB_ROUTE = "/library";
import axios from "axios";

export default function Chat() {
    const router = useRouter();
    const { textbookId } = router.query;

    const [textbook, setTextbook] = useState({});

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    const handleInput = (e) => {
	setInput(e.target.value);
    }

    const handleSend = (e) => {
	e.preventDefault();
	const content = input;
	setMessages((prevMessages) => [...prevMessages, {who : "You", msg : content} ]);
	setInput("")
    }

  useEffect(() => {
    const getTextbook = async () => {
      let cookieEmail = window.localStorage.getItem("email");
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/info/" + cookieEmail + "/" + textbookId
        );
        setTextbook(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTextbook();
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar2 />
      <div className="flex flex-row grow-0">
        <div className="flex grow-0 flex-col justify-end h-full px-24 ">
	    <div className="invisible">
		<Message
		    name="Alexandria"
		    message="A circuit is a closed loop or pathway through which electric current can flow. It typically consists of various electronic components, such as resistors, capacitors, inductors, and semiconductor devices like transistors or integrated circuits, connected by conductive wires or traces."
		/>
	    </div>


	    {
		messages.map((message, index) => {
		    return (
			<div className="pb-12 w-full">
			    <Message key={index} name={message.who} message={message.msg}/>
			</div>
		    );
		})
	    }

            <div className=" py-12 h-12 relative">
		<form onSubmit={handleSend}>
		    <input value={input} onChange={handleInput} className="w-full pl-5 h-12 top-[13px] absolute rounded-lg bg-stone-900 text-neutral-500 text-lg font-normal font-['Satoshi-Light']" placeholder="Message Alexandria"/>
		    </form>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div className={"flex flex-col bg-stone-900 w-full h-screen "}>
          <div className="flex-row flex px-10 gap-2">
            <p className="pt-14 text-1xl text-white font-['Satoshi-Bold']">
              Textbook Information
            </p>
          </div>
          <div className="flex-row flex px-10 gap-2">
            <p className="py-10 text-1xl text-white font-['Satoshi-Light']">
              {textbook.name}
            </p>
          </div>
          <div className="flex-row flex px-10 gap-2 h-full">
            <p className=" text-1xl text-white font-['Satoshi-Light']">
              {textbook.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
    //{/*<h1>{textbookId }</h1>
    //<button
    //type="button"
    //onClick={() => router.push(LIB_ROUTE)}
    //>back</button>*/}
  );
}
