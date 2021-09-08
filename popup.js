chrome.storage.sync.get(null, function(items){
    for (key in items) {
        console.log(key)
        if (key.includes("Snibbet - ")){
            console.log(key)
            var cutLink = key.slice(10);
            createSection(cutLink, items[key][0], items[key][1])
        } else {
            //pass
        }
    }
})

function createSection(link, Title, Snippet) {
    var new_section = document.createElement("section")
    var titleScript = document.createElement("b")
    var codeSnippet = document.createElement("code")
    titleScript.innerHTML = Title
    codeSnippet.innerHTML = Snippet
    new_section.appendChild(titleScript)
    new_section.appendChild(codeSnippet)
    document.getElementsByClassName("listSnippets")[0].appendChild(new_section)
}
