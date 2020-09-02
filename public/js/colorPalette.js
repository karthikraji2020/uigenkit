var currentValue = "hex";
var selectedSortBy = ["createdat"];
var colorData;
var customPaletteData;
var createPalette;
var selectedLayer;
var isLike = false;
var likedPaletteId = [];
var pageIndex = 1;
let currentColorScheme = "monochromatic";

const apiURL = `https://uigenkit.herokuapp.com/api/`;
// const apiURL = `http://localhost:3000/api/`;

createPalette = Pickr.create({
  el: `.createPalette-color-picker`,
  theme: "nano", // or 'monolith', or 'nano'
  default: "#000",
  comparison: false,
  showAlways: false,
  closeOnScroll: true,
  closeWithKey: "Escape",
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

setTimeout(() => {
  loadSocialMediaPaletteColors();
}, 0);

function  loadSocialMediaPaletteColors() {
  fetch(`${apiURL}socialmediapalette`)
  .then((response) => response.json())
  .then((obj) => {
    colorData = obj;
    renderCards(obj);
  });
}

function loadPaletteColors() {
  fetch(`${apiURL}custompalette`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      customPaletteData = obj;
      loadPartialData(0, 12);
    });
}



function loadPartialData(startIndex, endIndex) {
  switch (selectedSortBy.toString()) {
    case 'createdat':
      let customPaletteDataCopy= customPaletteData;
    customPaletteDataCopy.sort((a,b)=>{return b.id - a.id});
    customPaletteData= customPaletteDataCopy;
    let initalData = customPaletteData.slice(startIndex, endIndex);
    renderPalettes(initalData);
      break;
      case 'likes':
      let customPaletteDataCopy1= customPaletteData;
      customPaletteData.sort((a,b)=>{return b.likes - a.likes});
      customPaletteData= customPaletteDataCopy1;
      let initalData1 = customPaletteData.slice(startIndex, endIndex);
      renderPalettes(initalData1);
      break;
  }
}

function renderPalettes(customPaletteData) {
  var returnData = "";
  customPaletteData.forEach((element, index) => {
    if(element.createdAt !== undefined) {
    returnData += ` <div class="col-sm-6 col-md-4 col-lg-3 my-2" >
      <div class="card">
      <div class="card-body custom" title="click to copy ClipBoard">
      ${palettecolorWithFormat(element, currentValue)}
    </div>
    <div class="card-footer">
         <div class="float-left py-1" title="likes">
      ${renderLikes(element, index)}
         </div>
         <div class="float-right">
         <button type="button" class="btn btn-light btn-sm btn-outline-secondary" title="Download as Image" onclick="downloadPaletteAsImage('${
          element.hex.layer1
        }','${element.hex.layer2}','${element.hex.layer3}','${
        element.hex.layer4
      }')">
        <i class="fa fa-download"></i>
       </button>
         </div>
    
      </div>
    </div>
    </div>
      `;
    }
  });
  let withLoadMore = "";
  if (customPaletteData.length >= 12) {
    withLoadMore = `
     <div class="btn btn-dark float-right" onclick="loadMore()">
        load More....
      </div>
  `;
  }

  document.querySelector(
    ".card-group.customColorPalette"
  ).innerHTML = returnData;
  document.querySelector(".col-sm-3.load-more").innerHTML = withLoadMore;
}

/*
  <i class="fa fa-clock-o"></i><span class="text-muted"> ${
           element.createdAt
         }</span>
*/ 
function loadMore() {
  // 1* 12 =12
  // 2* 12 =24
  let si;
  let ei;
  pageIndex += 1;
  ei = pageIndex * 12;
  // si= ei-12;
  si = 0;
  loadPartialData(si, ei);
}
function renderLikes(element, index) {
  if (element.isLiked ) {
    return `<span onclick="paletteLiked('${element.id}',this,${element.isLiked})"><i class="fa fa-heart text-danger"></i><span id="likesCount"> ${element.likes} </span> Likes</span>`;
  } else {
    return `<span onclick="paletteLiked('${element.id}',this,${element.isLiked})"><i class="fa fa-heart-o text-danger"></i> <span id="likesCount"> ${element.likes} </span> Likes</span>`;
  }
}
resetCustomPaletteGenarator();

function togglePalette() {
  let isChecked = document.querySelector(".btn.btn-lg.btn-toggle").className;
  // console.log(isChecked);
  let isActive = isChecked.includes("active");
  resetCustomPaletteGenarator();
  if (isActive) {
    document.querySelector("#randomPaletteGenarator").style.display = "none";
    document.querySelector(".colorSchemeSelection").style.display = "none";
    document.querySelector("#customPaletteGenarator").style.display = "block";
  } else {
    document.querySelector("#randomPaletteGenarator").style.display = "block";
    document.querySelector(".colorSchemeSelection").style.display = "block";
    document.querySelector("#customPaletteGenarator").style.display = "none";
  }
}

function resetCustomPaletteGenarator() {
  let layer1, layer2, layer3, layer4;
  layer1 = document.querySelector("#customPaletteGenarator h6.layer1");
  layer2 = document.querySelector("#customPaletteGenarator h6.layer2");
  layer3 = document.querySelector("#customPaletteGenarator h6.layer3");
  layer4 = document.querySelector("#customPaletteGenarator h6.layer4");

  layer1.style.backgroundColor = "#8f8e8e";
  layer2.style.backgroundColor = "#a8a8a8";
  layer3.style.backgroundColor = "#cecece";
  layer4.style.backgroundColor = "#e0e0e0";

  
  layer1.innerHTML = "<figcaption> Click Here</figcaption> ";
  layer2.innerHTML = "<figcaption> Click Here</figcaption> ";
  layer3.innerHTML = "<figcaption> Click Here</figcaption> ";
  layer4.innerHTML = "<figcaption> Click Here</figcaption> ";
}

function paletteLiked(id, thisObj, isLiked) {
  isLike = (isLike && likedPaletteId.includes(id)) ? false : true;
  if (!isLike && likedPaletteId.includes(id)) {
    thisObj.firstElementChild.className = "fa fa-heart-o text-danger";
    let likesCount =
      Number(thisObj.lastElementChild.innerHTML) > 0
        ? Number(thisObj.lastElementChild.innerHTML) - 1
        : " 0";
    thisObj.lastElementChild.innerHTML = likesCount;
    const filteredItems = likedPaletteId.filter((item) => item !== id);
    likedPaletteId = filteredItems;

    updateLikes(`${apiURL}updatelikesbyid/${id}`, {
      likes: likesCount,
      isLiked: false,
    }).then((data) => {
      customPaletteData = data;
      let si = 0;
      let ei = pageIndex * 12;
      loadPartialData(si, ei);
    });
  }

  if (isLike && !likedPaletteId.includes(id)) {
    thisObj.firstElementChild.className = "fa fa-heart text-danger";
    let likesCount = Number(thisObj.lastElementChild.innerHTML) + 1;
    thisObj.lastElementChild.innerHTML = likesCount;
    likedPaletteId.push(id);

    updateLikes(`${apiURL}updatelikesbyid/${id}`, {
      likes: likesCount,
      isLiked: true,
    }).then((data) => {
      customPaletteData = data;
      let si = 0;
      let ei = pageIndex * 12;
      loadPartialData(si, ei);
    });
  }
}

function renderCards(colorData) {
  var returnData = "";
  colorData.forEach((element) => {
    returnData += ` <div class="col-md-3 my-1" >
      <div class="card" style="background:${element.colorFormats.rgb}">
        <div class="card-body text-center"  >
        <p class="card-text ">${element.brandName} </p>
        <div class="card-footer">
        ${colorWithFormat(element, currentValue)}
        <div class="overlay">
        <a  onclick="downloadImage('${element.colorFormats.rgb}','${
      element.brandName
    }')" class="icon" title="Download As Image">
          <i class="fa fa-download"></i>
        </a>
        </div>
        </div>
      </div>
      </div>
    </div>
      `;
  });
//  debugger;
  document.querySelector(".card-group.socialPalette").innerHTML = returnData;
}
function customPalette() {
  document.querySelector(
    "#randomPaletteGenarator"
  ).innerHTML = `       <div class="card shadow">
                  <div class="card-body">
                <h4 class="card-title text-left text-capitalize"> random Generator</h4>
                  <h6 class="g1" onclick="showPicker(this)"> </h6>
                  <h6 class="g2" onclick="showPicker(this)"> </h6>
                  <h6 class="g3" onclick="showPicker(this)"> </h6>
                  <h6 class="g4" onclick="showPicker(this)"> </h6>
                </div>
                <div class="card-footer ">
             
                <button class="btn btn-dark float-right mx-2" onclick="savePalette('random')" title="Save Palette"><i class="fa fa-save"></i>  save</button> 
                  <button class="btn btn-secondary float-right" onclick="customPalette()" title="Genarate Palette"><i class="fa fa-random "></i> Generate </button>
                  </div>
                </div>`;
  let setg1Color,setg2Color,setg3Color,setg4Color;
  var lighten2Color ,lighten3Color ,lighten4Color;    

   lighten2Color = `${getRandomColorInHEXFormat()}`;
  setg1Color= `${getShadesOfColor(lighten2Color, -80)}`;
  lighten3Color =getShadesOfColor(lighten2Color, 40);
  lighten4Color = invertColor(setg1Color) ;   

    if(currentColorScheme==='monochromatic') {
      lighten4Color = getShadesOfColor(lighten2Color, 60);
      
     setg2Color= `${lighten2Color}`;
     setg3Color= `${lighten3Color}`;
     setg4Color= `${lighten4Color}`;
    }else if(currentColorScheme==='dirtectComplementry') {
      lighten3Color = invertColor(lighten3Color) ;   
      lighten4Color = invertColor(setg1Color) ;   
      
     setg2Color= `${lighten2Color}`;
     setg3Color= `${lighten3Color}`;
     setg4Color= `${lighten4Color}`;
    }else {
        
     setg1Color= `${genarateGreyShadecolor()}`;
     setg2Color= `${genarateGreyShadecolor()}`;
     setg3Color= `${genarateGreyShadecolor()}`;
     setg4Color= `${genarateGreyShadecolor()}`;
    }
  
  let g1 = document.querySelector(".g1");
  let g2 = document.querySelector(".g2");
  let g3 = document.querySelector(".g3");
  let g4 = document.querySelector(".g4");

  g1.style.backgroundColor = setg1Color;
  g2.style.backgroundColor = setg2Color;
  g3.style.backgroundColor = setg3Color;
  g4.style.backgroundColor = setg4Color;
  

  g1.innerHTML = `<figcaption>${setg1Color}</figcaption>`;
  g2.innerHTML = `<figcaption>${setg2Color}</figcaption>`;
  g3.innerHTML = `<figcaption>${setg3Color}</figcaption>`;
  g4.innerHTML = `<figcaption>${setg4Color}</figcaption>`;
}
function genarateGreyShadecolor() {
  let grayShadecolor = Math.floor(Math.random() * 255).toString(16);
  if (grayShadecolor.length === 1)
  {
    grayShadecolor+='0';
  }
  return '#' + grayShadecolor+grayShadecolor+grayShadecolor;
}

function downloadImage(obj, name) {
  draw(obj);
  var colorPaletteBackground = document.querySelector("#colorPalette");
  var base64URL = colorPaletteBackground.toDataURL();
//  debugger;
  var a = document.createElement("a"); //Create <a>
  a.href = base64URL; //Image Base64 Goes here
  let timeInMiliSec = Date.now();
  a.download = `UiGenaratorKit_SocialColorBackGround${name}_${timeInMiliSec}.jpg`; //File name Here
  a.click(); //Downloaded file
}

function palettecolorWithFormat(element, format) {
  switch (format) {
    case "hex":
      return ` 
    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer1}"> <figcaption>${element.hex.layer1}</figcaption></h6>
    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer2}"><figcaption>${element.hex.layer2}</figcaption></h6>
    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer3}"><figcaption>${element.hex.layer3}</figcaption></h6>
    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer4}"><figcaption>${element.hex.layer4}</figcaption></h6>
    `;
      break;
    case "rgba":
      return ` 
    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer1}"> <figcaption>${element.rgba.layer1}</figcaption></h6>
    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer2}"><figcaption>${element.rgba.layer2}</figcaption></h6>
    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer3}"><figcaption>${element.rgba.layer3}</figcaption></h6>
    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer4}"><figcaption>${element.rgba.layer4}</figcaption></h6>
    `;
      break;
    case "rgb":
      return ` 
    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer1}"> <figcaption>${element.rgb.layer1}</figcaption></h6>
    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer2}"><figcaption>${element.rgb.layer2}</figcaption></h6>
    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer3}"><figcaption>${element.rgb.layer3}</figcaption></h6>
    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer4}"><figcaption>${element.rgb.layer4}</figcaption></h6>
    `;
      break;
  }
}
function colorWithFormat(element, format) {
  switch (format) {
    case "hex":
      return ` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.hashhex}</p> `;
      break;
    case "rgba":
      return ` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.rgba}</p> `;
      break;
    case "rgb":
      return ` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.rgb}</p> `;
      break;
  }
}

function showPicker(obj) {
  selectedLayer = obj.className;
  if(obj.style.backgroundColor !== ''){
    if (currentValue == "hex") {
        let result =rgbToHex(obj.style.backgroundColor)
        createPalette.setColor(result);
    }else if (currentValue == "rgb") {
       createPalette.setColor(obj.style.backgroundColor);
    } else {
      let result  = obj.style.backgroundColor.replace("rgb", "rgba").replace(")", ",1)");
        createPalette.setColor(result);
    }
  }
  createPalette.show();
  createPalette.setColorRepresentation(obj.innerHTML);
}

function savePalette(type) {
  renderLoader(400);
  let layer1, layer2, layer3, layer4;
  if (type === "random") {
    layer1 = document.querySelector(".g1 figcaption");
    layer2 = document.querySelector(".g2 figcaption");
    layer3 = document.querySelector(".g3 figcaption");
    layer4 = document.querySelector(".g4 figcaption");
  }
  if (type === "custom") {
    layer1 = document.querySelector(".layer1 figcaption");
    layer2 = document.querySelector(".layer2 figcaption");
    layer3 = document.querySelector(".layer3 figcaption");
    layer4 = document.querySelector(".layer4 figcaption");
  }

  if (
    layer1.innerHTML.length > 6 &&
    layer2.innerHTML.length > 6 &&
    layer3.innerHTML.length > 6 &&
    layer4.innerHTML.length > 6 &&
    layer1.innerHTML !== undefined &&
    layer2.innerHTML !== undefined &&
    layer3.innerHTML !== undefined &&
    layer4.innerHTML !== undefined
  ) {
    let newPalette = {
      id: Date.now(),
      createdAt: Date.now(),
      isLiked: false,
      likes: 0,
      hex: {
        layer1: layer1.innerHTML,
        layer2: layer2.innerHTML,
        layer3: layer3.innerHTML,
        layer4: layer4.innerHTML,
      },
      rgb: {
        layer1: hexToRGB(layer1.innerHTML),
        layer2: hexToRGB(layer2.innerHTML),
        layer3: hexToRGB(layer3.innerHTML),
        layer4: hexToRGB(layer4.innerHTML),
      },
      rgba: {
        layer1: hexToRGBA(layer1.innerHTML,1),
        layer2: hexToRGBA(layer2.innerHTML,1),
        layer3: hexToRGBA(layer3.innerHTML,1),
        layer4: hexToRGBA(layer4.innerHTML,1),
      },
    };

    createColorPalette(`${apiURL}custompalette`, newPalette).then((data) => {
      customPaletteData = data;
      loadPartialData(0, 12);
    });
  } else {
    alert("Please set All Four Layers Of Colors");
  }
}
// Example POST method implementation:
async function createColorPalette(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// Example PUT method implementation:
async function updateLikes(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => {
  draw("rgb(54, 238, 213)");
}, 1000);

function hexToRGB(hexvalue) {
  let colorConversion = document.querySelector("#colorConversion");
  colorConversion.style.color = hexvalue;
  let rbgvalue = colorConversion.style.color;
  return rbgvalue;
}


$(window).resize(function () {
  let colorSchemeBtnGroup = document.getElementById('colorSchemeBtnGroup');
  let colorShemeTitle = document.querySelector('.color-sheme-title');
  if(window.screen.width <= 768) {
    colorShemeTitle.style.display="none";
    colorSchemeBtnGroup.classList.add("btn-group-vertical","transition");
    console.log( window.screen.width);
  }else {
    colorShemeTitle.style.display="block";
    colorSchemeBtnGroup.classList.remove("btn-group-vertical","transition");
  }
  draw("rgb(54, 238, 213)");
}).resize();

function draw(bgone) {
  var canvas = document.getElementById("colorPalette");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = bgone;
  ctx.fillRect(0, 0, 1280, 650);
  ctx.fill();
}

function changeSelectedlayerBg() {
  switch (selectedLayer) {
    case "layer1":
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
    case "layer2":
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
    case "layer3":
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
    default:
      changeSelectedlayerBgTrigger(selectedLayer);
      break;
  }
}
function changeSelectedlayerBgTrigger(selector) {
  let changedColor = document.querySelector(".pcr-result").value;
  let currentSelector =  document.querySelector(`.${selector}`);
  currentSelector.style.backgroundColor = changedColor;
  currentSelector.innerHTML = `<figcaption>${changedColor}</figcaption>`;
}
var gridsArrray = []; // alternative for this
// var alternativeGridsArray=["grid1", "grid2", "grid3","grid4"];
// gridsArrray=[]
var showQuoteChild = document.querySelector(".showQuote").children;
for (let index = 0; index < showQuoteChild.length; index++) {
  // debugger;
  const classnames = showQuoteChild[index].classList[1];
  if (classnames !== undefined && classnames !== "") {
    // alternativeGridsArray.push(classnames);
    gridsArrray.push(classnames);
  }
}
//["grid1", "grid2", "grid3","grid4"];
getTheme();

// Get click event, assign button to var, and get values from that var
$("#colorFormatBtnGroup input").on("click", function () {

  var thisBtn = $(this);  
  var btnValue = thisBtn.val();
  renderCards(colorData, btnValue);
  renderPalettes(customPaletteData, btnValue);


  $("#selectedVal").text(btnValue);
});
$("#colorSchemeBtnGroup input[name='colorScheme']").on("click", function () {
  let thisBtn = $(this);  
  let btnValue = thisBtn.val();
  if(currentColorScheme!==btnValue){
    customPalette();
  }
  currentColorScheme=btnValue;
  // $("#selectedVal").text(btnValue);
});

$("#sortBy input").on("click", function () {
  var thisBtn = $(this);
  var btnValue = thisBtn.val();
  selectedSortBy.length=0
  selectedSortBy.push(btnValue);
  sortBy(btnValue);
  
  renderLoader(500);

  $("#selectedValSortedBy").text(btnValue);
});


customPalette();


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
        case "rgb":
          currenGridElementDOM.children[0].innerHTML =
            currenGridElementDOM.style.backgroundColor;
          break;
        case "rgba":
          currenGridElementDOM.children[0].innerHTML = currenGridElementDOM.style.backgroundColor
            .replace("rgb", "rgba")
            .replace(")", ",1)");
          break;
        default:
          currenGridElementDOM.children[0].innerHTML = getColorCode;
          break;
      }
    }
  }
  //take copy and do the
}
let trans = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
  }, 1000)
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
let colorFormatBtnGroup = document.getElementById('colorFormatBtnGroup');
let colorShemeTitle = document.querySelector('.color-sheme-title');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    colorFormatBtnGroup.classList.add("btn-group-vertical","fixed-middle-right","transition");
    colorShemeTitle.style.display="none";
  } else {
    colorFormatBtnGroup.classList.remove("btn-group-vertical","fixed-middle-right","transition");
    colorShemeTitle.style.display="block";
    
  }
}

function sortBy(toSortBy) {
  // selectedSortBy.length= 0;
  // selectedSortBy.push(toSortBy.value);
  // selectedSortBy = toSortBy.value;
  loadPartialData(0, 12);
}

function changeCurrentColorScheme(colorScheme) {
  //  currentColorScheme= colorScheme;
}
function handleClick(colorFormat) {
  currentValue = colorFormat.value;
  let gridsArrray = document.querySelectorAll("#randomPaletteGenarator .card-body h6");
  for (let index = 0; index < gridsArrray.length; index++) {
    // const currenGridElement = gridsArrray[index];
    // let currenGridElementDOM = document.querySelector("." + currenGridElement);
    let currenGridElementDOM =  gridsArrray[index];
    if (currentValue == "hex") {
      currenGridElementDOM.innerHTML = rgbToHex(
        currenGridElementDOM.style.backgroundColor
      );
    }
    if (currentValue == "rgb") {
      currenGridElementDOM.innerHTML =
        currenGridElementDOM.style.backgroundColor;
    }
    if (currentValue == "rgba") {
      currenGridElementDOM.innerHTML = currenGridElementDOM.style.backgroundColor
        .replace("rgb", "rgba")
        .replace(")", ",1)");
    }
  }
}

function getRandomColorInHEXFormat() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color; // #HEXCODE
}

function downloadPaletteAsImage(layer1, layer2, layer3, layer4) {
  drawPalette(layer1, layer2, layer3, layer4);
  let colorCanvasPaletteBackground = document.querySelector("#paletteCanvas");
  let base64URL = colorCanvasPaletteBackground.toDataURL();
//  debugger;
  let a = document.createElement("a"); //Create <a>
  a.href = base64URL; //Image Base64 Goes here
  let timeInMiliSec = Date.now();
  a.download = `UiGenKit_ColorPaletteBackGround_${timeInMiliSec}.jpg`; //File name Here
  a.click(); //Downloaded file
}

function drawPalette(layer1, layer2, layer3, layer4) {
  let canvas = document.getElementById("paletteCanvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = layer1; // color of fill
    ctx.fillRect(0, 0, canvas.width, canvas.height / 4); // create rectangle
    ctx.fillStyle = layer2; // color of fill
    ctx.fillRect(0, (canvas.height / 4) * 2, canvas.width, canvas.height / 4); // create rectangle
    ctx.fillStyle = layer3; // color of fill
    ctx.fillRect(0, (canvas.height / 4) * 3, canvas.width, canvas.height / 4); // create rectangle
    ctx.fillStyle = layer4; // color of fill
    ctx.fillRect(0, canvas.height / 4, canvas.width, canvas.height / 4); // create rectangle
    ctx.fill();
  }
}
