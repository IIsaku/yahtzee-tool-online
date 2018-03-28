app.controller('toernooienController', function ($scope, $location, toernooienService, spelersService) {
    $scope.toernooien = toernooienService.getToernooien();
    $scope.naamRegExp = new XRegExp('^[\\p{L} .!\'\-]*$');
    $scope.updateToernooiFormCounter = 0;

    $scope.navigateSpeelView = function (toernooiId) {
        $location.path('/speel/' + toernooiId);
    };

    $scope.getSelectedToernooiFormSpelers = function (formSpelers) {
        let selectedSpelers = [];
        formSpelers = JSON.parse(JSON.stringify(formSpelers));
        formSpelers.forEach(speler => {
            if (speler.selected) {
                let pushSpeler = JSON.parse(JSON.stringify(speler));
                delete pushSpeler.selected;
                selectedSpelers.push(pushSpeler);
            }
        });
        return selectedSpelers;
    };

    // init createToernooiForm
    $scope.newToernooi = {};
    $scope.createToernooiFormSpelers = JSON.parse(JSON.stringify(spelersService.getSpelers()));
    $scope.createToernooiFormSpelers.forEach(speler => {
        speler.selected = false;
    });
    $scope.createToernooiFormSpelersInputRequired = true;
    $scope.createToernooiFormSpelersInputTouched = false;

    //init createToernooiForm watches
    $scope.createToernooiFormSpelers.forEach(speler => {
        $scope.$watch('createToernooiForm.speler' + speler.id + '.$touched', function (newValue) {
            if (newValue) {
                $scope.createToernooiFormSpelersInputTouched = true;
            }          
        });
    });

    $scope.create = function () {
        if ($scope.createToernooiForm.$valid) {
            $scope.newToernooi.spelers = $scope.getSelectedToernooiFormSpelers($scope.createToernooiFormSpelers);
            toernooienService.createToernooi($scope.newToernooi);
            $scope.closeCreateToernooiForm();
        }
    };

    $scope.closeCreateToernooiForm = function () {
        $scope.creating = false;
        $scope.resetCreateToernooiForm();
    };

    $scope.resetCreateToernooiForm = function () {
        if ($scope.newToernooi.naam == undefined) {
            $('#create-input-naam')[0].value = '';
        }
        else {
            $scope.newToernooi.naam = undefined;
        }
        if ($scope.newToernooi.rondes == undefined) {
            $('#create-input-rondes')[0].value = '';
        }
        else {
            $scope.newToernooi.rondes = undefined;
        }
        $scope.createToernooiFormSpelers.forEach(speler => {
            speler.selected = false;
        });
        $scope.createToernooiFormSpelersInputRequired = true;
        $scope.createToernooiFormSpelersInputTouched = false;
        $scope.createToernooiForm.$setPristine();
        $scope.createToernooiForm.$setUntouched();
        $scope.createToernooiForm.naam.$setValidity('required', false);
        $scope.createToernooiForm.naam.$setValidity('minlength', false);
        $scope.createToernooiForm.naam.$setValidity('pattern', false);
        $scope.createToernooiForm.rondes.$setValidity('required', false);
        $scope.createToernooiForm.rondes.$setValidity('min', false);
    };

    $scope.setCreateToernooiFormSpelersInputRequired = function () {
        $scope.createToernooiFormSpelersInputRequired = $scope.getToernooiFormSpelersInputRequired($scope.createToernooiFormSpelers);
    };

    $scope.getToernooiFormSpelersInputRequired = function (formSpelers) {
        for (let i = 0; i < formSpelers.length; i++) {
            if (formSpelers[i].selected) {
                return false;
            }
        }
        return true;
    };

    $scope.getUpdateToernooiFormSpelers = function (spelers) {
        let spelerIds = [];
        spelers.forEach(speler => {
            spelerIds.push(speler.id);
        });
        let updateToernooiFormSpelers = JSON.parse(JSON.stringify(spelersService.getSpelers()));
        updateToernooiFormSpelers.forEach(speler => {
            if (spelerIds.includes(speler.id)) {
                speler.selected = true;
            }
            else {
                speler.selected = false;
            }
        });
        return updateToernooiFormSpelers;
    };

    $scope.setUpdateInputRequired = function (updateToernooiFormSpelersValidation, updateToernooiFormSpelers) {
        updateToernooiFormSpelersValidation.InputRequired = $scope.getToernooiFormSpelersInputRequired(updateToernooiFormSpelers);
    };

    $scope.setUpdateInputTouchedWatches = function (updateToernooiForm, updateToernooiFormSpelers, updateToernooiFormSpelersValidation) {
        let formCounter = $scope.updateToernooiFormCounter;
        $scope.updateToernooiFormCounter++;
        $scope['updateToernooiForm' + formCounter] = updateToernooiForm;
        updateToernooiFormSpelers.forEach(speler => {
            $scope.$watch('updateToernooiForm' + formCounter + '.speler' + speler.id + '.$touched', function (newValue) {
                if (newValue) {
                    updateToernooiFormSpelersValidation.InputTouched = true;
                }          
            });
        });
    };

    $scope.update = function (form, updateToernooiFormSpelersValidation, updateToernooiFormSpelers, updateToernooi) {
        if (form.$valid) {
            updateToernooi.spellen = JSON.parse(JSON.stringify(updateToernooi.spellen));
            updateToernooi.spelers = $scope.getSelectedToernooiFormSpelers(updateToernooiFormSpelers);
            toernooienService.updateToernooi(updateToernooi);
            $scope.resetUpdateToernooiForm(form, updateToernooiFormSpelersValidation);
            return true;
        }
        return false;
    };

    $scope.resetUpdateToernooiForm = function (form, updateToernooiFormSpelersValidation) {
        updateToernooiFormSpelersValidation.InputTouched = false;
        form.$setPristine();
        form.$setUntouched();
    };

    $scope.delete = function (toernooi) {
        toernooienService.deleteToernooi(toernooi);
    };
});
