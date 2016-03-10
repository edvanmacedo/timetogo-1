(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .factory('NotificationService', NotificationService);

    function NotificationService($notification) {
        var notificationService = {};

        notificationService.requestPermission = requestPermission;
        notificationService.showNotification = showNotification;

        return notificationService;

        function requestPermission() {
            $notification.requestPermission()
                .then(onResponse);
        }

        function showNotification(title, message) {
            var options = {
                body: message,
                tag: 'TimeToGo',
                focusWindowOnClick: true
            };

            $notification(title, options);
        }

        function onResponse(permission) {
            //permission will be 'default', 'granted' or 'denied'
            console.log('Notification Permission', permission);
        }
    }

    NotificationService.$inject = [
        '$notification'
    ];
})();
