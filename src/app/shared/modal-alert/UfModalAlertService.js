angular.module('upFrota').service('UfModalAlertService', UfModalAlertService);

UfModalAlertService.$inject = ['$uibModal']

function UfModalAlertService($uibModal) {

    var self = this;

    var modalDefaults = {
        backdrop: 'static',
        keyboard: true,
        modalFade: true,
        templateUrl: 'templates/shared/modal-alert/UfModalAlertTemplate.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Confirm',
        bodyText: 'Perform action?',
    };

    self.showModal = function (customModalOptions, customModalDefaults) {
        if (!customModalDefaults) {
            customModalDefaults = {};
        }

        return this.show(customModalDefaults, customModalOptions);
    };

    self.show = function (customModalDefaults, customModalOptions) {
        var tempModalDefaults = {};
        var tempModalOptions = {};

        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

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