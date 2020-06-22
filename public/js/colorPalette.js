var colorData;
fetch('./data/colorData.json')
  .then(response => response.json())
  .then(obj =>     {
    colorData=obj;
    renderCards(obj);
  }
  )
  
  function renderCards(colorData) {
    var returnData='';
    // var msgContainer = document.createDocumentFragment();
    colorData.forEach(element => {
      returnData +=  ` <div class="col-md-3 my-1" >
      <div class="card" style="background-color:${element.colorFormats.rgb}">
     
        <div class="card-body text-center"  >
        <p class="card-text ">${element.brandName} </p>
        <div class="card-footer">
        ${colorWithFormat(element,currentValue)}
        <div class="overlay">
        <a  onclick="downloadImage('${element.colorFormats.rgb}','${element.brandName}')" class="icon" title="Download As Image">
          <i class="fa fa-download"></i>
        </a>
        </div>
        </div>
      </div>
      </div>
    </div>
      `
    });
    debugger;
  document.querySelector(".card-group.socialPalette").innerHTML=returnData;
  }
  function customPalette() {
    let grid1ColorCode= document.querySelector(".grid1ColorCode");
    let grid2ColorCode= document.querySelector(".grid2ColorCode");
    let grid3ColorCode= document.querySelector(".grid3ColorCode");
    let grid4ColorCode= document.querySelector(".grid4ColorCode");

    document.querySelector("#customPalette").innerHTML=
    `       <div class="card shadow">
                  <div class="card-body">
                  <h6 class="g1">test </h6>
                  <h6 class="g2">test </h6>
                  <h6 class="g3">test </h6>
                  <h6 class="g4">test </h6>
                </div>
                <div class="card-footer">
                  <button class="btn btn-dark float-right"> save</button>
                  </div>
                </div>`;
                let g1= document.querySelector(".g1");
                let g2= document.querySelector(".g2");
                let g3= document.querySelector(".g3");
                let g4= document.querySelector(".g4");
                g1.style.backgroundColor = grid1ColorCode.innerHTML;
                g2.style.backgroundColor = grid2ColorCode.innerHTML;
                g3.style.backgroundColor = grid3ColorCode.innerHTML;
                g4.style.backgroundColor = grid4ColorCode.innerHTML;

                g1.innerHTML = grid1ColorCode.innerHTML;
                g2.innerHTML = grid2ColorCode.innerHTML;
                g3.innerHTML = grid3ColorCode.innerHTML;
                g4.innerHTML = grid4ColorCode.innerHTML;

  }

  function downloadImage(obj,name) {
    draw(obj);
    var colorPaletteBackground = document.querySelector('#colorPalette');
    var base64URL= colorPaletteBackground.toDataURL();
    debugger;
    var a = document.createElement("a"); //Create <a>
    a.href =  base64URL; //Image Base64 Goes here
    let timeInMiliSec= Date.now(); 
    a.download = `UiGenaratorKit_SocialColorBackGround${name}_${timeInMiliSec}.jpg`; //File name Here
    a.click(); //Downloaded file
    }
 
function colorWithFormat(element,format) {

  switch (format) {
    case 'hex':
    return ` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.hashhex}</p> `
    break;
    case 'rgba':
    return ` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.rgba}</p> `
    break;
    case 'rgb':
    return ` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.rgb}</p> `
    break;

}
}
setTimeout(() => {
  draw('rgb(54, 238, 213)')
}, 1000);
$(window).resize(function() {
  draw('rgb(54, 238, 213)')
}).resize();
function draw(bgone){
  var canvas = document.getElementById("colorPalette");
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = bgone;
          ctx.fillRect(0,0,1280,650);
          ctx.fill();
      }


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
  renderCards(colorData,btnValue);

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
    customPalette();
  }
  //take copy and do the
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
  customPalette();
}

function getRandomColorInHEXFormat() {
  let bgColor = "#" + parseInt(Math.random() * 0xffffff).toString(16);
  return bgColor; // #HEXCODE
}
