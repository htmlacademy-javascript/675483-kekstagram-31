const photoScale = document.querySelector('.img-upload__scale');
const photoScaleSmaller = photoScale.querySelector('.scale__control--smaller');
const photoScaleBigger = photoScale.querySelector('.scale__control--bigger');
const photoScaleValue = photoScale.querySelector('.scale__control--value');

const photoPreview = document.querySelector('.img-upload__preview img');

const DEFAULT_SCALE = 1;
const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

let scaleValue = DEFAULT_SCALE;

const updateScale = (scale) => {
  photoScaleValue.value = `${scale * 100}%`;
  photoPreview.style.transform = `scale(${scale})`;
};

const scaleDown = () => {
  if (scaleValue > MIN_SCALE) {
    scaleValue -= SCALE_STEP;
    updateScale(scaleValue);
  }
};

const scaleUp = () => {
  if (scaleValue < MAX_SCALE) {
    scaleValue += SCALE_STEP;
    updateScale(scaleValue);
  }
};

photoScaleSmaller.addEventListener('click', scaleDown);
photoScaleBigger.addEventListener('click', scaleUp);
