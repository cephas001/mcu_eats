export default function (hour, minute, seconds) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  const timeStatus =
    currentHour < hour ||
    (currentHour === hour && currentMinute < minute) ||
    (currentHour === hour &&
      currentMinute === minute &&
      currentSecond < seconds);

  return timeStatus;
}
