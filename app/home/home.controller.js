(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .controller('HomeController', HomeController);

    /**
     * Home Controller
     */
    function HomeController($scope, $interval, $mdDialog, $state) {
        var vm = this;

        // Private Attributes
        var timer = undefined;
        var zeroTime = moment({ hours: 0, minutes: 0, seconds: 0 });

        // Public Attributes
        vm.shortTimeFormat = 'HH:mm';
        vm.longTimeFormat = 'HH:mm:ss';
        vm.workHoursPerDay = moment({ hours: 9, minutes: 13 });
        vm.startTime = moment({ hours: 0, minutes: 0 });
        vm.timeToGetOut = moment({ hours: 0, minutes: 0 });
        vm.remainingTime = moment({ hours: 0, minutes: 0 });

        // Public Methods
        vm.onStartTimeChanged = onStartTimeChanged;
        vm.onStartTimeClicked = onStartTimeClicked;
        vm.onWorkHoursPerDayClicked = onWorkHoursPerDayClicked;

        // Class activation
        activate();

        /*
         * Methods declarations
         */
        function activate() {
            $scope.$on('$destroy', onDestroy);
        }

        function onDestroy() {
            stopCountdown();
        }

        function onWorkHoursPerDayChanged() {
            updateTimeToGo();
            updateRemainingTime();
            startCountdown();
        }

        function onStartTimeChanged() {
            updateTimeToGo();
            updateRemainingTime();
            startCountdown();
        }

        function calculateTimeToGo() {
            vm.timeToGetOut = moment({
                hours: vm.startTime.get('hour'),
                minutes: vm.startTime.get('minute')
            });

            vm.timeToGetOut.add(vm.workHoursPerDay);
        }

        function calculateRemainingTime() {
            var remainingTime = moment({
                hours: vm.timeToGetOut.hours(),
                minutes: vm.timeToGetOut.minutes()
            });
            vm.remainingTime = remainingTime.subtract(moment());
        }

        function startCountdown() {
            stopCountdown();
            timer = $interval(updateRemainingTime, 1000);
        }

        function stopCountdown() {
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
                timer = undefined;
            }
        }

        function countdownEnded() {
            stopCountdown();
            $state.go('timetogo');
        }

        function updateTimeToGo() {
            calculateTimeToGo();
        }

        function updateRemainingTime() {
            calculateRemainingTime();

            var remainingTimeString = vm.remainingTime.format(vm.longTimeFormat);
            var zeroTimeString = zeroTime.format(vm.longTimeFormat);

            if (remainingTimeString === zeroTimeString) {
                countdownEnded();
            }
        }

        function onStartTimeClicked() {
            var dialogOptions = {
                templateUrl: 'app/timeinputdialog/timeinputdialog.template.html',
                controller: 'TimeInputDialogController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                locals: {
                    member: 'startTime'
                }
            };

            $mdDialog.show(dialogOptions)
                .then(onGetTimeInputOk, onGetTimeInputCancel);
        }

        function onWorkHoursPerDayClicked() {
            var dialogOptions = {
                templateUrl: 'app/timeinputdialog/timeinputdialog.template.html',
                controller: 'TimeInputDialogController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                locals: {
                    member: 'workHoursPerDay'
                }
            };

            $mdDialog.show(dialogOptions)
                .then(onGetTimeInputOk, onGetTimeInputCancel);
        }

        function onGetTimeInputOk(response) {
            switch (response.member) {
            case 'workHoursPerDay':
                vm.workHoursPerDay = response.time;
                onWorkHoursPerDayChanged();
                break;

            case 'startTime':
                vm.startTime = response.time;
                onStartTimeChanged();
                break;

            }
        }

        function onGetTimeInputCancel() {
            // Do nothing
        }
    }

    // dependency injection
    HomeController.$inject = [
        '$scope',
        '$interval',
        '$mdDialog',
        '$state'
    ];

})();
