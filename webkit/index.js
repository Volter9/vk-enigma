'use strict';

var rimPage = /im\?sel=/;

function directCopy(str) {
    var prevHandler = document.oncopy;
    document.oncopy = function (evt) {
        evt.clipboardData.setData('Text', str);
        evt.preventDefault();

        document.oncopy = prevHandler;
    };
    document.execCommand('Copy');
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (rimPage.test(window.location.href)) {
        App.buildUI(function (link) {
            directCopy(link);
        });
    }
});
