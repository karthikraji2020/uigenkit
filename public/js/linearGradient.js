
var headerBackground =document.querySelector('#dynamicBackground');
var newcolorBackground =document.querySelector('#newcolor');
var copyCssWrapper =document.querySelector('.copycss');
var bgColorOne=document.querySelector('#bgColorOne');
var bgColorTwo =document.querySelector('#bgColorTwo');
var selectedDirection="to left";
var currentDirection="";
var directionInDeg='160deg';
const  bgStopPointOne =document.querySelector('.bgStopPointOne');
const  bgStopPointTwo =document.querySelector('.bgStopPointTwo');

$(function () {
        // Get click event, assign button to var, and get values from that var
        $('#directionBtnGroup input').on('click', function() {
        var thisBtn = $(this);
        var btnText = thisBtn.text();
        var btnValue = thisBtn.val();
        $('#selectedVal').text(btnValue);
        var chDirection= headerBackground.style.backgroundImage;
        currentDirection = chDirection.split(",")[0].split('(')[1];
        var res = chDirection.replace(/to right|to left|to up|to down/gi, function (x) {
        return btnValue;
      });
      selectedDirection=btnValue;
      headerBackground.style.backgroundImage=res;
      });
      // Basic instantiation:
      $('#bgColorOne').colorpicker();
      $('#bgColorTwo').colorpicker();

      // Example using an event, to change the color of the .jumbotron background:
      $('#demo').on('colorpickerChange', function(event) {
        console.log(event.color.toString());
        $('.home-banner').css('background-color', event.color.toString());
      });
}); 


setTimeout(() => {
  draw('rgb(54, 238, 213)','rgb(5, 1, 110)')
}, 2000);


$(window).resize(function() {
  draw('rgb(54, 238, 213)','rgb(5, 1, 110)')
}).resize();


function encodeURL() {
var dynamicBackground = document.querySelector('#thecanvas');
var dd= dynamicBackground.toDataURL();
debugger;
var a = document.createElement("a"); //Create <a>
a.href =  dd; //Image Base64 Goes here
let randomID = Math.floor(Math.random() * 10000000) + 1  ;
let timeInMiliSec= Date.now(); 
a.download = `UiGenaratorKit_LinearGradientColorBackGround${timeInMiliSec}.png`; //File name Here
a.click(); //Downloaded file
}


function getDataUrl(img) {
// Create canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// Set width and height
canvas.width = img.width;
canvas.height = img.height;
// Draw the image
ctx.drawImage(img, 0, 0);
return canvas.toDataURL('image/png',1.0);
}


function draw(bgone,bgtwo){
  var canvas = document.getElementById("thecanvas");
          var ctx = canvas.getContext("2d");
          // ctx.fillStyle = "#ff9d00";
          // ctx.fillRect(25,25,800,600);
          let  myWidth = window.innerWidth;
          let myHeight = window.innerHeight;
          // let  myWidth = 500;
          // let myHeight = 700;
          // ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.rect(0, 0, myWidth, myHeight);
        // add linear gradient
     
        // var grd = ctx.createLinearGradient(0, 0, myWidth, myHeight);
        var grd = ctx.createLinearGradient(0, 0, myWidth, myHeight);
        // light blue
        grd.addColorStop(0, bgone);   
        // dark blue
        grd.addColorStop(1, bgtwo);
        ctx.fillStyle = grd;
        ctx.fill();
      }


function changBgColorOne(colorValue) {
  bgStopPointOne.value=document.querySelector('.pcr-result').value;
  draw(colorValue,bgColorTwo.value);
  headerBackground.style.backgroundImage =  `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
}

function changBgColorTwo(colorValue) {
  bgStopPointTwo.value=document.querySelector('.pcr-result').value;
  draw(bgColorOne.value,colorValue);
  headerBackground.style.backgroundImage =  `linear-gradient(${selectedDirection},${bgColorOne.value},${colorValue})`;
}

function addcopycss() {
  copyCssWrapper.textContent = `background:${bgColorOne.value};\n background-image:${headerBackground.style.backgroundImage};`
}


const linearGradientPointOne = Pickr.create({
el: '.bgOneColor-picker',
theme: 'nano', // or 'monolith', or 'nano'
default: 'rgb(54, 238, 213)',
position: 'bottom-middle',
comparison: false,
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
          // save: true
      }
}
});


const linearGradientPointTwo = Pickr.create({
el: '.bgTwoColor-picker',
theme: 'nano', // or 'monolith', or 'nano'
default: 'rgb(5, 1, 110)',
comparison: false,
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
        // save: true
    }
}

});

linearGradientPointOne.on('change', (color,instance) => {
let rgbaColor = color.toRGBA().toString();
changBgColorOne(rgbaColor);
});

linearGradientPointTwo.on('change', (color,instance) => {
let rgbaColor = color.toRGBA().toString();
changBgColorTwo(rgbaColor);
});
