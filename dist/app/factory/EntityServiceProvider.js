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
                        url: 'resources/views/entity/index.html',
                        file: file,
                        path: path,
                        module: module
                    };
                    if (complete) {
                        e = EntityServiceProvider.entity(type, entity);
                    }
                    entities[i] = e;
                });

                return entities;
            },
            /**
             *
             * @param type
             * @param entity
             */
            entity: function (type, entity) {

                var
                    scaffold = [],
                    forms = [],
                    languages = [],
                    operations = [];

                switch (type) {

                    case 'laravel':

                        var filename = ServiceFile.path.join(entity.path, entity.module, 'Scaffold', entity.name, entity.name + '.gen');
                        if (ServiceFile.exists(filename)) {
                            scaffold = EntityServiceProvider.scaffold(type, filename);
                        }

                        forms = EntityServiceProvider.load(entity.path, entity.module, entity.name, 'Scaffold', 'Form');

                        languages = EntityServiceProvider.load(entity.path, entity.module, entity.name, 'Scaffold', 'Language');

                        operations = EntityServiceProvider.load(entity.path, entity.module, entity.name, 'Scaffold', 'Operation');

                        break;
                    case 'ionic':

                        break;
                    case 'phpee':

                        break;
                }

                entity.scaffold = scaffold;

                entity.forms = forms;
                entity.languages = languages;
                entity.operations = operations;

                return entity;
            },
            /**
             *
             * @param type
             * @param filename
             *
             * @return {Object}
             */
            scaffold: function (type, filename) {

                return JSON.parse(ServiceFile.read(filename));
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
