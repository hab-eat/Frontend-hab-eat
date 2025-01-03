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

  accessDeniedErrorHandling(error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('Back_Token');
      window.location.href = process.env.REACT_APP_BASE_URL;
    }
  }

  async GET(path, params) {
    try {
      const requestConfig = { params, ...this.getRequestConfig() };
      const response = await this.instance.get(path, requestConfig);
      return response.data;
    } catch (error) {
      this.accessDeniedErrorHandling(error);
      throw error;
    }
  }

  async PUT(path, body) {
    try {
      const requestConfig = this.getRequestConfig();
      const response = await this.instance.put(path, body, requestConfig);
      return response.data;
    } catch (error) {
      this.accessDeniedErrorHandling(error);
      throw error;
    }
  }

  async POST(path, body) {
    try {
      const requestConfig = this.getRequestConfig();
      const response = await this.instance.post(path, body, requestConfig);
      return response.data;
    } catch (error) {
      this.accessDeniedErrorHandling(error);
      throw error;
    }
  }

  async PATCH(path, body) {
    try {
      const requestConfig = this.getRequestConfig();
      const response = await this.instance.post(path, body, requestConfig);
      return response.data;
    } catch (error) {
      this.accessDeniedErrorHandling(error);
      throw error;
    }
  }

  async DELETE(path) {
    try {
      const requestConfig = this.getRequestConfig();
      const response = await this.instance.delete(path, requestConfig);
      return response.data;
    } catch (error) {
      this.accessDeniedErrorHandling(error);
      throw error;
    }
  }
}

class Api extends BaseRestApi {
  kakaoSignOrUp(body) {
    return this.POST('/users/kakao-login', body);
  }

  PutUser(body) {
    return this.PUT('/users', body);
  }

  getTargetNutrients() {
    return this.GET('/users/target-nutrients');
  }

  getFoodPresignedUrls() {
    return this.GET('/foods/presigned-urls');
  }

  getFoodClassName(s3Key) {
    return this.POST('/foods/class-names', { key: s3Key });
  }

  getFoodNameAutocomplete({ name, page = 1, limit = 30 } = {}) {
    return this.GET(
      `/foods/autocomplete?keyword=${name}&page=${page}&limit=${30}`,
    );
  }

  getFood(id) {
    return this.GET(`/foods/${id}`);
  }

  postDiets(body) {
    return this.POST('/diets', body);
  }

  getDietsStats(date) {
    return this.GET(`/diets/stats/?date=${date}`);
  }

  postNutriChallengeCertifications(data) {
    return this.POST(`/challenges/nutritions/certifications`, data);
  }

  getChallenges() {
    return this.GET('/challenges');
  }

  getChallengePresignedUrls() {
    return this.GET('/challenges/presigned-urls');
  }

  postChallengeCertifications(id, key) {
    return this.POST(`/challenges/${id}/certifications`, { key });
  }

  postChallengeParticipants(id, goalDays) {
    return this.POST(`/challenges/${id}/participants`, { goalDays });
  }

  getChallengeCertificationLogs({ id, startDate, endDate }) {
    return this.GET(
      `/challenges/${id}/certification-logs?startDate=${startDate}&endDate=${endDate}`,
    );
  }

  getDiets(date) {
    return this.GET(`/diets?date=${date}`);
  }

  async uploadImageToSignedUrl({ signedUrl, file, type }) {
    return axios
      .put(signedUrl, file, { headers: { 'Content-Type': type } })
      .then((response) => response.data);
  }

  async getKakaoAccessToken(code) {
    const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    return axios.post('https://kauth.kakao.com/oauth/token', null, {
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
