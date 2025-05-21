onBeforeRouteLeave(async (to, from) => {
const favourites = localStorage.getItem("favourites");
if (favourites) {
var storedFavourites = JSON.parse(favourites);
storedFavourites.forEach(async (favourite) => {
await $fetch(`http://localhost:8000/users/1`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: favourite,
});
});
}
});

const favourites = localStorage.getItem("favourites");
if (favourites) {
var storedFavourites = JSON.parse(favourites);
var notFound = false;
storedFavourites.forEach((favourite) => {
if (favourite.restaurantId !== restaurantId) {
notFound = true;
}
});
if (notFound) {
storedFavourites.push({ userId: "1", restaurantId });
localStorage.setItem("favourites", JSON.stringify(storedFavourites));
}
} else {
localStorage.setItem(
"favourites",
JSON.stringify([{ userId: "1", restaurantId }])
);
}
