import React, { useState, useEffect } from 'react';
import { TablePagination } from '@mui/material';
import dayjs from 'dayjs';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaDownload, FaEye } from "react-icons/fa";
import DateRangePickers from '../../Components/RangeCalendar/DateRangePickers';



const BillContainer = () => {
  const [Data, setdata] = useState(null); // used to store data from api 

  const [page, setpage] = useState(0);//Current Page Index
  const [rowperPage, setRowsPerPage] = useState(10);// number of rows per page
  const [pdfurl, setpdfurl] = useState(null);// url link  pdf js  to show preview
  const [showpreview, setpreview] = useState(false);
  const [carddata, setcarddata] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    const fetchdata = async () => {// function can call api we can also make custom hooks afterwards
      try {
        const BaseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_Bills
        const response = await fetch(BaseUrl);
        if (!response.ok) {
          throw new Error("Fail to fetch api");

        }

        const jsonData = await response.json();
        const daywise = jsonData

        setdata(jsonData)


      }

      catch (err) {
        console.log(err + "failed to fetch data");
      }
    };

    fetchdata();

  }, []);


  useEffect(() => {
    const fetchdata = async () => {
      const baseurl = import.meta.env.VITE_DOWNLOAD_BASE_URL_Bills_CARDS
      const Response = await fetch(baseurl)
      if (!Response.ok) {
        throw new Error('Fail to fetch api for cards in bils');
      }

      const jsonData = await Response.json()
      setcarddata(jsonData);



    }
    fetchdata();


  }, []);





  const handleChangePage = (event, newpage) => { // handle page change
    setpage(newpage);
  };



  //Handle  change in rows per page 
  const handleChangeRowperPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);// Reset the page to the first page wherver  rows per pages changes

  }


  //Extract data flatten file data one single data & Filter 
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

  const FilterRows = rows.filter((row) => {
    if (!dateRange[0] || !dateRange[1]) return true;
    const rowDate = dayjs(row.date, "YYYY-MM-DD");
    return (
      rowDate.isAfter(dayjs(dateRange[0]).subtract(1, "day")) &&
      rowDate.isBefore(dayjs(dateRange[1]).add(1, "day"))
    );
  });


  useEffect(() => {
    setpage(0);
  }, [dateRange]);


  // Filtering row for per page according to usage 

  const paginatedRows = FilterRows.slice(page * rowperPage, page * rowperPage + rowperPage);



  const handleClick = async (action, row) => {
    if (action === "Preview") {

      try {
        const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_2;
        const previewUrl = `${baseUrl}${row.file}`;
        const response = await fetch(previewUrl);



        if (!response.ok) throw new Error('failed to fetch the pdf');
        //  const Blob=await response.blob();
        // //  console.log("Blob:",Blob)
        //  const pdfurlblob=URL.createObjectURL(Blob);
        const parsedData = await response.json()

        console.log("pdfurlblob:", parsedData);

        setpdfurl(parsedData.preview_url);
        setpreview(true);
      }
      catch (err) {
        console.error("failed to preview pdf" + err);
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




  return (
    <>
      <section className="Bill-Container">
        <div className="nav">
          <div className="title  text-center text-black-700 text-2xl font-extrabold mt-1   max-sm:text-2xl max-sm:font-semibold">
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
                {carddata?.day_wise &&
                  Object.entries(carddata.day_wise).map(([date, value]) => (
                    <p key={date} className="text-2xl font-bold text-gray-800">{value}</p>
                  ))
                }

              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <FaCalendarWeek className="text-2xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Weekly Bill</h4>
                {carddata?.week_wise && (() => {
                  const entries = Object.entries(carddata.week_wise);
                  if (entries.length === 0) return null;

                  // Sort descending by week string key
                  const sorted = entries.sort((a, b) => b[0].localeCompare(a[0]));
                  const [latestWeek, latestValue] = sorted[0];
                  // console.log( 'Latest week value ' ,latestValue);


                  return (
                    <p key={latestWeek} className="text-2xl font-bold text-gray-800">
                      {latestValue}
                    </p>
                  );
                })()}
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <FaCalendarAlt className="text-2xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Monthly Bills</h4>
                {carddata?.month_wise && (() => {
                  const entries = Object.entries(carddata.month_wise);
                  if (entries.length === 0) return null;

                  // Sort by month descending and get the latest one
                  const [latestMonth, latestValue] = entries.sort((a, b) => b[0].localeCompare(a[0]))[0];

                  return (
                    <p key={latestMonth} className="text-2xl font-bold text-gray-800">
                      {latestValue}
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>



        <div className="px-2 mx-2 my-5 lg:px-4 py-6  bg-white rounded-2xl shadow-sm overflow-x-auto max-w-full">
          {/* Date Range Picker */}
          <div className="flex flex-row max-sm:flex-col sm:items-center align-middle mb-4 gap-4  md:flex-row  justify-center md:w-fit ">

            <DateRangePickers value={dateRange} onChange={setDateRange} />
            <button className='max-sm:hidden text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-fit cursor-pointer ' onClick={() => setDateRange([null, null])}>Reset</button>
            
            <button className='md:hidden text-sm px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition w-fit cursor-pointer mx-auto  ' onClick={() => setDateRange([null, null])}>Reset</button>

            
          </div>

          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
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
                          title="Preview"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer"
                        >
                          <FaEye className="text-lg" />
                          <span className="hidden sm:inline">Preview</span>
                        </button>
                        <button
                          onClick={() => handleClick("Download", row)}
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


