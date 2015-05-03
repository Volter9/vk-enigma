if (window.IM) {
    var _send = IM.send;
    
    /**
     * Rewrite IM.send
     */
    IM.send = function () {
        console.log('Hell, buddy!');
        
        var text = ge('im_texts').querySelector('.im_editable');
        
        console.log(text, text.innerText || text.textContent);
    };
    
    /**
     * Грязный хак №1
     * 
     * Inject own version of IM.send
     */
    var timer = setInterval(
        function () { 
            try {
                Emoji.opts['0'].onSend = IM.send;
        
                clearInterval(timer);
            }
            catch (e) {}
        }, 
        500
    );
    
    var send = ge('im_send');
    
    removeEvent(send, 'click', _send);
    
    send.onclick = null;
    send.addEventListener('click', IM.send);
}