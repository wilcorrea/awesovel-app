/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    .run(
        function (formlyConfig) {

            formlyConfig.setType({
                name: 'input-text',
                templateUrl: 'app/directives/material-design-lite/templates/input-text.html',
                controller: 'MaterialDesignLiteController'
            });

            formlyConfig.setType({
                name: 'input-folder',
                templateUrl: 'app/directives/material-design-lite/templates/input-folder.html',
                controller: 'MaterialDesignLiteController'
            });

            formlyConfig.setType({
                name: 'input-file',
                templateUrl: 'app/directives/material-design-lite/templates/input-file.html',
                controller: 'MaterialDesignLiteController'
            });

            formlyConfig.setType({
                name: 'select',
                templateUrl: 'app/directives/material-design-lite/templates/select.html',
                controller: 'MaterialDesignLiteController'
            });

            formlyConfig.setType({
                name: 'textarea',
                templateUrl: 'app/directives/material-design-lite/templates/textarea.html',
                controller: 'MaterialDesignLiteController'
            });

            var unique = 1;
            formlyConfig.setType({
                name: 'repeat',
                templateUrl: 'app/directives/material-design-lite/templates/repeat.html',
                controller: ['$scope', 'ServiceDialog',function($scope, ServiceDialog) {

                    $scope.formOptions = {formState: $scope.formState};
                    $scope.addRow = addRow;
                    $scope.removeRow = removeRow;

                    $scope.copyFields = copyFields;


                    function copyFields(fields) {
                        fields = angular.copy(fields);
                        addRandomIds(fields);
                        return fields;
                    }

                    function removeRow(row, index, $event) {

                        ServiceDialog.confirm('Project', 'Do you want remove this item?', function () {

                            row.splice(index, 1);

                        }, $event);

                    }

                    function addRow() {

                        $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];

                        var repeatsection = $scope.model[$scope.options.key];
                        var lastSection = repeatsection[repeatsection.length - 1];
                        var newsection = {};
                        if (lastSection) {
                            newsection = angular.copy(lastSection);
                        }
                        for (var i in newsection) {
                            newsection[i] = '';
                        }
                        repeatsection.push(newsection);
                    }

                    function addRandomIds(fields) {
                        unique++;
                        angular.forEach(fields, function(field, index) {
                            if (field.fieldGroup) {
                                addRandomIds(field.fieldGroup);
                                return; // fieldGroups don't need an ID
                            }

                            if (field.templateOptions && field.templateOptions.fields) {
                                addRandomIds(field.templateOptions.fields);
                            }

                            field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
                        });
                    }

                    function getRandomInt(min, max) {
                        return Math.floor(Math.random() * (max - min)) + min;
                    }
                }]
            });




            formlyConfig.setType({
                name: 'checkbox',
                template: '<mdl-checkbox mdl-upgrade id="{{options.key}}" label="{{to.label}}" ng-model="model[options.key]"></mdl-checkbox>'
            });

            formlyConfig.setType({
                name: 'switch',
                template: '<mdl--switch mdl-upgrade id="{{options.key}}" label="{{to.label}}" ng-model="model[options.key]"></mdl-switch>'
            });

            formlyConfig.setType({
                name: 'radio',
                template: '<mdl-radio mdl-upgrade label="{{to.opt0}}" value="0" ng-model="model[options.key]">' +
                '</mdl-radio>&nbsp;&nbsp;&nbsp;<mdl-radio label="{{to.opt1}}" value="1" ng-model="model[options.key]">' +
                '</mdl-radio>'
            });

            formlyConfig.setWrapper({
                name: 'mdLabel',
                types: [],
                template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
            });

            formlyConfig.setWrapper({
                name: 'mdBreak',
                types: ['checkbox', 'switch', 'radio'],
                template: '<formly-transclude></formly-transclude><br/><br/>'
            });

        }
    )

    .run(function ($rootScope, $timeout) {
        $rootScope.$on('$viewContentLoaded', function () {
            $timeout(function () {
                componentHandler.upgradeDom();
            })
        })
    });