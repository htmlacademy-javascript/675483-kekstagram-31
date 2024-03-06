import {getRandom, getRandomElement, getRandomId} from './util.js';

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Артём',
  'Василий',
  'Дмитрий',
  'Мария',
  'Максим',
  'Елена',
  'Степан',
  'Фёдор',
];

const NUMBER_OF_PHOTOS = 25;
const MAX_COMMENTS = 30;

// Получаем неповторимые ID в конкретных диапазонах
const getRandomIdPhoto = getRandomId(1, NUMBER_OF_PHOTOS);
const getRandomIdComment = getRandomId(0, MAX_COMMENTS);
const getRandomIdAvatar = getRandomId(1, 6);

const createComment = function() {
  const id = getRandomIdComment();
  const avatadId = getRandomIdAvatar();
  const avatarPath = `img/avatar-${avatadId}.svg`;
  const randomMessage = getRandomElement(MESSAGE);
  const randomName = getRandomElement(NAME);

  return {
    id: id,
    avatar: avatarPath,
    message: randomMessage,
    name: randomName,
  };
};

// Создаем объект "Фото"

const createPhoto = function() {
  const id = getRandomIdPhoto();
  const photoPath = `photos/${id}.jpg`;
  const randomLikes = getRandom(15, 200);

  return {
    id: id,
    url: photoPath,
    description: 'Описание фото',
    likes: randomLikes,
    comment: Array.from({length: getRandomIdComment()}, createComment),
  };
};

// Создаем массив из объектов "Фото" длиной length

const getPhotos = () => Array.from({length: NUMBER_OF_PHOTOS}, createPhoto);

export {getPhotos};
