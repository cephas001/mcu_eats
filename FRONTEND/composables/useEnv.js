export const useEnv = () => {
  const config = useRuntimeConfig();
  return {
    API_URL: config.public.API_URL,
  };
};
