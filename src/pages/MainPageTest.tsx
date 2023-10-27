import React from "react";
import Sidebar from "../components/Sidebar";
import AuctionComponent from "../components/AuctionComponent";

interface Auction {
    title: string;
    description: string;
    imageUrl: string;
  }
  
  interface Category {
    name: string;
  }
  
  const categories: Category[] = [
    { name: "Категорія 1" },
    { name: "Категорія 2" },
    { name: "Категорія 3" },
  ];
  
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

  export function MainPageTest() {
    return (
        <>
        <div className="flex">
          <Sidebar/>
          <AuctionComponent/>
        </div>
        </>
      );
};

export default MainPageTest;
