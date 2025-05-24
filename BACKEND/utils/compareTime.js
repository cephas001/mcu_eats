const compareTime = (hour, minute, takingOrders) => {
  if (takingOrders) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const timeStatus =
      currentHour < hour || (currentHour === hour && currentMinute < minute);

    return timeStatus;
  } else {
    return false;
  }
};

module.exports = compareTime;
