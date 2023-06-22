function generateBarcode(value) {
    console.log('Generating barcode:', value);
    JsBarcode('#barcode', value, {
        format: 'code128',
        displayValue: true,
        background: '#ffffff', 
        lineColor: '#000000' 
    });
}

document.getElementById('button').addEventListener('click', function() {
    var inputValue = document.getElementsByName('barcode-input')[0].value;
    generateBarcode(inputValue);
});

document.getElementById('save-button').addEventListener('click', function() {
    const svg = document.getElementById('barcode');
    const { x, y, width, height } = svg.viewBox.baseVal;
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.drawImage(image, x, y, width, height);
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'image.png';
      link.click();
      URL.revokeObjectURL(url);
    });
  });
