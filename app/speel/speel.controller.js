app.controller('speelController', function ($scope, $routeParams, toernooienService, scorelijstenService) {
    $scope.toernooi = toernooienService.getToernooi(Number($routeParams.toernooiId));
    $scope.selectedSpel = $scope.toernooi.spellen[0];
    
    $scope.updateScorelijst = function (scorelijst) {
        scorelijstenService.updateScorelijst(scorelijst);
    };
});
