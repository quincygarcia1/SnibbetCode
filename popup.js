function setup(){
    chrome.storage.sync.get(null, function(items){
        for (key in items) {
            if (key.includes("Snibbet - ")){
                var cutLink = key.slice(10);
                var titleValue;
                if (items[key][0] === ""){
                    titleValue = "#NO_TITLE "
                } else {
                    titleValue = items[key][0] + " "
                }
                createSection(cutLink, titleValue, items[key][1], key)
            } else {
                //pass
            }
        }
    })
}
setup();

function createSection(link, Title, Snippet, keyValue) {
    var new_section = document.createElement("li")
    var titleScript = document.createElement("b")
    var codeHolder = document.createElement("pre")
    var codeSnippet = document.createElement("code")
    var buttonDiv = document.createElement("div")
    buttonDiv.className = "buttonSection"
    var buttonDiv = document.createElement("div")
    ButtonCreator("controlbuttons removeBtn", "Remove", buttonDiv, link, keyValue)
    ButtonCreator("controlbuttons goToBtn", "Go To Source", buttonDiv, link, keyValue)
    codeHolder.className = "holder"
    codeHolder.appendChild(codeSnippet)
    new_section.className = 'snippetBox'
    titleScript.innerHTML = Title
    codeSnippet.innerHTML = Snippet
    new_section.appendChild(titleScript)
    new_section.appendChild(codeHolder)
    new_section.appendChild(buttonDiv)
    document.getElementsByClassName("listSnippets")[0].appendChild(new_section)
}

function ButtonCreator(classTitle2, inner, appendsection, openLink, keyValue){
    var newBtn = document.createElement("button")
    newBtn.className = classTitle2
    newBtn.innerHTML = inner
    if(classTitle2 === "controlbuttons goToBtn"){
        newBtn.addEventListener("click", function(){window.open(openLink, '_blank')})
    }else if(classTitle2 === "controlbuttons removeBtn"){
        newBtn.addEventListener("click", function(){
            chrome.storage.sync.remove(keyValue)
            document.getElementsByTagName('ul').innerHTML = ""
            setup()
        })
    }
    appendsection.appendChild(newBtn)
}

