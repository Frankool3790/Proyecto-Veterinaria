const DEFAULT_API_BASE_URL = "http://localhost:3002/api";

export const getApiBaseUrl = () => {
  return (process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");
};

export const getApiOrigin = () => {
  return getApiBaseUrl().replace(/\/api$/, "");
};

export const getAssetUrl = (path) => {
  if (!path) return "/favicon.svg";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiOrigin()}${normalizedPath}`;
};
