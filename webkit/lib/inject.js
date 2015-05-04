'use strict';

if (window.IM) {
    var _send = IM.send;
    
    /**
     * Rewrite IM.send
     */
    IM.send = function () {
        var text = ge('im_texts').querySelector('.im_editable');
        
        document.dispatchEvent(new CustomEvent('enigma.recieve', {
            detail: { 
                message: text.innerText || text.textContent,
                peer: cur.peer
            }
        }));
    };
    
    document.addEventListener('enigma.send', function () {
        _send.apply(IM, arguments);
    });
    
    var spammed = [];
    
    /**
     * Spam VK Emoji's options objects
     */
    function spamEmoji () { 
        try {
            Emoji.opts['0'].onSend = IM.send;
            
            clearInterval(timer);
        }
        catch (e) {
            console.log('abcdef');
        }
    }
    
    /**
     * Грязный хак №1
     * 
     * Inject own version of IM.send to Emoji handler
     */
    var timer = setInterval(spamEmoji, 1000);
    
    spamEmoji();
    
    /**
     * Грязный хак №2
     * 
     * Reassign onclick on send button on new injected version of IM.send
     */
    var send = ge('im_send');
    
    removeEvent(send, 'click', _send);
    
    send.onclick = null;
    send.addEventListener('click', IM.send);
}