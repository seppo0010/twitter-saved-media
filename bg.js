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
        {
            text: 'pelotudo',
            url: chrome.extension.getURL('images/ahilotenesalpelotudo.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'cancha',
            url: chrome.extension.getURL('images/andaalacanchabobo.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'decorado',
            url: chrome.extension.getURL('images/eldecoradosecalla.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'tapado',
            url: chrome.extension.getURL('images/forttapado.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'hacker',
            url: chrome.extension.getURL('images/hacker.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'fracasado',
            url: chrome.extension.getURL('images/jorgesosunfracasado.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'poor',
            url: chrome.extension.getURL('images/stopbeingpoor.jpg'),
            width: 480,
            height: 480,
        },
        {
            text: 'empanadas',
            url: chrome.extension.getURL('images/tresempanadas.jpg'),
            width: 480,
            height: 480,
        },
    ]);
});
