/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

'use strict';

window.App = {

    /**
     * @type FileSystem
     */
    fs: require('fs'),
    /**
     *
     * @param str
     * @returns {string|XML}
     */
    camelize: function (str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return /*index == 0 ? letter.toLowerCase() :*/ letter.toUpperCase();
        }).replace(/\s+/g, '');
    },
    /**
     *
     * @type EditorVisual
     */
    editor: {
        /**
         *
         */
        init: function() {

            jQuery('ul.gennesis-sortable-line').sortable({
                placeholder: "",
                connectWith: "ul",
                stop: function(event, ui){
                    App.editor.sort();
                    jQuery(this).children().each(function(i) {
                        jQuery(this).find('debug.index').html(i);
                    });
                },
                update : function (event, ui) {
                    var $that = jQuery(this);
                    $that.children().each(function(i) {
                        var $this = jQuery(this);
                        $this.find('debug.index').html(i);
                        $this.find('debug.line').html($that.attr('data-line'));
                    });
                }
            });

            jQuery('ul.gennesis-sortable-line li').resizable({
                containment: 'ul.gennesis-sortable-line',
                maxHeight: 90,
                minHeight: 90,
                handles: 'e',
                stop: function(event, ui) {
                    App.editor.resize(this, false);
                }
            });

            jQuery('ul.gennesis-sortable-line li').click(function() {

                jQuery('ul.gennesis-sortable-line li').removeClass('gennesis-field-selected');
                jQuery(this).addClass('gennesis-field-selected');

            });

            jQuery(document).mouseup(function (e) {

                var container = jQuery('ul.gennesis-sortable-line li');
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    jQuery('ul.gennesis-sortable-line li').removeClass('gennesis-field-selected');
                }
            });

            jQuery('ul.gennesis-sortable-line').disableSelection();


            jQuery('ul.gennesis-sortable-line li').click(function() {

                jQuery('ul.gennesis-sortable-line li').removeClass('gennesis-field-selected');
                jQuery(this).addClass('gennesis-field-selected');

            });

            jQuery(document).mouseup(function (e) {

                var container = jQuery('ul.gennesis-sortable-line li');
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    jQuery('ul.gennesis-sortable-line li').removeClass('gennesis-field-selected');
                }
            });

            window.setTimeout(function() {

                App.editor.resize(null, true);
                App.editor.sort();
            }, 100);
        },
        /**
         *
         * @param element
         * @param column
         */
        resize: function (element, column) {

            if (element) {

                var $element = jQuery(element)
                    , max = jQuery('.gennesis-rule-line').width()
                    , range = max / 12
                    , width = column ? (range * $element.attr('data-column')) : ($element.width())
                    , data = Math.round((width / max) * 12);

                $element.attr('data-column', data);
                width = ((data) * range) - 1;
                $element.find('debug.column').html(data);
                $element.width(width);

            } else {

                jQuery('ul.gennesis-sortable-line li').each(function () {
                    App.editor.resize(this, (column === null) ? true : column);
                });
            }

        },
        /**
         *
         */
        sort: function () {
            jQuery('ul.gennesis-sortable-line').each(function () {
                var $this = jQuery(this)
                    , opacity = '1';
                if (!$this.children().length) {
                    opacity = '0.4';
                }
                $this.css('opacity', opacity);
            });
        }
    },
    /**
     *
     * @type screen
     */
    screen: {
        /**
         *
         * @type full
         */
        full: {
            /**
             * Enter in full screen
             *
             * @param element
             */
            enter: function (element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            },
            /**
             * Exit full screen
             *
             */
            exit: function () {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    },

    /**
     *
     */
    project: {

        all: function () {
            return JSON.parse(
                App.fs.readFileSync(__dirname.replace('atom.asar/renderer/lib', '') + 'app/storage/projects.json', 'utf8')
            );
        },

        find: function (id) {

            var
                projects = App.project.all(),
                project = null;

            angular.forEach(projects, function (_project) {
                if (_project.id === id) {
                    project = _project;
                }
            });

            return project;
        }
    }

};