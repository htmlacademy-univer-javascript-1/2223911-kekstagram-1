import './util.js';
import {createThumbnails} from './thumbnails.js';
import './form-validate.js';
import {getData} from './api.js';
import './filters.js';
import './big-pictures.js';
import {showError, showSuccess} from './notifications.js';

getData((photo) => {
    createThumbnails(photo);
    showFilters();
    setFilter(debounce((filterData) => createThumbnails(filterData(photo)), TIMEOUT_DELAY));
  });

  setUserFormSubmit(() => {
    closeUploadFileForm();
    showSuccess();
  }, () => {
    closeUploadFileForm(null, false);
    showError();
  });
