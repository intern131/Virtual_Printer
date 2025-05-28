import React, { useState, useEffect } from 'react';
import { FaStore } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";
import "../../assets/Style/BillContainer.css"
import { TablePagination } from '@mui/material';

// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




const Container = () => {
  const [Data,setdata]=useState(null); // used to store data from api 
  const [page,setpage]=useState(0);//Current Page Index
  const [rowperPage,setRowsPerPage]=useState(10);// number of rows per page





    

  useEffect(()=>{
      const fetchdata= async ()=>{// function can call api we can also make custom hooks afterwards
       try{
         const response=await fetch('http://192.168.29.78:5000/pdf-report');
         if(!response.ok){
          throw new Error("Fail to fetch api");

         }
         // http://192.168.29.78:5000/pdf-report
         const jsonData = await response.json();
         const daywise= jsonData.day_wise;
         console.log(daywise);
         setdata(jsonData);
         
       

         
       }

       catch(err){
         console.log( err+"IT is issue fetching an api")
       }
      };

      fetchdata();
      
  },[]);


const handleChangePage=(event,newpage)=>{ // handle page change
      setpage(newpage); 
    };


   


  //Extract data flatten file data one single data
 const rows = Data
  ? Object.entries(Data.day_wise).flatMap(([date, info]) =>
       
      info.files.map(file => ({
        name: file.split('/').pop(),
        date,
        file
      }))
    )
  : [];

   



 



  // Filtering row for per page according to usage 

  const paginatedRows=FilterRows.slice(page *rowperPage,  page*rowperPage+rowperPage);


 //Handle  change in rows per page 
    const handleChangeRowperPage=(event)=>{
          
        setRowsPerPage(parseInt(event.target.value,10));
        setpage(0);// Reset the page to the first page wherver  rows per pages changes
       
    }

  









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
        {paginatedRows.map((row,idx)=>(
            <tr key={idx}>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>
          <div className="action-buttons">
          <button onClick={handleclick} id="Preview" className="table-btn">Preview</button>
          <button onClick={handleclick} id="Download" className="table-btn">Download</button>
        </div>
            </td>
            </tr>
        ))}
        {paginatedRows.length === 0 &&(
          <tr><td colSpan={3}> Data is not fetch </td></tr>
        )}
   

        
       </tbody>
     </table>
      <TablePagination
       component="div"
       count={rows.length}
       page={page}
       onPageChange={handleChangePage}
       rowsPerPage={rowperPage}
       onRowsPerPageChange={handleChangeRowperPage}
       rowsPerPageOptions={[5,10,25]}
      
      
      />
     
     
      </div>

  
 

 </section>

 


</>

 )
  
}

export default Container
 //<tr>
           {/* <td>Xyz.excel</td>
           <td>10/12/2024</td>
           <td>
             <div className="action-buttons">
               <button onClick={handleclick} id="Preview" className="table-btn" >Preview</button>
               <button onClick={handleclick}  id="Download" className="table-btn" >Download</button>
             </div>
           </td>
         </tr> */}



//             {Data ? (
//   Object.entries(Data.day_wise).map(([date, info]) =>
//     info.files.map((file, idx) => (
//       <tr key={`${date}-${idx}`}>
//         <td>{file.split('/').pop()}</td>
//         <td>{date}</td>
//         <td>
//           <div className="action-buttons">
//             <button onClick={handleclick} id="Preview" className="table-btn">Preview</button>
//             <button onClick={handleclick} id="Download" className="table-btn">Download</button>
//           </div>
//         </td>
//       </tr>
//     ))
//   )
// ) : (
//   <tr><td colSpan={3}>Loading</td></tr>
// )}