import React from "react";
import banana from "../images/banana.jpg";

export function UserPage(){
    return (
        <div className="bg-blue-500 min-h-screen flex flex-col items-center">
        <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
            <img
            src={banana}
            alt="Аватар користувача"
            className="w-96 h-96 ml-auto mx-auto lg:mx-0 rounded-full mb-4 lg:mr-4"
            />
            <div className="text-center text-white relative z-10">
            <h2 className="text-2xl font-bold">Псевдонім користувача</h2>
            <p className="text-gray-300">Додаткова інформація про користувача</p>
            </div>
        </div>

        <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
            <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Аукціони користувача</h2>
            <p className="text-gray-600">Додаткова інформація про аукціони</p>
            </div>
        </div>
        </div>
    );
}