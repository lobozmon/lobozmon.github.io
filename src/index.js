import JsBarcode from 'jsbarcode';
import { initializeApp } from 'firebase/app'
import { 
    collection,
    getFirestore,
    getDocs,
    addDoc
 } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

let barcodeCounter = Number(localStorage.getItem('barcodeCounter')) || 1;

const firebaseConfig = {
    apiKey: "AIzaSyD_aDWJOszhWs5vflvmn9ION4krtEk2SZg",
    authDomain: "projektbarco.firebaseapp.com",
    databaseURL: "https://projektbarco-default-rtdb.firebaseio.com",
    projectId: "projektbarco",
    storageBucket: "projektbarco.appspot.com",
    messagingSenderId: "590785995416",
    appId: "1:590785995416:web:6bbd1e730f1069507e66ed",
    measurementId: "G-9GYRY43XH4"
  };

initializeApp(firebaseConfig)

const db = getFirestore()
const barcodeRef = collection(db, 'barcodes')

const storage = getStorage();

const saveButton = document.getElementById('save-button');
const generateButton = document.getElementById('button');

function generateBarcode(value) {
  console.log('Generating barcode:', value);
  JsBarcode('#barcode', value, {
    format: 'code128',
    displayValue: true,
    background: '#ffffff',
    lineColor: '#000000',
  });
}

function convertSvgToImage() {

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

    uploadBarcodeImage(dataUrl);
  }

image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
}

function generateBarcodeFromInput() {
  const inputValue = document.getElementsByName('barcode-input')[0].value;
  generateBarcode(inputValue);
}

function saveButtonClick(event) {
  event.preventDefault();
  convertSvgToImage();
}

function uploadBarcodeImage(dataUrl) {
    const fileName = `image_${barcodeCounter}.png`;
    barcodeCounter++;
  
    const barcodeRef = ref(storage, `barcodes/${fileName}`);
    const imageData = dataURLToBlob(dataUrl);
  
    uploadBytes(barcodeRef, imageData)
      .then((snapshot) => {
        console.log('Barcode image uploaded successfully');
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log('Download URL:', downloadURL);
  
      })
      .catch((error) => {
        console.error('Error uploading barcode image:', error);
      });
  }
  
  function dataURLToBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }
  
saveButton.addEventListener('click', saveButtonClick);
generateButton.addEventListener('click', generateBarcodeFromInput);