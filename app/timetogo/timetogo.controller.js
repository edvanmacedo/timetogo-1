(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .controller('TimeToGoController', TimeToGoController);

    function TimeToGoController($scope, $interval, NotificationService) {
        var vm = this;

        /*
         * Private Attributes
         */
        var stylesAvailable = [];
        var timer = undefined;
        var titles = ['TIME TO GO', 'time to go'];

        /*
         * Public Attributes
         */
        vm.style = {};

        // Activate the class
        activate();

        /*
         * Methods declarations
         */
        function activate() {
            $scope.$on('$destroy', onDestroy);

            showNotification();

            stylesAvailable = [
                'style-1',
                'style-2'
            ];

            timer = $interval(changeStyle, 800);
        }

        function showNotification() {
            var title = "It's Time to Go!";
            var message = "Your time is up.";

            NotificationService.showNotification(title, message);
        }

        function changeStyle() {
            var i = stylesAvailable.indexOf(vm.style);

            if (i == (stylesAvailable.length - 1)) {
                i = 0;
            } else {
                i++;
            }

            vm.style = stylesAvailable[i];

            if (i % 2 == 0) {
                document.querySelector('title').innerHTML = titles[0];
            } else {
                document.querySelector('title').innerHTML = titles[1];
            }
        }

        function onDestroy() {
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
                timer = undefined;
            }
        }
    }

    TimeToGoController.$inject = [
        '$scope',
        '$interval',
        'NotificationService'
    ];

})();
