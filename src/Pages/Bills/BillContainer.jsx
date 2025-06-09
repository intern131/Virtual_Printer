import React, { useState, useEffect } from 'react';

// import "../../assets/Style/BillContainer.css"
import { TablePagination } from '@mui/material';
// import { Document, Page, pdfjs } from 'react-pdf';
import BasicDatePicker from '../../Components/DatePicker/BasicDatePicker';
import dayjs from 'dayjs';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt,FaDownload,FaEye } from "react-icons/fa";  
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";





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
         const daywise= jsonData
      
         setdata(jsonData)
      


        
        
         
       

         
       }

       catch(err){
         console.log( err+"failed to fetch data");
       }
      };

      fetchdata();
      
  },[]);


useEffect(()=>{

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
  ? Object.entries(Data.day_wise)
      .flatMap(([date, info]) =>
        info.files.map(file => ({
          name: file.split('/').pop(),
          date,
          file
        }))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
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
    console.log("preview url",previewUrl);
    console.log('After fetching of data',response);
   
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
 <section className="Bill-Container ">
  <div  className="nav">
    <div className="title  text-center text-black-700 text-2xl font-extrabold mt-1   max-sm:text-sm">
        <h1>DashBoard Overview </h1>
    </div>
  


  </div>


   <div className="bg-[#f0f6ff] px-2 py-10">
      <div className="max-w-6xl  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
     
           <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FaCalendarDay className="text-2xl" />
          </div>
          <div>
            <h4 className="text-sm text-gray-500 font-medium">Daily Bill</h4>
            <p className="text-2xl font-bold text-gray-800">{Data && Data.day_wise['2025-06-06'] ? Data.day_wise['2025-06-06'].count : 0}</p>
          </div>
        </div>
       
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FaCalendarWeek className="text-2xl" />
          </div>
          <div>
            <h4 className="text-sm text-gray-500 font-medium">Weekly Bill</h4>
            <p className="text-2xl font-bold text-gray-800">{Data && Data.week_wise['2025-W22'] ? Data.week_wise['2025-W22'] : 0}</p>
          </div>
        </div>
        {/* Card 3 */}
           <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FaCalendarAlt className="text-2xl" />
          </div>
          <div>
            <h4 className="text-sm text-gray-500 font-medium">Monthly Bills</h4>
            <p className="text-2xl font-bold text-gray-800">{Data && Data.month_wise['2025-06'] && Data.month_wise['2025-06']?Data.month_wise['2025-06']:0}</p>
          </div>
        </div>
      </div>
    </div>
 

  {/* <div className="Bills-table-container ">
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
     
      </div> */}

  



 <div className="px-6 mr-2 ml-2 py-6 bg-white rounded-2xl shadow-sm overflow-x-auto max-w-full">
      {/* Date Picker with reduced margin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Filter by Date</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={filterDate}
            onChange={(newValue) => setFilterDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} size="small" className="w-full sm:w-60" />
            )}
          />
        </LocalizationProvider>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
  {paginatedRows.length > 0 ? (
    paginatedRows.map((row, idx) => (
      <tr
        key={idx}
        className="hover:bg-blue-50 transition-colors border-b border-gray-100"
        
      >
        <td className="px-4 py-3">{row.name}</td>
        <td className="px-4 py-3">{row.date}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleClick("Preview", row)}
              id="Preview"
              title="Preview"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer"
            >
              <FaEye className="text-lg" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              onClick={() => handleClick("Download", row)}
              id="Download"
              title="Download"
              className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors font-medium cursor-pointer"
            >
              <FaDownload className="text-lg" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3} className="text-center py-6 text-gray-500 font-semibold">
        No record found
      </td>
    </tr>
  )}
</tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6">
        <TablePagination
          component="div"
          count={FilterRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowperPage}
          onRowsPerPageChange={handleChangeRowperPage}
          rowsPerPageOptions={[5, 10, 25]}
          className="bg-white"
        />
      </div>
    </div>




    {/* Preview pdf */}

    
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