app.controller('spelersController', function ($scope, spelersService, toernooienService) {
    $scope.spelers = spelersService.getSpelers();
    $scope.newSpeler = {};

    $scope.naamRegExp = new XRegExp('^[\\p{L} .\'\-]*$');

    $scope.create = function () {
        if ($scope.createSpelerForm.$valid) {
            spelersService.createSpeler($scope.newSpeler);
            $scope.closeCreateSpelerForm();
        }
    };

    $scope.closeCreateSpelerForm = function () {
        $scope.creating = false;
        $scope.resetCreateSpelerForm();
    };

    $scope.resetCreateSpelerForm = function () {
        if ($scope.newSpeler.naam === undefined) {
            $('#create-input-naam')[0].value = '';
        }
        else {
            $scope.newSpeler.naam = undefined;
        }
        $scope.createSpelerForm.$setPristine();
        $scope.createSpelerForm.$setUntouched();
        $scope.createSpelerForm.naam.$setValidity('required', false);
        $scope.createSpelerForm.naam.$setValidity('minlength', false);
        $scope.createSpelerForm.naam.$setValidity('pattern', false);
    };

    $scope.update = function (form, updateSpeler) {
        if (form.$valid) {
            spelersService.updateSpeler(updateSpeler);
            $scope.resetUpdateSpelerForm(form);
            return true;
        }
        return false;
    };

    $scope.resetUpdateSpelerForm = function (form) {
        form.$setPristine();
        form.$setUntouched();
    };

    $scope.delete = function (speler) {
        spelersService.deleteSpeler(speler);
    };

    $scope.isSpelerLinkedToToernooi = function (speler) {
        return toernooienService.isSpelerLinkedToToernooi(speler);
    };
    
    $scope.getToernooienLinkedToSpeler = function (speler) {
        return toernooienService.getToernooienLinkedToSpeler(speler);
    };

    $scope.getTotaleScoreSpeler = function (speler) {
        let totaleScore = 0;
        $scope.getToernooienLinkedToSpeler(speler).forEach(toernooi => {
            toernooi.spellen.forEach(spel => {
                for (let i = 0; i < spel.scorelijsten.length; i++) {
                    if (spel.scorelijsten[i].speler.id === speler.id) {
                        totaleScore = totaleScore + spel.scorelijsten[i].getTotaalGeneraal();
                        return;
                    }
                }
            });
        });
        return totaleScore;
    };
});
