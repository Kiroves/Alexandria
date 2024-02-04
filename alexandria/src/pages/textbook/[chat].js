import Message from "@/components/Message";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
const LIB_ROUTE = "/library";
import axios from "axios";

export default function Chat() {
  const router = useRouter();
  const { textbookId } = router.query;

  const [textbook, setTextbook] = useState({});

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
      <Sidebar />
      <div className="flex flex-row grow-0">
        <div className="flex grow-0 flex-col justify-end h-full px-24 ">
          <Message
            name="Alexandria"
            message="A circuit is a closed loop or pathway through which electric current can flow. It typically consists of various electronic components, such as resistors, capacitors, inductors, and semiconductor devices like transistors or integrated circuits, connected by conductive wires or traces."
          />
          <div className="pb-12">
            <Message
              name="You"
              message="A circuit is a closed loop or pathway through which electric current can flow. It typically consists of various electronic components, such as resistors, capacitors, inductors, and semiconductor devices like transistors or integrated circuits, connected by conductive wires or traces."
            />
          </div>

          <div className=" py-12 h-12 relative">
            <div className="w-full h-12 left-0 top-0 absolute bg-stone-900 rounded-lg" />
            <div className="w-full left-[25.10px] top-[13px] absolute text-neutral-500 text-lg font-normal font-['Satoshi-Light']">
              Message Alexandria
            </div>
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
