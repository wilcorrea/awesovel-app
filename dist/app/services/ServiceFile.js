/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    .factory('ServiceFile', function () {

        var ServiceFile = {
            /**
             * @type FileSystem Helper
             */
            fs: require('fs'),
            /**
             * @type Path Helper
             */
            path: require('path'),
            /**
             *
             * @param path
             * @returns {boolean}
             */
            exists: function (path) {
                try {
                    ServiceFile.fs.statSync(path);
                } catch (err) {
                    if (err.code == 'ENOENT') {
                        return false;
                    }
                }
                return true;
            },
            /**
             *
             * @param filename
             * @returns {string}
             */
            read: function (filename) {
                var content = '';
                if (ServiceFile.exists(filename)) {
                    content = ServiceFile.fs.readFileSync(filename);
                }
                return content;
            },
            /**
             *
             * @param filename
             * @param content
             * @param callback
             * 
             * @returns {string}
             */
            write: function (filename, content, callback) {
                
                return ServiceFile.fs.writeFile(filename, content, 'utf8', function (err) {
                  try {
                    callback.call(this, err);
                  } catch(e) {
                    
                  }
                });
            },
            /**
             *
             * @param path
             * @returns {*}
             */
            directories: function (path) {

                if (ServiceFile.exists(path)) {

                    return ServiceFile.fs.readdirSync(path).filter(function (file) {
                        return ServiceFile.fs.statSync(ServiceFile.path.join(path, file)).isDirectory();
                    });
                } else {
                    return [];
                }
            },
            /**
             *
             * @param path
             * @returns {*}
             */
            files: function (path) {

                if (ServiceFile.exists(path)) {

                    return ServiceFile.fs.readdirSync(path).filter(function (file) {
                        return ServiceFile.fs.statSync(ServiceFile.path.join(path, file)).isFile();
                    });
                } else {
                    return [];
                }
            }
        };

        return ServiceFile;
    });
