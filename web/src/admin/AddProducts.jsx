import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const AddProducts = () => {
  // const baseUrl = 'https://server-ecom-rho.vercel.app';
  const baseUrl = 'http://localhost:5004';
  
  const [productform, setproductform] = useState({
    productName: "",
    price: "",
    description: "",
    categoryId: "",
    productImg: "",
  });
  const [allcategories , setAllcategory] = useState([]);
  const [allAddProducts , setAllAddproducts] = useState([]);
  const [productId, setproductId] = useState("");
  const [loading, setloading] = useState(false);
  const [deletedProductID , setdeletedProductID] = useState("");
  const formRef = useRef(null)
  const handleChange = (e) => {
    const {name , value} = e.target;
    setproductform((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log(name, value)
  }
    const fetchCategory = async () => {
    try {
      let res = await axios.get(`${baseUrl}/allcategories`);
      setAllcategory(res.data)
      console.log(res.data)
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }
  const fetchProducts = async () => {
    try {
       let res =  await axios.get(`${baseUrl}/allproducts`);
       setAllAddproducts(res.data);
       console.log(res.data);
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }
    
  const addproduct = async (e) => {
    e.preventDefault();
    let {productName, price, description, categoryId, productImg} = productform;
    if(!productName || !price || !description || !categoryId || !productImg){
      toast.warning("All Field are Requried");
      return;
    }

    if(productId){
      try {
        setloading(true);
        let res = await axios.put(`${baseUrl}/product/${productId}`,{
          productName,
          price,
          description,
          productImg,
          categoryId
        })
        fetchProducts();
        setproductId("")  
        setproductform({
        productName: "",
        price: "",
        description: "",
        categoryId: "",
        productImg: "",
        })
        setloading(false)
      } catch (error) {
        console.log(error?.response?.data?.message)
        setloading(false)
      }
    }
    else{
      try {
        setloading(true)
        let res = await axios.post(`${baseUrl}/products`,{
        productName,
        price,
        description,
        productImg,
        categoryId
      })
      console.log(res.data);
      setproductform({
        productName: "",
        price: "",
        description: "",
        categoryId: "",
        productImg: "",
      })
      fetchProducts();
      setloading(false);
      toast.success("Product Added Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
      setloading(false);
    }
    }
  }  

  const deletedProduct = async (id) => {
    try {
      setdeletedProductID(id)
      let res = await axios.delete(`${baseUrl}/product/${id}`)
      console.log(res.data);
      toast.success('Deleted Product!');
      fetchProducts()
    } catch (error) {
      console.log(error)
      toast.error('Product dit not Deleted!');
    }
  }
  useEffect(() => {
    fetchCategory();
    fetchProducts();
  },[])


  const inputStyle = 'border-[0.5px] py-3 px-4 rounded-md placeholder:text-gray-300 w-full border-[#dadada6e] bg-gray-700 outline-none focus:border-gray-300 transition-all duration-75';
  const titleStyles = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500  text-center";
  return (
    <>
    <div className='pt-24 bg-gray-950 py-10 min:h-screen flex justify-center items-center flex-col gap-y-10'>
  <Toaster position="top-center" richColors />
  <form ref={formRef} onSubmit={addproduct} className='flex justify-center flex-col border-[0.2px] border-[#dadada4a] rounded-xl min:h-[400px] w-[400px] bg-gray-800 text-gray-200 gap-y-5 font-poppins px-8 py-8 shadow-2xl'> 
    <h1 className='text-3xl font-extrabold text-white mb-4'>{productId ? "Update Product" : "Add Product"}</h1> 
    <input
      type="text"
      name='productName'
      value={productform.productName}
      onChange={handleChange}
      placeholder='Product Name'
      className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
    />
    <input
      type="number"
      name='price'
      value={productform.price}
      onChange={handleChange}
      placeholder='Product price'
      className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
    />
    <input
      type="text"
      value={productform.description}
      placeholder='Product description'
      name='description'
      onChange={handleChange}
      className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
    />
    <input
      type="text"
      name='productImg'
      onChange={handleChange}
      value={productform.productImg}
      placeholder='Product Image URL'
      className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
    />
    <select
      className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
      name='categoryId'
      value={productform.categoryId}
      onChange={handleChange}
    >
      <option value="" className='text-gray-400'>Select A category</option>
      {allcategories.map((cat) => (
        <option key={cat.category_id} value={cat.category_id} className='bg-gray-700 text-white'>
          {cat.category_name}
        </option>
      ))}
    </select>
    <button
      className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex justify-center w-full rounded-lg py-3 px-4 items-center mt-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50' 
    >
      {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : productId ? "Update Product" : "Add Product"}
    </button>
  </form>

  <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex justify-center rounded-lg py-3 px-6 items-center shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
    <Link className='text-white' to={"/addcategories"}>Add category Page</Link>
  </button>

  <div className="flex flex-wrap justify-center gap-8 px-5 w-full py-8">
    {allAddProducts.map((eachProduct) => (
      <div
        key={eachProduct?.product_id}
        className="bg-gray-800 rounded-xl p-6 w-[320px] flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-[0.2px] border-[#dadada4a]"
      >
        <div className="w-full flex justify-center mb-5">
          <img
            src={eachProduct?.product_img}
            alt={eachProduct?.product_name || "Product Image"}
            className="h-[200px] w-full object-cover rounded-lg border-[0.2px] border-[#dadada4a]"
          />
        </div>

        <div className="flex flex-col gap-3 mb-6 flex-grow">
          <h3 className="text-xl font-bold text-white truncate">
            {eachProduct?.product_name}
          </h3>
          <p className="text-lg font-bold text-green-400">
            PKR: {eachProduct?.price}
          </p>
          <p className="text-sm text-gray-300 line-clamp-3">
            {eachProduct?.description || "No description available."}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={() => {
              setproductId(eachProduct?.product_id);
              setproductform({
                productName: eachProduct?.product_name,
                price: eachProduct?.price,
                description: eachProduct?.description,
                productImg: eachProduct?.product_img,
                categoryId: eachProduct?.category_id,
              });
              setTimeout(() => {
                formRef.current.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Edit Product
          </button>

          <button
            onClick={() => deletedProduct(eachProduct?.product_id)}
            className="bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            {deletedProductID === eachProduct.product_id ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Delete Product"
            )}
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  )
}

export default AddProducts
