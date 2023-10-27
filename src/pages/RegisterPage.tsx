import React from "react";

export function RegisterPage()
{
    return(
        <>
            <div className="bg-blue-500 min-h-screen flex justify-center">
                <div className="bg-white h-full p-8 rounded-lg shadow-lg w-96">
                    <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Зареєструйтеся</h2>
                    </div>

                    <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600">Ім'я</label>
                        <input
                        type="text"
                        id="name"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ваше ім'я"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="example@example.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Пароль</label>
                        <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="********"
                        />
                    </div>

                    <div className="text-center">
                        <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                        Зареєструватися
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}

