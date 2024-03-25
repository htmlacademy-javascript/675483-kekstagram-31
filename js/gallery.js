// import { getPhotos } from './data.js';
// import { modalOpenHandler } from './action-modal.js';

const getGallery = function(pictures) {
  // Ищем контейнер для изображений
  const picturesList = document.querySelector('.pictures');
  // Ищем шаблон
  const pictureTemplate = document.querySelector('#picture');
  // Ищем элемент шаблона
  const pictureTemplateItem = pictureTemplate.content.querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const similarPicture = pictureTemplateItem.cloneNode(true);
    const pictureImage = similarPicture.querySelector('.picture__img');

    pictureImage.src = picture.url;
    pictureImage.alt = picture.description;
    similarPicture.dataset.index = picture.id;
    similarPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    similarPicture.querySelector('.picture__likes').textContent = picture.likes;

    picturesFragment.appendChild(similarPicture);
    // modalOpenHandler(similarPicture);
  });
  picturesList.append(picturesFragment);

};

export { getGallery };
// export { pictures };
