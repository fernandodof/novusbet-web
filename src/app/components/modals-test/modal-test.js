angular.module('upFrota').controller('ModalTest', modalTestCtrl);

modalTestCtrl.$inject = ['UfModalAlertService'];

function modalTestCtrl(UfModalAlertService) {

	var self = this;

	self.modalConfirmOptions = {
		closeButtonText: 'Cancel',
		actionButtonText: 'Yes',
		headerText: 'Confirm',
		bodyText: 'Are you sure of it ?'
	};

	self.modalAlertOptions = {
		bodyText: 'Are you sure of it ?',
		type: 'danger'
	};

	self.showConfirmModal = function(){
		UfModalAlertService.confirm(self.modalConfirmOptions).then(function (result) {
			console.log('Yes');
		});	
	};

	self.showAlertModal = function(){
		UfModalAlertService.alert(self.modalAlertOptions).then(function (result) {
			console.log('Yes');
		});	
	};

}