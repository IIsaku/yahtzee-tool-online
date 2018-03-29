app.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
    .when('/spelers', {
        templateUrl: '/app/spelers/spelers-view.html',
        controller: 'spelersController'
    })
    .when('/toernooien', {
        templateUrl: '/app/toernooien/toernooien-view.html',
        controller: 'toernooienController'
    })
    .when('/speel/:toernooiId', {
        templateUrl: '/app/speel/speel-view.html',
        controller: 'speelController'
    })
    .when('/', {
        templateUrl: '/app/home/home.html'
    })
    .otherwise({
        redirectTo: '/'
    })
});
