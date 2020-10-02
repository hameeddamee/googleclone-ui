import config from "../../config";

export const environments = {
  production: "production",
  development: "development",
};

export const getBaseURL = () => {
  const processEnv = process.env.NODE_ENV;

  switch (processEnv) {
    case environments.production:
      return config.Urls.baseProd;
    case environments.development:
      return config.Urls.baseDev;
    default:
      return config.Urls.baseDev;
  }
};

export const setURLParams = async (url = "", otherParams = {}) => {
  let params = { ...otherParams };

  let newURL = url;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      newURL.searchParams.append(key, params[key]);
    }
  }
  return newURL;
};

export const createFormData = async (formInput) => {
  const formData = new FormData();
  for (const key in formInput) {
    if (formInput.hasOwnProperty(key)) {
      formData.append(key.toString(), formInput[key]);
    }
  }
  return formData;
};

export const getData = async (url = "", headerVal = {}, data = {}) => {
  const headers = new Headers();

  for (const key in headerVal) {
    if (headerVal.hasOwnProperty(key)) {
      headers.append(key, headerVal[key]);
    }
  }

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: headers,
  });
  let result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || result.message);
  }
  return result;
};

export const postData = async (url = "", headerVal = {}, data = {}) => {
  const headers = new Headers();

  for (const key in headerVal) {
    if (headerVal.hasOwnProperty(key)) {
      headers.append(key, headerVal[key]);
    }
  }

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify(data),
  });

  let result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.message);
  }

  return result;
};
