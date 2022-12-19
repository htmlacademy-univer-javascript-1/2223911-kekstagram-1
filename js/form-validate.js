import {isEscapeKey} from './util.js';
import {smartSlider} from './image-effects.js';
import {scaleImage} from './photo-scale.js';
import {sendData} from './api.js';
const TAG_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/i;
const maxNumberTags = 5;

const splitHashtags = (value) => value.toLowerCase().split(' ');

const checkIfHashtagsRepeated = (value) => {
  if (value !== '') {
    const hashTagsArray = splitHashtags(value);
    const hashTagsSet = new Set(hashTagsArray);

    if (hashTagsSet.size !== hashTagsArray.length) {
      return false;
    }
  }
  return true;
};

const checkMaxHashtagsCount = (value) => {
  if (value !== '') {
    const hashTagsArray = splitHashtags(value);

    if (hashTagsArray.length > maxNumberTags) {
      return false;
    }
  }
  return true;
};

const checkIfHashtagCorrect = (value) => {
  if (value === '') {
    return true;
  }

  const hashTagsArray = splitHashtags(value);
  return hashTagsArray.every((hashtag) => TAG_REGEX.test(hashtag));
};
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const smartSliderFilters = smartSlider('none', effectLevelSlider, effectLevelValue);
const scaleUploadImage = scaleImage(scaleControlValue, imgPreview);

pristine.addValidator(textHashtags, checkIfHashtagsRepeated, 'Хештеги регистронезависимы и не должны повторяться');
pristine.addValidator(textHashtags, checkMaxHashtagsCount, `Максимальное число хештегов - ${maxNumberTags}`);
pristine.addValidator(textHashtags, checkIfHashtagCorrect, 'Один из введённых вами хештегов некорректен');

const applyChanges = (value) => {
  imgPreview.classList.remove(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  smartSliderFilters.setCurrentFilter(value);
  imgPreview.classList.add(`effects__preview--${smartSliderFilters.getCurrentFilter()}`);
  effectLevelSlider.noUiSlider.updateOptions(smartSliderFilters.getOptions());
  imgPreview.style.filter = smartSliderFilters.getStyles();
};

const closeUploadFileForm = (e = null, clear = true) => {
  if (e === null || (isEscapeKey(e) && document.activeElement !== textHashtags && document.activeElement !== textDescription) || e.type === 'click') {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
    uploadCancel.removeEventListener('click', closeUploadFileForm);

    if (clear) {
      imgUploadForm.reset();
      scaleUploadImage.init();
      applyChanges('none');
    }
  }
};

uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadFileForm);
  uploadCancel.addEventListener('click', closeUploadFileForm);
});

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();

          unblockSubmitButton();
        },
        new FormData(imgUploadForm)
      );
    }
  });
};

scaleControlSmaller.addEventListener('click', scaleUploadImage.decreaseValue);
scaleControlBigger.addEventListener('click', scaleUploadImage.increaseValue);

noUiSlider.create(effectLevelSlider, smartSliderFilters.getOptions());

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = smartSliderFilters.getStyles();
});

effectsList.addEventListener('click', (e) => {
  const effectsItems = e.target.closest('.effects__item');
  if (effectsItems) {
    const value = effectsItems.querySelector('.effects__radio').value;
    applyChanges(value);
  }
});

export {
  setUserFormSubmit,
  closeUploadFileForm
};
