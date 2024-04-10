import { openModal, closeModal } from './util-modal.js';

const form = document.querySelector('.img-upload__form');
const formInput = form.querySelector('.img-upload__input');
const formOverlay = form.querySelector('.img-upload__overlay');
const formCancel = form.querySelector('.img-upload__cancel');

function openUploadFormModal() {
  formInput.value = '';
  openModal(formOverlay);
}

function closeUploadFormModal() {
  closeModal(formOverlay);
}

formInput.addEventListener('change', () => {
  openUploadFormModal();
});

formCancel.addEventListener('click', () => {
  closeUploadFormModal();
});

export { formInput, closeUploadFormModal };
