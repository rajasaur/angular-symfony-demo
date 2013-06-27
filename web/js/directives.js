'use strict';

/* Directives */


angular.module('commusoft.directives', []).
  directive('compileHtml', ['$compile', function($compile) {
    return {
        restrict: 'A',
        scope: { compileHtml : '=' },
        replace: true,
    
        link: function (scope, element, attrs) {
            scope.$watch('compileHtml', function(value)  {
                element.html ($compile(value)(scope.$parent));
            });
        }
    };
  }]).
  directive('angularSubmit', ['$window', 'prefix', function($window, prefix) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.actionVal = prefix + '/' + element[0].action;
            element.removeAttr('action');
            element.on('submit', function() { scope.formSubmit(element); return false;});
        }
    };
  }]);
