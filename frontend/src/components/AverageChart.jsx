import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


// TESTING .....
const AverageChart = ({ data, options }) => {
  useEffect(() => {
    console.log(data)
  },[])
  return (
    <>
      <div className='header'>
        <div className='links'>
        </div>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default AverageChart;