document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("page-choice")) {
        return;
    }

    var chosenPage = "https://" + e.target.textContent;
    browser.tabs.create({
        url: chosenPage
    });
});

debugger;

browser.tabs.executeScript(null, {
    file: "/content_scripts/content_script.js"
});


// document.body.textContent = "";
//
// var header = document.createElement('h1');
// header.textContent = "This page has been eaten";
// document.body.appendChild(header);

