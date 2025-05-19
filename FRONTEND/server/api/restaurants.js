export default defineEventHandler(async (event) => {
  const restaurants = await $fetch("http://localhost:8000/restaurants");
  return restaurants;
});
