import React from 'react';

const ProgressBarAway = ({ percentage, value }) => {
  const progressBarStyle = {
    width: `${percentage}%`,
  };

  const labelStyle = {
    left: '0',
    top: '-1.5rem',
  };

  return (
    <div className="relative">
      <div className="bg-green-500 h-4 rounded-full overflow-hidden w-48">
        <div className="bg-gray-200 h-full " style={progressBarStyle}></div>
      </div>
      <div className="absolute text-xs font-bold text-gray-700" style={labelStyle}>
        {value}
      </div>
    </div>
  );
};

export default ProgressBarAway;
