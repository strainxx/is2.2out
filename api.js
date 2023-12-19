let last_upd = 1511222225
let api = "https://api.steamcmd.net/v1/info/322170"

var audio = new Audio("alarm.mp3");

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("cb").checked = false
  console.log("Welcome to the club")
})

if(localStorage.getItem("popup") == "0"){
  document.getElementById('popup').remove()
}

let respElement = document.getElementById("resp")
let refreshElement = document.getElementById("refreshed")
let answElement = document.getElementById("answer")
let pubElement = document.getElementById("pub")
let betaElement = document.getElementById("beta")
let play_sound, released;

document.getElementById("cb").addEventListener("change", (e)=>{
  play_sound = document.getElementById("cb").checked
})

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function popupClose(){
  document.getElementById('popup').remove()
  localStorage.setItem("popup", 0);
}

function refresh(){
    refreshElement.innerHTML = "Refreshing..."
    let response = httpGet(api)
    let responseJSON = JSON.parse(response)
    let pubTime = responseJSON.data["322170"].depots.branches.public.timeupdated
    let datePub = new Date(pubTime*1000)
    let dateBeta = new Date(responseJSON.data["322170"].depots.branches.beta.timeupdated *1000)
    respElement.innerText = response
    pubElement.innerText = `${datePub.getDate()}.${datePub.getMonth()+1}.${datePub.getFullYear()}`
    betaElement.innerText = `${dateBeta.getDate()}.${dateBeta.getMonth()+1}.${dateBeta.getFullYear()}`
    console.log(responseJSON.data["322170"])
    if(pubTime!=last_upd || released){
        answElement.innerText = "Yes"
        answElement.classList.add("released")
        document.getElementById("ref_btn").innerText = "Check Steam"
        document.getElementById("ref_btn").style.color = "#EEE7DA"
        document.getElementById("ref_btn").style.backgroundColor = "#88AB8E"
        document.getElementById("ref_btn").onclick = function(){
          location.href = "https://store.steampowered.com/app/322170/Geometry_Dash/";
        }
        document.title = "2.2 RELEASED!!!!!!!1!!!"
        if(play_sound){
          audio.play()
        }
    } else {
        answElement.innerText = "No"
        answElement.style.color = "#d75854"
    }
    let now = new Date().toLocaleTimeString()
    refreshElement.innerHTML = `Refreshed: ${now}`
    // audio.play()
}

refresh()

setInterval(function(){
    refresh()
}, 10*1000)
