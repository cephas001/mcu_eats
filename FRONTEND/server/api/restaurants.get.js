import compareTime from "~/utils/compareTime.js";

export default defineEventHandler(async (event) => {
  const restaurants = await $fetch("http://localhost:8000/restaurants");
  const user = await $fetch("http://localhost:8000/users/1");
  const updatedRestaurants = Promise.all(
    restaurants.map((restaurant) => {
      const [closeHour, closeMinute, closeSecond] = restaurant.closing_time
        .split(":")
        .map(Number);
      const isOpen = compareTime(closeHour, closeMinute, closeSecond);
      var isfavourite;
      if (user.favourites) {
        user.favourites.forEach((favourite) => {
          if (
            favourite.referenceId == restaurant.id &&
            favourite.type == "restaurant"
          ) {
            isfavourite = true;
          } else {
            isfavourite = false;
          }
        });
      }
      return {
        ...restaurant,
        open: isOpen,
        favourite: isfavourite,
      };
    })
  );
  return updatedRestaurants;
});
