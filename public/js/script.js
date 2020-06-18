$(document).ready(function() {
  var path = window.location.pathname,pages;
  var pathname = path.split('/')[1];
  pages = ['home', 'neumorphism', 'lineargradient','colorpalette'];
  pages.map(item=>{
  if(item===pathname) {
    var navlist = document.querySelectorAll('li.nav-item');
    for (let index = 0; index < navlist.length; index++) {
      const currenGridElement = navlist[index];
      const currentPath = navlist[index].innerText.replace(' ','').toLowerCase();
      currentPath===item? currenGridElement.classList.add("active"): '';
    }
  }
});
});


function CopyColorToClipboard(containerid) {
  var range = document.createRange();
  range.selectNode(containerid);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  alert("Color Code Copied " + containerid.innerText);
  window.getSelection().removeAllRanges(); // to deselect
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
