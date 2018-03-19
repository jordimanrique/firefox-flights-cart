
const storage = browser.storage.local;
const manifest = browser.runtime.getManifest();
const version = manifest.version;

let active = false;

$(document).ready(() => {
    $('#version').html(version);
    validateDataFromStorage();
});

function validateDataFromStorage() {
    storage.get("defaultUserData")
        .then(fillPopup, onError);
}

function fillPopup(user) {

    if (user) {
        if (user.defaultUserData.gender === 'mr') {
            $('#male').prop( "checked", true );
        } else {
            $('#female').prop( "checked", true );
        }
        $('#name').val(user.defaultUserData.name);
        $('#email').val(user.defaultUserData.email);
    }

    active = user.defaultUserData.active === 'on';
    $('#active-autofill').prop('checked', active);
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {
                type: 'COMMAND',
                payload: 'change-userDefault'
            }
        ).then(response => {
            console.log("Message from the content script:");
            console.log(response.response);
        }).catch(onError);
    }
}

function setUserData() {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
}

$('#submit').click(() => {

    let defaultUserData = {
        gender: $('input[name=gender]:checked').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        active: $('#active-autofill:checked').val()
    };

    storage.set({defaultUserData})
        .then(setUserData, onError);

    setTimeout(function () {
        window.close()
    }, 100);
});

function onError(error) {
    console.log(`Error: ${error}`);
}