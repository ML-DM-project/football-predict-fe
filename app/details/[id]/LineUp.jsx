'use client'
import React, { useEffect, useState } from 'react'
import BoxScore from './BoxScore'

const LineUp = ({ id }) => {

    const [homeTeamLineUp, setHomeTeamLineUp] = useState([])
    const [awayTeamLineUp, setAwayTeamLineUp] = useState([])
    const [matches, setMatches] = useState([])
    const [lineUpState, setLineUpState] = useState(false)

    const fetchLineUp = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await fetch(`https://api.sofascore.com/api/v1/event/${id}/lineups`, {
                method: "GET",
                headers,
            });

            const jsonData = await response.json();
            if (jsonData.confirmed == true) {
                setLineUpState(true)
            }
            //console.log(jsonData.home.players);
            setHomeTeamLineUp(jsonData.home.players)
            setAwayTeamLineUp(jsonData.away.players)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    var today = new Date();

    // Get the components of the date
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Months are zero-indexed
    var day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

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
        fetchLineUp();
        fetchMatch();
    }, [])

    const thisMatch = matches.filter(match => match.id == `${id}`);

    return (
        <>
            <div className=''>
                <a className="rounded-lg p-4 shadow-sm shadow-indigo-300 float-right mr-6 mt-32 w-7/12 h-full">
                    <div className='text-center'>
                        <b className='text-2xl' >Players</b>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='flex'>
                        {thisMatch.map((match, index) => (
                            <>
                                <b className='mr-auto ml-32 text-left'>{match.homeTeam.name}</b>
                                <b className='mr-36 text-right'>{match.awayTeam.name}</b>
                            </>
                        ))}
                        {/* {thisMatch.map((match, index) => (
                        <b className='mr-36 text-right'>{match.awayTeam.name}</b>
                    ))} */}
                    </div>

                    <div className="mt-2">
                        <div className='w=1/2 float-left'>
                            {lineUpState === false ? homeTeamLineUp.map((player, index) => (
                                <a href='#' className="block rounded-lg p-4 shadow-sm shadow-indigo-300 w-64 mb-2 ml-12 hover:bg-gray-200">
                                    <div className="mt-2">
                                        <p className="text-left" key={index}> <span className="mr-2">{player.shirtNumber}</span>    <span className='text-left'>{player.player.name}</span> <BoxScore score={player.avgRating} /></p>
                                    </div>
                                </a>
                            )) : homeTeamLineUp.map((player, index) => (
                                <a href='#' className="block rounded-lg p-4 shadow-sm shadow-indigo-300 w-64 mb-2 ml-12 hover:bg-gray-200">
                                    <div className="mt-2">
                                        <p className="text-left" key={index}> <span className="mr-2">{player.shirtNumber}</span>    <span className='text-left'>{player.player.name}</span> <BoxScore score={player.statistics.rating} /></p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className='w=-1/2 float-right'>
                            {lineUpState === false ? awayTeamLineUp.map((player, index) => (
                                <a href='#' className="block rounded-lg p-4 shadow-sm shadow-indigo-300 w-64 mb-2 ml-12 hover:bg-gray-200">
                                    <div className="mt-2">
                                        <p className="text-left" key={index}> <span className="mr-2">{player.shirtNumber}</span>    <span className='text-left'>{player.player.name}</span> <BoxScore score={player.avgRating} /></p>
                                    </div>
                                </a>
                            )) : awayTeamLineUp.map((player, index) => (
                                <a href='#' className="block rounded-lg p-4 shadow-sm shadow-indigo-300 w-64 mb-2 ml-12 hover:bg-gray-200">
                                    <div className="mt-2">
                                        <p className="text-left" key={index}> <span className="mr-2">{player.shirtNumber}</span>    <span className='text-left'>{player.player.name}</span> <BoxScore score={player.statistics.rating} /></p>
                                    </div>
                                </a>
                            ))}
                        </div>


                    </div>
                </a>
            </div>
        </>
    )
}

export default LineUp