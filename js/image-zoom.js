const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;
const ZOOM_DEFAULT_VALUE = 100;
const CHANGE_ZOOM_STEP = 25;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const zoomValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
//что за --value? псевдокласс?

function getZoomCurrentValue () {
  return Number(zoomValue.value.slice(0, -1));
}

function setScaleNewValue (value) {
  zoomValue.value = `${value}%`;
  previewImage.style.transform = `scale(${(value * 0.01).toFixed(2)})`;
}
//заменить Humber() и toFixed на приведение типов

function setDefaultScaleValue () {
  setScaleNewValue(ZOOM_DEFAULT_VALUE);
}

function setLowerScaleValue () {
  const zoomCurrentValue = getZoomCurrentValue();
  if (zoomCurrentValue > MIN_ZOOM_VALUE) {
    setScaleNewValue(zoomCurrentValue - CHANGE_ZOOM_STEP);
  }
}

function setLargerScaleValue () {
  const zoomCurrentValue = getZoomCurrentValue();
  if (zoomCurrentValue < MAX_ZOOM_VALUE) {
    setScaleNewValue(zoomCurrentValue + CHANGE_ZOOM_STEP);
  }
}

function addScaleControlHandlers () {
  scaleSmaller.addEventListener('click', setLowerScaleValue);
  scaleBigger.addEventListener('click', setLargerScaleValue);
}

export {addScaleControlHandlers, setDefaultScaleValue};
