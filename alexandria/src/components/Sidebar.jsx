import React from 'react'
import Image from 'next/image'

const Sidebar = () => {
    return (
        <div className="w-1/5">
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
                    <p className="py-5 text-white font-['Satoshi-Regular']">Dashboard</p>
                </div>
                <div className="flex-row flex grow-8 px-10 gap-2">
                    <div className='py-5'>
                        <Image width={25} height={25} src="/lib.png" />
                    </div>
                    <p className="py-5 text-white font-['Satoshi-Regular']">Library</p>
                </div>
                <div className="flex-row flex grow-8 px-10 gap-2">
                    <div className='py-5'>
                        <Image className="rounded-full" width={25} height={25} src="/pizza.jpg" />
                    </div>
                    <p className="py-5 text-white font-['Satoshi-Regular']">Account</p>
                </div>
                <div className="flex flex-col justify-end grow">
                    <div className="flex flex-row px-12 gap-2">
                        <div className="py-10">
                            <Image className="rounded-full" width={25} height={25} src="/power.png" />
                        </div>
                        <p className="py-10 text-white font-['Satoshi-Regular']">Sign Out</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
