import React from 'react'


import { RiBillLine } from "react-icons/ri"
import { useState } from 'react';
import DateRangePickers from '../../Components/RangeCalendar/DateRangePickers';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaDownload, FaEye } from "react-icons/fa";
import { TablePagination } from '@mui/material';

const VendorBill = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [page, setpage] = useState(0);//Current Page Index
  const [rowperPage, setRowsPerPage] = useState(10);// number of rows per page





  const handleChangePage = (event, newpage) => { // handle page change
    setpage(newpage);
  };

  //Handle  change in rows per page 
  const handleChangeRowperPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setpage(0);// Reset the page to the first page wherver  rows per pages changes
  }

  return (
    <>
      {/* Title */}
      <div className="text-center text-[#30336B] text-xl font-extrabold mt-6 md:text-3xl">
        Dashboard Overview
      </div>

      {/* Stat Card */}
      <div className="max-w-2xl  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  md:max-w-7xl">
        <div className="px-4 py-5">
          <div className="max-w-6xl mx-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 ">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                <RiBillLine className="text-4xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Total Bill Generated Today</h4>
                <p className="text-2xl font-bold text-[#30336B]">24</p>
              </div>
            </div>
          </div>
        </div>


        <div className="px-4 py-5 ">
          <div className="max-w-6xl mx-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 ">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                <RiBillLine className="text-4xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Total Bill Generated Weekly </h4>
                <p className="text-2xl font-bold text-[#30336B]">103</p>
              </div>
            </div>
          </div>
        </div>


        <div className="px-4 py-5 ">
          <div className="max-w-6xl mx-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 ">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
              <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                <RiBillLine className="text-4xl" />
              </div>
              <div>
                <h4 className="text-sm text-gray-500 font-medium">Total Bill Generated Monthly </h4>
                <p className="text-2xl font-bold text-[#30336B]">200</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className=' bg-white rounded shadow-sm overflow-x-auto max-w-full border-2 border-gray-300'>
        <table className='min-w-full table-auto bg-white border border-black-400 rounded-2xl overflow-hidden'>
          <thead className='rounded text-center'>
            <tr>
              <th className='px-2 py-2 text-center'>Name</th>
              <th className='px-2 py-2 text-center'>Date</th>
              <th className='px-2 py-2 text-center'>action</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-700'>
            <tr className='hover:bg-blue-50 transition-colors border-b border-gray-50'>
              <td className=''>2025-06-10 12-59-07 MX39900.pdf  </td>
              <td className=''>2025-06-10</td>
              <td className=''>


                <div className="flex items-center gap-4">
                  <button
                    // onClick={() => handleClick("Preview", row)}
                    title="Preview"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer"
                  >
                    <FaEye className="text-lg" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                  <button
                    // onClick={() => handleClick("Download", row)}
                    title="Download"
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors font-medium cursor-pointer"
                  >
                    <FaDownload className="text-lg" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </td>

            </tr>



          </tbody>

        </table>
      </div>

    </>
  )
};

export default VendorBill
