import React from "react";
import banana from '../images/banana.jpg';

interface Auction {
    title: string;
    description: string;
    imageUrl: string;
  }
  
  const auctions: Auction[] = [
    {
      title: "Аукціон 1",
      description: "Опис аукціону 1",
      imageUrl: "auction1.jpg",
    },
    {
      title: "Аукціон 2",
      description: "Опис аукціону 2",
      imageUrl: "auction2.jpg",
    },
    {
      title: "Аукціон 3",
      description: "Опис аукціону 3",
      imageUrl: "auction3.jpg",
    },
  ];

export function AuctionComponent() {
    return (
          // <div className="w-3/4 p-4 mx-auto">
          // <h1 className="text-3xl font-bold">Аукціони</h1>
          //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          //     {auctions.map((auction, index) => (
          //       <div key={index} className="bg-white rounded-lg p-4 mb-4">
          //         <img src={banana} alt={auction.title} className="w-full h-auto mb-2" />
          //         <h2 className="text-xl font-bold">{auction.title}</h2>
          //         <p>{auction.description}</p>
          //       </div>
          //     ))}
          //   </div>
          // </div>

          // <div className="w-3/4 p-4 mx-auto">
          //   <h1 className="text-3xl font-bold">Аукціони</h1>
          //   <div className="max-h-screen overflow-y-auto"> {/* Додали класи max-h-screen і overflow-y-auto */}
          //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 min-w-full">
          //       {auctions.map((auction, index) => (
          //         <div key={index} className="bg-white rounded-lg p-4 mb-4">
          //           <img src={banana} alt={auction.title} className="w-full h-auto mb-2" />
          //           <h2 className="text-xl font-bold">{auction.title}</h2>
          //           <p>{auction.description}</p>
          //         </div>
          //       ))}
          //     </div>
          //   </div>
          // </div>

          <div className="w-3/4 p-4 mx-auto">
            <h1 className="text-3xl font-bold">Аукціони</h1>
            <div className="max-h-screen h-[799px] overflow-y-auto mx-auto"> {/* Додали h-[400px] */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {auctions.map((auction, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 mb-4">
                    <img src={banana} alt={auction.title} className="w-full h-auto mb-2" />
                    <h2 className="text-xl font-bold">{auction.title}</h2>
                    <p>{auction.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

      );
};

export default AuctionComponent;
