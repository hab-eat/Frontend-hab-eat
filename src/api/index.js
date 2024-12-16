import axios from 'axios';
import qs from 'qs';
import { addAxiosDateTransformer } from 'axios-date-transformer';

class BaseRestApi {
  _instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    paramsSerializer: (params) => qs.stringify(params),
  });

  instance = addAxiosDateTransformer(this._instance);

  getRequestConfig() {
    const token = `Bearer ${localStorage.getItem('Back_Token')}`;
    return token ? { headers: { Authorization: token } } : undefined;
  }

  async GET(path, params) {
    const requestConfig = { params, ...this.getRequestConfig() };
    const response = await this.instance.get(path, requestConfig);
    return response.data;
  }

  async POST(path, body) {
    const requestConfig = this.getRequestConfig();
    const response = await this.instance.post(path, body, requestConfig);
    return response.data;
  }

  async PATCH(path, body) {
    const requestConfig = this.getRequestConfig();
    const response = await this.instance.post(path, body, requestConfig);
    return response.data;
  }

  async DELETE(path) {
    const requestConfig = this.getRequestConfig();
    const response = await this.instance.delete(path, requestConfig);
    return response.data;
  }
}

class Api extends BaseRestApi {
  async uploadImageToSignedUrl({ signedUrl, file, type }) {
    return axios
      .put(signedUrl, file, {
        headers: {
          'Content-Type': type,
        },
      })
      .then((response) => response.data);
  }
}

const api = new Api();

export default api;
