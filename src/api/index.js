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
    return this.GET(`/diets/?date=${date}`);
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

  async uploadImageToSignedUrl({ signedUrl, file, type }) {
    return axios
      .put(signedUrl, file, { headers: { 'Content-Type': type } })
      .then((response) => response.data);
  }

  async getKakaoAccessToken(code) {
    console.log('getKakaoAccessToken');
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
