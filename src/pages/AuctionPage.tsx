import React from "react";
import banana from "../images/banana.jpg";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export function AuctionPage(){

    const auctionData = {
        photos: [
          banana,
          banana,
          banana,
        ],
        title: 'Назва аукціону',
        description: 'Додаткова інформація про аукціон',
        bids: [
          { bidder: 'Користувач 1', amount: 100 },
          { bidder: 'Користувач 2', amount: 150 },
          { bidder: 'Користувач 3', amount: 200 },
        ],
      };

    return (
      //   <div className="bg-blue-500 min-h-screen flex flex-col items-center">
      //   <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
      //     <img
      //       src={banana}
      //       alt="Аватар користувача"
      //       className="w-96 h-96 ml-auto mx-auto lg:mx-0 rounded-full mb-4 lg:mr-4"
      //     />
      //     <div className="text-center text-white relative z-10">
      //       <h1 className="text-3xl font-bold mb-2">{auctionData.title}</h1>
      //       <p className="text-gray-300">{auctionData.description}</p>
      //     </div>
      //   </div>
  
      //   <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
      //     <div className="text-center lg:text-left">
      //       <h2 className="text-2xl font-bold">Ставки на аукціоні</h2>
      //       <p className="text-gray-600">Додаткова інформація про аукціони</p>
      //     </div>
      //   </div>
      // </div>

      <div className="bg-blue-500 min-h-screen flex flex-col items-center">
      <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg text-white text-center">
        <h1 className="text-3xl font-bold mb-4">{auctionData.title}</h1>
        <div style={{ width: 'calc(100% - 100px)', margin: '0 50px' }}>
          <Carousel 
          interval={8000}
          stopOnHover={true}
          autoPlay={true}
          showArrows={true}
          infiniteLoop={true}
          dynamicHeight={true}
          showStatus={false}
          showThumbs={true}
          className="carousel">
            {auctionData.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo} alt={`Auction Slide ${index + 1}`} className="w-full h-full rounded-lg" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="mt-10 bg-white w-2/3 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Додаткова інформація про аукціон</h2>
        <p className="text-gray-600">Інформація про аукціон</p>
        {/* Додайте тут відображення ставок, які розміщені на аукціоні */}
      </div>

      <div className="mt-10 mb-10 bg-white w-2/3 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Ставки на аукціон</h2>
        <p className="text-gray-600">ставки</p>
        {/* Додайте тут відображення ставок, які розміщені на аукціоні */}
      </div>
    </div>
    );
}