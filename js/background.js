// const URL_RULE_PATH = '/carrito/procesar_compra';
//
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//         chrome.declarativeContent.onPageChanged.addRules([
//             {
//                 conditions: [
//                     new chrome.declarativeContent.PageStateMatcher({
//                         pageUrl: {urlContains: URL_RULE_PATH},
//                     })
//                 ],
//                 actions: [new chrome.declarativeContent.ShowPageAction()]
//             }
//         ]);
//     });
// });

const URL_RULE_PATH = '/carrito/procesar_compra';

// browser.runtime.onInstalled.addListener(() => {
//     browser.decla
//     }
// );

// function checkUrl(tab) {
//     console.log(tab.url);
// }
//
// function tabChanged(tabId, changeInfo, tab) {
//     browser.tabs.get(tabId).then(checkUrl);
// }
//
// browser.tabs.onActivated.addListener(tabChanged);
//
// browser.tabs.onUpdated.addListener(tabChanged);

// browser.tabs.getCurrent().then(
//     enableAddon()
// );

// browser.browserAction.disable();


