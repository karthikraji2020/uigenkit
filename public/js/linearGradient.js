
var headerBackground =document.querySelector('#dynamicBackground');
var newcolorBackground =document.querySelector('#newcolor');
var copyCssWrapper =document.querySelector('.copycss');
var bgColorOne=document.querySelector('#bgColorOne');
var bgColorTwo =document.querySelector('#bgColorTwo');
var selectedDirection="to left";
var currentDirection="";
var directionInDeg='160deg';

$(function () {
        // Get click event, assign button to var, and get values from that var
        $('#directionBtnGroup input').on('click', function() {
        var thisBtn = $(this);
        // thisBtn.addClass('active').siblings().removeClass('active');
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
  draw('#ff9d00','#fff')
}, 2000);
$(window).resize(function() {
  // your size calculation code here
  // $("#dimensions").html(myWidth);
  draw('#ff9d00','#fff')

}).resize();
function encodeURL() {
// var dynamicBackground = document.querySelector('#dynamicBackground');
var dynamicBackground = document.querySelector('#thecanvas');
var imgLinear = document.querySelector('#imgLinear');
//         const dataUrl = getDataUrl(imgLinear);
//  console.log("dasfdsa te4st"+dataUrl);
var dd= dynamicBackground.toDataURL();
debugger;
var a = document.createElement("a"); //Create <a>
a.href =  dd; //Image Base64 Goes here
// a.href = "data:image/png;base64," + dd; //Image Base64 Goes here
let randomID = Math.floor(Math.random() * 10000000) + 1  ;
a.download = `UiGenaratorKit_LinearGradientColorBackGround${randomID}.png`; //File name Here
a.click(); //Downloaded file
}

function toDataURL(src, callback, outputFormat) {
var img = new Image();
img.crossOrigin = 'Anonymous';
img.onload = function() {
var canvas = document.createElement('CANVAS');
var ctx = canvas.getContext('2d');
var dataURL;
canvas.height = this.naturalHeight;
canvas.width = this.naturalWidth;
ctx.drawImage(this, 0, 0);
dataURL = canvas.toDataURL(outputFormat);
callback(dataURL);
};
img.src = src;
if (img.complete || img.complete === undefined) {
img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
img.src = src;
}
}

// toDataURL(
//   'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0',
//   function(dataUrl) {
//     debugger;
//     console.log('RESULT:', dataUrl)
//   }
// )
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
// Select the image
const img = document.querySelector('#imgLinear');
// img.addEventListener('load', function (event) {
// const dataUrl = getDataUrl(img);
// console.log('RESULT  sssss:', dataUrl)
// });

// $(document).ready(function(){
// $('[data-toggle="tooltip"]').tooltip();   
// }); 
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
  draw(colorValue,bgColorTwo.value);
  headerBackground.style.backgroundImage =  `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
}

function changBgColorTwo(colorValue) {
  draw(bgColorOne.value,colorValue);
  headerBackground.style.backgroundImage =  `linear-gradient(${selectedDirection},${bgColorOne.value},${colorValue})`;
}

function addcopycss() {
  copyCssWrapper.textContent = `background:${bgColorOne.value};\n background-image:${headerBackground.style.backgroundImage};`
}

function applyColor() {
  var incrementDirection = parseInt(`${directionInDeg}`)+30+'deg';
  headerBackground.style.backgroundImage= `linear-gradient(${incrementDirection}, #ff0000 , #ffff00)`;
}

// function CopyColorToClipboard(content) {
//     var range = document.createRange();
//     range.selectNode(content);
//     window.getSelection().removeAllRanges(); // clear current selection
//     window.getSelection().addRange(range); // to select text
//     document.execCommand("copy");
//     alert("Color Code Copied " + content.innerText);
// $('.toast').toast('show');

//     window.getSelection().removeAllRanges(); // to deselect
// }

// $(document).ready(function(){.split("linear-gradient(")[1].split(',')[0]
//   $(window).scroll(function(){
// 	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
// });
// });