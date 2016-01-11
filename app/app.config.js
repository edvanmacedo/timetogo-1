(function () {

    'use strict';

    /**
     * Module creation and configuration
     */
    angular
        .module('TimeToGo', ['ui.router'])
        .config(TimeToGoConfig);

    /**
     * Module configuration.
     */
    function TimeToGoConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.template.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });

        $urlRouterProvider
            .otherwise('/home');
    }

    // Injecting dependencies
    TimeToGoConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

})();
