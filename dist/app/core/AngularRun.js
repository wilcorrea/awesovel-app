/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

App.angular

    .run(
        function (formlyConfig) {

            /**
             *
             * <input mdl-text-field type="text" placeholder="test" />
             * <br>
             * <textarea name="" mdl-text-field></textarea>
             */
            //formlyConfig.setType({
            //    name: 'input',
            //    template: '<input mdl-upgrade type="text" placeholder="{{to.label}}" ng-model="model[options.key]/>'
            //});

            formlyConfig.setType({
                name: 'input',
                template:
                    '<div mdl-upgrade class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" ng-class="ngClass">' +
                    '<input class="mdl-textfield__input" type="text" ng-readonly="to.readonly" ng-disabled="to.disabled"  ng-model="model[options.key]"/>' +
                    '<label class="mdl-textfield__label">{{to.label ? to.label : to.placeholder}}</label>' +
                    '</div>'
            });

            formlyConfig.setType({
                name: 'checkbox',
                template: '<mdl-checkbox mdl-upgrade label="{{to.label}}" ng-model="model[options.key]"></mdl-checkbox>'
            });

            formlyConfig.setType({
                name: 'switch',
                template: '<mdl--switch mdl-upgrade label="{{to.label}}" ng-model="model[options.key]"></mdl-switch>'
            });

            formlyConfig.setType({
                name: 'radio',
                template: '<mdl-radio mdl-upgrade label="{{to.opt0}}" value="0" ng-model="model[options.key]"></mdl-radio>&nbsp;&nbsp;&nbsp;<mdl-radio label="{{to.opt1}}" value="1" ng-model="model[options.key]"></mdl-radio>'
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