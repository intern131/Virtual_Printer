import { Outlet } from "react-router-dom"

import "../../assets/Style/Layout.css"
import VendorSidebar from "../../Components/Sidebar/VendorSidebar";

const VendorLayout = () => {
    return(
        <>
       <div className="layout-wrapper">
        <VendorSidebar/>
         
         <main className="flex-1 pt-4 px-1 lg:ml-64 transition-all duration-300">
         <Outlet />
         </main>
            
      </div>
     
        </>
    )
}

export default VendorLayout;