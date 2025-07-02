  import './index.css';
  import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
  import { Toaster } from "sonner";
  import { useEffect } from 'react';

  import LoginPage from './Pages/LoginPage/LoginPage';
  import Authorization from './Pages/LoginPage/Authorization';


  import Layout from './Pages/Layout/Layout';
  import Home from './Pages/Home/Home';
  import Bills from './Pages/Bills/Bills';
  import ExcelSheets from './Pages/ExcelSheet/Excel';
  import Vendor from './Pages/Vendors/Vendor';

  import Usererror from './Components/Usererror';
  import VendorBill from './Pages/VendorPages/VendorBill';
  import VendorHome from './Pages/VendorPages/VendorHome';
  import VendorLayout from './Pages/Layout/VendorLayout'

  const App = () => {
    const navigate=useNavigate();
    
     
    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (location.pathname === '/' && token && role) {
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'vendor') {
          navigate('/user');
        }
      }
    }, [navigate, location.pathname]);
    


    return (
      <>
        <Toaster richColors position="top-center" />
        <Routes>

          {/* public path */}
          <Route path='/' element={<LoginPage />} />
          <Route element={<Authorization />}>
  {/* admin route */}
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="bills" element={<Bills />} />
              <Route path="excelsheets" element={<ExcelSheets />} />
              <Route path="vendors" element={<Vendor />} >
              
              </Route>
            </Route>

            {/* VendorRoutes */}
            <Route path='/user' element={<VendorLayout />}>
              <Route index element={<VendorHome />} />
              <Route path="VendorBill" element={<VendorBill />} />
            </Route>
            

          </Route>

          {/* 404 Page */}
          <Route path="*" element={<Usererror />} />
        </Routes>
      </>
    );
  };

  export default App;
