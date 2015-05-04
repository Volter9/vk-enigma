'use strict';

var imPage = /im\?(?:sel|peers)=/;

/**
 * Initialize enigma
 * 
 * @param {Object} request
 * @param {Object} sender
 * @param {Object} sendResponse
 */
function initEnigma (request, sender, sendResponse) {
    if (!imPage.test(window.location.href) || App.isInit()) {
        return;
    }
    
    App.init();
    App.buildUI();
    App.injectScript('lib/inject.js');
}

chrome.runtime.onMessage.addListener(initEnigma);
