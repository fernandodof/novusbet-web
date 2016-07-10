angular.module('upFrota').controller('ModalTest', modalTestCtrl);

modalTestCtrl.$inject = ['upModalAlertService'];

function modalTestCtrl(upModalAlertService) {

	var self = this;

	self.showConfirmModal = function(type) {
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Yes',
			headerText: 'Confirm',
			bodyText: 'Are you sure of it ?',
			type: type
		};

		upModalAlertService.confirm(modalOptions).then(function (result) {
			console.log('Yes');
		});	
	};

	self.showAlertModal = function(type){

		upModalAlertService.alert({type: type}).then(function (result) {
			console.log('Yes');
		});	
	};

}