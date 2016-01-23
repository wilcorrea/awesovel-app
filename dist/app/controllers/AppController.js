/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    .controller('AppController', function ($scope, $route, $routeParams, $location, $mdDialog, $mdMedia) {

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        $scope.app = {
            "title": 'Awesovel',
            "drawer": 'Open a Project'
        };

        $scope.drawer = {
            width: 300,
            label: '...'
        }
        $scope.loaded = true;

        /**
         *
         * @param title
         */
        $scope.setTitlePage = function(title) {

            window.document.title = $scope.app.title + (title ? ' / ' + title : '');
            $scope.title = $scope.app.title + (title ? ' / ' + title : '');
        };
        /**
         *
         * @param title
         */
        $scope.setTitleDrawer = function(label) {

            $scope.drawer.label = label;
        };

        /**
         *
         */
        $scope.setTitlePage($scope.app.drawer);
        /**
         *
         */
        $scope.setTitleDrawer();

        $scope.menus = [];

        $scope.project = null;

        $scope.close = function () {

            $scope.project = null;
            $scope.setTitleDrawer($scope.app.drawer);
            $scope.setTitlePage();

            $scope.menus = [
                {
                    label: 'Home',
                    href: 'home',
                    icon: 'web'
                }
            ];
        };

        $scope.open = function (id, title) {

            $scope.menus = [];

            $scope.project = id;
            $scope.setTitleDrawer(title);
            $scope.setTitlePage(title);

            $scope.menus = [
                {
                    label: 'Home',
                    href: 'home',
                    icon: 'web'
                }
                ,
                {
                    label: 'Models',
                    href: 'app/project/model/' + id,
                    icon: 'web'
                },
                {
                    label: 'Databases',
                    href: 'app/project/database/' + id,
                    icon: 'web'
                },
                {
                    label: 'Settings',
                    href: 'app/project/manager/' + id,
                    icon: 'web'
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

    });