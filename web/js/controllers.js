'use strict';

/* Controllers */
function MainCtrl($scope, datasets) {
    $scope.data = datasets;
}

function LoginCtrl($scope,$stateParams, $location, $http, $state, authService, datasets, prefix) {
    $scope.append = $stateParams.name + "-appended";
    $scope.data = datasets;
    $scope.username = "test";
    $scope.$on('onlogin', function(out, dataObj) {
        $scope.data = dataObj.data;
        $location.path(dataObj.url.substring(dataObj.url.indexOf('/', 1)));
    });
    $scope.loginUser = function() {
        var params = "_username=" + $scope.username + "&_password=" + $scope.password + "&_target_path=" + $state.current.data.name;
        $http.post(prefix + 'demo/secured/login_check', params).
             success(function(data, status) {
                if (authService.getBufferSize() > 0) {
                    authService.loginConfirmed();
                } else {
                    $scope.data = data;
                }
             }).
             error(function(data, status) {
                $scope.data = data;

            });
    }
}

function RootCtrl($scope,$stateParams, $location, $http, datasets) {
    $scope.append = $stateParams.name + "-appended";
    $scope.data = datasets;
}

function LogoutCtrl($scope, $stateParams, $http, $state, $location, datasets) {
    $scope.data = datasets;
    $location.path('/');
    //$scope.$apply();
    //$state.transitionTo('root');
}

var Resolver = {
    datasets: function($q, $http, $stateParams) {
        var deferred = $q.defer();
        $http.get(this.templateUrl($stateParams)).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
}
