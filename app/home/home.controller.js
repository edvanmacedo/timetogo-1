(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .controller('HomeController', HomeController);

    /**
     * Home Controller
     */
    function HomeController() {
        var vm = this;

        vm.message = 'Hello World';
    }
})();
