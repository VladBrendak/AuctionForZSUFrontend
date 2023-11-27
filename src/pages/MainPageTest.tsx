import React from "react";
import Sidebar from "../components/Sidebar";
import AuctionComponent from "../components/AuctionComponent";
import { useState } from "react";

const MainPageTest: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <div className="flex">
        <Sidebar onCategoryClick={setSelectedCategory} />
        <AuctionComponent selectedCategory={selectedCategory}/>
      </div>
    </>
  );
};

export default MainPageTest;