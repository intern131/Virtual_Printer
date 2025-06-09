import { Outlet } from "react-router-dom"
import SideBar from "../../Components/Sidebar/Sidebar"
import "../../assets/Style/Layout.css"

const Layout = () => {
    return(
        <>
       <div className="layout-wrapper">
        <SideBar/>
         
         <main className="flex-1 pt-4 px-1 lg:ml-64 transition-all duration-300">
         <Outlet />
         </main>
            
      </div>
     
        </>
    )
}

export default Layout;