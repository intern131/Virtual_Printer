import React, { useState, useEffect } from 'react';
import { FaStore } from "react-icons/fa6";

import { LuFileSpreadsheet } from "react-icons/lu";
// import "../../assets/Style/BillContainer.css"
import { TablePagination } from '@mui/material';
// import { Document, Page, pdfjs } from 'react-pdf';
import BasicDatePicker from '../../Components/DatePicker/BasicDatePicker';
import dayjs from 'dayjs';
import "../../assets/Style/BillContainer.css"




// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BillContainer = () => {
  const [Data,setdata]=useState(null); // used to store data from api 
  const [page,setpage]=useState(0);//Current Page Index
  const [rowperPage,setRowsPerPage]=useState(10);// number of rows per page
  const [filterDate,setFilterDate]=useState(null);

  const [pdfurl,setpdfurl]=useState(null);// url link  pdf js  to show preview
  const [showpreview,setpreview]=useState(false);

  console.log("pdfurl:",pdfurl)



  

    

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
         setdata(jsonData)
        // console.log(jsonData);


        
        
         
       

         
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


   
 //Handle  change in rows per page 
    const handleChangeRowperPage=(event)=>{
          
        setRowsPerPage(parseInt(event.target.value,10));
        setpage(0);// Reset the page to the first page wherver  rows per pages changes
       
    }



  //Extract data flatten file data one single data
 const rows = Data
  ? Object.entries(Data.day_wise).flatMap(([date, info]) =>
      //  console.log(rows)
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
  //  const Blob=await response.blob();
  // //  console.log("Blob:",Blob)
  //  const pdfurlblob=URL.createObjectURL(Blob);
   const parsedData = await response.json()

   console.log("pdfurlblob:",parsedData);

    setpdfurl(parsedData.preview_url);
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
 <section className="Bill-Container ml-5">
  <div  className="nav">
    <div className="title  text-center text-black-700 text-2xl font-extrabold mt-1   max-sm:text-sm">
        <h1>DashBoard Overview </h1>
    </div>
  


  </div>

  <div className="Bill-cards-container  flex flex-col lg:flex-row flex-nowrap justify-center w-full gap-6   md:flex-row  max-sm:pr-2 max-sm:pl-2">
 
    
    <div className="Bill-cards   bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
        <div className="bill-header flex flex-col items-center gap-4 mt-10  cursor-pointer">
            <h1 className='text-2xl font-extrabold'>Daily Bills</h1>
             <span style={{fontSize:'1.5rem'}}><LuFileSpreadsheet /></span> 
        </div>
        <div className="total-count mt-20 ">
            <h1 className='text-bold font-semibold  text-3xl  text-center'>{Data && Data.day_wise['2025-05-08'] ? Data.day_wise['2025-05-08'].count : 0}</h1>
        </div>
        
    </div>
  

 
    
    <div className="Bill-cards  cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
        <div className="bill-header flex flex-col items-center gap-4 mt-10 ">
            <h1 className=' text-2xl font-extrabold'>weekly Bills</h1>
             <span style={{fontSize:'1.5rem'}}><LuFileSpreadsheet /></span>
        </div>
        <div className="total-count mt-20">
            <h1 className=' text-bold font-semibold  text-3xl  text-center'>{Data && Data.week_wise['2025-W18'] ? Data.week_wise['2025-W18'] : 0}
            </h1>
        </div>
       
        </div>

         <div className="Bill-cards  cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
        <div className="bill-header flex flex-col items-center gap-4 mt-10">
            <h1 className='text-semibold font-extrabold  text-2xl  text-center' >Monthly</h1>
             <span style={{fontSize:'1.5rem'}}><FaStore /></span>
        </div>
        <div className="total-count mt-20">
            <h1 className='text-bold font-semibold  text-3xl  text-center'>{Data && Data.month_wise['2025-05'] && Data.month_wise['2025-05']?Data.month_wise['2025-05']:0}</h1>
        </div>

        </div>
    
     
   

  </div>

  <div className="Bills-table-container ">
      <BasicDatePicker       value={filterDate} onChange={(newdate)=>setFilterDate(newdate)} />
     
     <table className='Bill-table'>
           
      
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
  <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-[9999]">
  <div className="w-[80%] h-[90%] bg-white rounded overflow-hidden relative  ">
    <button
      onClick={() => setpreview(false)}
      className="absolute top-2 right-30 z-50 bg-black text-white px-3 py-1 rounded cursor-pointer hover:bg-white hover:text-black border border-white transition"
    >
      Close
    </button>

    <iframe
      src={pdfurl}
      title="PDF Preview"
      width="100%"
      height="100%"
      className="border-none"
    />
  </div>
</div>

)}


 </section>

 


</>

 )
  
}

export default BillContainer
 



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