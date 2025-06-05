import React, { useEffect, useState } from 'react'
import { FaStore } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";
import "../../assets/Style/Excel&BillContainer.css"
import { TablePagination } from '@mui/material';
import dayjs from 'dayjs';
import BasicDatePicker from '../../Components/DatePicker/BasicDatePicker';




const ExcelContainer = () => {
  const [Data,setData]=useState([]);  // use set data for fetching data
   const [page,setpage]=useState(0);//Current Page Index
    const [RowperPage,setrowsPerPage]=useState(10);// number of rows per page
    const [FilterDate, setFilterData]=useState(null);



  const [pdfurl,setpdfurl]=useState(null);// url link  pdf js  to show preview
   const [showpreview,setpreview]=useState(false);

    useEffect(()=>{
     
      const fetchdata= async()=>{ 
          const baseUrl=import.meta.env.VITE_DOWNLOAD_BASE_URL_EXCEL
          const Response=await fetch(baseUrl);
          if(!Response.ok){
            throw new Error('Unable to fetch data');
          }
          const JsonData=await Response.json();
          console.log(JsonData.excel_reports);
          const newdata=JsonData.excel_reports;
         const Sortdate = newdata.sort((a, b) => new Date(b.date) - new Date(a.date));

          setData(Sortdate);
      //   try{ const BaseURl=import.meta.env.VITE_DOWNLOAD_BASE_URL_EXCEL
      //    const Response=await fetch(BaseURl);

      //    if(!Response.ok){
      //      throw new Error('Unable to fetch data')
      //    }

      //    const JsonData=await Response.json();
      //    const newdata=JsonData.excel_reports;
      //    const Sortdate=newdata.sort((a,b)=>new newdata(b.newdata.date)-new newdata(a.newdata.date));
       
      //   //  setData(JsonData.excel_reports);
        
      // }
      // catch(err){
      //   console.error("Error while fetching excel data"+err);
      // }

       
  };
     fetchdata();

    },[])


    // Handle click logic 
   const handleClick = async (action, row) => {
   if (action === "Preview") {

    try{
    const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_2;
    const previewUrl = `${baseUrl}${row.file}`;
    const response= await fetch(previewUrl);
    if(!response.ok)throw new Error('failed to fetch the pdf');
    const parsedData=await response.json();

    console.log(parsedData.preview_url);
   const newpreviewurl = `https://docs.google.com/gview?url=${(parsedData.preview_url)}&embedded=true`;

// setpdfurl(newpreviewurl);
// setpreview(true);



  

    setpdfurl(newpreviewurl);
    setpreview(true);
    }
    catch(err){
      console.error("failed to preview pdf"+err);
    }

   
  }


   else if (action === "Download") {


      const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_EXCEL_Download;
      console.log(baseUrl);
      const downloadUrl = `${baseUrl}${row.date.replace(/-/g,'/')}/invoices.xlsx`;
      // Forcing download: create a temporary link
     console.log(downloadUrl);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = row.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // filter data using date 
   const FilterRows=Data.filter(rows=> FilterDate? rows.date ===dayjs(FilterDate).format('YYYY-MM-DD'):true);
  

    // filter row for per page according to usage
     const paginatedRows=FilterRows.slice(page *RowperPage,  page*RowperPage+RowperPage);

   
 // needed setpage(0) so user can see from start not from middle  
   useEffect(()=>{
    setpage(0);
   },[FilterDate]);


    // Handle Page change  
    const handleChangePage=(event,newpage)=>{
         setpage(newpage);
    };

    //Handle Change in rows per page
       const handleChangeRowperPage=(event)=>{
          setrowsPerPage(parseInt(event.target.value),10);
          setpage(0);
       }

  return (
    <>
     <section className="Excel-Container ml-2">
      <div  className="nav">
        <div className="title text-center text-black-700 text-2xl font-extrabold mt-1   max-sm:text-sm">
            <h1>DashBoard Overview </h1>
        </div>
        
    
    
      </div>
    
      <div className="Excel-cards-container  flex flex-col lg:flex-row flex-nowrap justify-center w-full gap-6   md:flex-row  max-sm:pr-2 max-sm:pl-2">
        
        <div className="Excel-cards  cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer" >
            <div className="bill-header flex flex-col items-center gap-4 mt-10  cursor-pointer">
                <h3 className='text-xl font-extrabold'>Daily ExcelSheets</h3>
                 <span><LuFileSpreadsheet /></span>
            </div>
            <div className="total-count  mt-20 ">
                <h1 className='text-bold font-semibold  text-3xl  text-center'>123</h1>
            </div>
            
        </div>
      
    
     
        
        <div className="Excel-cards  cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
            <div className="bill-header flex flex-col items-center gap-4 mt-10  cursor-pointer">
                <h3 className='text-xl font-extrabold'>Weekly ExcelSheet</h3>
                 <span><LuFileSpreadsheet /></span>
            </div>
            <div className="total-count  mt-20 ">
                <h1 className=' text-bold font-semibold  text-3xl  text-center'>123</h1>
            </div>
           
            </div>
    
             <div className="Excel-cards  cards bg-[#d9d9d9] h-80 rounded-3xl shadow-2xl p-6 mt-10 w-full sm:w-1/2 lg:w-1/3 cursor-pointer">
            <div className="bill-header flex flex-col items-center gap-4 mt-10  cursor-pointer ">
                <h3 className='text-xl font-extrabold'>Monthly ExcelSheet</h3>
                 <span><FaStore /></span>
            </div>
            <div className="total-count  mt-20">
                <h1 className=' text-bold font-semibold  text-3xl  text-center'>123</h1>
            </div>
    
            </div>
        
         
       
    
      </div>

   
      <div className="excel-table-container ">
         <BasicDatePicker  value={FilterDate} onChange={(newdate)=>setFilterData(newdate)} />
           

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
            <td>{row.date}</td>
            <td>{row.filename}</td>
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
          rowsPerPage={RowperPage}
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

export default ExcelContainer


  //  <tr>
  //     <td>Xyz.excel</td>
  //     <td>10/12/2024</td>
  //     <td>
  //       <div className="action-buttons">
  //         <button onClick={handleclick} id="Preview" className="table-btn" >Preview</button>
  //         <button onClick={handleclick}  id="Download" className="table-btn" >Download</button>
  //       </div>
  //     </td>
  //   </tr>
  //  const handleclick = async () => {
  //  try{
  //   const response=Test();
  
  //   if(!response){
  //     throw new Error('Could not fetch your info');
  //   }
  //   const worksheet=XLSX.utils.json_to_sheet(response);
  //   const workbook=XLSX.utils.book_new();
    
  //   XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet 1');
  //   XLSX.writeFile(workbook,'Exceltest.xlsx');
    
   
  //  }


  //  catch(err){
  //   console.log('fail to download Internal error')
  //  }
  // };