import axios, { AxiosResponse, AxiosError } from 'axios';

const LOTS_REST_API_URL = "http://localhost:8080/lots/active";

class LotService {

    async getActiveLots(): Promise<AxiosResponse> {
      return axios.get(LOTS_REST_API_URL);
    }
  }

export default new LotService();