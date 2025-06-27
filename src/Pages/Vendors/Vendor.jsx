import React from 'react';
import { IoIosContact } from "react-icons/io";

const Vendor = () => {
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
                            <p className="text-2xl font-bold text-[#30336B]">45</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
                        <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                            <IoIosContact className="text-4xl" />
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">Pune</h4>
                            <p className="text-2xl font-bold text-[#30336B]">120</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4 hover:shadow-lg transition">
                        <div className="bg-blue-100 p-4 rounded-full text-[#30336B]">
                            <IoIosContact className="text-4xl" />
                        </div>
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">Maharashtra</h4>
                            <p className="text-2xl font-bold text-[#30336B]">320</p>
                        </div>
                    </div>

                </div>
            </div>


            {/* Table / Card Layout */}
            <div className="px-4 pb-10 max-w-6xl  overflow-x-hidden w-full  xl:max-w-screen">
                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-x-auto">
                    <table className="min-w-full text-sm text-center text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-[#30336B] text-white text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-2 py-3 border">Vendor Name</th>
                                <th className="px-2 py-3 border">Phone No</th>
                                <th className="px-2 py-3 border">Email ID</th>
                                <th className="px-2 py-3 border">GST</th>
                                <th className="px-2 py-3 border">City</th>
                                <th className="px-2 py-3 border">State</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition cursor-pointer">
                                <td className="px-2 py-3">xyz</td>
                                <td className="px-2 py-3">23123</td>
                                <td className="px-2 py-3">abc@vendor.com</td>
                                <td className="px-2 py-3">GSTIN12334HGSD</td>
                                <td className="px-2 py-3">Pune</td>
                                <td className="px-2 py-3">Maharashtra</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden flex flex-col gap-4 mt-4">
                    <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
                        <h3 className="text-[#30336B] font-bold text-lg mb-2">xyz</h3>
                        <p><span className="font-medium">Phone:</span> 23123</p>
                        <p><span className="font-medium">Email:</span> abc@vendor.com</p>
                        <p><span className="font-medium">GST:</span> GSTIN12334HGSD</p>
                        <p><span className="font-medium">City:</span> Pune</p>
                        <p><span className="font-medium">State:</span> Maharashtra</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Vendor;
