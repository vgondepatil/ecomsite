import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-gray-50'>
      <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 my-10 mt-40 text-sm px-4 max-w-7xl mx-auto'>
        {/* Company Logo and Social Media */}
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="Forever You Logo" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className='flex gap-4 mt-6'>
                <FaFacebook className='text-gray-600 text-xl hover:text-blue-600 cursor-pointer' />
                <FaTwitter className='text-gray-600 text-xl hover:text-blue-400 cursor-pointer' />
                <FaInstagram className='text-gray-600 text-xl hover:text-pink-600 cursor-pointer' />
                <FaLinkedin className='text-gray-600 text-xl hover:text-blue-700 cursor-pointer' />
            </div>
        </div>

        {/* About Us Section */}
        <div>
            <p className='text-xl font-medium mb-5'>ABOUT US</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li className='hover:text-gray-900 cursor-pointer'>Our Story</li>
                <li className='hover:text-gray-900 cursor-pointer'>Careers</li>
                <li className='hover:text-gray-900 cursor-pointer'>Privacy Policy</li>
                <li className='hover:text-gray-900 cursor-pointer'>Terms & Conditions</li>
            </ul>
        </div>

        {/* Contact Us Section */}
        <div>
            <p className='text-xl font-medium mb-5'>CONTACT US</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@foreveryou.com</li>
                <li className='max-w-[200px]'>123 Forever Street, New York, NY 10001, USA</li>
            </ul>
        </div>

        {/* Sell With Us Section */}
        <div>
            <p className='text-xl font-medium mb-5'>SELL WITH US</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>
                    <a 
                        href="http://localhost:5173" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='hover:text-gray-900 cursor-pointer'
                    >
                        Start Selling
                    </a>
                </li>
                <li>
                    <select className='bg-transparent text-gray-600 cursor-pointer hover:text-gray-900'>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                    </select>
                </li>
            </ul>
        </div>
      </div>

      <div>
        <hr className='max-w-7xl mx-auto' />
        <p className='py-5 text-sm text-center text-gray-600'>
            Copyright © 2024 Forever You. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
