'use client'
import React, { useEffect, useState } from 'react'


const PredictChart = ({ id, winPercentage, drawPercentage, lossPercentage }) => {
    const [matches, setMatches] = useState([])

    var today = new Date();

    // Get the components of the date
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Months are zero-indexed
    var day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    //console.log(formattedDate);

    const fetchMatch = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await fetch(`https://api.sofascore.com/api/v1/sport/football/scheduled-events/${formattedDate}`, {
                method: "GET",
                headers,
            });

            const jsonData = await response.json();
            setMatches(jsonData.events)
            //console.log(jsonData.events[0].tournament);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchMatch()
    }, [])

    const thisMatch = matches.filter(match => match.id == `${id}`);
    return (
        <>
            <div>
                <p className='mt-24 mb-12 text-xl'>Win Probability</p>
                
                <div className="relative w-7/12 mx-auto h-8 bg-gray-300 rounded-full overflow-hidden mt-12">
                    <div className="absolute h-full bg-green-500" style={{ width: `${winPercentage}%` }}>
                        <p className="text-white text-center w-full">{winPercentage.toFixed(2)}%</p>
                    </div>
                    <div className="absolute h-full bg-yellow-500" style={{ width: `${drawPercentage}%`, left: `${winPercentage}%` }}>
                        <p className="text-white text-center w-full">{drawPercentage.toFixed(2)}%</p>
                    </div>
                    <div className="absolute h-full bg-red-500" style={{ width: `${lossPercentage}%`, left: `${winPercentage + drawPercentage}%` }}>
                        <p className="text-white text-center w-full">{lossPercentage.toFixed(2)}%</p>
                    </div>
                </div>
                {thisMatch.map((match, index) => (
                    <b className=' text-left'>{match.homeTeam.name}</b>
                ))}
                <b className='ml-60 text-center'>Draw</b>
                {thisMatch.map((match, index) => (
                    <b className='ml-64 text-right'>{match.awayTeam.name}</b>
                ))}
            </div>
        </>
    )
}

export default PredictChart