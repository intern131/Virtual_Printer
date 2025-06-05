import React,{useEffect,useState} from 'react'

import { LuFileSpreadsheet } from "react-icons/lu";
import "../../assets/Style/HomeContainer.css"

import "../../assets/Style/HomeContainer.css"
import { ClassNames } from '@emotion/react';
import {Chart as ChartJS,defaults} from 'chart.js/auto';
import {Bar,Doughnut,Line} from 'react-chartjs-2'
import FakeData from '../../Components/FakeData';

defaults.maintainAspectRatio=false
defaults.responsive=true;
defaults.plugins.title.display=true;
defaults.plugins.title.align='start';
defaults.plugins.title.font.size=20;
defaults.plugins.title.color='black';

const HomeContainer = () => {
const [Labels, setLabel] = useState([]);
const [values, setValues] = useState([]);
const [newlabel,setnewLabel]=useState([]);
const [newvalues,setnewValues]=useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const BaseURl = import.meta.env.VITE_BARCHART_URL;
      const response = await fetch(BaseURl);
      const jsonData = await response.json();

      const Monthlabels = Object.keys(jsonData.month_wise).map(key => key.split(" ")[0]);
      const Monthvalues = Object.values(jsonData.month_wise);
       

      setLabel(Monthlabels);
      setValues(Monthvalues);

      console.log('Month Labels:', Monthlabels);
      console.log('Values:', Monthvalues);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();  
}, []);

  

  


  return (
    <>
    <section className='pl-3'>

      <div  className="nav">
        <div className="title  text-center max-lg:text-large">
  <h1 className="text-xl lg:text-xl sm:text-xl font-extrabold">DashBoard Overview</h1>


        </div>
     
    
    
      </div>
    <div className="cards-container  flex flex-col lg:flex-row flex-nowrap justify-center w-full gap-6   md:flex-row  max-sm:pr-2 max-sm:pl-2">

        
      
          <div className="cards  bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">

            <div className="bill-header flex flex-col items-center mt-10">
                <h2 className='text-2xl font-extrabold '>Total Bills</h2> 
                 {/* <span className='text-4xl font-bold'><LuFileSpreadsheet/></span>       */}
            </div>
           
            <div className="total-count mt-20 ">
                <h1 className='text-bold font-semibold  text-3xl text-center '>123</h1>
            </div>
            
        </div>

           
 <div className="cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
            <div className="bill-header flex flex-col items-center mt-10">
                <h2 className='text-2xl font-extrabold'>Total Monthly</h2> 
                 {/* <span className='text-4xl font-bold'><LuFileSpreadsheet/></span>       */}
            </div>
           
            <div className="total-count mt-20 ">
                <h1 className='text-bold font-semibold  text-3xl  text-center '>123</h1>
            </div>
            
        </div>
      
      
    
     
        
      
    
            
      <div className="cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
            <div className="bill-header flex flex-col items-center mt-10">
                <h2 className='text-2xl font-extrabold'></h2> 
                 {/* <span className='text-4xl font-bold'><LuFileSpreadsheet/></span>       */}
            </div>
           
            <div className="total-count mt-20 ">
                <h1 className='text-bold font-semibold  text-3xl text-center  '></h1>
            </div>
            
        </div>
      
      
         
       
    
      </div>

    
      {/* charts */}
        <div className="ChartsContainer  flex flex-col lg:flex-row flex-nowrap justify-center w-full gap-6   md:flex-row  max-sm:pr-2 max-sm:pl-2">
         <div className="barchart   bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer ">
           <Bar 
           data={{
            labels:Labels,

            datasets:[
              {
                label:'Test Data',
                data:values,
                backgroundColor:'blue'
              },
             
            ]
            
           }}
            
           
           />
         
          
         
         </div>
          <div className="barchart   bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer ">
          <Doughnut
            data={{
              labels:['May','June','July'],
              datasets:[
                {label:'jan report',
                  data:[20,30,40],
                  backgroundColor:['yellow','cyan','blue']

                },
              
              ]
            }}
          />
         
         
         </div>
          <div className="barchart   bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer ">
           <Line data={{
             labels:FakeData.map((data)=>data.label),
             datasets:[
              {
                label:'Month wise Bills',
                data:FakeData.map((data)=>data.revenue),
                borderColor:'Red',
                tension:1,
                
              }
             ]
             
           }}
           options={{
               layout: {
                padding: {
                left: 0,
                right: 0,
               top: 10,
               bottom: 10
    }
  }

           }}/>
              
         
         </div>



        </div>
      

     



     
     
    
    </section>

    

     
    
    
    </>
  )
}

export default  HomeContainer;











   {/* charts

       <section className="charts mt-10">
        <div className="chartContainer flex max-lg:flex-row   max-sm:flex-col  max-sm:w-85 ">
        <div className="chartcards  max-lg:w-100  max-sm:w-90 max-sm:pr-10" > 
             <ChartCard  title='Test data' seriesData={staticSeries}  xLabels={xLabels}/>
            </div>
            
          <div id='piechart' className="chartcards max-lg:w-100  max-sm:w-80" style={{ borderRadius:'1rem' }}>
            <Piechart chartData={chartData} width={width} height={height} />


             </div>
           <div className="chartcards chartcards max-lg:w-100  max-sm:w-80 " >
           <LinecardChart title={linetitle} Linedata={linedata} xLabels={XLabel}/>

             </div>  
           
    
        
          </div>   
        
   

        </section>
     */}














      {/* <div className="cards-container  flex flex-col lg:flex-row flex-nowrap justify-center w-full gap-6   md:flex-row  max-sm:pr-2 max-sm:pl-2">

          
      
         <div className="cards bg-[#d9d9d9] h-auto rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3">
         <div className="chartcards w-full max-w-full h-[300px]">
                <ChartCard title="Test data" seriesData={staticSeries} xLabels={xLabels} />
          </div>
        </div>



        <div className="cards  bg-[#d9d9d9] h-auto rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3">
    
                  <div id='piechart' className="chartcards w-full max-w-full h-[300px]" style={{ borderRadius:'1rem' }}>
            <Piechart chartData={chartData} width={width} height={height} />


             </div>       
            
        </div>


        <div className="cards bg-[#d9d9d9] h-auto rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3">

        <div className="chartcards w-full max-w-full h-[300px] " >
           <LinecardChart title={linetitle} Linedata={linedata} xLabels={XLabel}/>

             </div>

            
        </div>

      


      



     </div> */}