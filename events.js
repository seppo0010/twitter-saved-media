var extensionId = "lcijpemfldidhhnckoejhbaogdcjjjmp";

var imageStorage = {
    db: null,
    defaultImages: [],

    setDefaultImages: function(images) {
        this.defaultImages = images;
    },

    getAll: function(callback) {
        this.getAllFromDb(function(items) {
            callback(items.concat(this.defaultImages));
        }.bind(this));
    },

    search: function(term, callback) {
        this.searchDb(term, function(r) {
            callback(this.defaultImages.filter(function(i) {
                return term.indexOf(i.text) !== -1;
            }).concat(r));
        }.bind(this));
    },

    prepareItem: function(item) {
        item.url = URL.createObjectURL(item.blob);
        return item;
    },

    getAllFromDb: function(callback) {
        this.getDb(function(db) {
            var transaction = db.transaction(['twitter-saved-media'], 'readonly');
            var request = transaction.objectStore("twitter-saved-media").getAll();
            request.onsuccess = function(event) {
                callback(event.target.result.map(this.prepareItem.bind(this)));
            }.bind(this);
        }.bind(this));
    },

    searchDb: function(term, callback) {
        if (term === '#myimages') {
            this.getAllFromDb(callback);
            return;
        };
        if (term[0] !== '#') {
            callback([]);
            return;
        }
        this.getDb(function(db) {
            var transaction = db.transaction(['twitter-saved-media'], 'readonly');
            var request = transaction.objectStore("twitter-saved-media").index('term').getAll(IDBKeyRange.only(term));
            request.onsuccess = function(event) {
                callback(event.target.result.map(this.prepareItem.bind(this)));
            }.bind(this);
        }.bind(this));
    },

    getDb: function(callback) {
        // it is possible to have two instances of the requestdb, but unlikely... good enough
        if (this.db) {
            callback(this.db);
        } else {
            var requestdb = indexedDB.open("twitter-saved-media", '3');
            requestdb.onerror = function (event) {
                console.error("Error creating/accessing IndexedDB database");
            };
            requestdb.onsuccess = function (event) {
                this.db = event.target.result;
                callback(this.db);
            }.bind(this);

            requestdb.onupgradeneeded = function (event) {
                var db = event.target.result;
                var objectStore = db.createObjectStore("twitter-saved-media", {keyPath: 'id', autoIncrement: true});
                objectStore.createIndex('term', 'term', { unique: false })
            };
        }
    },

    saveImage: function(blob, term, width, height) {
        this.getDb(function(db) {
            var transaction = db.transaction(['twitter-saved-media'], 'readwrite');
            var put = transaction.objectStore("twitter-saved-media").put({
                term: term,
                blob: blob,
                width: width,
                height: height,
            });
        });
    }
};

chrome.runtime.sendMessage(extensionId, {}, function(response) {
    imageStorage.setDefaultImages(response);
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
        file.altText.split(' ').forEach(function(t) {
            if (t[0] === '#') {
                imageStorage.saveImage(file.fileHandle, t, file.thumbnail.width, file.thumbnail.height);
            }
        });
    });
});

$(document).on('dataFoundMediaSearchResults dataFoundMediaCategoryItems', '.FoundMediaSearch', function(e) {
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
    imageStorage.search(val, function(items) {
        items.forEach(function(item) {
            if (added === 0 && $(e.currentTarget).find('.FoundMediaSearch-items .FoundMediaSearch-column').length === 0) {
                $(e.currentTarget).find('.FoundMediaSearch-items').html('<div class="FoundMediaSearch-column"></div><div class="FoundMediaSearch-column"></div>');
            }
            $(e.currentTarget).find('.FoundMediaSearch-items .FoundMediaSearch-column:' + (added++ % 2 == 0 ? 'first': 'last')).prepend(
                html.replace(/{url}/g, item.url)
                    .replace(/{width}/g, item.width)
                    .replace(/{height}/g, item.height)
                    .replace(/{ratio}/g, (100 * item.height / item.width) + '%')
            );
        });
    });
});

$(document).on('dataFoundMediaCategories', '.FoundMediaSearch', function(e) {
    var html = '<div class="FoundMediaSearch-categoryContainer FoundMediaSearch-focusable FoundMediaSearch-itemContainer--bg6 js-presented FoundMediaSearch-slideIn">' +
    '<button type="button" class="FoundMediaSearch-category" data-name="#myimages" data-display-name="#myimages" tabindex="-1">' +
    '<div class="FlexEmbed u-borderRadiusInherit" style="padding-bottom: 50%">' +
    '<div class="FlexEmbed-item u-borderRadiusInherit">' +
    '<div class="FoundMediaSearch-categoryName">My Images</div>' +
    '</div>' +
    '</div>' +
    '</button>' +
    '</div>'
    $(e.currentTarget).find('.FoundMediaSearch-items').prepend(html);
});
