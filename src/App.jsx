
import './index.css'  
import Usererror from "./Components/Usererror"
import { Routes, Route } from 'react-router-dom';
import ExcelSheets from './Pages/ExcelSheet/Excel'
import Home from './Pages/Home/Home'
import Bills from "./Pages/Bills/Bills"
import Layout from './Pages/Layout/Layout';
import "./assets/Style/Tailwind.css"
import { Toaster } from "sonner"
import LoginPage from './Pages/LoginPage/LoginPage';
import Authorization from './Pages/LoginPage/Authorization';
import Vendor from './Pages/Vendors/Vendor';



const App = () => {


  return (
      <>
       <Toaster richColors position="top-center" />
    <Routes>
        <Route path='/' element={<LoginPage/>}/>

    <Route element={<Authorization />}>
  <Route path="/dashboard" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="bills" element={<Bills />} />
    <Route path="excelsheets" element={<ExcelSheets />} />
    <Route path='Vendors' element={<Vendor/>}/>
  </Route>
</Route>


    
    <Route path="*" element={<Usererror />} />
  </Routes>
      </>
    
  )
}

export default App
