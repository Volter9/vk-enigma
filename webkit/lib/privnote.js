'use strict';

var Privnote = (function () {
    // Based on https://github.com/nonrational/privnote-cli

    function random_string(C) {
        if (C === null) {
            C = 16;
        }
        var B = "abcdefghijklmnopqrstuvwxyz0123456789";
        var D = "";
        var pos;
        for (var A = 0; A < C; A++) {
            pos = Math.floor(Math.random() * B.length);
            D += B.charAt(pos);
        }
        return D;
    }

    function cipher(A, B) {
        return GibberishAES.enc(B, A);
    }

    function crypt(note, cb) {
        var key = random_string(null),
            enc = cipher(key, note);

        var postData = 'body=' + encodeURIComponent(enc) + '&sender_email=&reference=';

        var headers = {
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json, text/javascript, */*"
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

            cb(dummy.getElementsByTagName('input')[0].value + '#' + key);
        }
        xhr.send(postData);
    };

    return {
        crypt: crypt
    };
})()
