angular.module('upFrota').service('UfModalAlertService', UfModalAlertService);

UfModalAlertService.$inject = ['$uibModal']

function UfModalAlertService($uibModal) {

    var self = this;

    self.modalDefaults = {
        backdrop: 'static',
        keyboard: true,
        modalFade: true,
        templateUrl: 'templates/shared/modal-alert/UfModalAlertTemplate.html'
    };

    self.modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Confirm',
        bodyText: 'Perform action?',
        showCancel: false,
        type: ''
    };

    self.confirm = function (customModalOptions, customModalDefaults) {
        self.modalOptions.showCancel = true; 
        if (!customModalDefaults) {
            customModalDefaults = {};
        }

        return self.show(customModalDefaults, customModalOptions);
    };

    self.alert = function (customModalOptions, customModalDefaults) {
        self.modalOptions.showCancel = false;
        if (!customModalDefaults) {
            customModalDefaults = {};
        }

        return self.show(customModalDefaults, customModalOptions);
    };

    self.show = function (customModalDefaults, customModalOptions) {
        var tempModalDefaults = {};
        var tempModalOptions = {};

        angular.extend(tempModalDefaults, self.modalDefaults, customModalDefaults);
        angular.extend(tempModalOptions, self.modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = modalCtrl;

            modalCtrl.$inject = ['$scope', '$uibModalInstance'];
            function modalCtrl($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;

                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };

                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }

        return $uibModal.open(tempModalDefaults).result;
    };
}