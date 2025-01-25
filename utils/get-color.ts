export const getColorForValue = (value: number) => {
  if (value <= 50) {
    return "#A3E635";
  } else if (value <= 75) {
    return "#FACC15";
  } else {
    return "#FB923C";
  }
};
