'use strict';

var App = function () {
    var self = this;
    
    this.checked = false;
    
    this.onSend = function (event) {
        if (!self.checked) {
            document.dispatchEvent(new CustomEvent('enigma.send'));
            
            return;
        }
        
        var imTextarea = document.getElementById('im_texts'),
            editable = imTextarea.querySelector('.im_editable');
        
        Privnote.crypt(event.detail.message, function (link) {
            editable.innerHTML = 'Ссылка на просмотр сообщения: ' + link;
            
            document.dispatchEvent(new CustomEvent('enigma.send'));
        });
    };
};

/**
 * Build UI for vk messages
 * 
 * @param {Function} handleLink
 */
App.prototype.buildUI = function (handleLink) {
    if (document.getElementById('enigma_checkbox')) {
        return;
    }
    
    this.createCheckBox();
};
    
/**
 * Initialize check box for sending the text over privnote
 */
App.prototype.createCheckBox = function () {
    var imForm   = document.getElementById('im_write_form'),
        checkbox = document.createElement('input'),
        label    = document.createElement('label'),
        self     = this;
    
    label.innerText = label.textContent = 'Послать через privnote: ';
    
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = 'enigma_checkbox';
    
    checkbox.addEventListener('change', function () {
        self.check(this.checked);
    });
    
    label.appendChild(checkbox);
    
    imForm.appendChild(label);
};

/**
 * 
 */
App.prototype.check = function (check) {
    this.checked = check;
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