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

function establishElements() {
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

    var subHeader = document.createElement("small")
    subHeader.className = "infotext"
    subHeader.innerHTML = "Highlight a snippet"
    AddToEl(box, [subHeader])

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
}

establishElements()

// Stores URL, snippet content and an optinal assigned title
function HandleButtonPress() {
    var selectedSnippet = GetSelectionText();
    if (selectedSnippet == ""){
        alert("Please highlight a snippet of text")
    } else {
        let finalSnippet = "Snibbit - " + selectedSnippet
        var siteLink = window.location.href
        var snippetTitle = document.getElementsByClassName("s-searchbox")[0].value
        var obj = {}
        obj[finalSnippet] = [snippetTitle, siteLink]
        
        try {
            chrome.storage.sync.set(obj);
            alert("Snippet Saved")
        } catch(err){
            alert("Please refesh the page and try again.")
        }

        var grabbedKeys = findKeywords(selectedSnippet)

        var allKeys = Object.keys(grabbedKeys)

        for (let i = 0; i < allKeys.length; i++) {
            chrome.storage.sync.get("SKey - " + allKeys[i], function(items){
                var keyObj = {}
                if (items == null){
                    alert("not there")
                    keyObj["SKey - " + allKeys[i]] = grabbedKeys[allKeys[i]]
                } else {
                    alert("there");
                    console.log("SKey - " + allKeys[i])
                    keyObj["SKey - " + allKeys[i]] = grabbedKeys[allKeys[i]] + items["SKey - " + allKeys[i]]
                }
                chrome.storage.sync.set(keyObj)
                console.log(keyObj)
            })
        }

    }
}

function findKeywords(section) {
    let words = section.split(" ")
    var keywords = {}
    let keywordsTemplate = new RegExp('[a-zA-Z_]+(([(][a-zA-Z_]*[)]){1}|([.](([a-zA-Z_*]+)([(][a-zA-Z_0-9",]+[)])?){1}))[;]?$')
    for (let i = 0; i < words.length; i ++) {
        if (keywordsTemplate.test(words[i])){
            if (words[i] in keywords){
                keywords[words[i]] += 1
            } else {
                keywords[words[i]] = 1;
            }
            
        }
    }
    return keywords
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

function addSubheader(e) {
    var t = GetSelectionText()
    var element = document.getElementsByClassName("infotext")[0];
    element.style.WebkitTransition = 'opacity 1s';
    if (t != "") {
        element.style.opacity = "0";
        element.style.filter  = 'alpha(opacity=0)';
    } else {
        element.style.opacity = "1";
        element.style.filter  = 'alpha(opacity=80)';
    }
}

document.onmouseup = addSubheader;

function checkForKeyWord(Text, keyWord){
    if ((Text.textContent || Text.innerText).indexOf(keyWord) > -1) {
        return true
    }
    return false
}