'use strict';

var App = {
    buildUI: function (handlePrivnoteLink) {
        var elImText = document.getElementById('im_texts');
        // TODO:

        Privnote.crypt('hello world!', handlePrivnoteLink);
    }
};
