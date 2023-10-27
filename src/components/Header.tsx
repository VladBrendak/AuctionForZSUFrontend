import React from "react";
import banana from '../images/banana.jpg';

export function Header(){
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold pr-2">Auctioneer</div>
        <img src={banana} alt="Лого" className="w-10 h-10 rounded-full" />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Пошук..."
          className="p-2 rounded-l-lg border-none focus:outline-none"
        />
        <button
          className="bg-blue-700 text-white p-2 rounded-r-lg focus:outline-none"
        >
          Пошук
        </button>
      </div>
    </header>
  );
}