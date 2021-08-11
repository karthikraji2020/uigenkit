const boxContent = document.querySelector(".box");
const copyCssContent = document.querySelector(".copy-css");
const colorCodeInHex = document.querySelector("#colorCodeInHex");
const fgColorCodeInHex = document.querySelector("#fgColorCodeInHex");
const strokeColorCodeInHex = document.querySelector("#strokeColorCodeInHex");
var containerContent = document.querySelector(".box-wrapper");
var globalHexValueOfPicker;
var globalHexValueOfPickerForeground;
var globalHexValueOfPickerStroke;
var globalHslaValueOfPicker;
var globalHslaValueOfPickerTwo;
var globalHslaValueOfPickerStroke;
const zoomRange = document.querySelector("#zoomRange");
const angleRange = document.querySelector("#angleRange");
const heightRange = document.querySelector("#heightRange");
const widthRange = document.querySelector("#widthRange");
const strokeRange = document.querySelector("#strokeRange");

const zoomRangeValue = document.querySelector("#zoomRangeValue");
const angleRangeValue = document.querySelector("#angleRangeValue");
const heightRangeValue = document.querySelector("#heightRangeValue");
const widthRangeValue = document.querySelector("#widthRangeValue");
const strokeRangeValue = document.querySelector("#strokeRangeValue");
var selectedDirection = "145deg";
var isInset = false;
const copyButton = document.getElementById("copy");
const textButton = document.querySelector(".copy-css");
const shapeType = document.querySelector('#shapeType');
const downloadAsJpgBtn = document.querySelector("#downloadAsJpg");
const randomButton = document.querySelector("#random");
const  circleDimension = "M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5";
const  squareDimension = "M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z";
const pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano", // or 'monolith', or 'nano'
  // default: "#ffffff",
  comparison: false,
  showAlways: false,
  closeOnScroll: true,
  closeWithKey: "Escape",
  swatches: [
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
],
  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      input: true,
      save: true
    },
  },
});
const pickrForeground = Pickr.create({
  el: ".color-picker2",
  theme: "nano", // or 'monolith', or 'nano'
  default: "#0848D4",
  comparison: false,
  showAlways: false,
  closeOnScroll: true,
  closeWithKey: "Escape",
  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(255, 235, 59, 0.95)',
],
  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      input: true,
      save: true
    },
  },
});
const pickrStroke = Pickr.create({
  el: ".color-picker3",
  theme: "nano", // or 'monolith', or 'nano'
  default: "#DBDBDB",
  comparison: false,
  palette: true,
  showAlways: false,
  closeOnScroll: true,
  closeWithKey: "Escape",
  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
],
  components: {
    // Main components
    preview: false,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      input: true,
      save: true
    },
  },
});

globalHslaValueOfPicker= 'hsla(221, 93%, 103%, 1)';
globalHslaValueOfPickerTwo= 'hsla(221, 93%, 43%, 1)';
globalHslaValueOfPickerStroke= 'hsla(311, 0%, 86%, 1)';
pickr.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
   globalHexValueOfPicker = color.toHEXA().toString();
   globalHslaValueOfPicker = color.toHSLA().toString();
  addcopycss();
  changeBgColor(rgbaColor,'bg');
});
pickrForeground.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
   globalHexValueOfPickerForeground = color.toHEXA().toString();
   globalHslaValueOfPickerTwo = color.toHSLA().toString();
  addcopycss();
  changeBgColor(rgbaColor,'fg');
});
pickrStroke.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
  globalHexValueOfPickerStroke = color.toHEXA().toString();
  globalHslaValueOfPickerStroke = color.toHSLA().toString();
  addcopycss();
  changeBgColor(rgbaColor,'stroke');
});




function updateSliderValue(){
  zoomRangeValue.innerText = `${zoomRange.value}`;
  angleRangeValue.innerHTML = `${angleRange.value}`;
  heightRangeValue.innerHTML = `${heightRange.value}`;
  widthRangeValue.innerHTML = `${widthRange.value}`;
  strokeRangeValue.innerHTML = `${strokeRange.value}`;
}


updateSliderValue();

addcopycss();
changeBgColor('rgba(218, 218, 218, 1)');


// sizeRange(sizeRange.value);
zoomRange.oninput = function () {
  zoomRangeValue.innerHTML = `${this.value}`;
  addcopycss();
};

angleRange.oninput = function () {
  angleRangeValue.innerHTML = `${this.value}`;
  addcopycss();
};

heightRange.oninput = function () {
  heightRangeValue.innerHTML = `${this.value}`;
  addcopycss();
};

widthRange.oninput = function () {
  widthRangeValue.innerHTML = `${this.value}`;
  addcopycss();
};

strokeRange.oninput = function () {
  strokeRangeValue.innerHTML = `${this.value}`;
  addcopycss();
};
function getBackgroundColor(elem) {
  let background = window
    .getComputedStyle(elem, null)
    .getPropertyValue("background-color");
  return background;
}

function CopyColorToClipboard(content) {
  var range = document.createRange();
  range.selectNode(content);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  alert("Color Code Copied " + content.innerText);

  window.getSelection().removeAllRanges(); // to deselect
}

function  getSvgImage() {
  return `<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='${widthRangeValue.innerHTML}' height='${heightRangeValue.innerHTML}' patternTransform='scale(${zoomRangeValue.innerHTML}) rotate(${angleRangeValue.innerHTML})'><rect x='0' y='0' width='100%' height='100%' fill='${globalHslaValueOfPicker}'/><path d='${isInset?squareDimension:circleDimension}'  stroke-width='${strokeRangeValue.innerHTML}' stroke='${globalHslaValueOfPickerStroke}' fill='${globalHslaValueOfPickerTwo}'/></pattern></defs><rect width='100%' height='100%' fill='url(%23a)'/></svg>`
  }
// sizeRange.trigger('input');
const e = new Event("input");
zoomRange.dispatchEvent(e);
function addcopycss() {
  let svgEle = `
  <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <pattern id='a' patternUnits='userSpaceOnUse' width='${widthRangeValue.innerHTML}' height='${heightRangeValue.innerHTML}' patternTransform='scale(${zoomRangeValue.innerHTML}) rotate(${angleRangeValue.innerHTML})'>
    <rect x='0' y='0' width='100%' height='100%' fill='${globalHslaValueOfPicker}'/>
    <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='${strokeRangeValue.innerHTML}' stroke='${globalHslaValueOfPickerStroke}' fill='${globalHslaValueOfPickerTwo}'/>
    </pattern>
    </defs>
    <rect width='100%' height='100%'  fill='url(%83a)'/>
    </svg>
    `
  copyCssContent.innerText = `background-image: url("data:image/svg+xml,${getSvgImage()}");`;
         document.querySelector(".box-wrapper").style.backgroundImage = `url("data:image/svg+xml,${getSvgImage()}")`;
  // document.querySelector("#downloadImg").style.backgroundImage = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='${widthRangeValue.innerHTML}' height='${heightRangeValue.innerHTML}' patternTransform='scale(${zoomRangeValue.innerHTML}) rotate(${angleRangeValue.innerHTML})'><rect x='0' y='0' width='100%' height='100%' fill='${globalHslaValueOfPicker}'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='${strokeRangeValue.innerHTML}' stroke='${globalHslaValueOfPickerStroke}' fill='${globalHslaValueOfPickerTwo}'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`;

}

function ratioCalucations() {
  let ratio = Number(sizeRangeValue.innerHTML) / 10;
  let blurRatio = Number(sizeRangeValue.innerHTML) / 5;
  return ratio;
}


function changeBgColor(colorValue,type) {

  switch (type) {
    case "bg":
      colorCodeInHex.value = document.querySelectorAll(".pcr-result")[0].value;
      break;
      case "fg":
        fgColorCodeInHex.value = document.querySelectorAll(".pcr-result")[1].value;
      break;
      case "stroke":
        strokeColorCodeInHex.value = document.querySelectorAll(".pcr-result")[2].value;
      break;
    }

}

function toggleInset(Obj) {
  isInset = isInset ? false : true;
  isInset ? shapeType.textContent = "Circle" : shapeType.textContent = "Square";
  addcopycss();
}

shapeType.addEventListener("click", (e) => toggleInset(e));

const copyText = (e) => {
  // debugger;
  window.getSelection().selectAllChildren(textButton);
  document.execCommand("copy");
  e.target.setAttribute("tooltip", "Copied! ✅");
};

function download(url){
  let timeInMiliSec = Date.now();
  var a = $("<a style='display:none' id='js-downloder'>")
  .attr("href", url)
  .attr("download",`UiGenaratorKit_BackGround${timeInMiliSec}.jpg`)
  .appendTo("body");
  a[0].click();
  a.remove();
}

const resetTooltip = (e) => {
  e.target.setAttribute("tooltip", "Copy to clipboard");
};
const downloadAsJpg = (e) => {
  var element = document.querySelector(".box-wrapper");
  // document.querySelector("#downloadImg").style.backgroundImage = document.querySelector(".box-wrapper").style.backgroundImage;
  // var element = document.querySelector("#downloadImg");
  html2canvas(element).then(function(canvas) {
    download(canvas.toDataURL("image/jpg"));
  })
};
copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));


const getRandomValue = (num) => {
let value = Math.floor(Math.random() * num);
return value;
}
const generateRandom = (e) => {
  zoomRange.value = getRandomValue(8);
  angleRange.value = getRandomValue(150);
  strokeRange.value = getRandomValue(8);
  heightRange.value = getRandomValue(30);
  widthRange.value = getRandomValue(30);

      //  let bgHex=  rgbToHex(data);
      // let inverterHexValue = getShadesOfColor(bgHex,-75);
  updateSliderValue();
  addcopycss();
}




downloadAsJpgBtn.addEventListener("click", (e) => downloadAsJpg(e));
downloadAsJpgBtn.addEventListener("mouseover", (e) => resetTooltip(e));
randomButton.addEventListener("click", (e) => generateRandom(e));
