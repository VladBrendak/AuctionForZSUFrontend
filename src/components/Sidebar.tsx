import React from "react";
import banana from '../images/banana.jpg';
  
  interface Category {
    name: string;
  }
  
  const categories: Category[] = [
    { name: "Категорія 1" },
    { name: "Категорія 2" },
    { name: "Категорія 3" },
  ];

  export function Sidebar() {
    return (
      <div className="w-80 h-100% bg-gray-200 flex flex-col justify-start items-center">
        <div className="mb-4 mt-10 text-center"> {/* Вертикальне центрування та відступ зверху */}
          <img 
          src={banana} 
          alt="Аватар" className="w-56 h-56 rounded-full mx-auto mb-2" /> {/* Збільшений розмір та центрування */}
          <h2 className="text-xl font-bold">Псевдонім користувача</h2>
        </div>
        <p className="text-gray-600 font-bold">Категорія</p>
        <ul className="text-gray-600">
          {categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
      );
};

export default Sidebar;
