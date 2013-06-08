'use strict';


var globalTemplate = '<div compile-html="data"></div>';
// Declare app level module which depends on filters, and services
angular.module('commusoft', ['ui.compat', 'commusoft.filters', 'commusoft.services', 'commusoft.directives', 'http-auth-interceptor']).
  constant('prefix', '/app_dev.php').
  config(
    ['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'prefix', 
        function($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider, $httpProvider, prefix) {

            fos.Router.getInstance().setBaseUrl(prefix);
            $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $locationProvider.html5Mode(true).hashPrefix('!');

            $stateProvider  
                .state('root', {
                    url: '/',
                    template: globalTemplate,
                    templateUrl: function(params) { return Routing.generate('_demo') },
                    controller: MainCtrl,
                    resolve: Resolver,
                })
                .state('demo', {
                    url: Routing.generateAngularRoute('_demo_hello', true),
                    template: globalTemplate,
                    templateUrl: function(params) { return Routing.generate('_demo_hello', params) },
                    controller: RootCtrl,
                    resolve: Resolver
                }) 
                .state('demologin', {
                    url: Routing.generateAngularRoute('_demo_login', false),
                    template: globalTemplate,
                    templateUrl: function(params) { return Routing.generate('_demo_login') },
                    controller: LoginCtrl,
                    resolve: Resolver,
                    data: {
                        name: '_demo'
                    }
                })
                .state('demosecuredhello', {
                    url: Routing.generateAngularRoute('_demo_secured_hello', true),
                    template: globalTemplate,
                    templateUrl: function(params) { return Routing.generate('_demo_secured_hello', params) },
                    controller: LoginCtrl,
                    resolve: Resolver,
                    data: {
                        name: '_demo'
                    }
                })
                .state('demosecuredhelloadmin', {
                    url: Routing.generateAngularRoute('_demo_secured_hello_admin', true),
                    template: globalTemplate,
                    templateUrl: function(params) { return Routing.generate('_demo_secured_hello_admin', params) },
                    controller: LoginCtrl,
                    resolve: Resolver,
                    data: {
                        name: '_demo'
                    }
                })
                .state('logout', {
                    url: Routing.generateAngularRoute('_demo_logout', false),
                    template: globalTemplate,
                    templateUrl: function(params) { return Routing.generate('_demo_logout') },
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
