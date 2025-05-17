export default defineEventHandler((event) => {
  const query = getQuery(event); // Get query parameters

  // If `id` exists, filter the restaurant list
  if (query.id) {
    const restaurant = restaurants.find((r) => r.id == query.id) || {
      error: "Restaurant not found",
    };

    return restaurant;
  }
  return restaurants;
});
