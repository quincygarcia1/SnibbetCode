function AddFont(url, rel) {
    var link = document.createElement("link")
    link.rel = rel
    link.href = url
    if(url = "https://fonts.gstatic.com"){
        link.crossOrigin
    } 
    document.getElementsByTagName("head")[0].appendChild(link);
}

AddFont("https://fonts.googleapis.com", "preconnect");
AddFont("https://fonts.gstatic.com", "preconnect");
AddFont("https://fonts.googleapis.com/css2?family=Urbanist&display=swap", "stylesheet");

function createBasics(htmlName, classTitle, el) {
    el.className = classTitle
    el.innerHTML = htmlName
}
function addToEl(generalEl, listOfEl) {
    for (let i = 0; i < listOfEl.length; i++) {
        generalEl.appendChild(listOfEl[i]);
    }
}

var btn = document.createElement("button");
btn.addEventListener("click", handleButtonPress);
createBasics("Snibbit", "gradient-button s-button", btn)
var box = document.createElement("body");
box.className = "s-box"
var bigText = document.createElement("h1");
createBasics("Snibbit Code", "s-title", bigText)
var logo = document.createElement("img")
logo.src = chrome.runtime.getURL("Images/logo-25x25.png")
var boxHead = document.createElement("header")
addToEl(boxHead, [bigText, logo])
addToEl(box, [boxHead])
var inline = document.createElement("div");
inline.className = 'parent inline'
var search = document.createElement('input')
search.type = "text"
search.placeholder = "<title snippet>"
search.name = "search"
search.className = "child s-searchbox"
addToEl(inline, [btn, search])
addToEl(box, [inline])
document.getElementsByTagName("header")[0].appendChild(box)

function handleButtonPress() {
    var selectedSnippet = getSelectionText();
    if (selectedSnippet == ""){
        alert("please highlight a snippet of text")
    } else {
        var siteLink = "Snibbet - " + window.location.href
        var snippetTitle = document.getElementsByClassName("s-searchbox")[0].value
        var obj = {}
        obj[siteLink] = [snippetTitle, selectedSnippet]
        chrome.storage.sync.set(obj);
    }
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
