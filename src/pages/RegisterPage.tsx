import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, avatar: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { username, email, password, avatar } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("userModel", JSON.stringify({ username, email, password }));
      formDataToSend.append("userAvatarImg", avatar || ""); // Use an empty string if avatar is null

      const response = await axios.post("http://localhost:8080/api/v1/auth/register", formDataToSend);

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center">
      <div className="bg-white h-full p-8 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Зареєструйтеся</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Ім'я користувача
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ваше ім'я користувача"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="example@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="********"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="avatar" className="block text-gray-600">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover-bg-blue-700"
            >
              Зареєструватися
            </button>
            <p className="mt-5" > Already registered? 
              <Link to={"/login"}>
                <span className="text-blue-600" > Log in </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

