'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
    if (!changeInfo || changeInfo.status !== 'complete') {
        return;
    }
    
    chrome.tabs.sendMessage(tabId, {data: tab}, function (response) {
        // TODO: handle?
    });
});
