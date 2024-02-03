import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const LIB_ROUTE = "/library"

export default function Home() {
    const router = useRouter();
    
    return (
	<div>
	    <h1>Hello World</h1>
	    <button type="button"
		    onClick={() => router.push(LIB_ROUTE)}>
		My Library
	    </button>
	</div>
    );	
}
