/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular


    .controller('MaterialDesignLiteController', function($scope) {

        var vm = this;

        vm.onchange = function (element) {

            var el = angular.element(element)[0];
            var resource = el.attributes['resource'].value;

            switch (resource) {
                case 'folder':
                    var target = el.attributes['target'].value;
                    var path = element.files.length ? element.files[0].path : '';
                    if (path) {
                        $scope.model[target] = path;
                    }

                    $scope.$apply();
                    break;
                case 'file':
                    var target = el.attributes['target'].value;
                    var path = element.files.length ? element.files[0].path : '';
                    if (path) {
                        $scope.model[target] = path;
                    }

                    $scope.$apply();
                    break;
            }
        };

        $scope.vm = vm;
    });