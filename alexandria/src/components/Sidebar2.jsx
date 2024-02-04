import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
const Sidebar2 = () => {
    const router = useRouter()
    const handleDash = () => {
        // Use the router to navigate to the '/hi' route
        router.push('/');
    };
    const handleLibrary = () => {
        // Use the router to navigate to the '/hi' route
        router.push('/library');
    };
    const handleSignOut = async () => {
        try {
            // Call the provided callback from props
            window.localStorage.removeItem("token");
            router.push('/');
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };
    return (
        <div className="w-2/5">
            <div className={"flex flex-col bg-stone-900 w-full grow-1 h-screen"}>
                <div className="flex-row flex grow-8 px-8 gap-1">
                    <div className='py-10'>
                        <Image width={35} height={35} src="/book.png" />
                    </div>
                    <p className="py-10 text-2xl text-white font-['Satoshi-Bold']">Alexandria</p>
                </div>
                <div className="flex-row flex grow-8 px-10 gap-2">
                    <div className='py-5'>
                        <Image width={25} height={25} src="/dash.png" />
                    </div>
                    <button onClick={handleDash} className="py-5 text-white font-['Satoshi-Regular']">Dashboard</button>
                </div>
                <div className="flex-row flex grow-8 px-10 gap-2">
                    <div className='py-5'>
                        <Image width={25} height={25} src="/lib.png" />
                    </div>
                    <button onClick={handleLibrary} className="py-5 text-white font-['Satoshi-Regular']">Library</button>
                </div>
                <div className="flex-row flex grow-8 px-10 gap-2">
                    <div className='py-5'>
                        <Image className="rounded-full" width={25} height={25} src="/pizza.jpg" />
                    </div>
                    <button className="py-5 text-white font-['Satoshi-Regular']">Account</button>
                </div>
                <div className="flex flex-col justify-end grow">
                    <div className="flex flex-row px-12 gap-2">
                        <div className="py-10">
                            <Image className="rounded-full" width={25} height={25} src="/power.png" />
                        </div>
                        <button onClick={handleSignOut} className="py-10 text-white font-['Satoshi-Regular']">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar2
