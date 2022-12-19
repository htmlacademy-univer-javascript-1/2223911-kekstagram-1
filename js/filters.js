import {shuffleArray} from './util.js';

const RERENDER_DELAY = 500;

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');

const revealFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const setFilters = (cb) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (button) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');

      if (button.id in filters) {
        cb(filters[button.id]);
      }
    }
  });
};
const filters = {
  'filter-default': (data) => data,
  'filter-random': (data) => shuffleArray(data.slice()),
  'filter-discussed': (data) => data.slice().sort((a, b) => b.comments.length - a.comments.length)
};
export {
  revealFilters,
  setFilters,
  RERENDER_DELAY
};
