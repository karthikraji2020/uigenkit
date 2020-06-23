var colorData;
var customPaletteData;
var createPalette;
var selectedLayer;
fetch('./data/colorData.json')
  .then(response => response.json())
  .then(obj =>     {
    colorData=obj;
    renderCards(obj);
  })

  createPalette = Pickr.create({
    el: `.createPalette-color-picker`,
    theme: "nano", // or 'monolith', or 'nano'
    default: '#000',
    comparison: false,
    showAlways: true,
    closeOnScroll: true,
    closeWithKey: 'Escape',
    // sliders: 'v',
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
      },
    },
  });

  createPalette.on("change", (color, instance) => {
    changeSelectedlayerBg();
  });
  createPalette.hide();
  loadPaletteColors();
  function loadPaletteColors( ) {
    fetch('http://localhost:3000/custompalette',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
    .then(response => response.json())
    .then(obj =>     {
      customPaletteData=obj;
      renderPalettes(obj);
    })
  }


  
  function renderPalettes(customPaletteData) {
    var returnData='';
    customPaletteData.forEach(element => {
      returnData +=  ` <div class="col-sm-3 col-md-3 col-lg-3 my-1" >
      <div class="card shadow" >
      <div class="card-body custom" title="click to copy ClipBoard">
      ${palettecolorWithFormat(element,currentValue)}
    </div>
    <div class="card-footer">
         <div class="float-left">
         <i class="fa fa-clock-o"> </i> <small class="text-muted">${element.createdAt}</small></div>
      <button type="button" class="btn btn-dark float-right" title="Download as Image" onclick="downloadAsImage()">
      <i class="fa fa-download"></i>
     </button>
      </div>
    </div>
    </div>
      `
    });
    debugger;
  document.querySelector(".card-group.customColorPalette").innerHTML=returnData;
  }
  function renderCards(colorData) {
    var returnData='';
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
                  <h6 class="g1" onclick="showPicker(this)"> </h6>
                  <h6 class="g2" onclick="showPicker(this)"> </h6>
                  <h6 class="g3" onclick="showPicker(this)"> </h6>
                  <h6 class="g4" onclick="showPicker(this)"> </h6>
                </div>
                <div class="card-footer">
                  <button class="btn btn-dark float-right" onclick="savePalette('random')"> save</button>
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
 
function palettecolorWithFormat(element,format) {

  switch (format) {
    case 'hex':
    return ` 
    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background-color:${element.hex.layer1}"> <figcaption>${element.hex.layer1}</figcaption></h6>
    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background-color:${element.hex.layer2}"><figcaption>${element.hex.layer2}</figcaption></h6>
    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background-color:${element.hex.layer3}"><figcaption>${element.hex.layer3}</figcaption></h6>
    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background-color:${element.hex.layer4}"><figcaption>${element.hex.layer4}</figcaption></h6>
    `
    break;
    case 'rgba':
      return ` 
    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgba.layer1}"> <figcaption>${element.rgba.layer1}</figcaption></h6>
    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgba.layer2}"><figcaption>${element.rgba.layer2}</figcaption></h6>
    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgba.layer3}"><figcaption>${element.rgba.layer3}</figcaption></h6>
    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgba.layer4}"><figcaption>${element.rgba.layer4}</figcaption></h6>
    `
    break;
    case 'rgb':
      return ` 
    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgb.layer1}"> <figcaption>${element.rgb.layer1}</figcaption></h6>
    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgb.layer2}"><figcaption>${element.rgb.layer2}</figcaption></h6>
    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgb.layer3}"><figcaption>${element.rgb.layer3}</figcaption></h6>
    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background-color:${element.rgb.layer4}"><figcaption>${element.rgb.layer4}</figcaption></h6>
    `
    break;

}
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


function showPicker(obj) {
  console.log(obj.className);
  selectedLayer= obj.className;
  createPalette.show();
  createPalette.setColorRepresentation(obj.innerHTML)

}

  function savePalette(type) {
    let layer1,layer2,layer3,layer4;
    if(type==="random") {
       layer1 =document.querySelector('.g1');
       layer2 =document.querySelector('.g2');
       layer3 =document.querySelector('.g3');
       layer4 =document.querySelector('.g4');
    }
    if(type==="custom") {
       layer1 =document.querySelector('.layer1');
       layer2 =document.querySelector('.layer2');
       layer3 =document.querySelector('.layer3');
       layer4 =document.querySelector('.layer4');
  }

    if((layer1.innerHTML.length > 6 && layer2.innerHTML.length > 6 && layer3.innerHTML.length > 6  && layer4.innerHTML.length > 6 )&&
    (layer1.innerHTML !== undefined && layer2.innerHTML !== undefined && layer3.innerHTML !== undefined && layer4.innerHTML !== undefined)){
      let newPalette = { 
        id: Date.now(),
        createdAt:Date.now(),
        hex:{
          layer1: layer1.innerHTML, 
          layer2: layer2.innerHTML, 
          layer3: layer3.innerHTML, 
          layer4: layer4.innerHTML
        },
        rgb:{
          layer1: hexToRGB(layer1.innerHTML), 
          layer2: hexToRGB(layer2.innerHTML), 
          layer3: hexToRGB(layer3.innerHTML), 
          layer4: hexToRGB(layer4.innerHTML)
        },
        rgba:{
          layer1: hexToRGBA(layer1.innerHTML), 
          layer2: hexToRGBA(layer2.innerHTML), 
          layer3: hexToRGBA(layer3.innerHTML), 
          layer4: hexToRGBA(layer4.innerHTML)
        }
    }; 
     
      postData('http://localhost:3000/custompalette', newPalette)
      .then(data => {
        renderPalettes(data);
      })
    }else {
      alert('Please set All Four Layers Of Colors')
    }

 
  }
// Example POST method implementation:
 async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



setTimeout(() => {
  draw('rgb(54, 238, 213)')
}, 1000);

function hexToRGB(hexvalue) {
  let colorConversion = document.querySelector('#colorConversion');
  colorConversion.style.color = hexvalue;
  let rbgvalue =colorConversion.style.color;
  return rbgvalue;
}
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
      
     
    

function changeSelectedlayerBg () {
  switch (selectedLayer) {
    case 'layer1':
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
    case 'layer2':
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
    case 'layer3':
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
    default:
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
  }
}
function changeSelectedlayerBgTrigger(selector) {
  document.querySelector(`.${selector}`).style.backgroundColor=document.querySelector(".pcr-result").value;
  document.querySelector(`.${selector}`).innerHTML= document.querySelector(".pcr-result").value;
}
var gridsArrray = [];// alternative for this 
// var alternativeGridsArray=["grid1", "grid2", "grid3","grid4"];
// gridsArrray=[]
var showQuoteChild=document.querySelector('.showQuote').children;
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
    var btnValue = thisBtn.val();
    renderCards(colorData,btnValue);
    renderPalettes(customPaletteData,btnValue);
    $('#selectedVal').text(btnValue);
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
