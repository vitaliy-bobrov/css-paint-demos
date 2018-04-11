const canvas = document.querySelector('.bars');
const view = document.querySelector('.values');
const style = getComputedStyle(canvas);
const initialValues = JSON.parse(style.getPropertyValue('--bar-map'))
  .map(v => v.value);
const TIME = 1000;

view.innerHTML = initialValues;

function rand(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate(values, time) {
  const start = performance.now();
  const style = getComputedStyle(canvas);
  const init = JSON.parse(style.getPropertyValue('--bar-map'));
  const from = init.map(v => v.value);
  const increments = from.map((v, i) => {
    return -(v - values[i]) / time;
  });
  view.innerHTML = values;

  return function raf(now) {
    const count = Math.floor(now - start);
    const style = getComputedStyle(canvas);
    const dataset = JSON.parse(style.getPropertyValue('--bar-map'));
    const value = dataset.map((s, i) => {
      return {
        ...s,
        value: from[i] + (increments[i] * count)
      };
    });

    canvas.style.setProperty('--bar-map', JSON.stringify(value));

    if(count > time) {
      const final = dataset.map((s, i) => {
        return {
          ...s,
          value: values[i]
        };
      });
      canvas.style.setProperty('--bar-map', JSON.stringify(final));

      return;
    }

    requestAnimationFrame(raf);
  }
}

canvas.addEventListener('mouseenter', event => {
  const values = initialValues.map(() => rand(0, 120));

  requestAnimationFrame(animate(values, TIME));
});

canvas.addEventListener('mouseleave', event => {
  requestAnimationFrame(animate(initialValues, TIME));
});
