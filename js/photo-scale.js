const stepScale = 25;
const minValue = 25;
const maxValue = 100;

const scalePhoto = (controlValue, imgTransform) => {
  let scaleValue;

  const applyChanges = () => {
    controlValue.value = `${scaleValue}%`;
    imgTransform.style.transform = `scale(${scaleValue / 100})`;
  };

  const increaseValue = () => {
    if (scaleValue !== maxValue) {
      scaleValue += stepScale;
      applyChanges();
    }
  };

  const init = () => {
    scaleValue = maxValue;
    applyChanges();
  };

  init();
  const decreaseValue = () => {
    if (scaleValue !== minValue) {
      scaleValue -= stepScale;
      applyChanges();
    }
  };

  return {
    init,
    increaseValue,
    decreaseValue,
  };
};

export {
  scalePhoto
};
