import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';
import Products from '../Pages/Products';
import AddProducts from '../admin/AddProducts';
import AddCategories from '../admin/AddCategories';
import Navbar from '../components/Navbar';
import Productsdetail from '../Pages/Productsdetail';
import Allblogs from '../Blog/Allblogs';
import Admindashbord from '../admin/Admindashbord';

const CustomRoutes = () => {
  const { state, loading } = useContext(GlobalContext);

  if (loading) {
    return <div className="text-white text-2xl text-center p-8">Loading...</div>;
  }

  const isAdmin = state.isLogin && state.user?.user_role === 1;
  const isUser = state.isLogin && state.user?.user_role === 4;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      {!state.isLogin && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {/* USER ROUTES */}
      {isUser && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/blog" element={<Allblogs />} />
          <Route path="/productsdetails/:id" element={<Productsdetail />} />
          <Route path="/addproduct" element={<Navigate to="/" />} />
          <Route path="/addcategories" element={<Navigate to="/" />} />
          <Route path="/admin" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {isAdmin && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admindashbord />} />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/addcategories" element={<AddCategories />} />
          <Route path="/product" element={<Products />} />
          <Route path="/blog" element={<Allblogs />} />
          <Route path="/productsdetails/:id" element={<Productsdetail />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      )}
      
    </Routes>
  );
};

export default CustomRoutes;
