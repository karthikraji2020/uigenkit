var gridsArrray = [];// alternative for this 
// var alternativeGridsArray=["grid1", "grid2", "grid3","grid4"];
// gridsArrray=[]
var showQuoteChild=document.querySelector('.showQuote').children;
// var showQuoteChild=document.querySelector('.card').children;
// var showQuoteChild=document.querySelector('.card-group').children;
for (let index = 0; index < showQuoteChild.length; index++) {
  // debugger;
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

function handleClick(colorFormat) {
  currentValue = colorFormat.value;
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

