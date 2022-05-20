function Setup(){
    // Search Chrome storage for all text-"snippet" pairs that should be displayed on the popup
    chrome.storage.sync.get(null, function(items){
        for (key in items) {
            // "Snibbit - " is the identifier for elements of the Chrome extension
            var cutText = key;
            var titleValue;
            if (Array.isArray(items[key]) && items[key].length == 3 && items[key][2] == "Snibbit"){
                if (items[key][0] === ""){
                    titleValue = "#NO_TITLE "
                } else {
                    titleValue = items[key][0] + " "
                }
                CreateSection(cutText, titleValue, items[key][1], key)
            }
        }
    })
}
Setup();

// Creates the tabs of snippet informationt that populates the ul element
function CreateSection(Snippet, Title, link, keyValue) {
    var newSection = document.createElement("li")
    newSection.id = keyValue
    var titleScript = document.createElement("b")
    var codeHolder = document.createElement("pre")
    var codeSnippet = document.createElement("code")
    var buttonDiv = document.createElement("div")
    buttonDiv.className = "buttonSection"
    var buttonDiv = document.createElement("div")
    ButtonCreator("controlbuttons removeBtn", "Remove", buttonDiv, link, keyValue)
    ButtonCreator("controlbuttons goToBtn", "Go To Source", buttonDiv, link, keyValue)
    codeHolder.className = "holder"
    newSection.className = 'snippetBox'
    titleScript.innerHTML = Title
    codeSnippet.innerHTML = Snippet
    codeHolder.appendChild(codeSnippet)
    newSection.appendChild(titleScript)
    newSection.appendChild(codeHolder)
    newSection.appendChild(buttonDiv)
    document.getElementsByClassName("listSnippets")[0].appendChild(newSection)
}

function ButtonCreator(classTitle2, inner, appendsection, openLink, keyValue) {
    // Function that will build the inner "remove" and "open link" buttons within each snippet
    var newBtn = document.createElement("button")
    newBtn.className = classTitle2
    newBtn.innerHTML = inner
    if(classTitle2 === "controlbuttons goToBtn"){
        newBtn.addEventListener("click", function(){window.open(openLink, '_blank')})
    }else if(classTitle2 === "controlbuttons removeBtn"){
        newBtn.addEventListener("click", function(){
            chrome.storage.sync.remove(keyValue)
            l = document.getElementsByTagName("ul")[0]
            l.removeChild(document.getElementById(keyValue))
        })
    }
    appendsection.appendChild(newBtn)
}

