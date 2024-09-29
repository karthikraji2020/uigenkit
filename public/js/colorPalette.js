var currentValue="hex",selectedSortBy=["createdat"],colorData,customPaletteData,createPalette,selectedLayer,isLike=!1,likedPaletteId=[],pageIndex=1;let currentColorScheme="monochromatic";const apiURL="https://uigenkit.in/api/";function loadSocialMediaPaletteColors(){fetch(`${apiURL}socialmediapalette`).then(response=>response.json()).then(obj=>{colorData=obj,renderCards(obj)})}function loadPaletteColors(){fetch(`${apiURL}custompalette`,{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(response=>response.json()).then(obj=>{customPaletteData=obj,loadPartialData(0,12)})}function loadPartialData(startIndex,endIndex){switch(selectedSortBy.toString()){case"createdat":let customPaletteDataCopy=customPaletteData,initalData;customPaletteDataCopy.sort((a,b)=>b.id-a.id),renderPalettes((customPaletteData=customPaletteDataCopy).slice(startIndex,endIndex));break;case"likes":let customPaletteDataCopy1=customPaletteData,initalData1;customPaletteData.sort((a,b)=>b.likes-a.likes),renderPalettes((customPaletteData=customPaletteDataCopy1).slice(startIndex,endIndex))}}function renderPalettes(customPaletteData){var returnData="";customPaletteData.forEach((element,index)=>{void 0!==element.createdAt&&(returnData+=` <div class="col-sm-6 col-md-4 col-lg-3 my-2" >\n      <div class="card">\n      <div class="card-body custom" title="click to copy ClipBoard">\n      ${palettecolorWithFormat(element,currentValue)}\n    </div>\n    <div class="card-footer">\n         <div class="float-left py-1" title="likes">\n      ${renderLikes(element,index)}\n         </div>\n         <div class="float-right">\n         <button type="button" class="btn btn-light btn-sm btn-outline-secondary" title="Download as Image" onclick="downloadPaletteAsImage('${element.hex.layer1}','${element.hex.layer2}','${element.hex.layer3}','${element.hex.layer4}')">\n        <i class="fa fa-download"></i>\n       </button>\n         </div>\n    \n      </div>\n    </div>\n    </div>\n      `)});let withLoadMore="";customPaletteData.length>=12&&(withLoadMore='\n     <div class="btn btn-dark float-right" onclick="loadMore()">\n        load More....\n      </div>\n  '),document.querySelector(".card-group.customColorPalette").innerHTML=returnData,document.querySelector(".col-sm-3.load-more").innerHTML=withLoadMore}function loadMore(){let si,ei;ei=12*(pageIndex+=1),si=0,loadPartialData(0,ei)}function renderLikes(element,index){return element.isLiked?`<span onclick="paletteLiked('${element.id}',this,${element.isLiked})"><i class="fa fa-heart text-danger"></i><span id="likesCount"> ${element.likes} </span> Likes</span>`:`<span onclick="paletteLiked('${element.id}',this,${element.isLiked})"><i class="fa fa-heart-o text-danger"></i> <span id="likesCount"> ${element.likes} </span> Likes</span>`}function togglePalette(){let isChecked,isActive=document.querySelector(".btn.btn-lg.btn-toggle").className.includes("active");resetCustomPaletteGenarator(),isActive?(document.querySelector("#randomPaletteGenarator").style.display="none",document.querySelector(".colorSchemeSelection").style.display="none",document.querySelector("#customPaletteGenarator").style.display="block"):(document.querySelector("#randomPaletteGenarator").style.display="block",document.querySelector(".colorSchemeSelection").style.display="block",document.querySelector("#customPaletteGenarator").style.display="none")}function resetCustomPaletteGenarator(){let layer1,layer2,layer3,layer4;layer1=document.querySelector("#customPaletteGenarator h6.layer1"),layer2=document.querySelector("#customPaletteGenarator h6.layer2"),layer3=document.querySelector("#customPaletteGenarator h6.layer3"),layer4=document.querySelector("#customPaletteGenarator h6.layer4"),layer1.style.backgroundColor="#8f8e8e",layer2.style.backgroundColor="#a8a8a8",layer3.style.backgroundColor="#cecece",layer4.style.backgroundColor="#e0e0e0",layer1.innerHTML="<figcaption> Click Here</figcaption> ",layer2.innerHTML="<figcaption> Click Here</figcaption> ",layer3.innerHTML="<figcaption> Click Here</figcaption> ",layer4.innerHTML="<figcaption> Click Here</figcaption> "}function paletteLiked(id,thisObj,isLiked){if(!(isLike=!isLike||!likedPaletteId.includes(id))&&likedPaletteId.includes(id)){thisObj.firstElementChild.className="fa fa-heart-o text-danger";let likesCount=Number(thisObj.lastElementChild.innerHTML)>0?Number(thisObj.lastElementChild.innerHTML)-1:" 0";thisObj.lastElementChild.innerHTML=likesCount;const filteredItems=likedPaletteId.filter(item=>item!==id);likedPaletteId=filteredItems,updateLikes(`${apiURL}updatelikesbyid/${id}`,{likes:likesCount,isLiked:!1}).then(data=>{customPaletteData=data;let si=0,ei;loadPartialData(0,12*pageIndex)})}if(isLike&&!likedPaletteId.includes(id)){thisObj.firstElementChild.className="fa fa-heart text-danger";let likesCount=Number(thisObj.lastElementChild.innerHTML)+1;thisObj.lastElementChild.innerHTML=likesCount,likedPaletteId.push(id),updateLikes(`${apiURL}updatelikesbyid/${id}`,{likes:likesCount,isLiked:!0}).then(data=>{customPaletteData=data;let si=0,ei;loadPartialData(0,12*pageIndex)})}}function renderCards(colorData){var returnData="";colorData.forEach(element=>{returnData+=` <div class="col-md-3 my-1" >\n      <div class="card" style="background:${element.colorFormats.rgb}">\n        <div class="card-body text-center"  >\n        <p class="card-text ">${element.brandName} </p>\n        <div class="card-footer">\n        ${colorWithFormat(element,currentValue)}\n        <div class="overlay">\n        <a  onclick="downloadImage('${element.colorFormats.rgb}','${element.brandName}')" class="icon" title="Download As Image">\n          <i class="fa fa-download"></i>\n        </a>\n        </div>\n        </div>\n      </div>\n      </div>\n    </div>\n      `}),document.querySelector(".card-group.socialPalette").innerHTML=returnData}function customPalette(){let setg1Color,setg2Color,setg3Color,setg4Color;var lighten2Color,lighten3Color,lighten4Color;document.querySelector("#randomPaletteGenarator").innerHTML='       <div class="card shadow">\n                  <div class="card-body">\n                <h4 class="card-title text-left text-capitalize"> random Generator</h4>\n                  <h6 class="g1" onclick="showPicker(this)"> </h6>\n                  <h6 class="g2" onclick="showPicker(this)"> </h6>\n                  <h6 class="g3" onclick="showPicker(this)"> </h6>\n                  <h6 class="g4" onclick="showPicker(this)"> </h6>\n                </div>\n                <div class="card-footer ">\n             \n                <button class="btn btn-dark float-right mx-2" onclick="savePalette(\'random\')" title="Save Palette"><i class="fa fa-save"></i>  save</button> \n                  <button class="btn btn-secondary float-right" onclick="customPalette()" title="Genarate Palette">\n    <svg viewBox="0 0 32 32"\n    style="height: 1.5rem;" aria-hidden="true"\n    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.125em" >\n        <path fill="currentcolor" fill-rule="nonzero" stroke="none" stroke-width="1" d="M7.38 5.555l15.592-1.367A3.419 3.419 0 0126.673 7.3L28.05 23.06a3.422 3.422 0 01-3.106 3.71L9.352 28.137a3.419 3.419 0 01-3.702-3.113L4.275 9.265a3.422 3.422 0 013.106-3.71zm.2 2.274a1.14 1.14 0 00-1.036 1.237l1.375 15.759a1.14 1.14 0 001.234 1.038l15.591-1.368a1.14 1.14 0 001.036-1.236l-1.376-15.76a1.14 1.14 0 00-1.234-1.037L7.58 7.829zm3.254 5.39a1.69 1.69 0 01-1.825-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.546 1.692 1.692 0 01-1.53 1.839zm10.065-.883a1.69 1.69 0 01-1.826-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.546 1.692 1.692 0 01-1.53 1.84zM11.72 23.373a1.69 1.69 0 01-1.825-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.545 1.692 1.692 0 01-1.53 1.84zm10.065-.883a1.69 1.69 0 01-1.825-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.546 1.692 1.692 0 01-1.53 1.84zm-5.476-4.635a1.69 1.69 0 01-1.825-1.546 1.692 1.692 0 011.53-1.839 1.69 1.69 0 011.825 1.545 1.692 1.692 0 01-1.53 1.84zM29.183 6.823l-.015.002A.915.915 0 0128.167 6c-.265-2.544-2.523-4.39-5.045-4.121h-.007a.916.916 0 01-1.002-.824.922.922 0 01.808-1.018h.002l.007-.001a6.387 6.387 0 014.718 1.408 6.498 6.498 0 012.347 4.363.922.922 0 01-.812 1.016zM8.547 32h-.008a6.395 6.395 0 01-4.578-1.818 6.51 6.51 0 01-1.96-4.553.92.92 0 01.895-.942h.016c.503-.008.917.4.926.91.044 2.559 2.134 4.595 4.67 4.55h.006a.918.918 0 01.927.91.92.92 0 01-.894.943z"></path></svg>\n    Generate </button>\n                  </div>\n                </div>',lighten2Color=`${getRandomColorInHEXFormat()}`,setg1Color=`${getShadesOfColor(lighten2Color,-80)}`,lighten3Color=getShadesOfColor(lighten2Color,40),lighten4Color=invertColor(setg1Color),"monochromatic"===currentColorScheme?(setg2Color=`${lighten2Color}`,setg3Color=`${lighten3Color}`,setg4Color=`${lighten4Color=getShadesOfColor(lighten2Color,60)}`):"dirtectComplementry"===currentColorScheme?(setg2Color=`${lighten2Color}`,setg3Color=`${lighten3Color=invertColor(lighten3Color)}`,setg4Color=`${lighten4Color=invertColor(setg1Color)}`):(setg1Color=`${genarateGreyShadecolor()}`,setg2Color=`${genarateGreyShadecolor()}`,setg3Color=`${genarateGreyShadecolor()}`,setg4Color=`${genarateGreyShadecolor()}`);let g1=document.querySelector(".g1"),g2=document.querySelector(".g2"),g3=document.querySelector(".g3"),g4=document.querySelector(".g4");g1.style.backgroundColor=setg1Color,g2.style.backgroundColor=setg2Color,g3.style.backgroundColor=setg3Color,g4.style.backgroundColor=setg4Color,g1.innerHTML=`<figcaption>${setg1Color}</figcaption>`,g2.innerHTML=`<figcaption>${setg2Color}</figcaption>`,g3.innerHTML=`<figcaption>${setg3Color}</figcaption>`,g4.innerHTML=`<figcaption>${setg4Color}</figcaption>`}function genarateGreyShadecolor(){let grayShadecolor=Math.floor(255*Math.random()).toString(16);return 1===grayShadecolor.length&&(grayShadecolor+="0"),"#"+grayShadecolor+grayShadecolor+grayShadecolor}function downloadImage(obj,name){draw(obj);var colorPaletteBackground,base64URL=document.querySelector("#colorPalette").toDataURL(),a=document.createElement("a");a.href=base64URL;let timeInMiliSec=Date.now();a.download=`UiGenaratorKit_SocialColorBackGround${name}_${timeInMiliSec}.jpg`,a.click()}function palettecolorWithFormat(element,format){switch(format){case"hex":return` \n    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer1}"> <figcaption>${element.hex.layer1}</figcaption></h6>\n    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer2}"><figcaption>${element.hex.layer2}</figcaption></h6>\n    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer3}"><figcaption>${element.hex.layer3}</figcaption></h6>\n    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background:${element.hex.layer4}"><figcaption>${element.hex.layer4}</figcaption></h6>\n    `;case"rgba":return` \n    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer1}"> <figcaption>${element.rgba.layer1}</figcaption></h6>\n    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer2}"><figcaption>${element.rgba.layer2}</figcaption></h6>\n    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer3}"><figcaption>${element.rgba.layer3}</figcaption></h6>\n    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background:${element.rgba.layer4}"><figcaption>${element.rgba.layer4}</figcaption></h6>\n    `;case"rgb":return` \n    <h6 class="layer1" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer1}"> <figcaption>${element.rgb.layer1}</figcaption></h6>\n    <h6 class="layer2" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer2}"><figcaption>${element.rgb.layer2}</figcaption></h6>\n    <h6 class="layer3" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer3}"><figcaption>${element.rgb.layer3}</figcaption></h6>\n    <h6 class="layer4" onclick="CopyColorToClipboard(this)" style="background:${element.rgb.layer4}"><figcaption>${element.rgb.layer4}</figcaption></h6>\n    `}}function colorWithFormat(element,format){switch(format){case"hex":return` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.hashhex}</p> `;case"rgba":return` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.rgba}</p> `;case"rgb":return` <p class="card-text" onclick="CopyColorToClipboard(this)">${element.colorFormats.rgb}</p> `}}function showPicker(obj){if(selectedLayer=obj.className,""!==obj.style.backgroundColor)if("hex"==currentValue){let result=rgbToHex(obj.style.backgroundColor);createPalette.setColor(result)}else if("rgb"==currentValue)createPalette.setColor(obj.style.backgroundColor);else{let result=obj.style.backgroundColor.replace("rgb","rgba").replace(")",",1)");createPalette.setColor(result)}createPalette.show(),createPalette.setColorRepresentation(obj.innerHTML)}function savePalette(type){let layer1,layer2,layer3,layer4;if(renderLoader(400),"random"===type&&(layer1=document.querySelector(".g1 figcaption"),layer2=document.querySelector(".g2 figcaption"),layer3=document.querySelector(".g3 figcaption"),layer4=document.querySelector(".g4 figcaption")),"custom"===type&&(layer1=document.querySelector(".layer1 figcaption"),layer2=document.querySelector(".layer2 figcaption"),layer3=document.querySelector(".layer3 figcaption"),layer4=document.querySelector(".layer4 figcaption")),layer1.innerHTML.length>6&&layer2.innerHTML.length>6&&layer3.innerHTML.length>6&&layer4.innerHTML.length>6&&void 0!==layer1.innerHTML&&void 0!==layer2.innerHTML&&void 0!==layer3.innerHTML&&void 0!==layer4.innerHTML){let newPalette={id:Date.now(),createdAt:Date.now(),isLiked:!1,likes:0,hex:{layer1:layer1.innerHTML,layer2:layer2.innerHTML,layer3:layer3.innerHTML,layer4:layer4.innerHTML},rgb:{layer1:hexToRGB(layer1.innerHTML),layer2:hexToRGB(layer2.innerHTML),layer3:hexToRGB(layer3.innerHTML),layer4:hexToRGB(layer4.innerHTML)},rgba:{layer1:hexToRGBA(layer1.innerHTML,1),layer2:hexToRGBA(layer2.innerHTML,1),layer3:hexToRGBA(layer3.innerHTML,1),layer4:hexToRGBA(layer4.innerHTML,1)}};createColorPalette(`${apiURL}custompalette`,newPalette).then(data=>{customPaletteData=data,loadPartialData(0,12)})}else alert("Please set All Four Layers Of Colors")}async function createColorPalette(url="",data={}){const response=await fetch(url,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(data)});return response.json()}async function updateLikes(url="",data={}){const response=await fetch(url,{method:"PUT",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(data)});return response.json()}function hexToRGB(hexvalue){let colorConversion=document.querySelector("#colorConversion"),rbgvalue;return colorConversion.style.color=hexvalue,colorConversion.style.color}function draw(bgone){var canvas,ctx=document.getElementById("colorPalette").getContext("2d");ctx.fillStyle=bgone,ctx.fillRect(0,0,1280,650),ctx.fill()}function changeSelectedlayerBg(){switch(selectedLayer){case"layer1":case"layer2":case"layer3":default:changeSelectedlayerBgTrigger(selectedLayer)}}function changeSelectedlayerBgTrigger(selector){let changedColor=document.querySelector(".pcr-result").value,currentSelector=document.querySelector(`.${selector}`);currentSelector.style.backgroundColor=changedColor,currentSelector.innerHTML=`<figcaption>${changedColor}</figcaption>`}(createPalette=Pickr.create({el:".createPalette-color-picker",theme:"nano",default:"#000",comparison:!1,showAlways:!1,closeOnScroll:!0,closeWithKey:"Escape",components:{preview:!0,opacity:!0,hue:!0,interaction:{hex:!0,rgba:!0,input:!0}}})).on("change",(color,instance)=>{changeSelectedlayerBg()}),createPalette.hide(),loadPaletteColors(),setTimeout(()=>{loadSocialMediaPaletteColors()},0),resetCustomPaletteGenarator(),setTimeout(()=>{draw("rgb(54, 238, 213)")},1e3),$(window).resize((function(){let colorSchemeBtnGroup=document.getElementById("colorSchemeBtnGroup"),colorShemeTitle=document.querySelector(".color-sheme-title");window.screen.width<=768?(colorShemeTitle.style.display="none",colorSchemeBtnGroup.classList.add("btn-group-vertical","transition"),console.log(window.screen.width)):(colorShemeTitle.style.display="block",colorSchemeBtnGroup.classList.remove("btn-group-vertical","transition")),draw("rgb(54, 238, 213)")})).resize();var gridsArrray=[],showQuoteChild=document.querySelector(".showQuote").children;for(let index=0;index<showQuoteChild.length;index++){const classnames=showQuoteChild[index].classList[1];void 0!==classnames&&""!==classnames&&gridsArrray.push(classnames)}function getTheme(){for(let index=0;index<gridsArrray.length;index++){const currenGridElement=gridsArrray[index];let getColorCode=getRandomColorInHEXFormat();if(getColorCode){let currenGridElementDOM=document.querySelector("."+currenGridElement);switch(currenGridElementDOM.style.backgroundColor=getColorCode,currentValue){case"rgb":currenGridElementDOM.children[0].innerHTML=currenGridElementDOM.style.backgroundColor;break;case"rgba":currenGridElementDOM.children[0].innerHTML=currenGridElementDOM.style.backgroundColor.replace("rgb","rgba").replace(")",",1)");break;default:currenGridElementDOM.children[0].innerHTML=getColorCode}}}}getTheme(),$("#colorFormatBtnGroup input").on("click",(function(){var thisBtn,btnValue=$(this).val();renderCards(colorData,btnValue),renderPalettes(customPaletteData,btnValue),$("#selectedVal").text(btnValue)})),$("#colorSchemeBtnGroup input[name='colorScheme']").on("click",(function(){let thisBtn,btnValue=$(this).val();currentColorScheme!==btnValue&&customPalette(),currentColorScheme=btnValue})),$("#sortBy input").on("click",(function(){var thisBtn,btnValue=$(this).val();selectedSortBy.length=0,selectedSortBy.push(btnValue),sortBy(btnValue),renderLoader(500),$("#selectedValSortedBy").text(btnValue)})),customPalette();let trans=()=>{document.documentElement.classList.add("transition"),window.setTimeout(()=>{document.documentElement.classList.remove("transition")},1e3)};function scrollFunction(){let colorFormatBtnGroup=document.getElementById("colorFormatBtnGroup"),colorShemeTitle=document.querySelector(".color-sheme-title");document.body.scrollTop>100||document.documentElement.scrollTop>100?(colorFormatBtnGroup.classList.add("btn-group-vertical","fixed-middle-right","transition"),colorShemeTitle.style.display="none"):(colorFormatBtnGroup.classList.remove("btn-group-vertical","fixed-middle-right","transition"),colorShemeTitle.style.display="block")}function sortBy(toSortBy){loadPartialData(0,12)}function changeCurrentColorScheme(colorScheme){}function handleClick(colorFormat){currentValue=colorFormat.value;let gridsArrray=document.querySelectorAll("#randomPaletteGenarator .card-body h6");for(let index=0;index<gridsArrray.length;index++){let currenGridElementDOM=gridsArrray[index];"hex"==currentValue&&(currenGridElementDOM.innerHTML=rgbToHex(currenGridElementDOM.style.backgroundColor)),"rgb"==currentValue&&(currenGridElementDOM.innerHTML=currenGridElementDOM.style.backgroundColor),"rgba"==currentValue&&(currenGridElementDOM.innerHTML=currenGridElementDOM.style.backgroundColor.replace("rgb","rgba").replace(")",",1)"))}}function getRandomColorInHEXFormat(){let letters="0123456789ABCDEF",color="#";for(let i=0;i<6;i++)color+=letters[Math.floor(16*Math.random())];return color}function downloadPaletteAsImage(layer1,layer2,layer3,layer4){drawPalette(layer1,layer2,layer3,layer4);let colorCanvasPaletteBackground,base64URL=document.querySelector("#paletteCanvas").toDataURL(),a=document.createElement("a");a.href=base64URL;let timeInMiliSec=Date.now();a.download=`UiGenKit_ColorPaletteBackGround_${timeInMiliSec}.jpg`,a.click()}function drawPalette(layer1,layer2,layer3,layer4){let canvas=document.getElementById("paletteCanvas");if(canvas.getContext){var ctx=canvas.getContext("2d");ctx.fillStyle=layer1,ctx.fillRect(0,0,canvas.width,canvas.height/4),ctx.fillStyle=layer2,ctx.fillRect(0,canvas.height/4*2,canvas.width,canvas.height/4),ctx.fillStyle=layer3,ctx.fillRect(0,canvas.height/4*3,canvas.width,canvas.height/4),ctx.fillStyle=layer4,ctx.fillRect(0,canvas.height/4,canvas.width,canvas.height/4),ctx.fill()}}window.onscroll=function(){scrollFunction()};