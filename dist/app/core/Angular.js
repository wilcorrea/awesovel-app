/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

'use strict';

App.angular = angular.module('app', ['ngRoute', 'ngAnimate', 'ngMaterial', 'formly', 'mdl'/*, 'formlyMaterial'*//*, 'formlyBootstrap'*/]);


App.angular

    .controller('AppController', function ($scope, $route, $routeParams, $location, $mdDialog, $mdMedia) {

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.title = 'Awesovel';
        $scope.loaded = true;

        window.document.title = $scope.title;

        $scope.menus = [];

        $scope.project = null;

        $scope.close = function () {

            $scope.project = null;

            $scope.menus = [
                {
                    label: 'Home',
                    href: 'index.html'
                }
            ];
        };

        $scope.open = function (project) {

            $scope.menus = [];

            $scope.project = project;

            $scope.menus = [
                {
                    label: 'Home',
                    href: 'index.html'
                }
                ,
                {
                    label: 'Models',
                    href: 'app/project/model/' + project
                },
                {
                    label: 'Databases',
                    href: 'app/project/database/' + project
                },
                {
                    label: 'Settings',
                    href: 'app/project/settings/' + project
                }
            ];
        };

        $scope.close();


        $scope.dialog = {

            /**
             *
             * @param title
             * @param message
             * @param success
             * @param cancel
             */
            confirm: function(title, message, success, cancel) {

                var confirm = $mdDialog.confirm()
                    .title(title)
                    .textContent(message)
                    //.ariaLabel('Lucky day')
                    //.targetEvent(ev)
                    .ok('Confirm')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function() {

                    if (angular.isFunction(success)) {
                        success.call();
                    }

                }, function() {
                    if (angular.isFunction(cancel)) {
                        cancel.call();
                    }
                });
            }
        }

    })


    .controller('DrawerController', function ($scope) {

        $scope.drawer = {
            width: 300,
            label: 'Menu'
        }
    })


    .config(['$routeProvider', '$locationProvider',

        function ($routeProvider, $locationProvider) {

            $routeProvider

            // Home
                .when('/index.html', {
                    templateUrl: 'resources/views/home.html',
                    controller: function () {

                    }
                })

                // Catch All
                .when('/:route*', {
                    template: function (params) {

                        var
                            route = params.route.split('/'),
                            service = route[0],
                            controller = '',
                            template = '';

                        switch (service) {

                            case 'app':

                                controller = App.camelize(route[1]) + App.camelize(route[2]) + 'Controller';

                                template =
                                    '<div ng-controller="' + controller + '">' +
                                    '<ng-include src="template" onload="onload()"></ng-include>' +
                                    '</div>'

                                break;
                        }

                        return template;
                    },
                    controller: 'TemplateCtrl'
                })

            $locationProvider.html5Mode(true);
        }
    ])


    .controller("TemplateCtrl", ['$scope', '$routeParams', 'ServiceProvider', function ($scope, $routeParams, ServiceProvider) {

        var
            route = $routeParams.route.split('/'),
            service = route[0],
            controller = route[1] ? route[1] : '',
            layout = route[2] ? route[2] : '',
            id = route[3] ? route[3] : '',
            template = '';

        switch (service) {

            case 'app':

                template = 'resources/views/' + controller + '/' + layout + '.html';

                if (id && App[controller]) {

                    ServiceProvider.data[controller] = App[controller].find(id);
                }
                break;
        }

        $scope.template = template;
        $scope.params = $routeParams;
    }])