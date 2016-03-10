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
                .then(onPermissionRequested);
        }

        function showNotification(title, message) {
            var options = {
                body: message,
                tag: 'TimeToGo',
                focusWindowOnClick: true
            };

            $notification(title, options);
        }

        function onPermissionRequested(permission) {
            //permission will be 'default', 'granted' or 'denied'
            if (permission == 'denied') {
                localStorage.setItem('notification_enabled', false);
            } else if (permission == 'granted') {
                var title;
                var message;

                if (!localStorage.getItem('notification_enabled')) {
                    title = 'Notifications Enabled';
                    message = 'Now you will be notified with notifications like this one.';

                    showNotification(title, message);
                    localStorage.setItem('notification_enabled', true);
                }
            }
        }
    }

    NotificationService.$inject = [
        '$notification'
    ];
})();
