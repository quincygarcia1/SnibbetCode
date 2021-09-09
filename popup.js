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
            createSection(cutLink, titleValue, items[key][1])
        } else {
            //pass
        }
    }
})

function createSection(link, Title, Snippet) {
    var new_section = document.createElement("section")
    var titleScript = document.createElement("b")
    var codeHolder = document.createElement("pre")
    var codeSnippet = document.createElement("code")
    codeHolder.className = "holder"
    codeHolder.appendChild(codeSnippet)
    new_section.className = 'snippetBox'
    titleScript.innerHTML = Title
    codeSnippet.innerHTML = Snippet
    new_section.appendChild(titleScript)
    new_section.appendChild(codeHolder)
    document.getElementsByClassName("listSnippets")[0].appendChild(new_section)
}
