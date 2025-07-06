import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";
import { FaLuggageCart } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaGroupArrowsRotate } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShareAlt } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsArrowReturnLeft } from "react-icons/bs";
import { GlobalContext } from '../Context/Context';
const ProductDetail = () => {
    const {state } = useContext(GlobalContext); 

  const baseUrl = state.baseUrl;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
 const [wishlis , setwishlis] = useState(false);
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${baseUrl}/allproducts`);
      const matchedProduct = res.data.find((item) => 
        String(item.product_id) === String(id)
      );
      setProduct(matchedProduct || null);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    toast.success('Product added to cart successfully!');
  }

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10 text-red-500">Product not found</p>;

  return (
    <div className="mt-24 font-poppins px-16 py-2 flex flex-col gap-4 md:flex-row justify-between  items-start">
      <Toaster position="top-right" richColors />

     <div className='h-[550px] w-full border p-5 rounded-lg flex justify-center items-center '>
       <img src={product.product_img} alt={product.product_name} className="w-full h-full object-center hover:scale-110 transition-all duration-300 cursor-pointer" />
     </div>
      <div className='flex flex-col px-0 py-0 gap-0 justify-start items-start'>
        <h2 className="text-2xl md:text-3xl font-semibold">{product.product_name}</h2>
        <p className='text-gray-500 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde illum expedita dolores aut nostrum, quidem placeat laborum nemo, beatae perspiciatis quae, sint tempore aliquid molestiae consequatur eum earum.</p>
        <p className="flex justify-center items-center gap-x-2 text-sm text-gray-600 capitalize"><span className='text-[18px] text-black font-semibold' >Description:</span> {product.description || "No description available."}</p>
        <p className="text-md  w-full  text-[#2e902a] flex items-center">
        <MdOutlineStarPurple500 />
        <MdOutlineStarPurple500 />
        <MdOutlineStarPurple500 />
        <MdOutlineStarPurple500 />
        <MdStarPurple500 />
        <span className="text-sm  text-black font-semibold">(120)</span>
      </p>
      <hr className='bg-gray-100 h-[0.1px] w-full'/>
      <p className="text-lg text-green-800 font-bold">Rs. {product.price}.00</p>
      <span className='text-green-700  font-semibold capitalize bg-green-100 py-[2px] rounded-lg px-2'>in Stock</span>
      <hr className='bg-gray-100 h-[0.1px] w-full'/>
      <div className='flex justify-between w-full gap-x-5'>
        <button 
      onClick={handleAddToCart}
      className='bg-[#063222cc] w-full flex justify-center gap-x-2 items-center rounded-lg py-2 px-4 font-semibold hover:bg-[#063c28] transition-all  text-[#f0f0f0] '><FaLuggageCart/>

      Add To cart
      </button>
      <button className='border-[0.5px] border-green-600 p-2 rounded-md' > 
       {wishlis? <FaHeart className='text-xl object-cover   text-green-900' onClick={() => setwishlis(!wishlis) } />
       :
       <FaRegHeart className='text-xl object-cover text-green-600' onClick={() => setwishlis(!wishlis) }/>  
        }
       </button>
      </div>
    <details class="pt-3 w-full">
  <summary class="cursor-pointer hover:underline  capitalize">
    <span className='text-[16px] font-semibold'>  {product.product_name}</span>
  </summary>
  <div class="flex justify-between items-center ">
    <div className='flex flex-col justify-start items-start space-y-0 '>
      <p className='m-0' >category:</p>
      <p>Collection:</p>
      <p>Stock:</p>
    </div>
    <div className='flex flex-col justify-start items-start space-y-0'>
      <p className='m-0'>{product.category_name}</p>
      <p>2025</p>
      <p>available</p>
    </div>
  </div>
</details>

<hr className='bg-gray-100 h-[0.1px] w-full'/>
<div className='flex justify-between items-center w-full' >
  <span className='hover:text-red-600 cursor-pointer text-sm flex justify-center items-center gap-x-2 '><FaGroupArrowsRotate/>Compare color</span>
  <span className='hover:text-red-600 cursor-pointer text-sm flex justify-center items-center gap-x-2 '><FaRegQuestionCircle/>Ask a question</span>
  <span className='hover:text-red-600 cursor-pointer text-sm flex justify-center items-center gap-x-2 '><TbTruckDelivery/>Delivery & Return</span>
  <span className='hover:text-red-600  cursor-pointer text-sm flex justify-center items-center gap-x-2 '><FaShareAlt/>Share</span>
</div>
<div className='border w-full mt-3 space-y-0 ' >
<div className='flex gap-x-3 justify-start py-1 items-center px-3' >
<i><CiDeliveryTruck className='text-orange-600 text-3xl' /></i>
<span className='flex justify-start items-start flex-col' > Free Delivery <p className=' underline text-sm'>Enter your Postal code for Delivey Availability.</p> </span>
</div>
<hr className='bg-gray-100 h-[0.1px] py-1 w-full'/>
<div className='flex gap-x-3 justify-start items-center px-3' >
<i><BsArrowReturnLeft className='text-orange-600 text-3xl' /></i>
<span className='flex justify-start items-start flex-col' > Return Delivery <p className='underline text-sm'>Free 30days Delivery Returns. Details</p> </span>
</div>
<div>

</div>
</div>
      </div>
    </div>
  );
};

export default ProductDetail;
