/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular


    .controller('ProjectController', ['$scope', '$location', 'ServiceProvider', 'ServiceStorage', function ($scope, $location, ServiceProvider, ServiceStorage) {

        $scope.projects = ServiceStorage.read('project');

        $scope.projectController = {
            new: function ($event) {

                var $continue = function () {
                    $location.path('app/project/manager');
                };

                if ($scope.project) {

                    $scope.dialog.confirm('Project', 'To do it we needd close the current project. Can we continue?', function () {

                        $scope.close();
                        $continue();

                    }, $event);
                } else {

                    $continue();
                }
            }
        }
    }])


    .controller('ProjectModelController', ['$scope', 'ServiceProvider', 'ServiceFile', 'ProjectServiceProvider', function ($scope, ServiceProvider, ServiceFile, ProjectServiceProvider) {

        var project = ServiceProvider.get('project');

        $scope.onload = function () {

            $scope.open(project.id, project.name);

            componentHandler.upgradeDom();
        };

        var vm = this;

        vm.project = angular.copy(project);
        vm.project.service = ProjectServiceProvider;
        vm.project.type = project.type.value ? project.type.value : project.type;

        vm.modules = ServiceFile.directories(project.path);

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
        }

        // "table":"categories"
        // ,"primaryKey":"id"
        // ,"alias":{"list":"index"},
        // "items":[{"id":"id","type":"int","behavior":"pk"},{"id":"name","type":"string","behavior":""}]
        vm.scaffold = {
            fields: [
                {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "table",
                            type: 'input-text',
                            className: 'formly-column col-sm-6',
                            templateOptions: {
                                label: 'Table'
                            }
                        }, {
                            key: "primaryKey",
                            type: 'input-text',
                            className: 'formly-column col-sm-6',
                            templateOptions: {
                                label: 'Primary Key'
                            }
                        }
                    ]
                }, {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "items",
                            type: 'repeat',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Fields',
                                noRecords: '<i class="material-icons">not_interested</i>',
                                fields: [
                                    {
                                        key: "id",
                                        type: 'input-text',
                                        className: 'col-sm-3',
                                        templateOptions: {
                                            label: 'Id'
                                        }
                                    },{
                                        key: "type",
                                        type: 'input-text',
                                        className: 'col-sm-3',
                                        templateOptions: {
                                            label: 'Type'
                                        }
                                    },{
                                        key: "behavior",
                                        type: 'input-text',
                                        className: 'col-sm-2',
                                        templateOptions: {
                                            label: 'Behavior'
                                        }
                                    },{
                                        key: "required",
                                        type: 'checkbox',
                                        className: 'col-sm-2',
                                        templateOptions: {
                                            label: 'Required'
                                        }
                                    },{
                                        key: "dao",
                                        type: 'input-text',
                                        className: 'col-sm-2',
                                        templateOptions: {
                                            label: 'Database'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }, {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "alias",
                            type: 'repeat',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Aliases',
                                noRecords: '<i class="material-icons">not_interested</i>',
                                fields: [
                                    {
                                        key: "id",
                                        type: 'input-text',
                                        className: 'formly-column col-sm-6',
                                        templateOptions: {
                                            label: 'Alias'
                                        }
                                    },{
                                        key: "operation",
                                        type: 'input-text',
                                        className: 'formly-column col-sm-6',
                                        templateOptions: {
                                            label: 'Operation'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]};

        //pt-BR {"label":"Categoria","items":{"id":{"label":"Código","title":"","options":[]},"name":{"label":"Nome"}}}

        vm.language = {
            fields: [
                {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "label",
                            type: 'input-text',
                            className: 'formly-column col-sm-12',
                            templateOptions: {
                                label: 'Label'
                            }
                        }
                    ]
                }, {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "items",
                            type: 'repeat',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Fields',
                                fields: [
                                    {
                                        key: "id",
                                        type: 'input-text',
                                        className: 'col-sm-4',
                                        templateOptions: {
                                            label: 'Id'
                                        }
                                    },{
                                        key: "label",
                                        type: 'input-text',
                                        className: 'col-sm-4',
                                        templateOptions: {
                                            label: 'Type'
                                        }
                                    },{
                                        key: "title",
                                        type: 'input-text',
                                        className: 'col-sm-4',
                                        templateOptions: {
                                            label: 'Title'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        };

        angular.forEach(vm.modules, function (module, i) {
            vm.modules[i] = {
                name: module,
                path: "",
                entities: vm.project.service.entities(vm.project, module)
            };
        });

        $scope.vm = vm;
    }])


        .controller('ProjectDatabaseController', ['$scope', 'ServiceProvider', function ($scope, ServiceProvider) {

            $scope.onload = function () {
                componentHandler.upgradeDom();
            };
        }])


        .controller('ProjectManagerController', ['$scope', 'ServiceProvider', 'ServiceStorage', function ($scope, ServiceProvider, ServiceStorage) {

            $scope.onload = function () {
                window.setTimeout(function () {
                    componentHandler.upgradeDom();
                }, 100);
            };

            var project = ServiceProvider.get('project');
            var vm = this;

            var mode = 'UPDATE';


            if (project) {

                $scope.open(project.id, project.name);

            } else {

                project = {
                    id: App.guid(),
                    file: ''
                };
                mode = 'CREATE';
            }


            vm.project = project;

            vm.options = {
                formState: {
                    foo: 'bar'
                }
            }

            vm.fields = [
                {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "id",
                            type: 'input-text',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Id',
                                disabled: true
                            }
                        }, {
                            key: "name",
                            type: 'input-text',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Name'
                            }
                        }
                    ]
                }, {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "type",
                            type: 'select',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Type',
                                items: [
                                    {
                                        "label": 'phpee', "value": 'phpee'
                                    }, {
                                        "label": 'php/laravel', "value": 'laravel',
                                    }, {
                                        "label": 'ionic', "value": 'ionic'
                                    }
                                ]
                            }
                        }, {
                            key: "path",
                            type: 'input-folder',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Path'
                            }
                        }
                    ]
                }, {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            key: "description",
                            type: 'textarea',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Description'
                            }
                        }
                    ]
                },
                {
                    key: 'expensive',
                    type: 'input-file',
                    templateOptions: {
                        label: 'Is it expensive?'
                    }
                }
            ];

            vm.original = angular.copy(vm.fields);

            vm.save = function ($event) {

                $scope.dialog.confirm('Project', 'You really want to save your changes?', function () {

                    switch (mode) {

                        case 'CREATE':

                            ServiceStorage.create('project', vm.project)

                            break;

                        case 'UPDATE':

                            ServiceStorage.update('project', vm.project)

                            break;
                    }

                    $scope.open(vm.project.id, vm.project.name);

                }, $event);
            };


            $scope.vm = vm;
        }]);