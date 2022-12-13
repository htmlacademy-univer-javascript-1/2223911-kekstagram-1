import {uniqueNumberGenerator, getRandomPositiveInteger, getRandomElementFromArray} from './util.js';
const NAMES = [
  'Андрей','Александр',
  'Алексей','Софья',
  'Дмитрий','Анастасия',
  'Илья','Виктория',
  'Евгений','Ангелина',
  'Екатерина','Елена',
  'Ксения',
  'Юрий',
  'Карина',
  'Татьяна'
];
const COMMENTS = [
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
'Что было то и выложил',
'норм фотка',
'и так сойдёт'
]
const minLikesCount = 15;
const maxLikesCount = 200;
const commentsCount = 5;
const photoCount = 25;

const commentIdGenerator = uniqueNumberGenerator();
const photoNumberGenerator = uniqueNumberGenerator();
const imageIdGenerator = uniqueNumberGenerator();


const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomElementFromArray(COMMENTS),
  name: getRandomElementFromArray(NAMES)
});

const createImage = () => ({
  id: imageIdGenerator(),
  url: `photos/${photoNumberGenerator()}.jpg`,
  description: getRandomElementFromArray(DESCRIPTIONS),
  likes: getRandomPositiveInteger(minLikesCount, maxLikesCount),
  comments: Array.from({length: getRandomPositiveInteger(1, 8)}, createComment)
});

const createImages = () => Array.from({length: photoCount}, createImage);

export {createImages};



