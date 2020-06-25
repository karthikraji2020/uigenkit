
// const copyButton = document.getElementById("copy");
// const textButton = document.querySelector(".copycss");
document.querySelector('.footer-year').innerText= new Date().getFullYear();

$(document).ready(function() {
  var path = window.location.pathname,pages;
  var pathname = path.split('/')[1];
  pages = ['home', 'neumorphism', 'lineargradient','colorpalette'];
  if (pathname==='') {
     document.querySelector('li.nav-item').classList.add("active");
  } else {
    pages.map(item=>{
      if(item===pathname) {
        var navlist = document.querySelectorAll('li.nav-item');
        for (let index = 0; index < navlist.length; index++) {
          const currenGridElement = navlist[index];
          const currentPath = navlist[index].innerText.replace(' ','').toLowerCase();
          currentPath===item? currenGridElement.classList.add("active"): '';
        }
      }
    }
    )}

});


function CopyColorToClipboard(containerid) {
  var range = document.createRange();
  range.selectNode(containerid);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  // window.getSelection().removeAllRanges(); // to deselect
  alert("Color Code Copied " + containerid.innerText);
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


  // const copyText = (e) => {
  //   debugger;
  //   window.getSelection().selectAllChildren(textButton);
  //   document.execCommand("copy");
  //   e.target.setAttribute("tooltip", "Copied! ✅");
  // };

  // const resetTooltip = (e) => {
  //   e.target.setAttribute("tooltip", "Copy to clipboard");
  // };

  // copyButton.addEventListener("click", (e) => copyText(e));
  // copyButton.addEventListener("mouseover", (e) => resetTooltip(e));


