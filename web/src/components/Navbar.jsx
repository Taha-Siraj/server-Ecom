import React, { useContext, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import axios from 'axios';
import { toast } from 'sonner';
import { CiMenuFries } from "react-icons/ci";
import Home from '../Pages/Home';
import { FaHeart, FaLuggageCart, FaRegHeart } from 'react-icons/fa';
const Navbar = () => {

    const { state, dispatch } = useContext(GlobalContext);
      const [isMenuOpen, setMenuOpen] = useState(false);

      const navigate = useNavigate()
      const baseUrl = 'http://localhost:5004';
  // const baseUrl = 'https://server-ecom-rho.vercel.app';


     const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/product' },
    { title: 'Blog', path: '/blog' },
    { title: 'Hot Deal', path: '/hotdeal' },
    ...(state.user.user_role === 1 ?[
      { title: 'Add product', path: '/addproduct' },
      { title: 'Add Categories', path: '/AddCategories' },
    ]: [])
  ];
    const handleLogout = async () => {
      try {
        await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
        dispatch({ type: 'USER_LOGOUT' });
        toast.success('Logged out successfully!');
        navigate('/login');
      } catch (error) {
        console.error("Logout Error:", error);
        toast.error(error.response?.data?.message || "Failed to logout. Try again.");
      }
    };
  

  return (
    <div>
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-lg  ">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex-shrink-0 flex justify-between gap-x-3">
                <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="text-2xl text-violet-800 cursor-pointer"
                >
                {isMenuOpen ?  null :  <CiMenuFries/>}   
                </button>
              </div>
                <Link to="/" className="text-3xl text-green-600 uppercase font-bold no-underline">
                  <span className="text-black">E-</span>Shop
                </Link>
              </div>

              <div className="hidden lg:flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="relative group text-gray-600 no-underline hover:text-green-700 rounded-md text-base font-medium transition-colors">
                    {link.title}
                     <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
              
              <div className="hidden md:flex justify-center items-center gap-x-5">
                <button >     
                   <FaRegHeart className='text-2xl hover:text-green-700 transition-all duration-300 text-gray-600'/>        
                  </button>
                <button >     
                   <FaLuggageCart className='text-2xl hover:text-green-700 transition-all duration-300 text-gray-600'/>        
                  </button>
                 {(state?.user?.email) ? 
                    <IoIosLogOut onClick={handleLogout} className='text-3xl text-gray-600 cursor-pointer hover:text-gray-700'/>
                 : 
                null
                 }
                   
              </div>


              
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:bg-indigo-500 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
                 <div className="pt-4 pb-2">
                    {state?.user?.email? (
                        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all">
                            Logout
                        </button>
                     ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all">
                            Login
                        </Link>
                     )}
                 </div>
               
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  )
}

export default Navbar
