import React from 'react'

const LiveNode = () => {
    return (
        <>

            <div className="rounded-full bg-red-500 p-[3px] active:text-opacity-75 mx-auto mt-16">
                <span className="block rounded-full bg-white px-8 py-2 text-sm font-bold group-hover:bg-transparent text-red-500">
                    Live
                </span>
            </div>

        </>
    )
}

export default LiveNode