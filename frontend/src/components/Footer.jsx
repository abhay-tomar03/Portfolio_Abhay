import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-[#0a192f] border-t border-gray-700' : 'bg-neutral-100 border-t border-gray-200'} ${isDark ? 'text-gray-400' : 'text-gray-600'} py-12 fade-in-up`}>
      <div className='max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* About Section */}
          <div className='fade-in-up'>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
              Abhay Tomar
            </h3>
            <p className='text-sm leading-relaxed'>
              Frontend Software Engineer specializing in React.js, JavaScript, and modern web technologies. Building beautiful and performant user interfaces.
            </p>
          </div>

          {/* Quick Links */}
          <div className='fade-in-up'>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link to='home' smooth={true} duration={500} offset={-80} className={`cursor-pointer hover:text-rose-500 transition ${isDark ? 'hover:text-rose-400' : ''}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='about' smooth={true} duration={500} offset={-80} className={`cursor-pointer hover:text-rose-500 transition ${isDark ? 'hover:text-rose-400' : ''}`}>
                  About
                </Link>
              </li>
              <li>
                <Link to='skills' smooth={true} duration={500} offset={-80} className={`cursor-pointer hover:text-rose-500 transition ${isDark ? 'hover:text-rose-400' : ''}`}>
                  Skills
                </Link>
              </li>
              <li>
                <Link to='experience' smooth={true} duration={500} offset={-80} className={`cursor-pointer hover:text-rose-500 transition ${isDark ? 'hover:text-rose-400' : ''}`}>
                  Experience
                </Link>
              </li>
              <li>
                <Link to='work' smooth={true} duration={500} offset={-80} className={`cursor-pointer hover:text-rose-500 transition ${isDark ? 'hover:text-rose-400' : ''}`}>
                  Work
                </Link>
              </li>
              <li>
                <Link to='contact' smooth={true} duration={500} offset={-80} className={`cursor-pointer hover:text-rose-500 transition ${isDark ? 'hover:text-rose-400' : ''}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='fade-in-up'>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>
              Connect
            </h3>
            <div className='flex gap-4'>
              <a
                href='https://github.com/abhay-tomar03'
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition ${isDark ? 'bg-gray-700 hover:bg-rose-500' : 'bg-gray-300 hover:bg-rose-500'} hover:text-white`}
                aria-label='GitHub'
              >
                <FaGithub size={20} />
              </a>
              <a
                href='https://www.linkedin.com/in/abhay-tomar'
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition ${isDark ? 'bg-gray-700 hover:bg-blue-500' : 'bg-gray-300 hover:bg-blue-500'} hover:text-white`}
                aria-label='LinkedIn'
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href='mailto:abhay.tomar5670@gmail.com'
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition ${isDark ? 'bg-gray-700 hover:bg-green-500' : 'bg-gray-300 hover:bg-green-500'} hover:text-white`}
                aria-label='Email'
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`my-8 ${isDark ? 'border-gray-700' : 'border-gray-300'} border-t`}></div>

        {/* Bottom Footer */}
        <div className='text-center text-sm fade-in-up'>
          <p className='flex items-center justify-center gap-2'>
            Made with <FaHeart className='text-rose-500' size={16} /> by Abhay Tomar
          </p>
          <p className='mt-2 opacity-75'>
            © {currentYear} Abhay Tomar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
