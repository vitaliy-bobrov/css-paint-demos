(function() {
  const reflectProp = (propName, value) => {
    const reflectElement = document.querySelector(`[data-prop-reflect="${propName}"]`);

    if (reflectElement) {
      reflectElement.textContent = value;
    }
  };

  const controls = Array.from(document.querySelectorAll('[data-prop-control]'));

  controls.forEach(control => {
    reflectProp(control.dataset.prop, control.value);
  });

  document.addEventListener('change', event => {
    const data = event.target.dataset;

    if (!'data-prop-control' in data) {
      return;
    }

    document.documentElement.style.setProperty(data.prop, event.target.value);
    reflectProp(data.prop, event.target.value);
  }, false);
})();
