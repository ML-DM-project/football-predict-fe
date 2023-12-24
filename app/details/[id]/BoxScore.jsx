import React from 'react';

const BoxScore = ({ score }) => {
  let bgColorClass;

  if (score >= 7.5 && score <= 10) {
    bgColorClass = 'bg-green-500';
  } else if (score >= 6.5 && score < 7.5) {
    bgColorClass = 'bg-yellow-400';
  } else if (score <= 6.5) {
    bgColorClass = 'bg-red-500';
  } else {
    
    bgColorClass = 'bg-gray-300';
  }

  return (
    <div className={`w-8 h-8 rounded-lg flex float-right  items-center justify-center ${bgColorClass}`}>
      <span className="text-white font-bold text-xs">{score}</span>
    </div>
  );
};

export default BoxScore;
