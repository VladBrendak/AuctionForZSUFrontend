import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatarImage: string;
}

interface Category {
  id: number;
  category: string;
}

const Sidebar: React.FC<{ onCategoryClick: (category: number) => void }> = ({ onCategoryClick }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [avatarImageURL, setAvatarImageURL] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(Number);

  const handleCategoryClick = (category: number) => {
    console.log("Category clicked:", category);
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch("http://localhost:8080/api/v1/auth/getUserInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchAvatarImage = async () => {
    if (userInfo) {
      const avatarImageURL = `http://localhost:8080/api/v1/images/getImage/${userInfo.avatarImage}`;
        setAvatarImageURL(avatarImageURL);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/categories");
      if (response.ok) {
        const categoriesData: Category[] = await response.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchAvatarImage();
    }
  }, [userInfo]);

  return (
    <div className="w-80 h-100% bg-gray-100 flex flex-col justify-start items-center">
      <>
        {userInfo ? (
          <>
            {console.log(userInfo)}
            <Link to={`/user/${userInfo.id}`} className="mb-4 mt-10 text-center">
              {avatarImageURL && (
                <img
                  src={avatarImageURL}
                  alt="Аватар"
                  className="w-56 h-56 rounded-full mx-auto mb-2 cursor-pointer"
                />
              )}
              <h2 className="text-2xl font-bold cursor-pointer">{userInfo.username}</h2>
            </Link>
          </>
        ) : (
          // Default content when userInfo is null
          <>
            <Link to="/register" className="mb-4 mt-10 text-center">
              <img
                src={require('..\\src\\images\\blankAvatar.jpg')}
                alt="Пустий Аватар"
                className="w-56 h-56 rounded-full mx-auto mb-2 cursor-pointer"
              />
              <h2 className="text-xl font-bold cursor-pointer">User</h2>
            </Link>
          </>
        )}
      </>
      <p className="mt-5 text-gray-800 font-bold text-[38px]">Категорії</p>
      <div className="text-center font-bold text-[24px]">
      <button
          key={-1}
          className={`${
            selectedCategory === -1 ? 'bg-blue-200' : 'bg-gray-300'
          } px-4 py-2 rounded-lg cursor-pointer transition duration-100 block mb-2 hover:bg-blue-100 w-[200px]`}
          onClick={() => handleCategoryClick(-1)}
        >
          All
        </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${
            selectedCategory === category.id ? 'bg-blue-200' : 'bg-gray-300'
          } px-4 py-2 rounded-lg cursor-pointer transition duration-100 block mb-2 hover:bg-blue-100 w-[200px]`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.category}
        </button>
      ))}
    </div>
    </div>
  );
};

export default Sidebar;