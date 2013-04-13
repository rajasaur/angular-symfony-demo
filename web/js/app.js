'use strict';


var globalTemplate = '<div compile-html="data"></div>';
// Declare app level module which depends on filters, and services
angular.module('commusoft', ['ui.compat', 'commusoft.filters', 'commusoft.services', 'commusoft.directives', 'http-auth-interceptor']).
  constant('prefix', '/app_dev.php/').
  config(
    ['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'prefix', 
        function($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider, $httpProvider, prefix) {

            $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $locationProvider.html5Mode(true).hashPrefix('!');

            $stateProvider  
                .state('root', {
                    url: '/',
                    template: globalTemplate,
                    templateUrl: function(params) { return prefix + 'demo/'},
                    controller: MainCtrl,
                    resolve: Resolver,
                })
                .state('demo', {
                    url: '^/demo/hello/{name}',
                    template: globalTemplate,
                    templateUrl: function(params) { return prefix + 'demo/hello/' + params.name },
                    controller: RootCtrl,
                    resolve: Resolver
                }) 
                .state('demologin', {
                    url: '^/demo/secured/login',
                    template: globalTemplate,
                    templateUrl: function(params) { return prefix + 'demo/secured/login' },
                    controller: LoginCtrl,
                    resolve: Resolver,
                    data: {
                        name: '_demo'
                    }
                })
                .state('demosecuredhello', {
                    url: '^/demo/secured/hello/{name}',
                    template: globalTemplate,
                    templateUrl: function(params) { return prefix + 'demo/secured/hello/' + params.name },
                    controller: LoginCtrl,
                    resolve: Resolver,
                    data: {
                        name: '_demo'
                    }
                })
                .state('demosecuredhelloadmin', {
                    url: '^/demo/secured/hello/admin/{name}',
                    template: globalTemplate,
                    templateUrl: function(params) { return prefix + 'demo/secured/hello/admin/' + params.name },
                    controller: LoginCtrl,
                    resolve: Resolver,
                    data: {
                        name: '_demo'
                    }
                })
                .state('logout', {
                    url: '^/demo/secured/logout',
                    template: globalTemplate,
                    templateUrl: function(params) { return prefix + 'demo/secured/logout' },
                    controller: LogoutCtrl,
                    resolve: Resolver
                })
        }
    ]).
    run(function($rootScope, $state) {
        $rootScope.$on('event:auth-loginRequired', function() {
            $state.transitionTo('demologin');
        });
    });
