import React, {useState, ChangeEvent}  from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function AddAuctionPage(){
    const [auctionData, setAuctionData] = useState({
        title: '',
        description: '',
        startBid: '',
        endDate: null as Date | null,
      });
    
      const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setAuctionData({ ...auctionData, [name]: value });
      };
    
      return (
        <div className="bg-blue-500 min-h-screen flex flex-col items-center">
            <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg text-white text-center">
                <h1 className="text-3xl font-bold mb-4">Створення аукціону</h1>
                <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-300">Заголовок аукціону</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={auctionData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-300">Опис аукціону</label>
                    <textarea
                    id="description"
                    name="description"
                    value={auctionData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-300">Початкова ставка</label>
                    <textarea
                    id="startBid"
                    name="startBid"
                    value={auctionData.startBid}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-gray-300">Дата та час завершення аукціону</label>
                    <DatePicker
                    id="endDate"
                    selected={auctionData.endDate}
                    onChange={(date: Date) => setAuctionData({ ...auctionData, endDate: date })}
                    showTimeSelect={true}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                    className="w-full p-2 border border-gray-300 text-center text-gray-800 rounded"
                    />
                </div>

                <div className="text-center">
                    <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                    Створити аукціон
                    </button>
                </div>
                </form>
            </div>
        </div>
      );
}