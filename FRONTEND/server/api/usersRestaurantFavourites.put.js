export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const user = await $fetch(`http://localhost:8000/users/1`);
    const newItem = {
      id: Math.random().toString(),
      referenceId: body.restaurantId.toString(),
      type: "restaurant",
    };

    // FILTER BY TYPE LATER

    user.favourites.forEach(async (favourite) => {
      if (body.restaurantId.toString() == favourite.referenceId) {
        return { message: "Already favourited" };
      } else {
        const newArr = [...user.favourites, newItem];

        const updatedUser = {
          ...user,
          favourites: newArr,
        };

        await $fetch(`http://localhost:8000/users/${body.userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
        return { message: "Updated Successfully" };
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
