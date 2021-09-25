// Adds a new Google font
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

// Functions that save coding space
function CreateBasics(htmlName, classTitle, el) {
    el.className = classTitle
    el.innerHTML = htmlName
}
function AddToEl(generalEl, listOfEl) {
    for (let i = 0; i < listOfEl.length; i++) {
        generalEl.appendChild(listOfEl[i]);
    }
}

// Create html elements for the on-page popup
var btn = document.createElement("button");
btn.addEventListener("click", HandleButtonPress);
CreateBasics("Snibbit", "gradient-button s-button", btn)
var box = document.createElement("body");
box.className = "s-box"
var bigText = document.createElement("h1");
CreateBasics("Snibbit Code", "s-title", bigText)
var logo = document.createElement("img")
logo.src = chrome.runtime.getURL("Images/logo-25x25.png")
var boxHead = document.createElement("header")
AddToEl(boxHead, [bigText, logo])
AddToEl(box, [boxHead])
var inline = document.createElement("div");
inline.className = 'parent inline'
var search = document.createElement('input')
search.type = "text"
search.placeholder = "<title snippet>"
search.name = "search"
search.className = "child s-searchbox"
AddToEl(inline, [btn, search])
AddToEl(box, [inline])
document.getElementsByTagName("header")[0].appendChild(box)

// Stores URL, snippet content and an optinal assigned title
function HandleButtonPress() {
    var selectedSnippet = GetSelectionText();
    if (selectedSnippet == ""){
        alert("Please highlight a snippet of text")
    } else {
        var siteLink = "Snibbit - " + window.location.href
        var snippetTitle = document.getElementsByClassName("s-searchbox")[0].value
        var obj = {}
        obj[siteLink] = [snippetTitle, selectedSnippet]
        chrome.storage.sync.set(obj);
        alert("Snippet Saved")
    }
}

// Function to get and store highlighted text
function GetSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
