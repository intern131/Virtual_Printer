import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const LinecardChart = ({ title, Linedata, xLabels }) => {
  console.log(xLabels)

  return (
    <Card
      sx={{
        marginLeft: 2.5,
        marginTop:1,
        marginRight:1,
        marginBottom:1.7,
       
        backgroundColor: 'white',
        boxShadow: 'none',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <LineChart
           

          height={200}
          width={300}
          className='LineChart'
        
          series={Linedata}
          xAxis={[{ data:xLabels }]}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 2,
            },
            '& .MuiMarkElement-root': {
              display: 'none',

            
              
            },
          
          }}
        />
      </CardContent>
    </Card>
  );
};

export default LinecardChart;
