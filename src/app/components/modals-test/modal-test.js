angular.module('upFrota').controller('ModalTest', modalTestCtrl);

modalTestCtrl.$inject = ['UpModalAlertService'];

function modalTestCtrl(UpModalAlertService) {

	var self = this;

	self.showConfirmModal = function(type) {
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Yes',
			headerText: 'Confirm',
			bodyText: 'Are you sure of it ?',
			type: type
		};

		UpModalAlertService.confirm(modalOptions).then(function (result) {
			console.log('Yes');
		});	
	};

	self.showAlertModal = function(type){

		UpModalAlertService.alert({type: type}).then(function (result) {
			console.log('Yes');
		});	
	};

}