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

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu"
            className='w-7 h-7 object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />
          <div className={`${!toggle ? 'hidden' : 'flex'}`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {
                navLinks.map((link) => (
                  <li key={link.id}
                    className={
                      `${active === link.title ? "text-white" : "text-[#aaa6c3]"}
                    hover:text-white text-[18px] font-medium cursor-pointer  `
                    }
                    onClick={() => {
                      setToggle(!toggle)
                      setActive(link.title)
                    }}
                  >
                    <a href={`#${link.id}`}> {link.title} </a>
                  </li>
                ))
              }

            </ul>
          </div>
        </div>


      </div>
    </nav>
  )
}

export default Navbar