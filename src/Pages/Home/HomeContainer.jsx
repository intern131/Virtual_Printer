import React from 'react'

import { LuFileSpreadsheet } from "react-icons/lu";
import "../../assets/Style/HomeContainer.css"
import ChartCard from '../../Components/Chart/ChartCard';
import Piechart from '../../Components/Chart/Piechart';
import LinecardChart from '../../Components/Chart/LinecardChart';
import "../../assets/Style/HomeContainer.css"


const HomeContainer = () => {
  const staticSeries = [
    { data: [1000, 1200, 1500, 1700], label: 'Revenue' }       
  ];
  const xLabels = ['Q1', 'Q2', 'Q3', 'Q4'];// for barchart


  //for pie chart
   const chartData=[
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
  ]
   const width=250;
   const height=280;

    // for line chart
    const linedata= [{ data: [100, 200, 150, 250], label: 'Sales' }];
    const XLabel=[1, 2, 3, 5, 8, 10];
    const linetitle='Testline';
   
 

  


  return (
    <>
    <section className="Container">
      <div  className="nav">
        <div className="title">
            <h1 className='text-red-800 font-extrabold'>DashBoard Overview </h1>
        </div>
     
    
    
      </div>
    
      <div className="cards-container ">
        
        <div className="cards">
            <div className="bill-header">
                <h3>Total Bills</h3>
                 <span><LuFileSpreadsheet /></span>
            </div>
            <div className="total-count ">
                <h1>123</h1>
            </div>
            
        </div>
      
    
     
        
        <div className="cards">
            <div className="bill-header">
                <h3>Total ExcelSheet</h3>
                 <span><LuFileSpreadsheet /></span>
            </div>
            <div className="total-count ">
                <h1>123</h1>
            </div>
           
            </div>
    
             <div className="cards">
            <div className="bill-header ">
                <h3></h3>
                 <span></span>
            </div>
            <div className="total-count">
                <h1></h1>
            </div>
    
            </div>
        
         
       
    
      </div>

       {/* Charts  */}

       <section className="charts">
        <div className="chartContainer">
        <div className="chartcards">
             <ChartCard  title='Test data' seriesData={staticSeries}  xLabels={xLabels}/>
            </div>
            
          <div id='piechart' className="chartcards" style={{ borderRadius:'1rem', boxShadow:'rgba(88, 84, 84, 0.89) 0px 1px 3px 0px, rgba(46, 48, 50, 0.2) 0px 0px 0px 1px;'  }}>
            <Piechart chartData={chartData} width={width} height={height} />


             </div>
           <div className="chartcards" >
           <LinecardChart title={linetitle} Linedata={linedata} xLabels={XLabel}/>

             </div>  
           

        
          </div>   
        
   

        </section>
    

     
     
    
    </section>

    

     
    
    
    </>
  )
}

export default  HomeContainer;
