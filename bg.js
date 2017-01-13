chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    sendResponse([
        {
            text: 'boludo',
            url: chrome.extension.getURL('images/sosboludoynoteneshuevos.jpg'),
            width: 600,
            height: 370,
        },
        {
            text: 'honesto',
            url: chrome.extension.getURL('images/conseguiteunempleohonesto.jpg'),
            width: 479,
            height: 384,
        },
        {
            text: 'ortiva',
            url: chrome.extension.getURL('images/nacenasiconelcorazonortiva.jpg'),
            width: 480,
            height: 480,
        },
    ]);
});
