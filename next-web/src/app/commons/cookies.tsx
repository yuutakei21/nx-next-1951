import Cookies from "js-cookie";

const getExpires = ({ hours = 4 }) => {
  return new Date(new Date().getTime() + 60 * hours * 60 * 1000);
};

export const setCookie = (key: any, value: any, expiresInHours = 4) => {
  Cookies.set(key, value, { expires: getExpires({ hours: expiresInHours }) });
};

export const getCookie = (key: any) => {
  return Cookies.get(key);
};

export const removeCookie = (key: any) => {
  return Cookies.remove(key);
};
