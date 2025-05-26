import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const ChartCard = ({ title, seriesData, xLabels }) => {
  return (
    <Card
      sx={{
        m: 1,
        p: 1,
        marginLeft:2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow:'none',
        marginRight:1
        
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <BarChart
          height={200}
          width={250}
          series={seriesData}
          xAxis={[{ data: xLabels }]}
          className='Barchart'
         
        />
      </CardContent>    
    </Card>
  );
};

export default ChartCard;
