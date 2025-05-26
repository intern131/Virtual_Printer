import { Outlet } from "react-router-dom"
import SideBar from "../../Components/Sidebar/Sidebar"

const Layout = () => {
    return(
        <>
        <SideBar/>
        <Outlet/>
        </>
    )
}

export default Layout;