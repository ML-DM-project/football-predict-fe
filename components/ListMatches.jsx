'use client'
import React, { useEffect, useState } from 'react'
import LiveNode from './LiveNode';
import UpcomingNode from './UpcomingNode';
import Match from './Match';

const ListMatches = () => {

    // Create a new Date object representing the current date and time
    var today = new Date();

    // Get the components of the date
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Months are zero-indexed
    var day = today.getDate();

    // Format the date as "YYYY-MM-DD"
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    //console.log(formattedDate);

    const [matches, setMatches] = useState([])

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

    const premierLeagueLiveMatches = matches.filter(match =>  match.tournament.category.name === 'England' && match.tournament.name === 'Premier League' && match.status.type === 'inprogress' );
    const premierLeagueUpcomingMatches = matches.filter(match => match.tournament.category.name === 'England' && match.tournament.name === 'Premier League' && match.status.type === 'notstarted');

    return (
        <>
            {/* <Match /> */}
            <div className="flex">
                <LiveNode />
            </div>
            {premierLeagueLiveMatches.map((match, index) => (
                <Match homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} id={match.id} homeScore={match.homeScore.current} awayScore={match.awayScore.current}/>
            ))}
            <div className="flex">
                <UpcomingNode />
            </div>
            {premierLeagueUpcomingMatches.map((match, index) => (
                <Match homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} id={match.id} dateTime = {match.startTimestamp} />
            ))}
        </>
    )
}

export default ListMatches