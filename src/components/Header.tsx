import React from "react";
import logo from '../images/UA.jpg';
import { Link } from 'react-router-dom';

export function Header(){
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center">
            <div className="text-white text-2xl font-bold pr-2">Auctioneer</div>
            <img src={logo} alt="Лого" className="w-10 h-10 rounded-full border-4 border-sky-700" />
        </div>
      </Link>
      <div className="flex items-center">
        <span className="text-white text-lg ml-10 font-bold hover:text-gray-700"> <Link to={"/register"}> Register </Link></span>
        <span className="text-white text-lg ml-10 mr-5 font-bold hover:text-gray-700"> <Link to={"/login"}> Log in </Link></span>
      </div>
    </header>
  );
}