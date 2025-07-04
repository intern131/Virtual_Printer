import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosContact } from "react-icons/io";
import { toast } from 'sonner';
import { FormControl, InputLabel, MenuItem, OutlinedInput, TablePagination, Select } from '@mui/material';
import { Statecity } from '../../Components/RangeCalendar/StateCity';
import { FaFilter } from 'react-icons/fa'; 


const Vendor = () => {
    const [Data, setData] = useState([]);
    const [page, setpage] = useState(0);
    const [rowperPage, setRowsPerPage] = useState(5);
    const [selectedCitie, setSelectedCities] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showMobileFilter, setMobileFilter] = useState(false);

    const statecity = Statecity();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseurl = import.meta.env.VITE_ALL_VENDOR
                const response = await axios.get(baseurl);
                setData(response.data);
                // {Data.map((data)=>{
                //     console.log(data.city);
                // })}

            }
            catch (err) {
                toast.error('Failed to fetch vendor data');
                console.err('The error for Vendor ', err);
            }
        }
        fetchData();

    }, [])

    //handle page change event
    const handleChangepage = (event, newpage) => {
        setpage(newpage);
    }
    //handle change in row per page
    const handleChangeRowperPage = (Event) => {
        setRowsPerPage(parseInt(Event.target.value,));
        setpage(0);
        // reset the page to the first  page
    }


    //Filter Out data  city and pune
    const filterData = Data.filter((item) => {
        const matchcity = selectedCitie.length === 0 || selectedCitie.includes(item.city);
        const matchstate = selectedStates.length === 0 || selectedStates.includes(item.state);
        const matchname = item.vendor_name.toLowerCase().includes(searchText.toLowerCase())
        return matchcity && matchstate && matchname;
    });



    const paginatedrows = filterData.slice(page * rowperPage, page * rowperPage + rowperPage);

    useEffect(() => {
        setSelectedCities([]);

    }, [selectedStates]);


    const totalstates = selectedStates.length > 0 ? Data.filter(item => item.state.includes(selectedStates)).length : Data.length

    const citytotal = selectedCitie.length > 0 ? Data.filter((item) => item.city.includes(selectedCitie)).length : 0;


    // 

    return (
        <>
            {/* Title */}
            <div className="text-center text-[#30336B] text-xl font-extrabold mt-6 md:text-3xl">
                Dashboard Overview
            </div>

            {/* Stat Card */}
            <div className="max-w-7xl  px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
                        <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                            <IoIosContact className="text-4xl" />
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">Total Vendors</h4>
                            <p className="text-2xl font-bold text-[#30336B]">{Data.length}</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
                        <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                            <IoIosContact className="text-4xl" />
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">{selectedCitie.length > 0 ? selectedCitie : 'Add city for count'}</h4>
                            <p className="text-2xl font-bold text-[#30336B]">{citytotal ? citytotal : 0}</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
                        <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                            <IoIosContact className="text-4xl" />
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">{selectedStates.length > 0 ? selectedStates : 'select state filter'}</h4>
                            <p className="text-2xl font-bold text-[#30336B]">{totalstates ? totalstates : 0}</p>
                        </div>
                    </div>

                </div>
            </div>


            {/* Table / Card Layout */}
            <div className="px-2 pb-10 max-w-6xl  mt-2 overflow-x-hidden w-full  xl:max-w-screen">
                <div className='hidden md:flex gap-4 flex-nowrap px-4 pb-4 items-center'>
                    <input type='text' placeholder='Serach by vendor name' value={searchText} onChange={(e) => setSearchText(e.target.value)}
                        className='border-1 border-gray-500 px-5 py-4 rounded-sm text-sm shadow-sm w-64 hover:border-gray-800 '
                    />

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel className='mt-1.5'>State</InputLabel>
                        <Select value={selectedStates}
                            onChange={(e) => setSelectedStates(e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                            input={<OutlinedInput label='State' />}>

                            {Object.keys(statecity).map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}

                        </Select>

                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel className='mt-1.5'>City</InputLabel>
                        <Select value={selectedCitie}
                            onChange={(e) => setSelectedCities(e.target.value)}
                            input={<OutlinedInput label='city' />}

                        >
                            {selectedStates && statecity[selectedStates] && statecity[selectedStates].map((city) => (

                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}



                        </Select>

                    </FormControl>
                    <button
                        onClick={() => {
                            setSelectedCities([]);
                            setSelectedStates([]);
                        }}
                        className="text-xs px-2 py-1 bg-red-600 h-10 text-white rounded hover:bg-red-500 transition w-fit cursor-pointer active:bg-red-700"
                    >
                        Reset Filters
                    </button>


                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-x-auto ">
                    <table className="min-w-full text-sm text-center text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-[#30336B] text-white text-xs uppercase tracking-tighter">
                            <tr>
                                <th className="px-1 py-3 border">Vendor Name</th>
                                <th className="px-1 py-3 border">Phone No</th>
                                <th className="px-1 py-3 border">Email ID</th>
                                <th className="px-1 py-3 border">GST</th>
                                <th className="px-1 py-3 border">City</th>
                                <th className="px-1 py-3 border">State</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {paginatedrows.length > 0 ? (
                                paginatedrows.map((Data, index) => (
                                    <tr key={index} className='hover:bg-gray-50 transition cursor-pointer'>
                                        <td className='py-3'>{Data.vendor_name}</td>
                                        <td className='py-3'>{Data.phone_no}</td>
                                        <td className='px-2 py-3 truncate max-w-[150px] ' title={Data.email_id}>{Data.email_id}</td>
                                        <td className='py-3 '>{Data.gst}</td>
                                        <td className='py-3 truncate max-w-[110px] ' title={Data.city}>{Data.city}</td>
                                        <td className='py-3'>{Data.state}</td>
                                    </tr>

                                ))

                            ) : (
                                <tr>
                                    <td className='text-center py-6 text-gray-500 font-semibold'>
                                        no record found
                                    </td>
                                </tr>
                            )}


                        </tbody>
                    </table>
                    <div className="">
                        <TablePagination
                            component="div"
                            count={Data.length}
                            page={page}
                            onPageChange={handleChangepage}
                            rowsPerPage={rowperPage}
                            onRowsPerPageChange={handleChangeRowperPage}
                            rowsPerPageOptions={[5, 15, 20]}

                            className="bg -white"
                        />
                    </div>
                </div>

                {/* Mobile Card View */}
             
                  

                <div className="md:hidden px-4 pb-4">
                    <button
                        onClick={() => setMobileFilter(!showMobileFilter)}

                        className="flex items-center gap-2 text-sm text-white bg-blue-600 px-3 py-2 rounded-md shadow hover:bg-blue-500 transition"
                    >
                        <FaFilter /> {showMobileFilter ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    {showMobileFilter && (
                        <div className="mt-3 bg-white rounded-xs shadow-sm p-4 space-y-4  border border-gray-200">
                            {/* Vendor Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vendor Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. ABC Traders"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <select
                                    value={selectedStates}
                                    onChange={(e) =>
                                        setSelectedStates(
                                            e.target.value === 'string'
                                                ? e.target.value.split(',')
                                                : e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(statecity).map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <select
                                    value={selectedCitie}
                                    onChange={(e) => setSelectedCities(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select City</option>
                                    {selectedStates &&
                                        statecity[selectedStates]?.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setSelectedCities([]);
                                    setSelectedStates([]);
                                }}
                                className="w-full text-sm px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                        <div className="  rounded-xl p-4 border  border-gray-100 flex flex-col text-center gap-5">
                            {paginatedrows.length > 0 ? (
                                paginatedrows.map((row, index) => (
                                    <div key={index} className="bg-white shadow rounded-xl p-4 border border-gray-100">
                                        <h3 className="text-[#30336B] font-bold text-lg mb-2">{row.vendor_name}</h3>
                                        <p><span className="font-medium">Phone:</span> {row.phone_no}</p>
                                        <p><span className="font-medium">Email:</span> {row.email_id}</p>
                                        <p><span className="font-medium">GST:</span> {row.gst}</p>
                                        <p><span className="font-medium">City:</span> {row.city}</p>
                                        <p><span className="font-medium">State:</span> {row.state}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No records found</p>
                            )}


                        </div>
                        <div className="">
                            <TablePagination
                                component="div"
                                count={paginatedrows.length}
                                page={page}
                                onPageChange={handleChangepage}
                                rowsPerPage={rowperPage}
                                onRowsPerPageChange={handleChangeRowperPage}
                                rowsPerPageOptions={[5, 10, 15]}

                                className="bg -white"
                            />
                        </div>
                    </div>
               
            </div>
        </>
    );
};

export default Vendor;
// "hover:bg-gray-50 transition cursor-pointer



// <h3 className="text-[#30336B] font-bold text-lg mb-2">xyz</h3>
// <p><span className="font-medium">Phone:</span> 23123</p>
// <p><span className="font-medium">Email:</span> abc@vendor.com</p>
// <p><span className="font-medium">GST:</span> GSTIN12334HGSD</p>
// <p><span className="font-medium">City:</span> Pune</p>
// <p><span className="font-medium">State:</span> Maharashtra</p>