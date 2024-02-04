import React from 'react'
import { useRouter } from 'next/router';
import { handleGoogle } from './Auth';
const landing = () => {
  const router = useRouter();

  const handleSignUp = () => {
    // Use the router to navigate to the '/hi' route
    router.push('/signup');
  };
  const handleSignUpWGoogle = async () => {
    await handleGoogle()
    router.push('/library');
  };
  return (
      <div className="flex flex-row justify-between ml-48 mr-48 mt-10 gap-x-2">
          <div className="flex flex-col mt-20">
            <div className="w-full text-white text-5xl font-bold font-['Satoshi-Bold']">Unlock Knowledge,</div>
              <div className="mt-3 w-full text-white text-5xl font-bold font-['Satoshi-Bold']">Embrace Efficiency</div>
              <div className=" mt-2 w-full text-white text-base font-light font-['Satoshi-Light']">Whether you need to study for your next exam <br /> or digest information more quickly, <br />Alexandria is your new AI-Powered Textbook reading companion.</div>
            <div className="mt-14 flex flex-row gap-8">
                  <div className="w-1/3 h-15 px-4 py-2 bg-sky-500 rounded-md justify-center items-center gap-2.5 inline-flex">
            <button onClick={handleSignUp} className="text-white text-xl font-medium font-['Satoshi-Regular'] leading-normal">Sign Up</button>
                  </div>
                  <div className="w-2/3 h-15 px-4 py-2 rounded-md border border-neutral-50 justify-center items-center gap-2.5 inline-flex">
            <button onClick={handleSignUpWGoogle} className="text-white text-xl font-medium font-['Satoshi-Regular'] leading-normal">Sign Up with Google</button>
                  </div>
            </div>
      </div>
      <div className="flex justify-center items-center">
              <img className="guy_image" src="guy.png" />
      </div>
    </div>
  )
}

export default landing
