import React from 'react'

const Navbar = () => {
    return (
        <div className="flex flex-row justify-between mt-12">
            <div className="flex justify-center items-center ml-40">
                <img className="w-12 h-12" src="book.png" />
                <div className="text-white font-bold font-['Satoshi-Bold'] text-3xl">Alexandria</div>
            </div>
            <div className="flex justify-center items-center mr-40 ">
                <div className="text-white text-1xl font-normal font-['Satoshi-Regular'] mr-4">Upload</div>
                <div className="text-white text-3xl font-normal font-['Satoshi-Regular'] mr-4" >|</div>
                <div className="w-13 h-10 px-6 py-4 bg-sky-500 rounded-md justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-1xl font-normal font-['Satoshi-Regular'] leading-normal">Log In</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
