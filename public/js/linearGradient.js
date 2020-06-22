var headerBackground = document.querySelector("#dynamicBackground");
var newcolorBackground = document.querySelector("#newcolor");
var copyCssWrapper = document.querySelector(".copycss");
var bgColorOne = document.querySelector("#bgColorOne");
var bgColorTwo = document.querySelector("#bgColorTwo");
var selectedDirection = "to right";
var currentDirection = "";
var directionInDeg = "160deg";
const bgStopPointOne = document.querySelector(".bgStopPointOne");
const bgStopPointTwo = document.querySelector(".bgStopPointTwo");
var currentIndex = 0;
const goForwardBtn = document.querySelector(".goForward");
const goBackwardBtn = document.querySelector(".goBackward");
const gradientNameLabel = document.querySelector(".gradientName");
var colorData;

const copyButton = document.getElementById("copy");
const textButton = document.querySelector(".copycss");
// load data
function getData() {
  fetch("./data/linearColor.json")
    .then((response) => response.json())
    .then((obj) => {
      colorData = obj;
    });
}
//
getData();
function goForward() {
  currentIndex += 1;
  let validIndex = currentIndex <= colorData.length - 1;
  if (validIndex) {
    let { colorStopOne, colorStopTwo, gradientName } = colorData[currentIndex];

    draw(colorStopOne, colorStopTwo);
    headerBackground.style.backgroundImage = `linear-gradient(${selectedDirection},${colorStopOne},${colorStopTwo})`;
    bgStopPointOne.value = colorStopOne;
    bgStopPointTwo.value = colorStopTwo;
    gradientNameLabel.textContent = gradientName;
    if (goBackwardBtn.hasAttribute("disabled")) {
      goBackwardBtn.removeAttribute("disabled");
    }
  } else {
    goForwardBtn.setAttribute("disabled", !validIndex);
  }
}

function goBackward() {
  currentIndex -= 1;
  let validIndex = currentIndex >= 0;
  if (validIndex) {
    let { colorStopOne, colorStopTwo } = colorData[currentIndex];
    draw(colorStopOne, colorStopTwo);
    headerBackground.style.backgroundImage = `linear-gradient(${selectedDirection},${colorStopOne},${colorStopTwo})`;
    bgStopPointOne.value = colorStopOne;
    bgStopPointTwo.value = colorStopTwo;
    if (goForwardBtn.hasAttribute("disabled")) {
      goForwardBtn.removeAttribute("disabled");
    }
  } else {
    goBackwardBtn.setAttribute("disabled", true);
  }
}

$(function () {
  // Get click event, assign button to var, and get values from that var
  $("#directionBtnGroup input").on("click", function () {
    var thisBtn = $(this);
    var btnText = thisBtn.text();
    var btnValue = thisBtn.val();
    $("#selectedVal").text(btnValue);
    var chDirection = headerBackground.style.backgroundImage;
    currentDirection = chDirection.split(",")[0].split("(")[1];
    var res = chDirection.replace(/to right|to left|to up|to down/gi, function (
      x
    ) {
      return btnValue;
    });
    selectedDirection = btnValue;
    headerBackground.style.backgroundImage = res;
  });
  // Basic instantiation:
  $("#bgColorOne").colorpicker();
  $("#bgColorTwo").colorpicker();
});

setTimeout(() => {
  draw("rgb(54, 238, 213)", "rgb(5, 1, 110)");
}, 2000);

$(window)
  .resize(function () {
    draw("rgb(54, 238, 213)", "rgb(5, 1, 110)");
  })
  .resize();

function downloadAsImage() {
  var dynamicBackground = document.querySelector("#thecanvas");
  var dd = dynamicBackground.toDataURL();
  var a = document.createElement("a"); //Create <a>
  a.href = dd; //Image Base64 Goes here
  let timeInMiliSec = Date.now();
  a.download = `UiGenaratorKit_LinearGradientColorBackGround${timeInMiliSec}.jpg`; //File name Here
  a.click(); //Downloaded file
}

function draw(bgone, bgtwo) {
  var canvas = document.getElementById("thecanvas");
  var ctx = canvas.getContext("2d");
  // ctx.fillStyle = "#ff9d00";
  // ctx.fillRect(25,25,800,600);
  let myWidth = window.innerWidth;
  let myHeight = window.innerHeight;
  // let  myWidth = 500;
  // let myHeight = 700;
  // ctx.rect(0, 0, canvas.width, canvas.height);
  if(selectedDirection=="to left" || selectedDirection=="135deg") {
    ctx.rect(myWidth, myHeight,0, 0);
  }
  if(selectedDirection=="to right" || selectedDirection=="315deg") {
    ctx.rect(0, 0, myWidth, myHeight);
  }
  if(selectedDirection=="to top" || selectedDirection=="225deg") {
    ctx.rect(0, myWidth, myHeight,0);
  }
  if(selectedDirection=="to down" || selectedDirection=="45deg") {
    ctx.rect(myWidth, 0, 0, myHeight);
  }
  // ctx.rect(0, 0, myWidth, myHeight);

  // ctx.rect(0, 0, myWidth, myHeight);
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
  bgStopPointOne.value = document.querySelector(".pcr-result").value;
  draw(colorValue, bgColorTwo.value);
  headerBackground.style.backgroundImage = `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
}

function changBgColorTwo(colorValue) {
  bgStopPointTwo.value = document.querySelector(".pcr-result").value;
  draw(bgColorOne.value, colorValue);
  headerBackground.style.backgroundImage = `linear-gradient(${selectedDirection},${bgColorOne.value},${colorValue})`;
}

function addcopycss() {
  copyCssWrapper.innerText = `background:${bgColorOne.value};/* fallback for old browsers */\nbackground: -webkit-${headerBackground.style.backgroundImage};/* Chrome 10-25, Safari 5.1-6 */\nbackground:${headerBackground.style.backgroundImage}; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;
}


const linearGradientPointOne = Pickr.create({
  el: ".bgOneColor-picker",
  theme: "nano", // or 'monolith', or 'nano'
  default: "rgb(54, 238, 213)",
  position: "bottom-middle",
  comparison: false,
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
      // save: true
    },
  },
});

const linearGradientPointTwo = Pickr.create({
  el: ".bgTwoColor-picker",
  theme: "nano", // or 'monolith', or 'nano'
  default: "rgb(5, 1, 110)",
  comparison: false,
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

linearGradientPointOne.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
  changBgColorOne(rgbaColor);
});

linearGradientPointTwo.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
  changBgColorTwo(rgbaColor);
});

 const copyText = (e) => {
    debugger;
    window.getSelection().selectAllChildren(textButton);
    document.execCommand("copy");
    e.target.setAttribute("tooltip", "Copied! ✅");
  };

  const resetTooltip = (e) => {
    e.target.setAttribute("tooltip", "Copy to clipboard");
  };

  copyButton.addEventListener("click", (e) => copyText(e));
  copyButton.addEventListener("mouseover", (e) => resetTooltip(e));


