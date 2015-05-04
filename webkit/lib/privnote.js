'use strict';

/**
 * @link https://github.com/nonrational/privnote-cli
 */
var Privnote = (function () {
    /**
     * Get random string specified length
     * 
     * @param {Number} length
     * @return {String}
     */
    function random_string (length) {
        length = length || 16;
        
        var chars  = 'abcdefghijklmnopqrstuvwxyz0123456789',
            result = '';
        
        for (var i = 0; i < length; i++) {
            var pos = Math.floor(Math.random() * chars.length);
            
            result += chars.charAt(pos);
        }
        
        return result;
    }
    
    /**
     * Encrypt note and get link to note
     * 
     * @param {String} note
     * @param {Function} callback
     */
    function crypt (note, callback) {
        var key = random_string(null),
            enc = GibberishAES.enc(note, key);

        var postData = 'body=' + encodeURIComponent(enc) + '&sender_email=&reference=';

        var headers = {
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/javascript, */*'
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://privnote.com', true);
        
        Object.keys(headers).forEach(function (key) {
            xhr.setRequestHeader(key, headers[key]);
        });
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4 || xhr.status !== 200) return;

            var dummy = document.createElement('div');
            dummy.innerHTML = xhr.response.replace(/\\"/g, '"');

            callback(dummy.getElementsByTagName('input')[0].value + '#' + key);
        };
        
        xhr.send(postData);
    };
    
    return {
        crypt: crypt
    };
})();