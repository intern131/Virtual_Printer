import React, { useEffect, useState } from 'react'
import "../../assets/Style/Excel&BillContainer.css"
import { TablePagination } from '@mui/material';
import dayjs from 'dayjs';
import DateRangePickers from '../../Components/RangeCalendar/DateRangePickers';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt,FaDownload,FaEye } from "react-icons/fa"; 
import { data } from 'react-router-dom';
import { toast } from "sonner"


const ExcelContainer = () => {
  const [Data, setData] = useState([]);
  const [page, setpage] = useState(0);
  const [RowperPage, setrowsPerPage] = useState(10);
  const [FilterDate, setFilterData] = useState([null, null]);
  const [showpreview, setpreview] = useState(false);
  const [vaildDownloadDates, setvalidDownloadDates] = useState([null, null]);

  const [previewExcelHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_EXCEL;
      const Response = await fetch(baseUrl);
      if (!Response.ok) {
        throw new Error('Unable to fetch data');
      }
      const JsonData = await Response.json();
      const newdata = JsonData.excel_reports;
      const Sortdate = newdata.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(Sortdate);
    };

    fetchdata();
  }, [])


  // sort data for download 
  const handlePrepareDownloadDates = (Range) => {

    const [startDate, endDate] = Range;
    if (!startDate) return;

    const start = dayjs(startDate).format('YYYY-MM-DD');
    const end = endDate ? dayjs(endDate).format("YYYY-MM-DD") : null




    setvalidDownloadDates([start, end]);
  };






  //Handle ExcelFile Merger
  const DownloadedMergesheet = async (date) => {

    const [start, end] = date;

    if (!start || !end) {
      toast.error('Please enter vaild range');
      return;
    }
    const baseurl = import.meta.env.VITE_DOWNLOAD_MERGE_EXCEL_Download;
    const preview_url = `${baseurl}${start}&to=${end}`;

    try {
      const download = await fetch(preview_url);

      if (!download.ok) {
        throw new Error('cannot fetch data');
      }

      const a = document.createElement('a');
      a.href = preview_url;
      a.download = `${start} to a ${end}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    }
    catch (error) {
      console.error('error while fetchin Downloadsheet', error)
    }









  }






  // Handle click logic  
  const handleClick = async (row) => {


    const baseUrl = import.meta.env.VITE_DOWNLOAD_BASE_URL_EXCEL_Download;
    const downloadUrl = `${baseUrl}${row.date.replace(/-/g, '/')}/invoices.xlsx`;
    // Forcing download: create a temporary link
    console.log(downloadUrl);
    try {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = row.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    catch (err) {
      console.error('Error while Downloading excel file');
    }

  };




  // filter data using date 
  const FilterRows = Data.filter(row => {
    const [startDate, endDate] = FilterDate;

    // If no date range selected, show all rows
    if (!startDate && !endDate) return true;

    const rowDateStr = dayjs(row.date).format('YYYY-MM-DD');


    // If only start date is selected
    if (startDate && !endDate) {
      const startDateStr = dayjs(startDate).format('YYYY-MM-DD');
      return rowDateStr >= startDateStr;
    }

    // If only end date is selected
    if (!startDate && endDate) {
      const endDateStr = dayjs(endDate).format('YYYY-MM-DD');
      return rowDateStr <= endDateStr;
    }

    // If both dates are selected
    if (startDate && endDate) {
      const startDateStr = dayjs(startDate).format('YYYY-MM-DD');
      const endDateStr = dayjs(endDate).format('YYYY-MM-DD');
      return rowDateStr >= startDateStr && rowDateStr <= endDateStr;
    }

    return true;
  });

  // filter row for per page according to usage
  const paginatedRows = FilterRows.slice(page * RowperPage, page * RowperPage + RowperPage);

  // needed setpage(0) so user can see from start not from middle  
  useEffect(() => {
    setpage(0);
  }, [FilterDate]);

  // Handle Page change  
  const handleChangePage = (event, newpage) => {
    setpage(newpage);
  };

  //Handle Change in rows per page
  const handleChangeRowperPage = (event) => {
    setrowsPerPage(parseInt(event.target.value, 10));
    setpage(0);
  }

  return (
    <>
      <section className="Excel-Container">
        <div className="nav">
          <div className="title text-center text-black-700 text-2xl font-extrabold mt-1 max-sm:text-2xl max-sm:font-semibold">
            <h1>DashBoard Overview </h1>
          </div>
        </div>
        {/* new Cards */}

        <div className=" px-1 mx-5 py-10">
          <div className="max-w-6xl  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}

            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <FaCalendarDay className="text-2xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Daily Bill</h4>
                <p className="text-2xl font-bold text-gray-800">45</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <FaCalendarWeek className="text-2xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Weekly Bill</h4>
                <p className="text-2xl font-bold text-gray-800">152</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <FaCalendarAlt className="text-2xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Monthly Bills</h4>
                <p className="text-2xl font-bold text-gray-800">234</p>
              </div>
            </div>
          </div>
        </div>

        {/* New table */}

        <div className="px-2 lg:px-4 py-6 bg-white rounded-2xl shadow-md overflow-x-auto max-w-full">
          {/* Heading + Date Range Picker */}
          <div className="flex flex-col md:flex-row lg:items-center justify-between gap-4 mb-6 ">
            <div className="flex  justify-center lg:justify-start max-sm:hidden">
              <button
                onClick={() => DownloadedMergesheet(vaildDownloadDates)}
                id="Download"
                title="Download"
                className="flex  items-center gap-2 text-white bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-xl font-semibold shadow cursor-pointer"
              >
                <FaDownload className="text-lg"/>
                <span className=" max-sm:hidden">Download</span>
              </button>
            </div>

            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <DateRangePickers
                value={FilterDate}
                onChange={(newValue) => {
                  setFilterData(newValue);
                  handlePrepareDownloadDates(newValue);
                }}
              />
            </div>
              <div className="flex  justify-center lg:justify-start md:hidden">
              <button
                onClick={() => DownloadedMergesheet(vaildDownloadDates)}
                id="Download"
                title="Download"
                className="flex  items-center gap-2 text-white bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-xl font-semibold shadow cursor-pointer"
              >
                <FaDownload className="text-lg"/>
                <span className=" max-sm:hidden">Download</span>
              </button>
            </div>
          </div>
           


          {/* Table - Rest remains exactly the same */}
          <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#30336B] text-white text-sm">
              <tr>
                <th className="px-4 py-3 w-1/3">Date</th>
                <th className="px-4 py-3 w-1/3">File Name</th>
                <th className="px-4 py-3 w-1/3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.filename}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-3">

                        <button
                          onClick={() => handleClick(row)}
                          id="Download"
                          title="Download"
                          className="flex items-center gap-1 text-green-600 hover:text-green-800 transition font-medium cursor-pointer"
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

          {/* Pagination - Remains the same */}
          <div className="mt-4">
            <TablePagination
              component="div"
              count={FilterRows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={RowperPage}
              onRowsPerPageChange={handleChangeRowperPage}
              rowsPerPageOptions={[5, 10, 25]}
              className="bg-white"
            />
          </div>
        </div>

        {/* New table */}


        {showpreview && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded max-w-5xl max-h-[80vh] overflow-auto relative">
              <button
                onClick={() => setpreview(false)}
                className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>

              {/* Render Excel preview */}
              <div dangerouslySetInnerHTML={{ __html: previewExcelHtml }} />
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default ExcelContainer




















{/* <div className="px-4 md:px-6 py-6 bg-white rounded-2xl shadow-md overflow-x-auto max-w-full">

  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
    <h2 className="text-xl font-semibold text-gray-800">Filter by Date</h2>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={FilterDate}
        onChange={(newValue) => setFilterData(newValue)}
        renderInput={(params) => (
          <TextField {...params} size="small" className="w-full sm:w-64" />
        )}
      />
    </LocalizationProvider>
  </div>

  <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
    <thead className="bg-[#30336B] text-white text-sm">
      <tr>
        <th className="px-4 py-3 w-1/3">Date</th>
        <th className="px-4 py-3 w-1/3">File Name</th>
        <th className="px-4 py-3 w-1/3">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {paginatedRows.length > 0 ? (
        paginatedRows.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3">{row.date}</td>
            <td className="px-4 py-3">{row.filename}</td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleClick("Preview", row)}
                  id="Preview"
                  title="Preview"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition font-medium"
                >
                  <FaEye className="text-lg" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  onClick={() => handleClick("Download", row)}
                  id="Download"
                  title="Download"
                  className="flex items-center gap-1 text-green-600 hover:text-green-800 transition font-medium"
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


  <div className="mt-4">
    <TablePagination
      component="div"
      count={FilterRows.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={RowperPage}
      onRowsPerPageChange={handleChangeRowperPage}
      rowsPerPageOptions={[5, 10, 25]}
      className="bg-white"
    />
  </div>
</div> */}