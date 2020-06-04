const boxContent = document.querySelector('.box');
const copyCssContent = document.querySelector('.copy-css');
// const containerContent = document.querySelector('#content-wrapper');
const colorCodeInHex = document.querySelector('#colorCodeInHex');
var containerContent = document.getElementById('content-wrapper');
const sizeRange = document.querySelector("#sizeRange");
const radiusRange = document.querySelector("#radiusRange");
const distanceRange = document.querySelector("#distanceRange");
const blurRange = document.querySelector("#blurRange");
const intensityRange = document.querySelector("#intensityRange");

const sizeRangeValue = document.querySelector("#sizeRangeValue");
const radiusRangeValue = document.querySelector("#radiusRangeValue");
const distanceRangeValue = document.querySelector("#distanceRangeValue");
const blurRangeValue = document.querySelector("#blurRangeValue");
const intensityRangeValue = document.querySelector("#intensityRangeValue");
var selectedDirection = '135deg';
var isInset = false;

// sizeRangeValue.innerHTML = sizeRange.value;
// boxContent.style.width  = sizeRange.value;
// boxContent.style.height  = sizeRange.value;

sizeRangeValue.innerText = `${sizeRange.value}`;
radiusRangeValue.innerHTML = `${radiusRange.value}`;
distanceRangeValue.innerHTML = `${distanceRange.value}`;
blurRangeValue.innerHTML = `${blurRange.value}`;
intensityRangeValue.innerHTML = `${intensityRange.value}`;

boxContent.style.boxShadow = checkDirection();
boxContent.style.width  = sizeRange.value;
boxContent.style.height  = sizeRange.value;
addcopycss();
changeBgColor(colorCodeInHex.value);
const rgbToHex = function (rgb) {
    debugger;
    let RGB = rgb.split("rgb(")[1].split(")").join("").split(",");
    let darray ='';
    for (let index = 0; index < RGB.length; index++) {
      const element = RGB[index];
      var hex = Number(element).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      darray+=hex;
    }
    return `#${darray}`;
  };
  // sizeRange(sizeRange.value);
 sizeRange.oninput = function() {
  sizeRangeValue.innerHTML = `${this.value}`;
  //ratio  Calculations
  let blurRatio= Number(this.value)/5;
  let distanceRatio= Number(this.value)/10;
  let radiusRatio= Number(this.value)/2;

  blurRange.value = blurRatio;
  blurRangeValue.innerHTML = blurRatio;

  distanceRange.value= distanceRatio;
  distanceRangeValue.innerHTML = distanceRatio;

  radiusRange.max= radiusRatio;
  radiusRange.value= radiusRatio/1.5;
  radiusRangeValue.innerHTML = radiusRatio;


  boxContent.style.width =  `${this.value}px`;
  boxContent.style.height =  `${this.value}px`;
  boxContent.style.borderRadius = radiusRange.value;
  addcopycss();
}

radiusRange.oninput = function() {
  radiusRangeValue.innerHTML = `${this.value}`;
  boxContent.style.borderRadius = `${this.value}px`;
  addcopycss();
}

distanceRange.oninput = function() {
  distanceRangeValue.innerHTML = `${this.value}`;
  boxContent.style.boxShadow =  `${this.value}px`;
  addcopycss();
}

blurRange.oninput = function() {
  blurRangeValue.innerHTML = `${this.value}`;
  boxContent.style.boxShadow =  `${this.value}px`;
  addcopycss();

}

intensityRange.oninput = function() {
  intensityRangeValue.innerHTML = `${this.value}`;
  boxContent.style.boxShadow =  `${this.value}px`;
  addcopycss();
}
function getBackgroundColor(elem) {
  let background =  window.getComputedStyle(elem,null).getPropertyValue('background-color');
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

function addcopycss() {
    let boxShadowvalues= checkDirection();
    copyCssContent.textContent = `border-radius:${radiusRangeValue.innerHTML}px;\n 
    background:${getBackgroundColor(containerContent)};\n 
    boxShadow : ${boxShadowvalues}`;
    boxContent.style.boxShadow =  `${boxShadowvalues}`;
    boxContent.style.borderRadius =  `${radiusRangeValue.innerHTML}px`;

 }

 function  ratioCalucations () {
  let ratio =Number(sizeRangeValue.innerHTML)/10;
  let blurRatio =Number(sizeRangeValue.innerHTML)/5;
  return ratio ;
 }
 function changeBgColor(colorValue) {
    debugger;
    if(!colorValue.includes('#') && !colorValue.includes('rgba('))
    {
        colorCodeInHex.value= rgbToHex(colorValue);
    }
    colorCodeInHex.value=colorValue;
    // containerContent.style.backgroundImage =  `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
    document.querySelector('#content-wrapper').style.backgroundColor =  `${colorValue}`;
 }

function changePositionTo(pos) {
  debugger
  selectedDirection=pos;
  addcopycss();
}

 function checkDirection () 
 {
    var containerBg;
    let ratio =Number(sizeRangeValue.innerHTML)/10;
    let blurRatio =Number(sizeRangeValue.innerHTML)/5;
    // let containerBg = getBackgroundColor(containerContent);
    var data=  getBackgroundColor(containerContent);
    if(!data.includes('rgba('))
    {
       containerBg = data.replace('rgb(','rgba(').replace(')',',0.2)');
    } else {
      containerBg=data;
    }
    // let containerBg = data.replace('rgb','rgba').replace(')',',.6)');
    debugger;
    if(!isInset)
    {
     let boxshadowWithInset = new Array();
     boxshadowWithInset = getBoxShadow();
     boxshadowWithInset.unshift("inset");
     debugger;
     return 
    }
   else 
   {
     
   }
    switch (selectedDirection) {
        case '135deg':
            return `${ratio}px ${ratio}px ${blurRatio}px ${containerBg}, -${ratio}px -${ratio}px ${blurRatio}px #470101 `;
        break;
        case '225deg':
            return `-${ratio}px ${ratio}px ${blurRatio}px ${containerBg}, -${ratio}px ${ratio}px ${blurRatio}px #470101 `;
        break;
        case '315deg':
            return `-${ratio}px -${ratio}px ${blurRatio}px ${containerBg}, ${ratio}px ${ratio}px ${blurRatio}px #470101 `;
        break;
        case '45deg':
            return `${ratio}px -${ratio}px ${blurRatio}px ${containerBg}, ${ratio}px -${ratio}px ${blurRatio}px #470101 `;
        break;
        default:
        return "daet";
    }
  

 }

 function getBoxShadow () {
  var containerBg;
  let ratio =Number(sizeRangeValue.innerHTML)/10;
  let blurRatio =Number(sizeRangeValue.innerHTML)/5;
  // let containerBg = getBackgroundColor(containerContent);
  var data=  getBackgroundColor(containerContent);
  if(!data.includes('rgba('))
  {
     containerBg = data.replace('rgb(','rgba(').replace(')',',0.2)');
  } else {
    containerBg=data;
  }
    switch (selectedDirection) {
      case '135deg':
          return ` ${ratio}px ${ratio}px ${blurRatio}px ${containerBg}, -${ratio}px -${ratio}px ${blurRatio}px #470101 `;
      break;
      case '225deg':
          return ` -${ratio}px ${ratio}px ${blurRatio}px ${containerBg}, -${ratio}px ${ratio}px ${blurRatio}px #470101 `;
      break;
      case '315deg':
          return ` -${ratio}px -${ratio}px ${blurRatio}px ${containerBg}, ${ratio}px ${ratio}px ${blurRatio}px #470101 `;
      break;
      case '45deg':
          return ` ${ratio}px -${ratio}px ${blurRatio}px ${containerBg}, ${ratio}px -${ratio}px ${blurRatio}px #470101 `;
      break;
      default:
      return "daet";
}
 }

