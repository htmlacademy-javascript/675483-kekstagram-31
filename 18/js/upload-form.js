import { onDocumentKeydownEscape, onKeyStopPropagation } from './util.js'; // +++
import { openModal, closeModal } from './util-modal.js'; // +++
import { changeEffect, resetEffect } from './photo-effects.js'; // +++
import { resetScale, scaleUp, scaleDown } from './photo-scale.js'; // +++
import { pristine, formHashtag, formComment } from './validator.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form'); // +++
const formInput = form.querySelector('.img-upload__input'); // +++
const formCancel = form.querySelector('.img-upload__cancel'); // +++

const formOverlay = form.querySelector('.img-upload__overlay'); // +++
const photoPreview = formOverlay.querySelector('.img-upload__preview img'); // +++
const formEffectsList = formOverlay.querySelector('.effects__list'); // +++
const formEffectsListPreview = Array.from(formEffectsList.querySelectorAll('.effects__preview')); // +++

const photoScaleSmaller = formOverlay.querySelector('.scale__control--smaller'); // +++
const photoScaleBigger = formOverlay.querySelector('.scale__control--bigger'); // +++

const onDocumentKeydownEscapeHandler = onDocumentKeydownEscape(closeUploadModal);

const onModalUploadHandler = (evt) => {
  evt.preventDefault();
  openUploadModal();
};

function openUploadModal() {
  const file = formInput.files[0];
  const fileName = file.name.toLowerCase();
  const filePath = URL.createObjectURL(file);
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreview.src = filePath;
    formEffectsListPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${filePath})`;
    });
  }

  pristine.reset();
  openModal(formOverlay);
  resetEffect();
  resetScale();
  formHashtag.value = '';
  formComment.value = '';

  document.addEventListener('keydown', onDocumentKeydownEscapeHandler);
  formHashtag.addEventListener('keydown', onKeyStopPropagation);
  formComment.addEventListener('keydown', onKeyStopPropagation);
  formInput.removeEventListener('change', onModalUploadHandler);
  formCancel.addEventListener('click', closeUploadModal);

  photoScaleSmaller.addEventListener('click', scaleDown);
  photoScaleBigger.addEventListener('click', scaleUp);

  formEffectsList.addEventListener('change', changeEffect);
}

function closeUploadModal() {
  formInput.value = '';
  closeModal(formOverlay);

  document.removeEventListener('keydown', onDocumentKeydownEscapeHandler);
  formHashtag.removeEventListener('keydown', onKeyStopPropagation);
  formComment.removeEventListener('keydown', onKeyStopPropagation);
  formInput.addEventListener('change', onModalUploadHandler);
  formCancel.removeEventListener('click', closeUploadModal);

  photoScaleSmaller.removeEventListener('click', scaleDown);
  photoScaleBigger.removeEventListener('click', scaleUp);

  formEffectsList.removeEventListener('change', changeEffect);
}

formInput.addEventListener('change', onModalUploadHandler);

export { formInput, closeUploadModal };
