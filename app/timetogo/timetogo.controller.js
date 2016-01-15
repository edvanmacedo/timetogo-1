(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .controller('TimeToGoController', TimeToGoController);

    function TimeToGoController($scope, $interval) {
        var vm = this;

        /*
         * Private Attributes
         */
        var stylesAvailable = [];
        var timer = undefined;

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

            stylesAvailable = [
                'style-1',
                'style-2'
            ];

            timer = $interval(changeStyle, 800);
        }

        function changeStyle() {
            var i = stylesAvailable.indexOf(vm.style);

            if (i == (stylesAvailable.length - 1)) {
                i = 0;
            } else {
                i++;
            }

            vm.style = stylesAvailable[i];
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
        '$interval'
    ];

})();