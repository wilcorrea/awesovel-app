'use strict';

window.App = {

    camelize: function (str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return /*index == 0 ? letter.toLowerCase() :*/ letter.toUpperCase();
        }).replace(/\s+/g, '');
    }
};

(function (angular) {

    'use strict';

    angular.module('app', ['ngRoute', 'ngAnimate', 'ngMaterial'])


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

                $scope.project = project;

                $scope.menus = [
                    {
                        label: 'Home',
                        href: 'index.html'
                    }
                    ,
                    {
                        label: 'Models',
                        href: 'app/project/models/' + project
                    },
                    {
                        label: 'Databases',
                        href: 'app/project/databases/' + project
                    },
                    {
                        label: 'Settings',
                        href: 'app/project/settings/' + project
                    }
                ];
            };

            $scope.close();


            $scope.dialog = {

                confirm: function(title, message, success) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    var confirm = $mdDialog.confirm()
                        .title(title)
                        .textContent(message)
                        //.ariaLabel('Lucky day')
                        //.targetEvent(ev)
                        .ok('Confirm')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function() {
                        $scope.status = 'You decided to get rid of your debt.';
                        console.log(success);
                    }, function() {
                        $scope.status = 'You decided to keep your debt.';
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


        .controller('ProjectController', function ($scope) {

            $scope.fs = require('fs');

            $scope.projects = JSON.parse(
                $scope.fs.readFileSync(__dirname.replace('atom.asar/renderer/lib', '') + 'app/storage/projects.json', 'utf8')
            );

            $scope.path = function(project) {

                var path,
                    id = project ? project : $scope.project;

                angular.forEach($scope.projects, function(_project) {
                    if (_project === id) {
                        path = _project.path;
                    }
                });

                return path;
            };

            $scope.models = function(project) {

                var path = $scope.path(project);

            };

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
                                controller = route[1];

                            if (route[0] === 'app') {

                                controller = App.camelize(controller) + 'Controller';
                            }

                            return '<div ng-controller="' + controller + '"><ng-include src="template"></ng-include></div>'
                        },
                        controller: 'TemplateCtrl'
                    })

                $locationProvider.html5Mode(true);
            }
        ])


        .controller("TemplateCtrl", function ($scope, $routeParams) {

            var
                route = $routeParams.route.split('/'),
                controller = route[1],
                template = '',
                layout = route[2];

            if (route[0] === 'app') {

                template = 'resources/views/' + controller + '/' + layout + '.html';
            }

            $scope.template = template;
            $scope.params = $routeParams;

            if (controller === 'project') {

                $scope.open(route[3]);
            }

        })

})(window.angular);

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
