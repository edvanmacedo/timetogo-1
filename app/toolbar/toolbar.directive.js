(function () {

   'use strict';

    /**
     * Module creation and configuration
     */
    angular
        .module('TimeToGo')
        .directive('toolbar', ToolbarDirective);

    /**
     * Module configuration.
     */
    function ToolbarDirective($rootScope, $state) {

        var link = link;

        return {
            restrict: 'A',
            templateUrl: 'app/toolbar/toolbar.template.html',
            link: link
        }

        function link(scope, element, attrs) {
            // Private attributes
            var deregisterStateChangeSuccessEvent;

            // Public methods
            scope.goToState = goToState;

            // class activation
            activate();

            /*
             * Methods declarations
             */
            function activate() {
                scope.isBackButtonEnabled = false;

                registerListeners();
            }

            function goToState(state) {
                $state.go(state);
            }

            function registerListeners() {
                deregisterStateChangeSuccessEvent = $rootScope.$on(
                    '$stateChangeSuccess', onStateChanged
                );
                $rootScope.$on('$destroy', onDestroy);
            }

            function onStateChanged(evt, toState, toParams, fromState,
                    fromParams) {
                switch (toState.name) {
                    case 'timetogo':
                        scope.isBackButtonEnabled = true;
                        scope.backButtonSref = 'home';
                        break;

                    default:
                        scope.isBackButtonEnabled = false;
                }
            }

            function onDestroy() {
                deregisterStateChangeSuccessEvent();
            }
        }
    }

    // Dependency injection
    ToolbarDirective.$inject = ['$rootScope', '$state'];

})();
