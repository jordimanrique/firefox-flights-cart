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