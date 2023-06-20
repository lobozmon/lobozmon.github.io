

function generateBarcode (value){
    JsBarcode('#barcode',value, {
        format: 'code128',
        displayValue: true,
    });
}

document.getElementById('save-button').addEventListener('click', function() {
    var canvas = document.getElementsByName('barcode');
    var dataURL = canvas.toDataURL("image/jpeg");
  
    var img = new Image();
    img.src = dataURL;
  
    var newCanvas = document.createElement('canvas');
    newCanvas.width = img.width;
    newCanvas.height = img.height;
    var ctx = newCanvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
  
    var jpgDataURL = newCanvas.toDataURL("image/jpeg");
  
    var link = document.createElement('a');
    link.href = jpgDataURL;
    link.download = "barcode.jpg";
  
    link.click();
});

console.log(jpgDataURL);

