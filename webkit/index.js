'use strict';

var rimPage = /im\?(?:sel|peers)=/;

/**
 * Initialize enigma
 * 
 * @param {Object} request
 * @param {Object} sender
 * @param {Object} sendResponse
 */
function initEnigma (request, sender, sendResponse) {
    if (rimPage.test(window.location.href)) {
        if (App.isInit()) {
            return;
        }
        
        App.init();
        
        App.buildUI();
        
        App.injectScript('lib/inject.js');
    }
}

chrome.runtime.onMessage.addListener(initEnigma);
