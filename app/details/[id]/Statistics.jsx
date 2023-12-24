'use client'
import React, { useEffect, useState } from 'react'
import ProgressBarHome from './ProgressBarHome'
import ProgressBarAway from './ProgressBarAway'

const Statistics = ({ id }) => {
    const [matches, setMatches] = useState([])
    const [statistics, setStatistics] = useState([])
    const [statisticsArray, setStatisticsArray] = useState([])


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

    const fetchStatistics = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await fetch(`https://api.sofascore.com/api/v1/event/${id}/statistics`, {
                method: "GET",
                headers,
            });

            const jsonData = await response.json();

            setStatistics(jsonData)
            //console.log(jsonData.events[0].tournament);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchMatch();
        fetchStatistics();
    }, [])




    const statisticsAll = () => {
        if (!statistics.statistics) return []
        return statistics.statistics.find(statistic => statistic.period == 'ALL');
    }

    const statisticsH1 = () => {
        if (!statistics.statistics) return []
        return statistics.statistics.find(statistic => statistic.period == '1ST');
    }

    const statisticsH2 = () => {
        if (!statistics.statistics) return []
        return statistics.statistics.find(statistic => statistic.period == '2ND');
    }

    const thisMatch = matches.filter(match => match.id == `${id}`);

    // const a = statisticsAll()
    // console.log(a)

    return (
        <>
            <div className=''>
                <a className="rounded-lg p-4 shadow-sm shadow-indigo-300 float-left ml-16  mt-32 w-4/12 h-full">
                    <div className='text-center'>
                        <b className='text-2xl ' >Statistics</b><br />
                        <div className='flex mt-4'>
                            <button className="rounded border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    onClick={() => setStatisticsArray(statisticsAll)}
                            >
                                All
                            </button>
                            <button className="ml-4 rounded border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    onClick={() =>setStatisticsArray(statisticsH1)}
                            >
                                H1
                            </button>
                            <button className="ml-4 rounded border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    onClick={() =>setStatisticsArray(statisticsH2)}
                            >
                                H2
                            </button>
                        </div>

                    </div>
                    <br /><br /><br />
                    <div className='flex mb-6 border-b border-indigo-300 mb-4 pb-4'>
                        {thisMatch.map((match, index) => (
                            <b className='mr-auto text-xs'>{match.homeTeam.name}</b>
                        ))}
                        {thisMatch.map((match, index) => (
                            <b className=' text-right text-xs'>{match.awayTeam.name}</b>
                        ))}
                    </div>
                    

                    {statisticsArray.groups && statisticsArray.groups.map((stat, index) => (
                        <div key={index} className='border-b border-indigo-300 mb-4 pb-4 text-center'>
                            <b className=''>{stat.groupName}</b><br />
                            {stat.statisticsItems.map((item, index1) => (
                                <div key={index1}>
                                    <p className='text-center mt-6'>{item.name}</p><br />
                                    <div className='float-left'>
                                        <ProgressBarHome percentage={item.homeValue * 100 / (item.homeValue + item.awayValue)} value={item.homeValue} />
                                    </div>
                                    <div className='float-right'>
                                        <ProgressBarAway percentage={item.homeValue * 100 / (item.homeValue + item.awayValue)} value={item.awayValue} />
                                    </div>
                                    <br /><br />
                                </div>
                            ))}
                        </div>
                    ))}
                </a>
            </div>
        </>
    )
}

export default Statistics