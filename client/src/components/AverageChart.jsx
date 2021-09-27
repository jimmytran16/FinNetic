import React from 'react';
import { Bar } from 'react-chartjs-2';

const AverageChart = ({ data, options }) => {
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