let last_upd = 1511222225
let api = "https://api.steamcmd.net/v1/info/322170"


let respElement = document.getElementById("resp")
let refreshElement = document.getElementById("refreshed")
let answElement = document.getElementById("answer")
let pubElement = document.getElementById("pub")
let betaElement = document.getElementById("beta")


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
    if(pubTime!=last_upd){
        answElement.innerText = "Yes"
    } else {
        answElement.innerText = "No"
    }
    let now = new Date().toLocaleTimeString()
    refreshElement.innerHTML = `Refreshed: ${now}`
}

refresh()

setInterval(function(){
    refresh()
}, 10*1000)