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
  }]);
