// import React, { useState } from 'react'
// import { CiMenuBurger } from "react-icons/ci"
// import { Link } from "react-router-dom"
// import "../../assets/Style/HomeSidebar.css"
// const SideBar = () => {


//   const [active, setactive] = useState(false);

//   const toggleSidebar = () => {
//     setactive(prev => !prev);
//   }
//   return (
//     <>

//       <CiMenuBurger
//         className={`Menu-btn ${active ? 'open' : 'closed'}`} onClick={toggleSidebar} />

//       <section className={`Sidebar ${active ? 'Open' : 'closed'}`}>

//         <div className="Profile">
//           <img className={`Photo ${active ? 'Open' : 'Closed'}`} src="src/assets/Photos/Market_excel logo.webp" alt="Profile" />


//         </div>


//         <div className="event">
//           <p className='Pointer'><span></span> <Link to={"/"} > Dashboard</Link></p>
//           <p className='Pointer'><span></span><Link to={"/Bills"}>Bills</Link> </p>
//           <p className='Pointer'><span></span><Link to={"/ExcelSheets"}>ExcelSheets</Link></p>
//           <p className='Pointer'><span></span><Link to={'/Usererror'}>Logout</Link></p>

//         </div>




//       </section>


//     </>
//   )
// }

// export default SideBar;

import React, { useState, useRef, useEffect } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate(); // Add this

  // checktoken is present or not
  const checktoken= ()=>{
    const token=localStorage.getItem('token');
    if(!token){
      <navigate to ='/'/>
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    if(window.confirm('Are Sure to logout')){
    
         localStorage.removeItem('token');
         localStorage.removeItem('role');
        navigate('/');
    }
    else{
      
    }
 
  };


  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Dashboard', to: '/admin' },
    { name: 'Bills', to: '/admin/bills' },
    { name: 'Excel Sheets', to: '/admin/ExcelSheets' },
    { name: 'vendors', to: '/admin/Vendors'},

  ];

  return (
    <>
      {/* Burger Button - Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-full lg:hidden"
        aria-label="Toggle Sidebar"
      >
        <CiMenuBurger className="text-2xl text-[#30336B]" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#30336B] text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex justify-center ">
          <img
            src="/src/assets/Photos/Market_excel logo.webp"
            alt="Logo"
            className="w-28 h-auto object-contain rounded-full"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-4 text-white font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:bg-white hover:text-[#30336B] px-4 py-2 rounded transition-colors ${location.pathname === link.to
                  ? 'bg-white text-[#30336b]'
                  : ''
                }`}
                onClick={checktoken}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-left hover:bg-white hover:text-[#30336B] px-4 py-2 rounded transition-colors cursor-pointer"
          >Logout</button>
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;
