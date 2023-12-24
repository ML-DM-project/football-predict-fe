import React from 'react'

const Match = (props) => {
    const date = new Date(props.dateTime * 1000)
    //const vnDateUTC7 = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

    return (
        <>
            <div className='text-center'>
                <a href={`/details/${props.id}`} className="inline-block rounded-lg p-4 shadow-sm shadow-indigo-300 mx-auto mt-6 w-64 hover:bg-gray-200">
                    <div className="mt-2 text-left">
                        <p>{props.homeTeam}     <span className='float-right'>{props.homeScore}</span></p>
                        {' '}
                        <p>{props.awayTeam} <span className='float-right'>{props.awayScore}</span></p> 
                        {'  '}
                        <p className="mt-2">{date.toLocaleString()}</p>
                    </div>
                </a>
            </div>
        </>
    )
}

export default Match