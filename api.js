let last_upd = 1511222225
let api = "https://api.steamcmd.net/v1/info/322170"


let respElement = document.getElementById("resp")
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

function refresh(){
    let response = httpGet(api)
    let responseJSON = JSON.parse(response)
    let pubTime = responseJSON.data["322170"].depots.branches.public.timeupdated
    respElement.innerText = response
    pubElement.innerText = pubTime
    betaElement.innerText = responseJSON.data["322170"].depots.branches.beta.timeupdated
    console.log(responseJSON.data["322170"])
    if(pubTime!=last_upd){
        answElement.innerText = "Yes"
    } else {
        answElement.innerText = "No"
    }
}

refresh()