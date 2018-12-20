if ('paintWorklet' in CSS) {
  // Safari TP fix.
  // Now Safari only accepts source code as a string instead file path.
  if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
    (async function() {
      const response = await fetch('paint.js');
      const blob = await response.blob();
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        CSS.paintWorklet.addModule(reader.result);
      });

      reader.readAsText(blob);
    })();
  } else {
    CSS.paintWorklet.addModule('paint.js');
  }
}
