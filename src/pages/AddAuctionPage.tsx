import React, { useState, ChangeEvent, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";

export function AddAuctionPage() {

  const history = useNavigate();
  
  const [auctionData, setAuctionData] = useState({
    name_of_lot: "",
    description: "",
    category: "" as string,
    startBidAmount: "",
    expiration: null as Date | null,
    previewImage: null as File | null,
    images: [] as File[],
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch categories from the endpoint
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((data) => {
        const categoryNames = data.map((category: any) => category.category);
        setCategories(categoryNames);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!auctionData.name_of_lot.trim()) {
      newErrors.title = "Заголовок аукціону не може бути порожнім.";
    }
  
    if (!auctionData.description.trim()) {
      newErrors.description = "Опис аукціону не може бути порожнім.";
    }
  
    if (!auctionData.startBidAmount.trim() || isNaN(Number(auctionData.startBidAmount))) {
      newErrors.startBid = "Будь ласка, введіть правильну початкову ставку (число).";
    }
  
    if (!auctionData.category.trim()) {
      newErrors.category = "Будь ласка, виберіть категорію.";
    }
  
    if (!auctionData.previewImage) {
      newErrors.auctionImage = "Будь ласка, виберіть головне зображення аукціону.";
    }
  
    if (auctionData.images.length === 0) {
      newErrors.additionalImages = "Будь ласка, виберіть хоча б одне додаткове зображення аукціону.";
    }
  
    if (auctionData.images.length > 3) {
      newErrors.additionalImages = "Максимальна кількість додаткових зображень - 3.";
    }
  
    if (!auctionData.expiration) {
      newErrors.expiration = "Будь ласка, виберіть дату та час завершення аукціону.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAuctionData({ ...auctionData, [name]: value });
  };

  const handleAuctionImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // Check for null
    const file = event.target.files[0]; // Check for null
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    const newErrors = { ...errors };

    if (event.target.files.length > 1) {
      newErrors.auctionImage = "Please select only one image file for the auction image.";
    } else if (!allowedImageTypes.includes(file.type)) {
      newErrors.auctionImage =
        "Only image files (JPEG, PNG, or GIF) are allowed for the auction image.";
    } else {
      newErrors.auctionImage = ""; // Clear the error if no issues
    }

    setErrors(newErrors);
    setAuctionData({ ...auctionData, previewImage: file });
  };

  const handleAdditionalImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // Check for null
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    const newErrors = { ...errors };

    if (event.target.files.length !== 3) {
      newErrors.additionalImages =
        "Please select exactly three image files for the additional images.";
    } else {
      for (const file of event.target.files) {
        // Use optional chaining to iterate
        if (!allowedImageTypes.includes(file.type)) {
          newErrors.additionalImages =
            "Only image files (JPEG, PNG, or GIF) are allowed for the additional images.";
          break; // Break on the first error
        } else {
          newErrors.additionalImages = ""; // Clear the error if no issues
        }
      }
    }

    setErrors(newErrors);
    setAuctionData({ ...auctionData, images: Array.from(event.target.files) });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAuctionData({ ...auctionData, category: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (validateForm()) {
      const formData = new FormData();
  
      // Append form data to FormData object
      formData.append("model", JSON.stringify(auctionData));
      formData.append("previewImage", auctionData.previewImage!);
  
      auctionData.images.forEach((image, index) => {
        formData.append(`images`, image);
      });
  
      try {
        const token = localStorage.getItem("jwtToken");
        if(token) {
            const response = await fetch("http://localhost:8080/lots", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            console.log("Auction data successfully submitted!");
            history(-1); // Replace '/' with the path you want to navigate to
          } else {
            console.error("Error submitting auction data:", response.statusText);
          }
        }
      } catch (error:any) {
        console.error("Error submitting auction data:", error.message);
      }
    } else {
      console.log("Form contains errors. Please correct them.");
    }
  };
  
  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center">
      <div className="bg-opacity-60 bg-black mt-10 relative w-2/3 p-8 rounded-lg shadow-lg text-black text-center">
        <h1 className="text-3xl font-bold mb-4">Створення аукціону</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300">
              Заголовок аукціону
            </label>
            <input
              type="text"
              id="title"
              name="name_of_lot"
              value={auctionData.name_of_lot}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && <p className="text-red-500 mt-2">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300">
              Опис аукціону
            </label>
            <textarea
              id="description"
              name="description"
              value={auctionData.description}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-red-500 mt-2">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="startBid" className="block text-gray-300">
              Початкова ставка
            </label>
            <textarea
              id="startBid"
              name="startBidAmount"
              value={auctionData.startBidAmount}
              onChange={handleInputChange}
              className={`w-full p-2 border border-gray-300 rounded ${errors.startBid ? "border-red-500" : ""}`}
            />
            {errors.startBid && <p className="text-red-500 mt-2">{errors.startBid}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-300">
              Категорія аукціону
            </label>
            <select
              id="category"
              name="category"
              value={auctionData.category}
              onChange={handleCategoryChange}
              className={`w-full p-2 border border-gray-300 rounded ${errors.category ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Виберіть категорію
              </option>
              {categories.map((category) => (
                <option className="text-black" key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 mt-2">{errors.category}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="auctionImage" className="block text-gray-300">
              Головне зображення аукціону
            </label>
            <input
              type="file"
              id="auctionImage"
              name="auctionImage"
              onChange={handleAuctionImageChange}
              className={`w-full p-2 border border-gray-300 rounded ${errors.auctionImage ? "border-red-500" : ""}`}
            />
            {auctionData.previewImage && (
              <p className="text-green-500 mt-2">Зображення аукціону вибрано.</p>
            )}
            {errors.auctionImage && <p className="text-red-500 mt-2">{errors.auctionImage}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="additionalImages" className="block text-gray-300">
              Додаткові зображення аукціону (3 зображення)
            </label>
            <input
              type="file"
              id="additionalImages"
              name="additionalImages"
              multiple
              onChange={handleAdditionalImagesChange}
              className={`w-full p-2 border border-gray-300 rounded ${errors.additionalImages ? "border-red-500" : ""}`}
            />
            {auctionData.images.length === 3 && (
              <p className="text-green-500 mt-2">Всі три додаткові зображення вибрані.</p>
            )}
            {auctionData.images.length !== 3 && (
              <p className="text-yellow-600 mt-2">
                Будь ласка, виберіть саме три додаткові зображення.
              </p>
            )}
            {errors.additionalImages && (
              <p className="text-red-500 mt-2">{errors.additionalImages}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="expiration" className="block text-gray-300">Дата та час завершення аукціону</label>
            <DatePicker
              id="expiration"
              selected={auctionData.expiration}
              onChange={(date: Date) => setAuctionData({ ...auctionData, expiration: date })}
              showTimeSelect={true}
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className={`w-full p-2 border border-gray-300 text-center text-gray-800 rounded ${errors.expiration ? "border-red-500" : ""}`}
            />
            {errors.expiration && <p className="text-red-500 mt-2">{errors.expiration}</p>}
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