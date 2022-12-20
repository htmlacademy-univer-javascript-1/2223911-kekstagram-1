import {isEscapeKey} from './util.js';

const templateError = document.querySelector('#error').content;
const templateSuccess = document.querySelector('#success').content;

const revealError = () => {
  const error = templateError.cloneNode(true);

  const closeModal = (value) => {
    if (isEscapeKey(value)) {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.error').remove();
    } else if (value.type === 'click') {
      const errorInner = value.target.closest('.error__inner');
      const errorButton = value.target.closest('.error__button');

      if ((errorInner && errorButton)|| (!errorInner && !errorButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.error').remove();
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(error);
};
const revealSuccess = () => {
  const success = templateSuccess.cloneNode(true);

  const closeModal = (value) => {
    if (isEscapeKey(value)) {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.success').remove();
    } else if (value.type === 'click') {
      const successInner = value.target.closest('.success__inner');
      const successButton = value.target.closest('.success__button');

      if ((successInner && successButton) || (!successInner && !successButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.success').remove();
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(success);
};
export {
  revealSuccess,
  revealError
};
