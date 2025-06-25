import React from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import FakeData from '../../Components/FakeData';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaDownload, FaEye } from "react-icons/fa";
import { useState,useEffect } from 'react';

defaults.maintainAspectRatio = false
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

const VendorHome = () => {


     const [Labels, setLabel] = useState([]);
      const [values, setValues] = useState([]);
      const [newlabel, setnewLabel] = useState([]);
      const [newvalues, setnewValues] = useState([]);
    
    const monthColors = [
        "#FF6384", // January - Red
        "#36A2EB", // February - Blue
        "#FFCE56", // March - Yellow
        "#4BC0C0", // April - Teal
        "#9966FF", // May - Purple
        "#FF9F40", // June - Orange
        "#C9CBCF", // July - Gray
        "#00A36C", // August - Green
        "#FF6F91", // September - Pink
        "#845EC2", // October - Indigo
        "#2C73D2", // November - Sky Blue
        "#F9C74F"  // December - Gold
      ];
      const monthLabels = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const BaseURl = import.meta.env.VITE_BARCHART_URL;
            const response = await fetch(BaseURl);
            const jsonData = await response.json();
            const sortedData = Object.entries(jsonData.month_wise).sort(([a], [b]) => { const parse = str => new Date(str); return parse(a) - parse(b) });
            console.log(" is sorted" + sortedData);
    
            const Monthlabels = Object.keys(jsonData.month_wise).map(key => key.split(" ")[0]);
            const Monthvalues = Object.values(jsonData.month_wise);
    
    
            setLabel(Monthlabels);
            setValues(Monthvalues);
    
            // console.log('Month Labels:', Monthlabels);
            // console.log('Values:', Monthvalues);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, []);
    
  return (
    <>
          <section className='pl-3'>




              <div className="nav">
                  <div className="title  text-center max-lg:text-large">
                      <h1 className="text-xl lg:text-xl sm:text-xl font-extrabold max-sm:text-2xl max-sm:font-semibold">DashBoard Overview</h1>


                  </div>



              </div>

              <div className="bg-[#f0f6ff] px-1 mx-8 py-10">
                  <div className="max-w-6xl  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Card 1 */}

                      <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
                          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                              <FaCalendarDay className="text-2xl" />
                          </div>
                          <div>
                              <h4 className="text-sm text-gray-500 font-medium">Daily Bill</h4>
                              <p className="text-2xl font-bold text-gray-800">234</p>
                          </div>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
                          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                              <FaCalendarWeek className="text-2xl" />
                          </div>
                          <div>
                              <h4 className="text-sm text-gray-500 font-medium">Weekly Bill</h4>
                              <p className="text-2xl font-bold text-gray-800">233</p>
                          </div>
                      </div>
                      {/* Card 3 */}
                      <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 flex items-center gap-4">
                          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                              <FaCalendarAlt className="text-2xl" />
                          </div>
                          <div>
                              <h4 className="text-sm text-gray-500 font-medium">Monthly Bills</h4>
                              <p className="text-2xl font-bold text-gray-800">123</p>
                          </div>
                      </div>
                  </div>
              </div>



              <div className="w-full px-2 sm:px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                      {/* Bar Chart */}
                      <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
                          {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">Bar Chart</h3> */}
                          <div className="h-64">
                              <Bar
                                  data={{
                                      labels: Labels,
                                      datasets: [
                                          {
                                              label: 'Test Data',
                                              data: values,
                                              backgroundColor: 'rgba(0, 24, 132, 0.8)', // tailwind blue-500
                                          },
                                      ],
                                  }}
                                  options={{
                                      responsive: true,
                                      maintainAspectRatio: false,
                                      scales: {
                                          x: {
                                              ticks: { autoSkip: false }
                                          }
                                      }
                                  }}

                              />
                          </div>
                      </div>

                      {/* Doughnut Chart */}
                      <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
                          {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">Doughnut Chart</h3> */}
                          <div className="h-64 flex items-center justify-center">
                              <Doughnut
                                  data={{
                                      labels: ['jan', 'feb', 'march'],
                                      datasets: [
                                          {
                                              label: 'months',
                                              data: ['20', '30', '40'],
                                              backgroundColor: monthColors,// yellow-400, cyan-400, blue-500
                                              borderColor: monthColors,
                                          },
                                      ],
                                  }}
                                  options={{
                                      responsive: true,
                                      maintainAspectRatio: false,
                                  }}
                              />
                          </div>
                      </div>

                      {/* Line Chart */}
                      <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
                          {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">Line Chart</h3> */}
                          <div className="h-64">
                              <Line
                                  data={{
                                      labels: FakeData.map((d) => d.label),
                                      datasets: [
                                          {
                                              label: 'Month-wise Bills',
                                              data: FakeData.map((d) => d.revenue),
                                              borderColor: '#ef4444', // red-500
                                              backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                              tension: 0.4,
                                              fill: true,
                                          },
                                      ],
                                  }}
                                  options={{
                                      responsive: true,
                                      maintainAspectRatio: false,
                                      scales: {
                                          x: {
                                              ticks: { autoSkip: false },
                                          },
                                      },
                                  }}
                              />
                          </div>
                      </div>

                  </div>
              </div>



          </section>

    </>
  )
}

export default VendorHome
