import axios, { AxiosResponse, AxiosError } from 'axios';

axios.defaults.timeout = 5000;

function responseHandler(response: AxiosResponse) {
  return response.data;
}

function errorHandler(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    return Promise.reject(error.response.data)
  }

  if (error instanceof Error) {
    return Promise.reject(error.message);
  }

  return Promise.reject(error);
}

async function request(promise: Promise<AxiosResponse>) {
  try {
    const response = await promise;
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

export const post = (url: string, data?: unknown) => request(axios.post(url, data))
export const put = (url: string, data?: unknown) => request(axios.put(url, data))
export const patch = (url: string, data?: unknown) => request(axios.patch(url, data))
export const get = (url: string) => request(axios.get(url))
export const del = (url: string) => request(axios.delete(url))