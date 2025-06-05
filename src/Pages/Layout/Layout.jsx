import { Outlet } from "react-router-dom"
import SideBar from "../../Components/Sidebar/Sidebar"
import "../../assets/Style/Layout.css"

const Layout = () => {
    return(
        <>
       <div className="layout-wrapper">
        <SideBar/>
         
         <div className="main-content max-lg:pl-20 w-100">
         <Outlet />
         </div>
            
      </div>
     
        </>
    )
}

export default Layout;