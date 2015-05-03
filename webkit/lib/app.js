'use strict';

var App = function () {};

/**
 * Build UI for vk messages
 * 
 * @param {Function} handleLink
 */
App.prototype.buildUI = function (handleLink) {
    var imTextarea = document.getElementById('im_texts');
    
    this.createCheckBox();
};
    
/**
 * Initialize check box for sending the text over privnote
 */
App.prototype.createCheckBox = function () {
    var imForm   = document.getElementById('im_write_form'),
        checkbox = document.createElement('input'),
        label    = document.createElement('label');
    
    label.innerText = label.textContent = 'Послать через privnote: ';
    
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = 'enigma_checkbox';
    
    checkbox.addEventListener('change', function () {
        // 
    });
    
    label.appendChild(checkbox);
    
    imForm.appendChild(label);
};

/**
 * Injects custom script into the head
 * 
 * @link http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script/
 * @param {String} path
 */
App.prototype.injectScript = function (path) {
    var script = document.createElement('script');
    
    script.src = chrome.extension.getURL(path);
    script.onload = function() {
        this.parentNode.removeChild(this);
    };
    
    (document.head||document.documentElement).appendChild(script);
};