import compareTime from "~/utils/compareTime.js";

export default defineEventHandler(async (event) => {
  const retailers = await $fetch("http://localhost:8000/retailers");
  const user = await $fetch("http://localhost:8000/users/1");
  const updatedRetailers = Promise.all(
    retailers.map((retailer) => {
      const [closeHour, closeMinute, closeSecond] = retailer.closing_time
        .split(":")
        .map(Number);
      const isOpen = compareTime(closeHour, closeMinute, closeSecond);
      var isfavourite;
      if (user.favourites) {
        user.favourites.forEach((favourite) => {
          if (
            favourite.referenceId == retailer.id &&
            favourite.type == "shops"
          ) {
            isfavourite = true;
          } else {
            isfavourite = false;
          }
        });
      }
      return {
        ...retailer,
        open: isOpen,
        favourite: isfavourite,
      };
    })
  );
  return updatedRetailers;
});
