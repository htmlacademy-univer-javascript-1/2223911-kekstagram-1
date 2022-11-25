
const NAMES = [
  'Андрей',
  'Алексей',
  'Дмитрий',
  'Илья',
  'Евгений',
  'Екатерина',
  'Ксения',
  'Юрий',
  'Карина',
  'Татьяна'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
'Супер!',
'Вау, это круто',
'Мне кажется это красиво',
'Я художник, я так вижу',
'Ну такоое',
'Вот',
'Что было то и выложил',
'норм фотка',
'и так сойдёт'
]
const minLikesCount = 15;
const maxLikesCount = 200;
const commentsCount = 5;
function getRandomNumber(min, max){
  if (min <0 || max< 0){
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
const constValue = 25;
checkLength(228,1337);
const arrayPhotos = Array.from({length:constValue},createPublication);
arrayPhotos();
