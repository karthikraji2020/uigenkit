 // Get click event, assign button to var, and get values from that var
 $('#colorFormatBtnGroup input').on('click', function() {
  var thisBtn = $(this);
  // thisBtn.addClass('active').siblings().removeClass('active');
  // var btnText = thisBtn.text();
  var btnValue = thisBtn.val();
  $('#selectedVal').text(btnValue);
  // var chDirection= headerBackground.style.backgroundImage;
  // currentDirection = chDirection.split(",")[0].split('(')[1];
  // var res = chDirection.replace(/to right|to left|to up|to down/gi, function (x) {
  // return btnValue;
  // });
// selectedDirection=btnValue;
// headerBackground.style.backgroundImage=res;
});
$('.navbar').click(function(){
  console.log(this);
  console.log(this.classList,"classlist");
  $(this).addClass('active').siblings().removeClass('active');
})
var gridsArrray = [];// alternative for this 
// var alternativeGridsArray=["grid1", "grid2", "grid3","grid4"];
// gridsArrray=[]
var showQuoteChild=document.querySelector('.showQuote').children;
// var showQuoteChild=document.querySelector('.card').children;
// var showQuoteChild=document.querySelector('.card-group').children;
for (let index = 0; index < showQuoteChild.length; index++) {
  debugger;
  const classnames = showQuoteChild[index].classList[1];
  if(classnames!== undefined && classnames!=='')
  {
    // alternativeGridsArray.push(classnames);
    gridsArrray.push(classnames);
  }
}
//["grid1", "grid2", "grid3","grid4"];
getTheme();
var currentValue = "hex";

function getTheme() {
  for (let index = 0; index < gridsArrray.length; index++) {
    const currenGridElement = gridsArrray[index];
    let getColorCode = getRandomColorInHEXFormat();
    if (getColorCode) {
      let currenGridElementDOM = document.querySelector(
        "." + currenGridElement
      );
      currenGridElementDOM.style.backgroundColor = getColorCode;
      switch (currentValue) {
        case 'rgb':
        currenGridElementDOM.children[0].innerHTML = currenGridElementDOM.style.backgroundColor;
          break;
        case 'rgba':
        currenGridElementDOM.children[0].innerHTML = currenGridElementDOM.style.backgroundColor.replace('rgb','rgba').replace(')',',1)');
          break;
        default:
        currenGridElementDOM.children[0].innerHTML = getColorCode;
          break;
      }
    }
  }
}

function handleClick(myRadio) {
  currentValue = myRadio.value;
    for (let index = 0; index < gridsArrray.length; index++) {
      const currenGridElement = gridsArrray[index];
      let currenGridElementDOM = document.querySelector(
        "." + currenGridElement
      );
  if (currentValue == "hex") {
      currenGridElementDOM.children[0].innerHTML = rgbToHex(
        currenGridElementDOM.style.backgroundColor
      );
    }
  if (currentValue == "rgb") {
      currenGridElementDOM.children[0].innerHTML =  currenGridElementDOM.style.backgroundColor;
      
    }
  if (currentValue == "rgba") {
      currenGridElementDOM.children[0].innerHTML = currenGridElementDOM.style.backgroundColor.replace('rgb','rgba').replace(')',',1)');
    }
  }
}

function getRandomColorInHEXFormat() {
  let bgColor = "#" + parseInt(Math.random() * 0xffffff).toString(16);
  return bgColor; // #HEXCODE
}

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

/*
for(let i=0;i<document.querySelectorAll('td.cb').length;i++){ colorObj.push({brandName:document.querySelectorAll('td.cb')[i].title.split(" ")[0],colorFormats:document.querySelectorAll('td.cb')[i].dataset})console.log(document.querySelectorAll('td.cb')[i])}

for(let i=0;i<document.querySelectorAll('td.cb').length;i++){ console.log(document.querySelectorAll('td.cb')[i])}*/ 
