import axios from 'axios';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

/** 서버에서는 요청 시마다 Axios Instance를 생성해주는 게 맞...다? */
export const createServerAxios = () =>
  axios.create({
    baseURL: BACKEND_API_URL,
  });
