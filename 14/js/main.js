import {debounce} from './util.js';
import {getData} from './api.js';
import {createThumbnails} from './thumbnails.js';
import {setUserFormSubmit, closeUploadFileForm} from './form-validation.js';
import {thumbnailClickHandler} from './big-pictures.js';
import {revealError, revealSuccess} from './notifications.js';
import {setFilters, revealFilters, RERENDER_DELAY} from './filters.js';

getData((data) => {
  createThumbnails(data);
  revealFilters();
  setFilters(debounce((filterData) => createThumbnails(filterData(data)), RERENDER_DELAY));
  thumbnailClickHandler(data);
});

setUserFormSubmit(() => {
  closeUploadFileForm();
  revealSuccess();
}, () => {
  closeUploadFileForm(null, false);
  revealError();
});
