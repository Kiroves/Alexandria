import { useRouter } from "next/router";

const LIB_ROUTE = "/library"

export default function Chat() {
    const router = useRouter();
    const { chatId } = router.query;
    
    return (
	<div>
	    <h1>{ chatId }</h1>
	    <button
		type="button"
		onClick={() => router.push(LIB_ROUTE)}
	    >back</button>
	</div>
    );
}
