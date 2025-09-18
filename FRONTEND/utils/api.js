import axios from "axios";

export const createApiClient = () => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true,
  });

  return {
    request: async (url, { method = "GET", body = null, params = {} } = {}) => {
      try {
        const response = await instance.request({
          url,
          method,
          data: body,
          params,
        });

        return response.data;
      } catch (error) {
        console.log(error);
        const res = error?.response;
        const data = res?.data || {};

        throw {
          message: data.message || error.message,
          type: data.type || "UnexpectedError",
          inputName: data.inputName || null,
          errorList: data.errorList || null,
          status: res?.status || 500,
        };
      }
    },
  };
};
