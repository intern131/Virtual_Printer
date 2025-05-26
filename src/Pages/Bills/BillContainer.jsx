import React, { useState, useEffect } from 'react';

import { FaStore } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";
import "../../assets/Style/Excel&BillContainer.css"






const Container = () => {
  const [Data,setdata]=useState(null); // used to store data from api 
     

  useEffect(()=>{
      const fetchdata= async ()=>{// function can call api we can also make custom hooks afterwards
       try{
         const response=await fetch('http://192.168.29.78:5000/pdf-report');
         if(!response.ok){
          throw new Error("Fail to fetch api");

         }
        
         const jsonData = await response.json();
          console.log(jsonData);
          setdata(jsonData);

         
       }

       catch(err){
         console.log( err+"IT is issue fetching an api")
       }
      };
      fetchdata();
  },[])   





  const handleclick = (e) => {
    const action = e.target.id;
  
    if (action === "Preview") {
      console.log("Preview clicked");
    
    } else if (action === "Download") {
      console.log("Download clicked");
   
    }
  };
  
  


 return(
<>
 <section className="Container">
  <div  className="nav">
    <div className="title">
        <h1>DashBoard Overview </h1>
    </div>
  


  </div>

  <div className="cards-container">
 
    
    <div className="cards">
        <div className="bill-header">
            <h3>Daily Bills</h3>
             <span><LuFileSpreadsheet /></span>
        </div>
        <div className="total-count ">
            <h1>{Data && Data.day_wise['2025-05-08'] ? Data.day_wise['2025-05-08'].count : 0}</h1>
        </div>
        
    </div>
  

 
    
    <div className="cards">
        <div className="bill-header">
            <h3>weekly Bills</h3>
             <span><LuFileSpreadsheet /></span>
        </div>
        <div className="total-count ">
            <h1>{Data && Data.week_wise['2025-W18'] ? Data.week_wise['2025-W18'] : 0}
            </h1>
        </div>
       
        </div>

         <div className="cards">
        <div className="bill-header ">
            <h3>Monthly</h3>
             <span><FaStore /></span>
        </div>
        <div className="total-count">
            <h1>{Data && Data.month_wise['2025-05']}</h1>
        </div>

        </div>
    
     
   

  </div>

  <div className="excel-table-container ">
           

           <h2>Excel</h2>
     <table className='excel-table'>
       <colgroup>
         <col style={{ width: "30%" }} />
         <col style={{ width: "30%" }} />
         <col style={{ width: "30%" }} />
       </colgroup>
       <thead>
         <tr>
           <th>Name</th>
           <th>Date</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Xyz.excel</td>
           <td>10/12/2024</td>
           <td>
             <div className="action-buttons">
               <button onClick={handleclick} id="Preview" className="table-btn" >Preview</button>
               <button onClick={handleclick}  id="Download" className="table-btn" >Download</button>
             </div>
           </td>
         </tr>
       </tbody>
     </table>
     
     
           </div>

  
 

 </section>

</>

 )
  
}

export default Container
