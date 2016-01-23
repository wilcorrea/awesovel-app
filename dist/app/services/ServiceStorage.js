/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    .factory('ServiceStorage', function () {

        var ServiceStorage = {
            /**
             * @type FileSystem
             */
            fs: require('fs'),
            /**
             * @string path
             */
            _root: __dirname.replace('atom.asar/renderer/lib', '') + 'app/storage',
            /**
             *
             * @param entity
             * @private
             */
            _all: function (entity) {
                return JSON.parse(
                    ServiceStorage._get(entity)
                );
            },
            /**
             *
             * @param entity
             * @returns {*}
             * @private
             */
            _get: function(entity) {
                return ServiceStorage.fs.readFileSync(ServiceStorage._root + '/' + entity + '.json');
            },
            /**
             *
             * @param records
             * @returns {*}
             * @private
             */
            _set: function(entity, records) {
                return ServiceStorage.fs.writeFileSync(ServiceStorage._root + '/' + entity + '.json', JSON.stringify(records));
            },
            /**
             *
             * @param entity
             * @param id
             * @returns {*}
             */
            read: function (entity, id) {
                var
                    records = ServiceStorage._all(entity),
                    record = records;

                if (id) {

                    angular.forEach(records, function (_entity) {
                        if (_entity.id === id) {
                            record = _entity;
                        }
                    });
                }

                return record;
            },
            /**
             *
             * @param entity
             * @param record
             */
            create: function (entity, record) {

                var
                    records = ServiceStorage._all(entity);

                var r = angular.copy(record);
                delete r._onchange;
                records.push(r);

                return ServiceStorage._set(entity, records);
            },
            /**
             *
             * @param entity
             * @param record
             */
            update: function (entity, record) {

                var
                    _records = ServiceStorage._all(entity),

                    records = _records.filter(function(_record) {
                        return _record.id !== record.id
                    });

                if (_records.length !== records.length) {

                    var r = angular.copy(record);
                    delete r._onchange;
                    records.push(r);
                }

                return ServiceStorage._set(entity, records);
            },
            /**
             *
             * @param entity
             * @param record
             */
            delete: function (entity, record) {

            }
        };

        return ServiceStorage;
    });
