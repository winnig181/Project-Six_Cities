/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, {AxiosInstance, AxiosRequestConfig } from 'axios';
import { Token } from './utils';

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get();
      config.headers = config.headers ?? {};

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );
  return api;
};
