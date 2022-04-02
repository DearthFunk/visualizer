export { getAverageVolume };

function getAverageVolume(array) {
  let sum = array.reduce((a, b) => a + b, 0);
  return sum / array.length;
}
