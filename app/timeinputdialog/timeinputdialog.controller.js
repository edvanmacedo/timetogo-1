(function () {
    'use strict';

    angular
        .module('TimeToGo')
        .controller('TimeInputDialogController', TimeInputDialogController);

    /**
     * TimeInputDialog Controller
     */
    function TimeInputDialogController($mdDialog, member) {
        var vm = this;

        // Public Methods
        vm.onOkButtonPressed = onOkButtonPressed;
        vm.onCancelButtonPressed = onCancelButtonPressed;
        vm.timeRange = { hours: [], minutes: [] };
        vm.time = { hours: 0, minutes: 0, moment: moment({ hours: 0, minutes: 0 }) };


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

            vm.time.moment = moment({
                hours: vm.time.hours,
                minutes: vm.time.minutes
            });

            response = {
                time: vm.time.moment,
                member: member
            };

            $mdDialog.hide(response);
        }

        function onCancelButtonPressed() {
            $mdDialog.cancel();
        }
    }

    // Injecting dependencies
    TimeInputDialogController.$inject = [
        '$mdDialog',
        'member'
    ];

})();
