'use client'
import React, { useState, useEffect } from 'react';
import PredictChart from '@/components/PredictChart';

const PredictButton = ({id}) => {
    const [showNextComponent, setShowNextComponent] = useState(false);
    const [loading, setLoading] = useState();
    const [percentages, setPercentages] = useState({});

    const fetchPercentage = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await fetch(`http://127.0.0.1:8000/predict?match_id=${id}`, {
                method: "GET",
                headers,
            });
            
            const jsonData = await response.json();
          
             
            setPercentages(jsonData)
            console.log("abc")
            //console.log(jsonData.events[0].tournament);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Simulate a delay for loading (replace it with your actual loading logic)
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(delay);
    }, [showNextComponent]);

    useEffect(()=>{
        fetchPercentage()
      
    },[loading])

    const handleClick = () => {
        setLoading(true);
        setShowNextComponent(true);
    };

    return (
        <div className="p-4 mt-12 mb-12 text-center">
            <button
                onClick={handleClick}
                disabled={loading}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Predict
            </button>

            {/* Display a spinner while loading */}
            {loading && (
                <div className="mt-4 border-t-4 border-blue-500 border-solid rounded-full h-10 w-10 animate-spin mx-auto"></div>
            )}

            {/* Display NextComponent when it's loaded */}
            {!loading && showNextComponent && <PredictChart id={id} winPercentage={percentages.result.homeWin*100} drawPercentage={percentages.result.draw*100} lossPercentage={percentages.result.awayWin*100}/>}
        </div>
    );
};

export default PredictButton;
