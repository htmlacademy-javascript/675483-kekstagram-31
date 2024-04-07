import { getPhotos } from './data.js';

// Ищем контейнер для изображений
const picturesList = document.querySelector('.pictures');
// Ищем шаблон
const pictureTemplate = document.querySelector('#picture');
// Ищем элемент шаблона
const pictureTemplateItem = pictureTemplate.content.querySelector('.picture');

const pictures = getPhotos();
const picturesFragment = document.createDocumentFragment();

pictures.forEach(({id, url, description, likes, comments}) => {
  const picture = pictureTemplateItem.cloneNode(true);
  const pictureImage = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');

  picture.dataset.index = id;
  pictureImage.src = url;
  pictureImage.alt = description;
  pictureComments.textContent = comments.length;
  pictureLikes.textContent = likes;

  picturesFragment.appendChild(picture);
});
picturesList.append(picturesFragment);

export { pictures, picturesList };
