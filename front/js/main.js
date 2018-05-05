var App = angular.module('App', ['ngRoute', 'ui.mask']);

App.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider.when('/', {
    controller: 'UsuarioController',
    templateUrl: 'index.html'
  })
  .when('/users', {
    controller: 'UsuarioController',
    templateUrl: 'index.html'
  })
  .when('/users', {
    controller: 'UsuarioController',
    templateUrl: 'index.html'
  })
  .when('/users/:id', {
    controller: 'UsuarioController',
    templateUrl: 'index.html'
  })
  .when('/users/:id', {
    controller: 'UsuarioController',
    templateUrl: 'index.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
