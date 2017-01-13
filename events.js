var extensionId = "gnbajjiemcfbjfcbacpfdipbkobjnage";

var images = [];
chrome.runtime.sendMessage(extensionId, {}, function(response) {
    images = response;
});


using("app/utils/file", function (file) {
    let f = file.getFileInfo;
    file.getFileInfo = function(a, b, c) {
        if (c.sourceUrl && c.sourceUrl.indexOf('chrome-extension') === 0) {
            delete c.sourceUrl;
        }
        return f.call(this, a, b, c);
    };
});


$(document).on('uiMediaEditDialogDone', '#media-edit-dialog', function(e, f) {
    using("app/utils/shared_objects", function(sharedObjects) {
        var file = sharedObjects.get(f.fileId);
        console.log(file.fileHandle, file.altText);
    });
});

$(document).on('dataFoundMediaSearchResults', '.FoundMediaSearch', function(e) {
    var html = '<div class="FoundMediaSearch-itemContainer FoundMediaSearch-focusable FoundMediaSearch-itemContainer--bg5 js-presented FoundMediaSearch-slideIn" style="animation-delay: 0ms;">' +
        '<button type="button" class="FoundMediaSearch-item FoundMediaSearch-item--visible" data-gif-url="{url}" data-thumbnail-url="{url}" data-still-url="{url}" data-provider-name="extension" data-attribution-name="EXTENSION" data-attribution-image="extension" data-details-url="" data-width="{width}" data-height="{height}" data-origin="{&quot;provider&quot;:&quot;ext&quot;,&quot;id&quot;:&quot;1&quot;}" tabindex="-1" style="background-image: url({url})">' +
            '<div class="FlexEmbed u-borderRadiusInherit" style="padding-bottom: {ratio};">' +
                '<div class="FlexEmbed-item u-borderRadiusInherit">' +
                    '<img src="{url}" alt="">' +
                '</div>' +
            '</div>' +
        '</button>' +
    '</div>';
    var val = $(e.currentTarget).find('.FoundMediaSearch-queryInput').val().toLowerCase();
    var added = 0;
    for (i in images) {
        var item = images[i];
        if (val.indexOf(item.text) !== -1) {
            if (added === 0 && $(e.currentTarget).find('.FoundMediaSearch-items .FoundMediaSearch-column').length === 0) {
                $(e.currentTarget).find('.FoundMediaSearch-items').html('<div class="FoundMediaSearch-column"></div><div class="FoundMediaSearch-column"></div>');
            }
            $(e.currentTarget).find('.FoundMediaSearch-items .FoundMediaSearch-column:' + (added++ % 2 == 0 ? 'first': 'last')).prepend(
                html.replace(/{url}/g, item.url)
                    .replace(/{width}/g, item.width)
                    .replace(/{height}/g, item.height)
                    .replace(/{ratio}/g, (100 * item.height / item.width) + '%')
            );
        }
    }
});
