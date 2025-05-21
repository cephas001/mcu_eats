import compareTime from "~/utils/compareTime.js";

export default defineEventHandler(async (event) => {
  const shops = await $fetch("http://localhost:8000/shops");
  const user = await $fetch("http://localhost:8000/users/1");
  const updatedShops = Promise.all(
    shops.map((shop) => {
      const [closeHour, closeMinute, closeSecond] = shop.closing_time
        .split(":")
        .map(Number);
      const isOpen = compareTime(closeHour, closeMinute, closeSecond);
      var isfavourite;
      if (user.favourites) {
        user.favourites.forEach((favourite) => {
          if (favourite.referenceId == shop.id && favourite.type == "shops") {
            isfavourite = true;
          } else {
            isfavourite = false;
          }
        });
      }
      return {
        ...shop,
        open: isOpen,
        favourite: isfavourite,
      };
    })
  );
  return updatedShops;
});
