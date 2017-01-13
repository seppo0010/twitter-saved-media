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
            width: 600,
            height: 380,
        },
        {
            text: 'cancha',
            url: chrome.extension.getURL('images/andaalacanchabobo.jpg'),
            width: 480,
            height: 360,
        },
        {
            text: 'decorado',
            url: chrome.extension.getURL('images/eldecoradosecalla.jpg'),
            width: 599,
            height: 337,
        },
        {
            text: 'tapado',
            url: chrome.extension.getURL('images/forttapado.jpg'),
            width: 453,
            height: 350,
        },
        {
            text: 'hacker',
            url: chrome.extension.getURL('images/hacker.jpg'),
            width: 480,
            height: 360,
        },
        {
            text: 'fracasado',
            url: chrome.extension.getURL('images/jorgesosunfracasado.jpg'),
            width: 600,
            height: 450,
        },
        {
            text: 'poor',
            url: chrome.extension.getURL('images/stopbeingpoor.jpg'),
            width: 423,
            height: 566,
        },
        {
            text: 'empanadas',
            url: chrome.extension.getURL('images/tresempanadas.jpg'),
            width: 180,
            height: 180,
        },
    ]);
});
