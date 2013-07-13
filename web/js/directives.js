'use strict';

/* Directives */


angular.module('commusoft.directives', []).
  directive('compileHtml', ['$compile', function($compile) {
    return {
        restrict: 'A',
        replace: true,

        link: function (scope, element, attrs) {
            scope.$watch(attrs.compileHtml, function(value)  {
                element.html ($compile(value)(scope));
            });
        }
    };
  }]).
  directive('angularSubmit', ['$window', 'prefix', function($window, prefix) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.actionVal = prefix + element.attr('action');
            element.removeAttr('action');
            element.on('submit', function() { scope.$apply(scope.formSubmit(element)); return false;});
        }
    };
  }]);
