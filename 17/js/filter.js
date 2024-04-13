import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const DELAY = 500;

const filters = document.querySelector('.img-filters');
const filterForm = filters.querySelector('.img-filters__form');
const filterButtons = Array.from(filterForm.querySelectorAll('.img-filters__button'));

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const filterSwitch = () => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButton = filterForm.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    });
  });
};

const filterPhoto = () => {
  const gallery = document.querySelector('.pictures');
  const pictures = Array.from(gallery.querySelectorAll('.picture'));

  const removePhotos = () => {
    pictures.forEach((picture) => {
      picture.remove();
    });
  };

  const addPhotos = (photos) => {
    photos.forEach((picture) => {
      gallery.append(picture);
    });
  };

  const getNumberComments = (picture) => picture.querySelector('.picture__comments').textContent;

  const compareComments = (pictureA, pictureB) => {
    const commentsCountA = getNumberComments(pictureA);
    const commentsCountB = getNumberComments(pictureB);

    return commentsCountB - commentsCountA;
  };

  const onPhotosChange = (evt) => {
    if (evt.target.matches('#filter-default')) {
      removePhotos();
      addPhotos(pictures);
    }

    if (evt.target.matches('#filter-random')) {
      removePhotos();
      const rundompictures = pictures.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT);
      addPhotos(rundompictures);
    }

    if (evt.target.matches('#filter-discussed')) {
      removePhotos();
      const discussedPhotos = pictures.slice().sort(compareComments);
      addPhotos(discussedPhotos);
    }
  };

  filterForm.addEventListener('click', debounce(onPhotosChange, DELAY));
};

export { showFilters, filterSwitch, filterPhoto };
