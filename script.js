var saveButton = document.getElementById('save-button');

function generateBarcode(value) {
    console.log('Generating barcode:', value);
    JsBarcode('#barcode', value, {
        format: 'code128',
        displayValue: true,
        background: '#ffffff', 
        lineColor: '#000000' 
    });
}

function convertSvgToImage(callback) {
    const svgElement = document.getElementById('barcode');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const image = new Image();

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'image.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };

  image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
}

function generateBarcodeFromInput() {
    var inputValue = document.getElementsByName('barcode-input')[0].value;
    generateBarcode(inputValue);
    console.log('click click');
  }
  
    
function saveButtonClick(event) {
    event.preventDefault();
    console.log('click click');
    convertSvgToImage();
  }