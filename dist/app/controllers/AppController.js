/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    .controller('AppController', ['$scope', '$timeout', 'ServiceDialog', function ($scope, $timeout, ServiceDialog) {

        $scope.drawer = {
            width: 300
        };
        $scope.loaded = true;


        $scope.menus = [];

        $scope.project = null;

        $scope.app = {
            /**
             *
             */
            close: function () {

                $scope.project = null;

                $scope.menus = [
                    {
                        label: 'Home',
                        template: 'resources/views/home.html',
                        icon: 'web',
                        active: true
                    }
                ];
            },
            /**
             *
             * @param project
             * @param first
             */
            open: function (project, first) {

                var __open = function (project) {

                    $scope.project = project;

                    var menus = [
                        {
                            label: 'Home',
                            template: 'resources/views/home.html',
                            icon: 'web',
                            active: false
                        },
                        {
                            label: 'App',
                            template: 'resources/views/project/app.html',
                            icon: 'web',
                            active: !first
                        },
                        {
                            label: 'Web',
                            template: 'resources/views/project/web.html',
                            icon: 'web',
                            active: false
                        },
                        {
                            label: 'Projeto',
                            template: 'resources/views/project/properties.html',
                            icon: 'web',
                            active: first
                        }
                    ];

                    $scope.menus = [];

                    $timeout(function () {
                        menus.forEach(function (menu) {
                            $scope.menus.push(menu);
                        });
                    }, 400);
                };


                if ($scope.project === null) {

                    __open(project);

                } else if ($scope.project.id !== project.id) {

                    if ($scope.project) {
                        ServiceDialog.confirm('Project', 'There is a Project open! Do you want close it?', function () {

                            __open(project);
                        });
                    }
                } else {
                    $scope.menus.forEach(function (menu, i) {
                        $scope.menus[i].active = false;
                        if (menu.label === 'Models') {
                            $scope.menus[i].active = true;
                        }
                    });
                }
            },
            /**
             *
             * @param $event
             */
            new: function($event) {

                var $continue = function () {
                    $scope.app.open({
                        name: 'New Project'
                    }, true);
                };

                if ($scope.project) {

                    ServiceDialog.confirm('Project', 'To do it we needd close the current project. Can we continue?', function () {

                        $scope.app.close();
                        $continue();

                    }, $event);
                } else {

                    $continue();
                }
            },
            /**
             *
             * @param menu
             */
            activate: function (menu) {

                $scope.menus.forEach(function (_menu, i) {
                    _menu.active = false;
                    if (menu === _menu) {
                        _menu.active = true;
                    }
                    $scope.menus[i] = _menu;
                });
            }
        };

        $scope.app.close();
    }]);