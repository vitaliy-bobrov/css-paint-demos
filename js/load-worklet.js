if ('paintWorklet' in CSS) {
  // Safari TP fix.
  // Now Safari only accepts source code as a string instead file path.
  if ('safari' in window) {
    fetch('paint.js')
      .then(async (res) => {
        const blob = await res.blob();
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          CSS.paintWorklet.addModule(reader.result);
        });

        reader.readAsText(blob);
      });
  } else {
    CSS.paintWorklet.addModule('paint.js');
  }
}
