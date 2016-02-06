/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular


    .factory('EntityServiceProvider', ['ServiceProvider', 'ServiceStorage', 'ServiceFile', function (ServiceProvider, ServiceStorage, ServiceFile) {

        var EntityServiceProvider = {
            /**
             *
             * @param type
             * @param path
             * @param module
             * @param complete
             *
             * @returns array
             */
            parse: function (type, path, module, complete) {

                var folder = '';

                switch (type) {

                    case 'laravel':
                        folder = 'Model';
                        break;
                    case 'ionic':
                        folder = 'model';
                        break;
                    case 'phpee':
                        folder = 'model';
                        break;
                }


                var model = ServiceFile.path.join(path, module, folder),
                    entities = ServiceFile.files(model);

                angular.forEach(entities, function (file, i) {

                    var e = {
                        name: file.split('.')[0],
                        file: file,
                        path: path,
                        module: module
                    };
                    e.form = {};
                    if (complete) {
                        e = EntityServiceProvider.entity(type, entity);
                    }
                    entities[i] = e;
                });

                return entities;
            },
            /**
             * 
             * @var Scaffold
             */
            scaffold: {
              /**
               *
               * @param path
               * @param module
               * @param name
               * @param type
               *
               * @return {Object}
               */
              get: function (path, module, name, type) {

                var _get = {};

                switch (type) {

                    case 'laravel':

                        var filename = ServiceFile.path.join(path, module, 'Scaffold', name, name + '.gen');
                        if (ServiceFile.exists(filename)) {
                            _get = JSON.parse(ServiceFile.read(filename));
                        }

                        break;
                    case 'ionic':

                        break;
                    case 'phpee':

                        break;
                }

                return _get;
              },
              /**
               *
               * @param path
               * @param module
               * @param name
               * @param type
               * @param scaffold
               * @param callback
               *
               * @return {Object}
               */
              set: function (path, module, name, type, scaffold, callback) {

                var _set = false;

                switch (type) {

                    case 'laravel':

                        var 
                            filename = ServiceFile.path.join(path, module, 'Scaffold', name, name + '.gen')
                            , content = JSON.stringify(scaffold, function(key, value) {
                              if (key === "$$hashKey") {
                                  return undefined;
                              }
                              return value;
                            });

                        _set = ServiceFile.write(filename, content, callback);

                        break;
                    case 'ionic':

                        break;
                    case 'phpee':

                        break;
                }

                return _set;
              }
            },
            /**
             *
             * @var Scaffold
             */
            language: {
                /**
                 *
                 * @param path
                 * @param module
                 * @param name
                 * @param type
                 *
                 * @return {Object}
                 */
                get: function (path, module, name, type) {

                    var _get = {};

                    switch (type) {

                        case 'laravel':

                            var filename = ServiceFile.path.join(path, module, 'Scaffold', name, 'Language', 'pt-BR.lng');
                            if (ServiceFile.exists(filename)) {
                                _get = JSON.parse(ServiceFile.read(filename));
                            }

                            break;
                        case 'ionic':

                            break;
                        case 'phpee':

                            break;
                    }

                    return _get;
                },
                /**
                 *
                 * @param path
                 * @param module
                 * @param name
                 * @param type
                 * @param scaffold
                 * @param callback
                 *
                 * @return {Object}
                 */
                set: function (path, module, name, type, scaffold, callback) {

                    var _set = false;

                    switch (type) {

                        case 'laravel':

                            var
                                filename = ServiceFile.path.join(path, module, 'Scaffold', name, name + '.gen')
                                , content = JSON.stringify(scaffold, function(key, value) {
                                    if (key === "$$hashKey") {
                                        return undefined;
                                    }
                                    return value;
                                });

                            _set = ServiceFile.write(filename, content, callback);

                            break;
                        case 'ionic':

                            break;
                        case 'phpee':

                            break;
                    }

                    return _set;
                }
            },
            /**
             *
             * @param path
             * @param module
             * @param entity
             * @param container
             * @param resource
             * @returns {Array}
             */
            load: function (path, module, entity, container, resource) {

                var
                    root = ServiceFile.path.join(path, module, container, entity, resource),
                    files = ServiceFile.files(root),
                    load = [];

                if (files) {
                    files.forEach(function (file) {

                        load.push(JSON.parse(ServiceFile.read(ServiceFile.path.join(root, file))));
                    });
                }

                return load;
            }
        };

        return EntityServiceProvider;
    }]);
