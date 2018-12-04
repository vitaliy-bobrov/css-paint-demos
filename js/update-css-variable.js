(function() {
  const reflectProp = (propName, value) => {
    const reflectElement = document.querySelector(`[data-prop-reflect="${propName}"]`);

    if (reflectElement) {
      reflectElement.textContent = value;
    }
  };

  const init = () => {
    const controls = Array.from(document.querySelectorAll('[data-prop-control]'));
    const style = getComputedStyle(document.documentElement);

    controls.forEach(control => {
      const prop = control.dataset.prop;
      const value = style.getPropertyValue(prop).toString().trim();

      control.value = value;
      reflectProp(prop, value);
    });
  };

  init();

  document.addEventListener('input', event => {
    const data = event.target.dataset;
    const value = event.target.value;

    if (!'data-prop-control' in data) {
      return;
    }

    document.documentElement.style.setProperty(data.prop, value);
    reflectProp(data.prop, value);
  }, false);
})();
