(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .controller('TimesheetController', TimesheetController);

    /**
     * Timesheet Controller
     */
    function TimesheetController($mdDialog, TimesheetService) {
        var vm = this;

        // Private Attributes

        // Public Attributes
        vm.timeData = [];

        // Public Methods
        vm.addTime = addTime;

        // Class activation
        activate();

        /*
         * Methods declarations
         */
        function activate() {
            vm.timeData = TimesheetService.getTimesInMonth(moment());
        }

        function addTime() {
            var dialogOptions = {
                templateUrl: 'app/datetimeinputdialog/datetimeinputdialog.template.html',
                controller: 'DateTimeInputDialogController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                locals: {
                    datetime: moment()
                }
            };

            $mdDialog.show(dialogOptions)
                .then(onGetDateTimeInputOk, onGetDateTimeInputCancel);
        }

        function onGetDateTimeInputOk(response) {
            saveTime(response.datetime);
        }

        function onGetDateTimeInputCancel(response) {
        }

        function saveTime(datetime) {
            TimesheetService.saveTime(datetime);
            vm.timeData = TimesheetService.getTimesInMonth(moment());
        }
    }

    // dependency injection
    TimesheetController.$inject = [
        '$mdDialog',
        'TimesheetService'
    ];

})();
