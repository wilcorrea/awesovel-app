/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular


    .factory('ProjectServiceProvider', ['ServiceProvider', 'ServiceStorage', 'ServiceFile', 'EntityServiceProvider', function (ServiceProvider, ServiceStorage, ServiceFile, EntityServiceProvider) {

        var ProjectServiceProvider = {
            /**
             * @array
             */
            tabs: [],
            /**
             *
             * @private
             */
            _apply: function () {

                window.setTimeout(function () {

                    angular.element(document.getElementById('tabs-model')).removeAttr('data-upgraded');

                    componentHandler.upgradeDom();
                }, 100);
            },
            /**
             *
             * @param tab
             */
            select: function (tabs, tab) {

                angular.forEach(tabs, function (_tab, i) {

                    _tab.last = false;

                    if (_tab.selected) {
                        _tab.last = true;
                    }
                    _tab.selected = false;

                    tabs[i] = _tab;
                });

                tab.selected = true;
            },
            /**
             *
             * @param tabs
             * @param type
             * @param entity
             */
            open: function (tabs, type, entity) {

                var _entity = null;

                angular.forEach(tabs, function (_tab, i) {

                    if (_tab.entity.module === entity.module && _tab.entity.name === entity.name) {
                        _entity = _tab.entity;
                    }
                });

                if (!_entity) {

                    _entity = entity;


                    _entity.scaffold = EntityServiceProvider.scaffold.get(_entity.path, _entity.module, _entity.name, type);

                    var
                        items = [];

                    for (var i in _entity.scaffold.items) {

                        var item = angular.copy(_entity.scaffold.items[i]);

                        items.push(item);
                    }

                    _entity.language = EntityServiceProvider.language.get(_entity.path, _entity.module, _entity.name, type);


                    _entity.scaffold.items = items;
                }

                var tab = {
                    "entity": _entity,
                    "selected": true
                };
                ProjectServiceProvider.select(tabs, tab);

                tabs.push(tab);

                ProjectServiceProvider._apply();
            },
            /**
             *
             * @param tab
             */
            close: function (tabs, tab) {

                var last = null;

                tabs.splice(tabs.indexOf(tab), 1);

                angular.forEach(tabs, function (_tab, i) {

                    if (_tab.last && !_tab.selected) {
                        last = _tab;
                    }
                });

                if (!last && tabs.length) {
                    last = tabs[0];
                }

                if (last) {

                    ProjectServiceProvider.select(tabs, last);
                }

                ProjectServiceProvider._apply();
            },
            /**
             *
             * @param project
             * @param module
             * @returns {Array}
             */
            getEntities: function (project, module) {

                return EntityServiceProvider.parse(project.type, project.path, module);
            },
            /**
             *
             * @param project
             * @param entity
             * @returns {Boolean}
             */
            setEntity: function (project, entity) {

                console.log(entity);
                //return EntityServiceProvider.parse(project.type, project.path, module);
            }
        };

        return ProjectServiceProvider;
    }]);
