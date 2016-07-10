angular.module('upFrota').service('UpModalAlertService', UpModalAlertService);

UpModalAlertService.$inject = ['$uibModal']

function UpModalAlertService($uibModal) {

    var self = this;

    self.modalDefaults = {
        backdrop: 'static',
        keyboard: true,
        modalFade: true,
        templateUrl: 'templates/shared/modal-alert/upModalAlertTemplate.html'
    };

    self.modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Confirm',
        bodyText: 'Perform action?',
        showCancel: false,
        type: '',
        icon: 'fa fa-info'
    };

    self.getIcon = function(type) {

        var icon = 'fa fa-info';

        switch (type) {
            case 'success':
                icon = 'fa fa-check';
                break;
            case 'warning':
                icon = 'fa fa-exclamation-triangle';
                break;
            case 'danger':
                icon = 'fa fa-fire';
                break;
        }
        return icon;

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
        self.modalOptions.headerText = 'Alert';
        self.modalOptions.bodyText = 'This happened';

        if (!customModalDefaults) {
            customModalDefaults = {};
        }

        return self.show(customModalDefaults, customModalOptions);
    };

    self.show = function (customModalDefaults, customModalOptions) {
        var tempModalDefaults = {};
        var tempModalOptions = {};

        self.modalOptions.icon = self.getIcon(customModalOptions.type);
        
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