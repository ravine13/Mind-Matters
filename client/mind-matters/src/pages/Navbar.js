import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <i className='bx bx-menu text-2xl'></i>
      <a href="#" className="text-lg">Categories</a>
      <form id="searchForm" action="#" className="flex flex-1 max-w-lg mx-4">
        <div className="relative flex-1">
          <input
            id="searchInput"
            type="search"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 px-4 py-2 bg-gray-600 rounded-r text-white"
          >
            <i className='bx bx-search'></i>
          </button>
        </div>
      </form>
      <div className="flex items-center">
        <input type="checkbox" id="switch-mode" hidden />
        <label htmlFor="switch-mode" className="switch-mode mx-4"></label>
        <a href="#" className="relative">
          <i className='bx bxs-bell text-2xl'></i>
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">8</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
