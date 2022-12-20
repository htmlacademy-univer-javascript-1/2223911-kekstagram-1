const stepScale = 25;
const minValue = 25;
const maxValue = 100;

const scalePhoto = (scaleValue, imgTransform) => {
  let scaleValue;

 const increaseValue = () => {
    if (scaleValue !== maxValue) {
      scaleValue += stepScale;
      applyChanges();
    }
  };

  const initial = () => {
    scaleValue = maxValue;
    applyChanges();
  };

  initial();


 const applyChanges = () => {
    scaleValue.value = `${scaleValue}%`;
    imgTransform.style.transform = `scale(${scaleValue / 100})`;
  };
  const decreaseValue = () => {
    if (scaleValue !== minValue) {
      scaleValue -= stepScale;
      applyChanges();
    }
  };

  return {
    initial,
    increaseValue,
    decreaseValue,
  };
};

export {
  scalePhoto
};
