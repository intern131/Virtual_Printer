import React, { useState } from 'react'
import { CiMenuBurger } from "react-icons/ci"
import { Link } from "react-router-dom"
import "../../assets/Style/HomeSidebar.css"
const SideBar = () => {


  const [active, setactive] = useState(false);

  const toggleSidebar = () => {
    setactive(prev => !prev);
  }
  return (
    <>

      <CiMenuBurger
        className={`Menu-btn ${active ? 'open' : 'closed'}`} onClick={toggleSidebar} />

      <section className={`Sidebar ${active ? 'Open' : 'closed'}`}>

        <div className="Profile">
          <img className={`Photo ${active ? 'Open' : 'Closed'}`} src="src/assets/Photos/Market_excel logo.webp" alt="Profile" />


        </div>


        <div className="event">
          <p className='Pointer'><span></span> <Link to={"/"} > Dashboard</Link></p>
          <p className='Pointer'><span></span><Link to={"/Bills"}>Bills</Link> </p>
          <p className='Pointer'><span></span><Link to={"/ExcelSheets"}>ExcelSheets</Link></p>
          <p className='Pointer'><span></span><Link to={'/Usererror'}>Logout</Link></p>

        </div>




      </section>


    </>
  )
}

export default SideBar;