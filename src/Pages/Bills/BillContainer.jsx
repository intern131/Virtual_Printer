import React, { useState, useEffect } from 'react';
import { FaStore } from "react-icons/fa6";

import { LuFileSpreadsheet } from "react-icons/lu";
// import "../../assets/Style/BillContainer.css"
import { TablePagination } from '@mui/material';
// import { Document, Page, pdfjs } from 'react-pdf';
import BasicDatePicker from '../../Components/DatePicker/BasicDatePicker';
import dayjs from 'dayjs';




// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Container = () => {
  const [Data,setdata]=useState(null); // used to store data from api 
  const [page,setpage]=useState(0);//Current Page Index
  const [rowperPage,setRowsPerPage]=useState(10);// number of rows per page
  const [filterDate,setFilterDate]=useState(null);

  const [pdfurl,setpdfurl]=useState(null);// url link  pdf js  to show preview
  const [showpreview,setpreview]=useState(false);






    

  useEffect(()=>{
      const fetchdata= async ()=>{// function can call api we can also make custom hooks afterwards
       try{
        const BaseUrl=import.meta.env.VITE_DOWNLOAD_BASE_URL_Bills
         const response=await fetch(BaseUrl);
         if(!response.ok){
          throw new Error("Fail to fetch api");

         }
         
         const jsonData = await response.json();
         const daywise= jsonData.day_wise;
        //  console.log(daywise);
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

  /// filter by date which wanted by the user
const FilterRows=rows.filter(rows=>
  filterDate ?rows.date ===dayjs(filterDate).format('YYYY-MM-DD'):true
);


 
 useEffect(()=>{
  setpage(0);
 },[filterDate]);


  // Filtering row for per page according to usage 

  const paginatedRows=FilterRows.slice(page *rowperPage,  page*rowperPage+rowperPage);


 //Handle  change in rows per page 
    const handleChangeRowperPage=(event)=>{
          
        setRowsPerPage(parseInt(event.target.value,10));
        setpage(0);// Reset the page to the first page wherver  rows per pages changes
       
    }

  

    const filterofdate=((e)=>{
      // console.log(e.target.value);
      setFilterDate(e.target.value);
    })







 const handleClick = async (action, row) => {
   if (action === "Preview") {

    try{
    const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_2;
    const previewUrl = `${baseUrl}${row.file}`;
    const response= await fetch(previewUrl);
    if(!response.ok)throw new Error('failed to fetch the pdf');
   const Blob=await response.blob();
   const pdfurlblob=URL.createObjectURL(Blob);



    setpdfurl(pdfurlblob);
    setpreview(true);
    }
    catch(err){
      console.error("failed to preview pdf"+err);
    }

   
  }


   else if (action === "Download") {

      const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL;
      const downloadUrl = `${baseUrl}${(row.file)}`;
      // Forcing download: create a temporary link

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = row.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
      <BasicDatePicker       value={filterDate} onChange={(newdate)=>setFilterDate(newdate)} />
     
     <table className='excel-table'>
           
      
     <caption><h2>Bills</h2></caption>
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
                    <button onClick={() => handleClick("Preview", row)}  id='Preview' className="table-btn">Preview</button>
                    <button onClick={() => handleClick("Download", row)} id='Download' className="table-btn">Download</button>
                  </div>
            </td>
            </tr>
        ))}
        {paginatedRows.length === 0 &&(
          <tr><td colSpan={3}> No record found </td></tr>
        )} 
   

        
       </tbody>
     </table>
      <TablePagination
       component="div"
       count={FilterRows.length}
       page={page}
       onPageChange={handleChangePage}
       rowsPerPage={rowperPage}
       onRowsPerPageChange={handleChangeRowperPage}
       rowsPerPageOptions={[5,10,25]}
      
      
      />
     
      </div>

  

{showpreview && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 9999
  }}>
    <div style={{
      width: '80%', height: '90%', background: 'white',
      borderRadius: 8, overflow: 'hidden', position: 'relative'
    }}>
      <button style={{
        position: 'absolute', top: 10, right: 10, zIndex: 10000
      }} onClick={() => setpreview(false)}>Close</button>
      <iframe
        src={pdfurl}
        title="PDF Preview"
        width="100%"
        height="100%"
        typeof='application/pdf'
        style={{ border: "none" }}
      />
    </div>
  </div>
)}


 </section>

 


</>

 )
  
}

export default Container
 



//  {/* View of pdf  */}
//  return (
//   <>
//     <section className="Container">
//       {/* ... your dashboard, cards, table, etc ... */}

//       {/* Place the PDF preview modal here */}
//       {showpreview && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
//           background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
//         }}>
//           <div style={{ background: '#fff', padding: 20, borderRadius: 8, maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
//             <button style={{ float: 'right' }} onClick={() => setpreview(false)}>Close</button>
//             <Document file={pdfurl} onLoadError={console.error}>
//               <Page pageNumber={1} />
//             </Document>
//           </div>
//         </div>
//       )}
//     </section>
//   </>
// )


//  try {
//       const response = await fetch(previewUrl);
//       const blob = await response.blob();
//       const pdfUrl = URL.createObjectURL(blob);
//       window.open(pdfUrl, "_blank"); // Opens PDF in new tab
//     } catch (error) {
//       console.error("Failed to preview PDF:", error);
//     }