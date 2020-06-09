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
intensityRangeValue.innerHTML = `${intensityRange.value/10}`;

boxContent.style.boxShadow = checkDirection();
boxContent.style.width  = sizeRange.value;
boxContent.style.height  = sizeRange.value;
addcopycss();
debugger;

const rgbToHex = function (rgb) {
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
  intensityRangeValue.innerHTML = `${this.value/10}`;
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
// sizeRange.trigger('input');
debugger;
const e = new Event("input");
sizeRange.dispatchEvent(e);
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
    // colorCodeInHex.value=colorValue;
    colorCodeInHex.value=document.querySelector('.pcr-result').value;
    // containerContent.style.backgroundImage =  `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
    document.querySelector('#content-wrapper').style.backgroundColor =  `${colorValue}`;
 }

 // Debouncing in Javascript
let counter = 0;
// const getData = (code) => {
  function getData(code) {
  // calls an API and gets Data
  console.log("Fetching Data .."+code, counter++);
}

const debounce = function (fn, d) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData.apply(context, args);
    }, d);
  }
}

function betterFunction(code) {
  debounce(getData(code), 4000);
} 
function changePositionTo(pos) {
  debugger
  selectedDirection=pos;
  addcopycss();
}

 function checkDirection () 
 {
    debugger;
    let boxshadow,boxshadowWithInset,firstInsetData,data1,secondInsetData ;
    boxshadow = getBoxShadow();
    firstInsetData ="inset"+boxshadow.split('), ')[0]+') ,';
    data1 =boxshadow.split('), ')[1];
    secondInsetData ="inset "+data1;
    boxshadowWithInset = firstInsetData+secondInsetData;

    //checking whether inset Enabled 
    if(isInset) {
      return boxshadow;
    } else {
      return boxshadowWithInset;
    }
 }
 function toggleInset () { 
   isInset = isInset? false : true
   addcopycss();
 }
 function getBoxShadow () {
  var data,test,firstPointShadowColor,secondPointShadowColor;
  let ratio =Number(sizeRangeValue.innerHTML)/10;
  let blurRatio =Number(sizeRangeValue.innerHTML)/5;
  data=  getBackgroundColor(containerContent);
  test= intensityRangeValue.innerHTML;
    if(!data.includes('rgba(')) {
      firstPointShadowColor = data.replace('rgb(','rgba(').replace(')',`,${intensityRangeValue.innerHTML})`);
      // secondPointShadowColor = data.replace('rgb(','rgba(').replace(')',`,${intensityRangeValue.innerHTML * 2})`);
      let aa =rgbToHex(data);
      let ba =invertColor(aa);
      debugger;
      secondPointShadowColor = ba;
 // Returns FF00FF

    } else {
      firstPointShadowColor=data;
      secondPointShadowColor=data;
    }

    switch (selectedDirection) {
      case '135deg':
          return ` ${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
      case '225deg':
          return ` -${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
      case '315deg':
          return ` -${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
      case '45deg':
          return ` ${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
      default:
      return "daet";
  }
 }

 function invertColor(hexTripletColor) {
  debugger;
      var color = hexTripletColor;
      color = color.substring(1); // remove #
      color = parseInt(color, 16); // convert to integer
      color = 0xFFFFFF ^ color; // invert three bytes
      color = color.toString(16); // convert to hex
      color = ("000000" + color).slice(-6); // pad with leading zeros
      color = "#" + color; // prepend #
      return color;
  }
