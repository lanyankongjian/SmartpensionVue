import axios from 'axios'
import qs from 'qs'

export const get = (url, paramsx) => {
  return axios.get(url, {
    params: paramsx, paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  });
};
export const post = (url, params) => {
  return axios.post(url, qs.stringify(params, {indices: false}));
};
export const put = (url, params) => {
  return axios.put(url, qs.stringify(params, {indices: false}));
};
export const del = (url, paramsx) => {
  return axios.delete(url, {
    params: paramsx, paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  });
};
