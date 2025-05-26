
import './index.css'  
import Usererror from "./Components/Usererror"
import { Routes, Route } from 'react-router-dom';
import ExcelSheets from './Pages/ExcelSheet/Excel'
import Home from './Pages/Home/Home'
import Bills from "./Pages/Bills/Bills"
import Layout from './Pages/Layout/Layout';




const App = () => {


  return (
   
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home/>}/>
      <Route path="Bills" element={<Bills />} />
      <Route path="ExcelSheets" element={<ExcelSheets />} />
      </Route>
      <Route path="*" element={<Usererror />} />
    
  </Routes>
      
    
  )
}

export default App
