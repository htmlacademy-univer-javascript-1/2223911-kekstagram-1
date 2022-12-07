
import './util-const'
function getRandomNumber(min, max)
{
  if (min <0 || max < 0){
      return 'ERROR! Значения \'min\' и \'max\' должны быть больше нуля!';
  }

  return str.length > maxLength;
}
const getRandomArrayElement = (elements) => elements[getRandomNumber(0,elements.length -1)];
let idComment = 0;
const createComment = () => ({
  id: idComment++,
  avatar: 'img/avatar${getRandomNumber(1,6)}.svg',
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

let idPublication = 0;
const createPublication = () => ({
  id: idPublication++,
  url: 'photos/${this.id}.jpg',
  descreption: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(minLikesCount,maxLikesCount),
  comment: Array.from({length: commentsCount}, createComment)
});
//const constValue = 25;
checkLength(228,1337);
const arrayPhotos = Array.from({length:constValue},createPublication);
arrayPhotos();
export{getRandomArrayElement,getRandomNumber,createComment,createPublication, arrayPhotos,checkLength}
