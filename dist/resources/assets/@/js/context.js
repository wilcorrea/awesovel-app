window.addEventListener('load', function () {

    var remote = require('remote');
    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');

    var menu = new Menu()
        , _items = [
        {
            label: 'Reload', click: function (_item) {
            remote.getCurrentWindow().reload();
        }
        }
        , {
            label: 'Forced Reload', click: function (_item) {
                remote.getCurrentWindow().reloadIgnoringCache();
            }
        }
        , {
            label: 'Open Tools', click: function (_item) {
                remote.getCurrentWindow().openDevTools();
            }
        }
        , '-'
        , {
            label: 'Back', click: function (_item) {
                remote.getCurrentWindow().goBack();
            }
        }
        , {
            label: 'Forward', click: function (_item) {
                remote.getCurrentWindow().goForward();
            }
        }
    ];

    _items.forEach(function (__item) {

        if (__item === '-') {

            menu.append(new MenuItem({type: 'separator'}));
        } else {

            var menuItem = new MenuItem({
                    label: __item.label, click: __item.click
                }
            );

            menu.append(menuItem);
        }
    });


    window.addEventListener('contextmenu', function (e) {

        e.preventDefault();

        menu.popup(remote.getCurrentWindow());
    });

});