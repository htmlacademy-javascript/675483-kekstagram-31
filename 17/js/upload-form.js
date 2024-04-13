import { onDocumentKeydownEscape } from './util.js'; // +++
import { openModal, closeModal } from './util-modal.js'; // +++
import { changeEffect, resetEffect } from './photo-effects.js'; // +++
import { scaleUp, scaleDown } from './photo-scale.js'; // +++

const form = document.querySelector('.img-upload__form'); // +++
const formInput = form.querySelector('.img-upload__input'); // +++
const formCancel = form.querySelector('.img-upload__cancel'); // +++

const formOverlay = form.querySelector('.img-upload__overlay'); // +++
const formEffectsList = formOverlay.querySelector('.effects__list'); // +++
const photoScaleSmaller = formOverlay.querySelector('.scale__control--smaller'); // +++
const photoScaleBigger = formOverlay.querySelector('.scale__control--bigger'); // +++

const onDocumentKeydownEscapeHandler = onDocumentKeydownEscape(closeUploadModal);

const onModalUploadHandler = (evt) => {
  evt.preventDefault();
  openUploadModal();
};

function openUploadModal() {
  openModal(formOverlay);

  document.addEventListener('keydown', onDocumentKeydownEscapeHandler);
  formInput.removeEventListener('change', onModalUploadHandler);
  formCancel.addEventListener('click', closeUploadModal);

  photoScaleSmaller.addEventListener('click', scaleDown);
  photoScaleBigger.addEventListener('click', scaleUp);

  resetEffect();
  formEffectsList.addEventListener('change', changeEffect);
}

function closeUploadModal() {
  formInput.value = '';
  closeModal(formOverlay);

  document.removeEventListener('keydown', onDocumentKeydownEscapeHandler);
  formInput.addEventListener('change', onModalUploadHandler);
  formCancel.removeEventListener('click', closeUploadModal);

  photoScaleSmaller.removeEventListener('click', scaleDown);
  photoScaleBigger.removeEventListener('click', scaleUp);

  formEffectsList.removeEventListener('change', changeEffect);
}

formInput.addEventListener('change', onModalUploadHandler);

export { formInput, closeUploadModal };
