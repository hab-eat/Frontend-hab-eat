import axios from 'axios';
import qs from 'qs';

class BaseRestApi {
  instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    paramsSerializer: (params) => qs.stringify(params),
  });

  getRequestConfig() {
    const token = localStorage.getItem('Back_Token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
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
  kakaoSignOrUp(body) {
    return this.POST('/users/kakao-login', body);
  }

  async uploadImageToSignedUrl({ signedUrl, file, type }) {
    return axios
      .put(signedUrl, file, {
        headers: {
          'Content-Type': type,
        },
      })
      .then((response) => response.data);
  }

  async getKakaoAccessToken(code) {
    console.log('getKakaoAccessToken');
    const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL; // 카카오 개발자 콘솔에 등록된 Redirect URI
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; // 카카오 REST API 키

    return axios.post('https://kauth.kakao.com/oauth/token', null, {
      // headers: { 'Content-Type': 'application/json' },
      params: {
        grant_type: 'authorization_code',
        client_id: Rest_api_key,
        redirect_uri: redirectUrl,
        code,
      },
    });
  }
}

const api = new Api();

export default api;
