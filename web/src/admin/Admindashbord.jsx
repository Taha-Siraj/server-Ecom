import React from 'react';
import { Link, Links } from 'react-router-dom';

const Admindashbord = () => {
  return (
    <div className="flex h-screen bg-gray-100 mt-24">
      <aside className="w-64 bg-gray-800 text-white shadow-lg">
        <div className="p-6 text-2xl font-semibold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="mt-6">
          <Link to='AddProducts' className="block py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out">
            AddProducts
          </Link>
          <Link href="#" className="block py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out">
             Analytics
          </Link>
          <a href="#" className="block py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out">
            <i className="fas fa-users mr-3"></i> Users
          </a>
          <a href="#" className="block py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out">
            <i className="fas fa-cogs mr-3"></i> Settings
          </a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200 shadow-md">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-bell text-xl"></i>
            </button>
            <div className="relative">
              <img
                src="https://via.placeholder.com/40" 
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Sales</h2>
              <p className="text-4xl font-bold text-blue-600">$12,345</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">New Users</h2>
              <p className="text-4xl font-bold text-green-600">2,100</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pending Orders</h2>
              <p className="text-4xl font-bold text-yellow-600">50</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Logged in</td>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">2025-07-05</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Updated Profile</td>
                  <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">2025-07-04</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admindashbord;