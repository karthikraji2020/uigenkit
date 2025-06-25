const boxContent = document.querySelector(".box"),
  copyCssContent = document.querySelector(".copy-css"),
  colorCodeInHex = document.querySelector("#colorCodeInHex");
var containerContent = document.querySelector(".box-wrapper"),
  globalHexValueOfPicker;
const sizeRange = document.querySelector("#sizeRange"),
  radiusRange = document.querySelector("#radiusRange"),
  distanceRange = document.querySelector("#distanceRange"),
  blurRange = document.querySelector("#blurRange"),
  intensityRange = document.querySelector("#intensityRange"),
  sizeRangeValue = document.querySelector("#sizeRangeValue"),
  radiusRangeValue = document.querySelector("#radiusRangeValue"),
  distanceRangeValue = document.querySelector("#distanceRangeValue"),
  blurRangeValue = document.querySelector("#blurRangeValue"),
  intensityRangeValue = document.querySelector("#intensityRangeValue");
var selectedDirection = "145deg",
  isInset = !1;
const copyButton = document.getElementById("copy"),
  textButton = document.querySelector(".copy-css"),
  shapeType = document.querySelector("#shapeType"),
  pickr = Pickr.create({
    el: ".color-picker",
    theme: "nano",
    default: "#626262",
    comparison: !1,
    showAlways: !1,
    closeOnScroll: !0,
    closeWithKey: "Escape",
    components: {
      preview: !0,
      opacity: !0,
      hue: !0,
      interaction: { hex: !0, rgba: !0, input: !0, save: !0 },
    },
  });
function getBackgroundColor(elem) {
  let background;
  return window
    .getComputedStyle(elem, null)
    .getPropertyValue("background-color");
}
function CopyColorToClipboard(content) {
  var range = document.createRange();
  range.selectNode(content),
    window.getSelection().removeAllRanges(),
    window.getSelection().addRange(range),
    document.execCommand("copy"),
    alert("Color Code Copied " + content.innerText),
    window.getSelection().removeAllRanges();
}
pickr.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
  (globalHexValueOfPicker = color.toHEXA().toString()),
    addcopycss();
    // changeBgColor(rgbaColor);
}),
  (sizeRangeValue.innerText = `${sizeRange.value}`),
  (radiusRangeValue.innerHTML = `${radiusRange.value}`),
  (distanceRangeValue.innerHTML = `${distanceRange.value}`),
  (blurRangeValue.innerHTML = `${blurRange.value}`),
  (intensityRangeValue.innerHTML = `${intensityRange.value}`),
  (boxContent.style.boxShadow = checkDirection()),
  (boxContent.style.width = sizeRange.value),
  (boxContent.style.height = sizeRange.value),
  addcopycss(),
  (sizeRange.oninput = function () {
    sizeRangeValue.innerHTML = `${this.value}`;
    let blurRatio = Number(this.value) / 5,
      distanceRatio = Number(this.value) / 30,
      radiusRatio = Number(this.value) / 4;
    (blurRange.value = blurRatio),
      (blurRangeValue.innerHTML = blurRatio),
      (distanceRange.value = distanceRatio.toFixed(1)),
      (distanceRangeValue.innerHTML = distanceRatio.toFixed(1)),
      (radiusRange.value = radiusRatio / 1.5),
      (radiusRangeValue.innerHTML = radiusRatio),
      (boxContent.style.width = `${this.value}px`),
      (boxContent.style.height = `${this.value}px`),
      (boxContent.style.borderRadius = radiusRange.value),
      (boxContent.style.backdropFilter ='10px'),
      addcopycss();
  }),
  (radiusRange.oninput = function () {
    (radiusRangeValue.innerHTML = `${this.value}`),
      (boxContent.style.borderRadius = `${this.value}px`),
      addcopycss();
  }),
  (distanceRange.oninput = function () {
    (distanceRangeValue.innerHTML = `${this.value}`),
      (boxContent.style.boxShadow = checkDirection()),
      addcopycss();
  }),
  (blurRange.oninput = function () {
    (blurRangeValue.innerHTML = `${this.value}`),
      (boxContent.style.boxShadow = checkDirection()),
      addcopycss();
  }),
  (intensityRange.oninput = function () {
    (intensityRangeValue.innerHTML = `${this.value}`),
      (boxContent.style.boxShadow = `${this.value}px`),
      (document.querySelector(
      ".box"
    ).style.backdropFilter = `blur(${this.value}px)`),
      addcopycss();
  });
const e = new Event("input");
function addcopycss() {
  let boxShadowvalues = checkDirection();
  (copyCssContent.innerText = `background-image: url('https://images.unsplash.com/photo-1581468818216-28608bc9d2ad?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');\nbackground-repeat: no-repeat;
background-position: center;
backdrop-filter: blur(${intensityRangeValue.innerHTML}px);\nborder-radius:${
    radiusRangeValue.innerHTML
  }px;\nbox-shadow:${boxShadowvalues};`),
    (boxContent.style.boxShadow = `${boxShadowvalues}`),
    (boxContent.style.borderRadius = `${radiusRangeValue.innerHTML}px`),
    (boxContent.style.backdropFilter= `blur(${intensityRangeValue.innerHTML}px)}`);
}
function ratioCalucations() {
  let ratio = Number(sizeRangeValue.innerHTML) / 10,
    blurRatio = Number(sizeRangeValue.innerHTML) / 5;
  return ratio;
}
function changeBgColor(colorValue) {
  colorValue.includes("#") ||
    colorValue.includes("rgba(") ||
    (colorCodeInHex.value = rgbToHex(colorValue)),
    (colorCodeInHex.value = document.querySelector(".pcr-result").value),
    (document.querySelector(
      ".box-wrapper"
    ).style.backgroundColor = `rgba(255,255,255,.012)`),
     (document.querySelector(
      ".box"
    ).style.backdropFilter = `blur(16px)`);
}
function changePositionTo(pos, thisObj) {
  (selectedDirection = pos),
    "" !== thisObj &&
      void 0 !== thisObj &&
      ($(".position-wrapper .active").removeClass("active"),
      $(thisObj).addClass("active")),
    addcopycss();
}
function checkDirection() {
  let boxshadow, boxshadowWithInset, firstInsetData, data1, secondInsetData;
  return (
    (boxshadow = getBoxShadow()),
    (firstInsetData = "inset" + boxshadow.split("), ")[0] + ") ,"),
    (data1 = boxshadow.split("), ")[1]),
    (secondInsetData = "inset " + data1),
    (boxshadowWithInset = firstInsetData + secondInsetData),
    isInset ? boxshadow : boxshadowWithInset
  );
}
function toggleInset(Obj) {
  (isInset = !isInset),
    (shapeType.textContent = isInset ? "Pressed" : "Flat"),
    addcopycss();
}
function getBoxShadow() {
  var data, test, firstPointShadowColor, secondPointShadowColor;
  let ratio = Number(distanceRangeValue.innerHTML),
    blurRatio = Number(blurRangeValue.innerHTML);
  if (
    ((data = getBackgroundColor(containerContent)),
    (test = intensityRangeValue.innerHTML),
    data.includes("rgba("))
  )
    (firstPointShadowColor = data), (secondPointShadowColor = data);
  else {
    let hexValue = rgbToHex(data),
      bgHex = rgbToHex(data),
      inverterHexValue = getShadesOfColor(bgHex, -75),
      result,
      newData = hexToRGBA(inverterHexValue).split(","),
      secondStopShadow,
      roundedOpacity = (1.8 * Number(intensityRangeValue.innerHTML)).toFixed(1),
      opResult;
    (firstPointShadowColor = `${newData[0]},${newData[1]},${newData[2]},${roundedOpacity})`),
      (secondPointShadowColor = data);
  }
  switch (selectedDirection) {
    case "145deg":
      return ` ${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
    case "225deg":
      return ` -${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
    case "315deg":
      return ` -${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
    case "45deg":
      return ` ${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
    default:
      return "daet";
  }
}
sizeRange.dispatchEvent(e),
  toggleInset.apply(),
  setTimeout(() => {
    changePositionTo("145deg");
  }, 800);
const copyText = (e) => {
    window.getSelection().selectAllChildren(textButton),
      document.execCommand("copy"),
      e.target.setAttribute("tooltip", "Copied! ✅");
  },
  resetTooltip = (e) => {
    e.target.setAttribute("tooltip", "Copy to clipboard");
  };
copyButton.addEventListener("click", (e) => copyText(e)),
  copyButton.addEventListener("mouseover", (e) => resetTooltip(e));
