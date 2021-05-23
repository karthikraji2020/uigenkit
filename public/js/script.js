
$(window).on('load', function(){
setTimeout(removeLoader, 350); 
});

function renderLoader(ms) {
  setTimeout(removeLoader, ms); 
}

function removeLoader(){
  $( "#loadingDiv").css('display','none'); 
}

$(document).ready(function() {
 
  let path = window.location.pathname,pages;
  let pathname = path.split('/')[1];
  pages = ['home', 'neumorphism', 'lineargradient','colorpalette','about','imageoptimizer'];
  if (pathname==='') {
     document.querySelector('li.nav-item').classList.add("active");
  } else if (pathname==='preview') {
     document.querySelectorAll('li.nav-item')[1].classList.add("active");
  } else {
    pages.map(item=>{
      if(item===pathname) {
        var navlist = document.querySelectorAll('li.nav-item');
        for (let index = 0; index < navlist.length; index++) {
          const currenGridElement = navlist[index];
          const currentPath = currenGridElement.innerText.replace(' ','').toLowerCase();
          currentPath===item ? currenGridElement.classList.add("active"): '';
        }
      }
    }
    )}

});

function getShadesOfColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
function CopyColorToClipboard(containerid) {
  var range = document.createRange();
  range.selectNode(containerid);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  
  var colorCodeWrapper = document.querySelector('.color-code');
  var toasterBstWrapper = document.querySelector('.toasterBst');
  toasterBstWrapper.style.display="block";
  colorCodeWrapper.innerText = containerid.innerText;
  setTimeout(() => {
  toasterBstWrapper.style.display="none";
  colorCodeWrapper.innerText=""
  }, 2500);
}
var rgbToHex = function (rgb) {
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

function hexToRGBA(hex, opacity) {
  return (
    "rgba(" +
    (hex = hex.replace("#", ""))
      .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
      .map(function (l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .concat(opacity || 1)
      .join(",") +
    ")"
  );
}

function invertColor(hexTripletColor) {
  var color = hexTripletColor;
  color = color.substring(1); // remove #
  color = parseInt(color, 16); // convert to integer
  color = 0xffffff ^ color; // invert three bytes
  color = color.toString(16); // convert to hex
  color = ("000000" + color).slice(-6); // pad with leading zeros
  color = "#" + color; // prepend #
  return color;
}


