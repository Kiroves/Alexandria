import Message from "@/components/Message";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router"
const LIB_ROUTE = "/library"

export default function Chat() {
	const router = useRouter();
	const { textbookId } = router.query;

	return (
		<div className="flex flex-row h-screen">
			<Sidebar/>
			<div className="flex flex-row grow-0"><div className="flex grow-0 flex-col justify-end h-full px-24 ">
				<Message name="Alexandria" message="A circuit is a closed loop or pathway through which electric current can flow. It typically consists of various electronic components, such as resistors, capacitors, inductors, and semiconductor devices like transistors or integrated circuits, connected by conductive wires or traces." />
				<div className="pb-12">
					<Message name="You" message="A circuit is a closed loop or pathway through which electric current can flow. It typically consists of various electronic components, such as resistors, capacitors, inductors, and semiconductor devices like transistors or integrated circuits, connected by conductive wires or traces." />
				</div>

				<div className=" py-12 h-12 relative" >
					<div className="w-full h-12 left-0 top-0 absolute bg-stone-900 rounded-lg" />
					<div className="w-full left-[25.10px] top-[13px] absolute text-neutral-500 text-lg font-normal font-['Satoshi-Light']">Message Alexandria</div>
				</div>
			</div>
			</div>
			<div>
				<div className={"flex flex-col bg-stone-900 grow-1 w-full h-screen max-w-64"}>
					<div className="flex-row flex grow-8 px-10 gap-2">
						<p className="pt-14 text-1xl text-white font-['Satoshi-Bold']">Textbook Information</p>
					</div>
					<div className="flex-row flex grow-8 px-10 gap-2">
						<p className="py-10 text-1xl text-white font-['Satoshi-Light']">213 Companion</p>
					</div>
					<div className="flex-row flex grow-8 px-10 gap-2 overflow-scroll">
						<p className=" text-1xl text-white font-['Satoshi-Light']">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it tftware like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
