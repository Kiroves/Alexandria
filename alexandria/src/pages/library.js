import { useRouter } from "next/router";

const CHAT_ROUTE = "/chat"

export default function Library() {
    const router = useRouter();
    
    const myBooks = [
	{ name : "b1", id : '3' }, { name : "b2", id : "1" }, { name : "b3", id : "2" }
    ];
    
    return (
	<div>
	    <h1>
		This is my library of things
	    </h1>
	    
	    {myBooks.map((book) => {
		return (
		    <div key="{book.id}">
			<button
			    type="button"
			    onClick={
				() => router.push({
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
