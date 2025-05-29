import React, { useEffect, useState } from 'react'
import { FaStore } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";
import "../../assets/Style/Excel&BillContainer.css"
import Test from '../../Components/Test';


const ExcelContainer = () => {

  const handleclick = async () => {
   try{
    const response=Test();
  
    if(!response){
      throw new Error('Could not fetch your info');
    }
    const worksheet=XLSX.utils.json_to_sheet(response);
    const workbook=XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet 1');
    XLSX.writeFile(workbook,'Exceltest.xlsx');
    
   
   }


   catch(err){
    console.log('fail to download Internal error')
   }
  };
  


  return (
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
                <h3>Daily ExcelSheets</h3>
                 <span><LuFileSpreadsheet /></span>
            </div>
            <div className="total-count ">
                <h1>123</h1>
            </div>
            
        </div>
      
    
     
        
        <div className="cards">
            <div className="bill-header">
                <h3>Weekly ExcelSheet</h3>
                 <span><LuFileSpreadsheet /></span>
            </div>
            <div className="total-count ">
                <h1>123</h1>
            </div>
           
            </div>
    
             <div className="cards">
            <div className="bill-header ">
                <h3>Monthly ExcelSheet</h3>
                 <span><FaStore /></span>
            </div>
            <div className="total-count">
                <h1>123</h1>
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

export default ExcelContainer
