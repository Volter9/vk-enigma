'use strict';

var App = {
    /**
     * Init the app
     */
    init: function () {
        var self = this;
        
        this.isInited = true;
        this.checked = false;
        
        this.onSend = function (event) {
            if (!self.checked) {
                document.dispatchEvent(new CustomEvent('enigma.send'));
                
                return;
            }
        
            var editable = document.getElementById('im_editable' + event.detail.peer);
            editable.classList.add('enigma_input_busy');
            
            self.sendButton.disabled = true;
        
            Privnote.crypt(event.detail.message, function (link) {
                editable.classList.remove('enigma_input_busy');
                editable.innerHTML = 'Ссылка на просмотр сообщения: ' + link;
                
                self.sendButton.disabled = false;
            
                document.dispatchEvent(new CustomEvent('enigma.send'));
            });
        };
    },
    
    /**
     * Check if app is initiated
     * 
     * @return {Boolean}
     */
    isInit: function () {
        return Boolean(this.isInited);
    },
    
    /**
     * Build UI for vk messages
     */
    buildUI: function () {
        if (document.getElementById('enigma_checkbox')) {
            return;
        }
    
        document.addEventListener('enigma.recieve', this.onSend);
    
        this.sendButton = document.getElementById('im_send');
        this.createCheckBox();
    },
    
    /**
     * Initialize check box for sending the text over privnote
     */
    createCheckBox: function () {
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
    },
    
    /**
     * Check
     * 
     * @param {Boolean} check
     */
    check: function (check) {
        this.checked = check;
    },
    
    /**
     * Injects custom script into the head
     * 
     * @link http://stackoverflow.com/questions/9515704/
     *       building-a-chrome-extension-inject-code-in-a-page-using-a-content-script/
     * @param {String} path
     */
    injectScript: function (path) {
        var script = document.createElement('script');
    
        script.src = chrome.extension.getURL(path);
        script.onload = function() {
            this.parentNode.removeChild(this);
        };
    
        (document.head || document.documentElement).appendChild(script);
    }
};