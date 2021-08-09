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

const pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano", // or 'monolith', or 'nano'
  // default: "#ffffff",
  comparison: false,
  showAlways: false,
  closeOnScroll: true,
  closeWithKey: "Escape",
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
  default: "#0848D4",
  comparison: false,
  showAlways: false,
  closeOnScroll: true,
  closeWithKey: "Escape",
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


zoomRangeValue.innerText = `${zoomRange.value}`;
angleRangeValue.innerHTML = `${angleRange.value}`;
heightRangeValue.innerHTML = `${heightRange.value}`;
widthRangeValue.innerHTML = `${widthRange.value}`;
strokeRangeValue.innerHTML = `${strokeRange.value}`;

// boxContent.style.boxShadow = checkDirection();
// boxContent.style.width = zoomRange.value;
// boxContent.style.height = zoomRange.value;
addcopycss();
changeBgColor('rgba(218, 218, 218, 1)');

// const rgbToHex = function (rgb) {
//   let RGB = rgb.split("rgb(")[1].split(")").join("").split(",");
//   let darray = "";
//   for (let index = 0; index < RGB.length; index++) {
//     const element = RGB[index];
//     var hex = Number(element).toString(16);
//     if (hex.length < 2) {
//       hex = "0" + hex;
//     }
//     darray += hex;
//   }
//   return `#${darray}`;
// };

// sizeRange(sizeRange.value);
zoomRange.oninput = function () {
  zoomRangeValue.innerHTML = `${this.value}`;

  addcopycss();
};

angleRange.oninput = function () {
  angleRangeValue.innerHTML = `${this.value}`;
  boxContent.style.borderRadius = `${this.value}px`;
  addcopycss();
};

heightRange.oninput = function () {
  heightRangeValue.innerHTML = `${this.value}`;
  // boxContent.style.boxShadow = checkDirection();
  addcopycss();
};

widthRange.oninput = function () {
  widthRangeValue.innerHTML = `${this.value}`;
  // boxContent.style.boxShadow =  `${this.value}px`;
  // boxContent.style.boxShadow = checkDirection();
  addcopycss();
};

strokeRange.oninput = function () {
  strokeRangeValue.innerHTML = `${this.value}`;
  boxContent.style.boxShadow = `${this.value}px`;
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
// sizeRange.trigger('input');
const e = new Event("input");
zoomRange.dispatchEvent(e);
function addcopycss() {
  // let boxShadowvalues = checkDirection();
  let svgEle = `
  <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <pattern id='a' patternUnits='userSpaceOnUse' width='${widthRangeValue.innerHTML}' height='${heightRangeValue.innerHTML}' patternTransform='scale(${zoomRangeValue.innerHTML}) rotate(${angleRangeValue.innerHTML})'>
    <rect x='0' y='0' width='100%' height='100%' fill='${globalHslaValueOfPicker}'/>
    <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='${strokeRangeValue.innerHTML}' stroke='${globalHslaValueOfPickerStroke}' fill='${globalHslaValueOfPickerTwo}'/>
    </pattern>
    </defs>
    <rect width='800%' height='800%' transform='translate(0,0)' fill='url(%83a)'/>
    </svg>
    
    `
    // <path d="M150 0 L75 200 L225 200 Z" />

  // <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  // copyCssContent.innerText = `background:${getBackgroundColor(
  //   containerContent
  // )};\nborder-radius:${
  //   radiusRangeValue.innerHTML
  // }px;\nbox-shadow:${boxShadowvalues};`;
// background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='hsla(258.5,59.4%,59.4%,1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
  copyCssContent.innerText = `background-image: url("data:image/svg+xml,${svgEle}");`;

 
  document.querySelector(".box-wrapper").style.backgroundImage = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse'  width='${widthRangeValue.innerHTML}' height='${heightRangeValue.innerHTML}' patternTransform='scale(${zoomRangeValue.innerHTML}) rotate(${angleRangeValue.innerHTML})'><rect x='0' y='0' width='100%' height='100%' fill='${globalHslaValueOfPicker}'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='${strokeRangeValue.innerHTML}' stroke='${globalHslaValueOfPickerStroke}' fill='${globalHslaValueOfPickerTwo}'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`;
  boxContent.style.borderRadius = `${angleRangeValue.innerHTML}px`;

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

function changePositionTo(pos, thisObj) {
  selectedDirection = pos;
  if (thisObj !== "" && thisObj !== undefined) {
    $(".position-wrapper .active").removeClass("active");
    $(thisObj).addClass("active");
  }
  addcopycss();
}

function checkDirection() {
  let boxshadow, boxshadowWithInset, firstInsetData, data1, secondInsetData;
  boxshadow = getBoxShadow();

  firstInsetData = "inset" + boxshadow.split("), ")[0] + ") ,";
  data1 = boxshadow.split("), ")[1];
  secondInsetData = "inset " + data1;
  boxshadowWithInset = firstInsetData + secondInsetData;

  //checking whether inset Enabled
    // return boxshadow;
     
  if (isInset) {
    return boxshadow;
  } else {
    return boxshadowWithInset;
  }
}
function toggleInset(Obj) {
  isInset = isInset ? false : true;
  isInset ? shapeType.textContent = "Pressed" : shapeType.textContent = "Flat";
  addcopycss();
}
function getBoxShadow() {
  var data, test, firstPointShadowColor, secondPointShadowColor;
  let ratio = Number(heightRangeValue.innerHTML);
  let blurRatio = Number(widthRangeValue.innerHTML);

  data = getBackgroundColor(containerContent);
  test = strokeRangeValue.innerHTML;
  if (!data.includes("rgba(")) {
    let hexValue = rgbToHex(data);

     let bgHex=  rgbToHex(data);
      let inverterHexValue = getShadesOfColor(bgHex,-75);
   
    let result = hexToRGBA(inverterHexValue);

     let newData = result.split(',');
     let secondStopShadow = Number(strokeRangeValue.innerHTML)*1.8;
     let  roundedOpacity = secondStopShadow.toFixed(1);
     let opResult = `${newData[0]},${newData[1]},${newData[2]},${roundedOpacity})`

   
    firstPointShadowColor=opResult;


    secondPointShadowColor =data;
    // Returns FF00FF
  } else {
    firstPointShadowColor = data;
    secondPointShadowColor = data;
    
  }

  switch (selectedDirection) {
    case "145deg":
      return ` ${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    case "225deg":
      return ` -${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    case "315deg":
      return ` -${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    case "45deg":
      return ` ${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    default:
      return "daet";
  }
}




toggleInset.apply();
setTimeout(() => {
  changePositionTo("145deg");
}, 800);

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
  html2canvas(element).then(function(canvas) {
    download(canvas.toDataURL("image/jpg"));
  })
};
copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));






downloadAsJpgBtn.addEventListener("click", (e) => downloadAsJpg(e));
downloadAsJpgBtn.addEventListener("mouseover", (e) => resetTooltip(e));
