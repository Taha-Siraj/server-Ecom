import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner';
import { Link } from 'react-router-dom';
const AddCategories = () => {
    // const baseUrl = 'https://server-ecom-rho.vercel.app';
    const baseUrl = 'http://localhost:5004';

    const [CategoryForm, setCategoryForm] = useState({
        categoryName: "",
        description: "",
    });
    const [allcategories, setAllcategory] = useState([]);
    const [CategoryID, setCategoryID] = useState("");
    const [loader , setloader] = useState(false);
    const formRef = useRef(null);
    const [fetchLoading, setFetchLoading] = useState(false); 
    const handlecategoryChange = (e) => {
        let {name, value} = e.target
        setCategoryForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const fetchCategory = async () =>{
        setFetchLoading(true);
        try {
            let getCategory = await axios.get(`${baseUrl}/allcategories`);
            setAllcategory(getCategory.data);
            setFetchLoading(false);
        } catch (error) {
            toast.error('Something went wrong!');
        }
    }
    useEffect(() => {
        fetchCategory();
    } , []);
    const handleFormCategory = async (e) => {
        e.preventDefault();
        const {categoryName, description} = CategoryForm;
        if(!categoryName || !description){
             toast.warning('All Field Requried!');
            return;
        }
        if(CategoryID){
            try {
                setloader(true)
                let res1 = await axios.put(`${baseUrl}/category/${CategoryID}`,{
                    categoryName,
                    description
                })
                toast.success('Category Updated Successfully!');
                fetchCategory();
                setCategoryID("")
                setCategoryForm({categoryName: "" , description: ""})
                setloader(false)
            } catch (error) {
                toast.error('Something went wrong!');
                setloader(false)
        }
    }
    else{
        try {
            setloader(true)
            let res2 = await axios.post(`${baseUrl}/category`, {
                categoryName,
                description
            })
            fetchCategory();
            toast.success('Category Added Successfully!');
            console.log("res2.data", res2.data);
            setCategoryForm({categoryName: "" , description: ""})
            setloader(false)
        } catch (error) {
            toast.error('Something went wrong!');
            console.log("Post Err",error)   
            setloader(false)
        }
        }
    }
    
    const deleteCategory = async (id) => {
       try {
        let res = await axios.delete(`${baseUrl}/deletedcategory/${id}`);
          toast.success('Category Deleted!');
          console.log(res.data);
          fetchCategory()
        } catch (error) {
            toast.error('Category did not Deleted!');
            console.log(error)
       }
    }

  const cardStyles = "bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 w-full";
    const inputStyles = "w-[100%] mb-3 border-[0.1px] py-3 px-4 rounded-md bg-gray-700 text-gray-200 text-sm rounded-lg focus:ring-2 border-[#dadada58] placeholder:text-[16px]  outline-none transition duration-300 ";
    const titleStyles = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500  text-center";
    return (
    <>
    <Toaster position="top-center" richColors />
    <div className='pt-24 min-h-screen font-poppins flex bg-gray-900 justify-center items-center flex-col py-10 px-4 sm:px-6 lg:px-8'>
  <div ref={formRef} className='border border-gray-700 w-full max-w-md p-8 flex justify-center items-center flex-col gap-6 rounded-xl bg-gray-800 text-gray-100 shadow-2xl'> 
    <h1 className='text-3xl font-extrabold text-white mb-4'>{CategoryID ? "Update Category" : "Add Category"}</h1> 
    <form onSubmit={handleFormCategory} className="w-full flex flex-col gap-5"> 
      <input
        type="text"
        onChange={handlecategoryChange}
        name='categoryName'
        value={CategoryForm.categoryName}
        placeholder='Category Name'
        className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
      />
      <input
        type="text"
        onChange={handlecategoryChange}
        name='description'
        value={CategoryForm.description}
        placeholder='Category Description'
        className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200' 
      />
      <button
        className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex justify-center w-full rounded-lg py-3 px-4 items-center mt-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50' 
      >
        {loader ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : CategoryID ? "Update Category" : "Add Category"}
      </button>
    </form>
  </div>

  <button className='bg-green-600 hover:bg-green-700 text-white font-semibold flex justify-center mt-10 rounded-lg py-3 px-6 items-center shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'>
    <Link className='text-white' to={"/addproduct"}>Go to Add Product Page</Link> 
  </button>

  <div className="overflow-x-auto w-full max-w-5xl py-10">
    {fetchLoading ? (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <table className="min-w-full bg-gray-800 text-gray-100 font-poppins capitalize border border-gray-700 shadow-xl rounded-lg overflow-hidden"> 
        <thead className="bg-indigo-600 text-white"> 
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Category Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">Description</th>
            <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700"> 
          {allcategories.map((eachCat) => (
            <tr key={eachCat.category_id} className="hover:bg-gray-700 transition-colors duration-200"> 
              <td className="px-6 py-4 text-sm whitespace-nowrap">{eachCat.category_name}</td>
              <td className="px-6 py-4 text-sm">{eachCat.description}</td>
              <td className="px-6 py-4 flex justify-center items-center gap-3">
                <button
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  onClick={() => {
                    setCategoryID(eachCat.category_id);
                    setCategoryForm({
                      categoryName: eachCat.category_name,
                      description: eachCat.description,
                    });
                    setTimeout(() => { formRef.current?.scrollIntoView({ behavior: 'smooth' }) }, 100)
                  }}
                >
                  Edit
                </button>
                <button
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  onClick={() => deleteCategory(eachCat.category_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>
    </>
  )
}
export default AddCategories
