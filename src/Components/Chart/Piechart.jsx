import React from 'react';
import { PieChart } from '@mui/x-charts';

const Piechart = ({ chartData, width, height }) => {
  return (
    <PieChart
     
    sx={{
      m: 1,
      p: 3,
      marginLeft:2,
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow:'none',
      backgroundColor:'white'
    }}
      series={[
        { 
          data: chartData,
        },
        
        
      ]}
      width={width}
      height={height}
      margin={1}
      
     
    />
  );
};

export default Piechart;
