import { HTTP_OK, NO_PERMISSION } from '@/app/keys';
import router from '@/router';
import axios from 'axios';
import nProgress from 'nprogress';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => error
);

request.interceptors.response.use((response) => {
  const { code, msg } = response.data || {};
  if (code !== HTTP_OK) {
    return Promise.reject(msg);
  }
  if (code === NO_PERMISSION) {
    router.push({ name: 'Login' }).then();
    return Promise.reject(msg);
  }
  return response;
});

export interface ResType<T> {
  code: number;
  data: T;
  msg: string;
  err?: string;
}

export interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, data?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, data?: unknown): Promise<ResType<T>>;
  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      nProgress.start();
      request
        .get(url, { params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        })
        .finally(() => {
          nProgress.done();
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      nProgress.start();
      request
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        })
        .finally(() => {
          nProgress.done();
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      nProgress.start();
      request
        .post(url, file, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        })
        .finally(() => {
          nProgress.done();
        });
    });
  },
  download(url) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = () => {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default http;
