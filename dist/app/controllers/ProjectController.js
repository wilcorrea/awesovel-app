/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    /**
     *
     * @controller ProjsctController
     */
    .controller('ProjectController', ['$scope', 'ServiceStorage', function ($scope, ServiceStorage) {

        $scope.projects = ServiceStorage.read('project');

    }])


    /**
     *
     * @controller ProjectModelController
     */
    .controller('ProjectAppController', ['$scope', '$interval', 'ServiceProvider', 'ServiceFile', 'ProjectServiceProvider'
        , 'ServiceForm', 'EntityServiceProvider', 'ServiceDialog', function ($scope, $interval, ServiceProvider, ServiceFile,
         ProjectServiceProvider, ServiceForm, EntityServiceProvider, ServiceDialog) {


            App.lightsaber = true;

            var walk = function() {
                var width = $('#lpt').width();
                if (width > 315) {
                    width = 0;
                }
                width++
                $('#lpt').width(width + 'px');
            };

            $interval(function () {
                if (App.lightsaber) {
                    walk();
                }
            }, 10);


            var vm = this;

            vm.service = ProjectServiceProvider;

            var project = $scope.project;

            project = project;

            vm.tabs = [];

            vm.sidebar = {
                /**
                 * @var boolean
                 */
                open: true,
                /**
                 * @var string
                 */
                className: 'md-tree-sidebar--close'
            };


            vm.modules = ServiceFile.directories(project.path);

            angular.forEach(vm.modules, function (module, i) {
                vm.modules[i] = {
                    name: module,
                    path: "",
                    entities: ProjectServiceProvider.getEntities(project, module)
                };
            });


            vm.save = function (_entity) {

                var
                    _model = _entity.scaffold,

                    items = {},

                    path = project.path,
                    module = _entity.module,
                    name = _entity.name,
                    type = project.type;

                for (var i in _model.items) {

                    var item = _model.items[i];
                    items[item.id] = item;
                }
                _model.items = items;

                EntityServiceProvider.scaffold.set(path, module, name, type, _model, function (err) {

                    var message = 'Model saved successfully!';
                    if (err) {
                        message = 'Error: '.err.toString();
                    }

                    ServiceDialog.alert('Project', message);
                });
            };


            vm.add = function (module) {

                var entity = {
                    "name": "Entity",
                    "file": "Entity.php",
                    "path": project.path,
                    "module": module.name,
                    "form": {}
                };
                vm.service.open(vm.tabs, project.type, entity, vm.scaffold, 'model')
            };


            $scope.tabs = {
                /**
                 *
                 * @param tabs
                 * @param object
                 * @returns {*|boolean}
                 */
                add: function (tabs, object) {

                    var attr = 'id';

                    if ($scope.tabs.find(tabs, attr, object[attr]) === -1) {

                        object = angular.copy(object);

                        tabs.push(object);
                    }

                    return $scope.tabs.select(tabs, object);
                },
                /**
                 *
                 * @param tabs
                 * @param object
                 * @returns {boolean}
                 */
                remove: function (tabs, object) {

                    tabs.splice(tabs.indexOf(object), 1);

                    return true;
                },
                /**
                 *
                 * @param tabs
                 * @param object
                 * @returns {boolean}
                 */
                select: function (tabs, object) {

                    var attr = 'id';

                    tabs.forEach(function (tab) {

                        tab.selected = false;

                        if (tab[attr] === object[attr]) {
                            tab.selected = true;
                        }
                    });

                    return false;
                },
                /**
                 *
                 * @param tabs
                 * @param attr
                 * @param value
                 *
                 * @returns {number}
                 */
                find: function (tabs, attr, value) {

                    for (var i = 0; i < tabs.length; i++) {
                        if (tabs[i][attr] === value) {
                            return i;
                        }
                    }
                    return -1;
                }
            };

            $scope.copy = function (object) {
                return angular.copy(object);
            };


            vm.__forms = {

                __attribute: ServiceForm.get('project', 'attribute')
            };


            $scope.alert = window.alert;


            $scope.lang = {

                scaffold: {
                    home: 'Atributos',
                    save: 'Salvar',
                    newAttr: 'Novo Atributo',
                    id: 'Atributo',
                    type: 'Tipo',
                    required: 'Obrigatorio',
                    unique: 'Unico',
                    behavior: 'Comportamento'
                }
            };

            $scope.vm = vm;
        }])

    /**
     *
     * @controller ProjectPropertiesController
     */
    .controller('ProjectPropertiesController', ['$scope', 'ServiceProvider', 'ServiceStorage', 'ServiceForm',
        'ServiceDialog', function ($scope, ServiceProvider, ServiceStorage, ServiceForm, ServiceDialog) {

            var vm = this;

            var project = $scope.project,
                mode = 'UPDATE';

            if (!project.id) {

                project.id = App.guid();
                mode = 'CREATE';
            }

            vm.fields = ServiceForm.get('project', 'properties');

            vm.original = angular.copy(vm.fields);

            vm.save = function ($event) {

                ServiceDialog.confirm('Project', 'You really want to save your changes?', function () {

                    switch (mode) {

                        case 'CREATE':

                            ServiceStorage.create('project', project);

                            break;

                        case 'UPDATE':

                            ServiceStorage.update('project', project);

                            break;
                    }

                }, $event);
            };

            $scope.vm = vm;
        }]);