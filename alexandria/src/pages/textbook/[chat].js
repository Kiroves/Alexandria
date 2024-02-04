import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router"
const LIB_ROUTE = "/library"

export default function Chat() {
	const router = useRouter();
	const { textbookId } = router.query;

	return (
		<div className="flex flex-row h-screen">
			<Sidebar/>
			<div className="grow h-full">
				
			</div>
			<div>
			</div>
		</div>
		//{/*<h1>{textbookId }</h1>
	    //<button
		//type="button"
		//onClick={() => router.push(LIB_ROUTE)}
	    //>back</button>*/}
	);
}
