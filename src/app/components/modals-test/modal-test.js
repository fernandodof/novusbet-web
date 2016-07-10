angular.module('upFrota').controller('ModalTest', modalTestCtrl);

modalTestCtrl.$inject = ['UfModalAlertService'];

function modalTestCtrl(UfModalAlertService) {

	var self = this;

	self.showConfirmModal = function(type) {
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Yes',
			headerText: 'Confirm',
			bodyText: 'Are you sure of it ?',
			type: type
		};
		console.log(modalOptions);

		UfModalAlertService.confirm(modalOptions).then(function (result) {
			console.log('Yes');
		});	
	};

	self.showAlertModal = function(type){
		
		console.log(type);

		UfModalAlertService.alert({type: type}).then(function (result) {
			console.log('Yes');
		});	
	};

}