import React from 'react'
import Image from 'next/image'

const Message = ({ name, message }) => {
    return (
        <div className="flex grow-1 flex-row gap-6 py-4">
            <div className="flex flex-col h-full pl-8">
                {name === 'You' && (
                    <div>
                        <Image className="rounded-full" width={90} height={90} src="/pizza.jpg" alt="Pizza" />
                    </div>
                )}
                {name === 'Alexandria' && (
                    <Image width={ 90} height={ 90} src="/book.png" alt="book" />
                )}
            </div>
            <div className="flex flex-col">
                <div className="text-white text-base font-bold font-['Satoshi-Regular']">
                    {name}
                </div>
                <div className="text-white text-base font-['Satoshi-Light']">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Message
