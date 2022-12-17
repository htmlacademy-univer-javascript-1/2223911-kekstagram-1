const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomElementFromArray = (array) => array[getRandomPositiveInteger(0, array.length - 1)];
const checkStringLength = (string, length) => string.length <= length;

const uniqueNumberGenerator = () => {
  let prevNumber = 0;

  return () => ++prevNumber;
};
const isEscapeKey = (event) => 'Escape' === event.key;
export {getRandomPositiveInteger, getRandomElementFromArray, checkStringLength, uniqueNumberGenerator,isEscapeKey};
