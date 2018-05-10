import axios from './interceptor';

const apiUrl = process.env.APPLICATION_BASE_URL || '';

// Overrides the fetch() method to add the base API url to the front.
export const fetch = (url, ...rest) => axios.get(apiUrl + url, ...rest);
export const post = (url, ...rest) => axios.post(apiUrl + url, ...rest);
export const put = (url, ...rest) => axios.put(apiUrl + url, ...rest);
export const remove = (url, ...rest) => axios.delete(apiUrl + url, ...rest);
