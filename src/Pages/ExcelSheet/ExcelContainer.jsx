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
        try{ const BaseURl=import.meta.env.VITE_DOWNLOAD_BASE_URL_EXCEL
         const Response=await fetch(BaseURl);

         const JsonData=await Response.json();
         const newdata=JsonData.excel_reports;
         console.log(JsonData);
         setData(JsonData.excel_reports);
        
      }
      catch(err){
        console.error("Error while fetching excel data"+err);
      }

       
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
         <BasicDatePicker       value={FilterDate} onChange={(newdate)=>setFilterData(newdate)} />
           

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