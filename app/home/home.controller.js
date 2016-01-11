(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .controller('HomeController', HomeController);

    /**
     * Home Controller
     */
    function HomeController($scope, $interval) {
        var vm = this;

        // Private Attributes
        var timer = undefined;
        var zeroTime = moment({ hours: 0, minutes: 0, seconds: 0 });

        // Public Attributes
        vm.isTimeToGo = false;
        vm.shortTimeFormat = 'HH:mm';
        vm.longTimeFormat = 'HH:mm:ss';
        vm.workHoursPerDay = moment({ hours: 9, minutes: 13 });
        vm.timeRange = { hours: [], minutes: [] };
        vm.startTime = { hours: 0, minutes: 0, moment: moment({ hours: 0, minutes: 0 }) };
        vm.timeToGetOut = moment({ hours: 0, minutes: 0 });
        vm.remainingTime = moment({ hours: 0, minutes: 0 });

        // Public Methods
        vm.onStartTimeChange = onStartTimeChange;

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

            calculateTimeToGo();

            $scope.$on('$destroy', onDestroy);
        }

        function onDestroy() {
            stopCountdown();
        }

        function onStartTimeChange() {
            vm.startTime.moment = moment({
                hours: vm.startTime.hours,
                minutes: vm.startTime.minutes
            });

            calculateTimeToGo();
            calculateRemainingTime();
            startCountdown();
        }

        function calculateTimeToGo() {
            vm.timeToGetOut = vm.startTime.moment.add(vm.workHoursPerDay);
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
            vm.isTimeToGo = true;
        }

        function updateRemainingTime() {
            calculateRemainingTime();

            var remainingTimeString = vm.remainingTime.format(vm.longTimeFormat);
            var zeroTimeString = zeroTime.format(vm.longTimeFormat);

            if (remainingTimeString === zeroTimeString) {
                countdownEnded();
            } else {
                vm.isTimeToGo = false;
            }
        }
    }

    // dependency injection
    HomeController.$inject = [
        '$scope',
        '$interval'
    ];

})();
