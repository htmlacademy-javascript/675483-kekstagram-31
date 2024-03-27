import { getPhotos } from './data.js';
import { getGallery, picturesList } from './gallery.js';
import { addModalHandler } from './action-modal.js';

const pictures = getPhotos();
getGallery(pictures);
addModalHandler(picturesList, pictures);
