'use strict';

var rimPage = /im\?(?:sel|peers)=/;

/**
 * Copy supplied content
 * 
 * @param {String}
 */
function directCopy (content) {
    var previousHandler = document.oncopy;
    
    document.oncopy = function (e) {
        e.preventDefault();
        e.clipboardData.setData('Text', str);

        document.oncopy = previousHandler;
    };
    
    document.execCommand('Copy');
}

/**
 * Initialize enigma
 * 
 * @param {Object} request
 * @param {Object} sender
 * @param {Object} sendResponse
 */
function initEnigma (request, sender, sendResponse) {
    if (rimPage.test(window.location.href)) {
        var app = new App;
        
        app.buildUI(function (link) {
            directCopy(link);
        });
        
        app.injectScript('lib/inject.js');
        
        document.addEventListener('enigma.recieve', app.onSend);
    }
}

chrome.runtime.onMessage.addListener(initEnigma);
