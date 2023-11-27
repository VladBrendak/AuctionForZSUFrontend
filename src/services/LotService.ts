import axios, { AxiosResponse, AxiosError } from 'axios';

const LOTS_REST_API_URL = "http://localhost:8080/lots/active";

class LotService {

  async getActiveLots(): Promise<AxiosResponse> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    return axios.get(LOTS_REST_API_URL, {
      headers,
    });
  }
  }

export default new LotService();