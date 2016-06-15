(function () {
    'use strict';

    angular
        .module('TimeToGo')
        .controller('DateTimeInputDialogController', DateTimeInputDialogController);

    /**
     * DateTimeInputDialog Controller
     */
    function DateTimeInputDialogController($mdDialog, datetime) {
        var vm = this;

        // Public Methods
        vm.onOkButtonPressed = onOkButtonPressed;
        vm.onCancelButtonPressed = onCancelButtonPressed;
        vm.timeRange = { hours: [], minutes: [] };
        vm.time = { hours: 0, minutes: 0 };
        vm.date = new Date();
        vm.dateFormat = "DD/MM/YYYY";

        // Class activation
        activate();

        /*
         * Methods declarations
         */
        function activate() {
            // time ranges
            for (var i = 0; i < 24; i++) {
                vm.timeRange.hours.push(i);
            }

            for (var i = 0; i < 60; i++) {
                vm.timeRange.minutes.push(i);
            }
        }

        function onOkButtonPressed() {
            var response;

            datetime = moment(vm.date);
            datetime.set('hour', vm.time.hours);
            datetime.set('minute', vm.time.minutes);
            datetime.set('seconds', 0);

            response = {
                datetime: datetime
            };

            $mdDialog.hide(response);
        }

        function onCancelButtonPressed() {
            $mdDialog.cancel();
        }
    }

    // Injecting dependencies
    DateTimeInputDialogController.$inject = [
        '$mdDialog',
        'datetime'
    ];

})();
