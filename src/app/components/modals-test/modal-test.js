angular.module('upFrota').controller('ModalTest', modalTestCtrl);

modalTestCtrl.$inject = ['UfModalAlertService'];

function modalTestCtrl(UfModalAlertService) {

	var self = this;

	var modalOptions = {
		closeButtonText: 'Cancel',
		actionButtonText: 'Yes',
		headerText: 'Confirm',
		bodyText: 'Are you sure of it ?'
	};

	self.showConfirmModal1 = function(){
		UfModalAlertService.showModal(modalOptions).then(function (result) {
			console.log('Yes');
		});		
	}

}