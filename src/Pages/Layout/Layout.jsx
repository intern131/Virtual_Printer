import { Outlet } from "react-router-dom"
import SideBar from "../../Components/Sidebar/Sidebar"
import "../../assets/Style/Layout.css"

const Layout = () => {
    return(
        <>
       <div className="layout-wrapper">
        <SideBar/>
         
         <div className="main-content">
         <Outlet />
         </div>
            
      </div>
     
        </>
    )
}

export default Layout;