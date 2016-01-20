/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular


    .controller('ProjectController', ['$scope', 'ServiceProvider', function ($scope, ServiceProvider) {

        $scope.projects = App.project.all();
    }])

    .controller('ProjectModelController', ['$scope', 'ServiceProvider', function ($scope, ServiceProvider) {


        $scope.onload = function () {
            App.editor.init();
        };
    }])

    .controller('ProjectDatabaseController', ['$scope', 'ServiceProvider', function ($scope, ServiceProvider) {

        $scope.onload = function () {
            componentHandler.upgradeDom();
        };
    }])

    .controller('ProjectSettingsController', ['$scope', 'ServiceProvider', 'formlyVersion', function ($scope, ServiceProvider, formlyVersion) {


        $scope.open(ServiceProvider.data.project.id);

        var vm = this;

        $scope.onload = function () {

            //vm.project = ServiceProvider.data.project;

            // variable assignment
            vm.author = { // optionally fill in your info below :-)
                name: 'Benjamin Orozco',
                url: 'https://twitter.com/benoror'
            };
            vm.exampleTitle = 'angular-material'; // add this
            vm.env = {
                angularVersion: angular.version.full,
                formlyVersion: formlyVersion
            };

            vm.project = ServiceProvider.data.project;

            vm.options = {};

            vm.fields = [
                {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            "key": "id",
                            type: 'input',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Id',
                                disabled: true
                            }
                        }, {
                            "key": "type",
                            type: 'input',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Type'
                            }
                        }
                    ]
                }, {
                    className: 'formly-row col-sm-12',
                    fieldGroup: [
                        {
                            "key": "name",
                            type: 'input',
                            className: 'col-sm-6',
                            templateOptions: {
                                label: 'Name'
                            }
                        }, {
                            "key": "path",
                            type: 'input',
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
                            "key": "description",
                            type: 'input',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Description'
                            }
                        }
                    ]
                }
            ];

            //vm.fields = [
            //    {
            //        key: 'text',
            //        type: 'input',
            //        templateOptions: {
            //            label: 'Name'
            //        }
            //    },
            //    {
            //        key: 'urgent',
            //        type: 'checkbox',
            //        templateOptions: {
            //            label: 'Is it urgent?'
            //        }
            //    },
            //    {
            //        key: 'gender',
            //        type: 'radio',
            //        templateOptions: {
            //            opt0: 'Male',
            //            opt1: 'Female'
            //        }
            //    },
            //    {
            //        key: 'expensive',
            //        type: 'switch',
            //        templateOptions: {
            //            label: 'Is it expensive?'
            //        }
            //    }
            //];

            vm.originalFields = angular.copy(vm.fields);

            componentHandler.upgradeDom();
        };

        vm.save = function ($event) {

            $scope.dialog.confirm('Title', 'Message', function () {
                alert('Yes');
            }, $event);

            console.log('form submitted:', vm.project);
        };

        $scope.vm = vm;

    }]);