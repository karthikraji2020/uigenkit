
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
$(document).ready(function(){
$('[data-toggle="tooltip"]').tooltip();   
}); 

function changBgColorOne(colorValue) {
  headerBackground.style.backgroundImage =  `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
}

function changBgColorTwo(colorValue) {
  headerBackground.style.backgroundImage =  `linear-gradient(${selectedDirection},${bgColorOne.value},${colorValue})`;
}

function addcopycss() {
  copyCssWrapper.textContent = `background:${bgColorOne.value};\n background-image:${headerBackground.style.backgroundImage};`
}

function applyColor() {
  var incrementDirection = parseInt(`${directionInDeg}`)+30+'deg';
  headerBackground.style.backgroundImage= `linear-gradient(${incrementDirection}, red , yellow)`;
}

function CopyColorToClipboard(content) {
    var range = document.createRange();
    range.selectNode(content);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    alert("Color Code Copied " + content.innerText);
$('.toast').toast('show');

    window.getSelection().removeAllRanges(); // to deselect
}

// $(document).ready(function(){.split("linear-gradient(")[1].split(',')[0]
//   $(window).scroll(function(){
// 	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
// });
// });