import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get form data
      const { email, password } = formData;

      // Send data to the server
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        email,
        password,
      });

      // Get JWT token from the server response
      const token = response.data.token;

      console.log("Login successful, token:", token);
      // Save the token in LocalStorage
      localStorage.setItem("jwtToken", token);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center">
      <div className="bg-white h-full p-8 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
        </div>

        <form onSubmit={handleSubmit}>
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
              Password
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

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover-bg-blue-700"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
