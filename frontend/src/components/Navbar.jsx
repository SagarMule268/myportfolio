import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../style.js';
import { navLinks } from '../constants';
import { logo1, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={`${styles.paddingX} w-full flex justify-center items-center  fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo1} alt="logo" className='w-20 h-20 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>Sagar &nbsp; <span className='sm:block hidden'>Mule</span></p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {
            navLinks.map((link) => (
              <li key={link.id}
                className={
                  `${active === link.title ? "text-white" : "text-secondary"}
                    hover:text-white text-[18px] font-medium cursor-pointer  `
                }
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}> {link.title} </a>
              </li>
            ))
          }

        </ul>

   <div className="sm:hidden flex flex-1 justify-end items-center relative">
  {/* Menu Icon */}
  <img
    src={toggle ? close : menu}
    alt="menu"
    aria-label="Toggle menu"
    className="w-7 h-7 object-contain cursor-pointer"
    onClick={() => setToggle(!toggle)}
  />

  {/* Dropdown Menu */}
  <div
    className={`
      absolute top-10 right-0 bg-tertiary rounded-xl p-4 z-50 overflow-hidden
      transform transition-all duration-300 ease-in-out
      ${toggle ? 'opacity-100 translate-y-0 max-h-96 flex' : 'opacity-0 -translate-y-5 max-h-0 hidden'}
    `}
  >
    <ul className="list-none flex flex-col gap-4">
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`
            ${active === link.title ? 'text-white' : 'text-[#aaa6c3]'}
            hover:text-white text-[18px] font-medium cursor-pointer
          `}
          onClick={() => {
            setToggle(false)
            setActive(link.title)
          }}
        >
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}
    </ul>
  </div>
</div>




      </div>
    </nav>
  )
}

export default Navbar