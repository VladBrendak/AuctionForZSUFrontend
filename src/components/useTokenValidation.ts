// useTokenValidation.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

function useTokenValidation(): boolean | null {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Retrieve the JWT token from localStorage
    const token: string | null = localStorage.getItem('jwtToken');

    // Function to check token validity
    const checkTokenValidity = async () => {
      try {
        // Make a GET request to the Spring Boot endpoint with the token from localStorage
        const response = await axios.get('http://localhost:8080/api/v1/auth/isTokenValid', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from localStorage
          },
        });

        // If the request is successful, response.data will be true or false
        setIsTokenValid(response.data);
      } catch (error) {
        // Handle errors here
        console.error('Error checking token validity:', error);
      }
    };

    if (token) {
      checkTokenValidity();
    } else {
      // Token not found in localStorage, handle accordingly (e.g., prompt the user to log in)
      setIsTokenValid(false);
    }
  }, []);

  return isTokenValid;
}

export default useTokenValidation;