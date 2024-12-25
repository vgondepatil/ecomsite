import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);
    
    const categories = {
        apparel: {
            title: 'Apparel',
            items: [
                { id: 1, name: "Men's Clothing", path: '/category/mens-clothing' },
                { id: 2, name: "Women's Clothing", path: '/category/womens-clothing' },
                { id: 3, name: 'Kids Wear', path: '/category/kids' },
                { id: 4, name: 'Accessories', path: '/category/accessories' },
                { id: 5, name: 'Footwear', path: '/category/footwear' },
            ]
        },
        electronics: {
            title: 'Electronics',
            items: [
                { id: 1, name: 'Smartphones', path: '/category/smartphones' },
                { id: 2, name: 'Laptops', path: '/category/laptops' },
                { id: 3, name: 'Audio Devices', path: '/category/audio' },
                { id: 4, name: 'Gaming', path: '/category/gaming' },
                { id: 5, name: 'Accessories', path: '/category/electronics-accessories' },
            ]
        }
    };
    
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      
      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <div className="relative">
            <div
                className='flex flex-col items-center gap-1 cursor-pointer'
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
            >
                <p>CATEGORY</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                
                {/* Category Dropdown */}
                {categoryOpen && (
                    <div className='absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-md py-4 z-50 mt-1'>
                        <div className="flex">
                            {/* Apparel Section */}
                            <div className="flex-1 px-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-2">
                                    {categories.apparel.title}
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {categories.apparel.items.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.path}
                                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Vertical Divider */}
                            <div className="w-[1px] bg-gray-200"></div>

                            {/* Electronics Section */}
                            <div className="flex-1 px-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-2">
                                    {categories.electronics.title}
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {categories.electronics.items.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.path}
                                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </ul>

      <div className='flex items-center gap-6'>
            <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            
            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {/* Dropdown Menu */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>}
            </div> 
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link> 
            {/* <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer' alt="" />  */}
            
            <Link to='/wishlist' className='relative'>
                <img src={assets.wishlist_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link> 
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer' alt="" />
      </div>

        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                    <div className="py-2 pl-6 border">
                        <p className="font-semibold mb-2">APPAREL</p>
                        {categories.apparel.items.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setVisible(false)}
                                className="block py-1 pl-4 text-gray-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="py-2 pl-6 border">
                        <p className="font-semibold mb-2">ELECTRONICS</p>
                        {categories.electronics.items.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setVisible(false)}
                                className="block py-1 pl-4 text-gray-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
        </div>

    </div>
  )
}

export default Navbar
