(function () {

    'use strict';

    angular
        .module('TimeToGo')
        .factory('TimesheetService', TimesheetService);

    /**
     * Timesheet Service
     */
    function TimesheetService() {

        // Service Object
        var timesheetService = {};

        // Public Attributes

        // Public Methods
        timesheetService.getTimesInRange = getTimesInRange;
        timesheetService.getTimesInMonth = getTimesInMonth;
        timesheetService.saveTime = saveTime;

        return timesheetService;

        // Private Attributes
        var timeData = [
            {
                fulldate: 20160601,
                year: 2016,
                month: 6,
                day: 1,
                times: {
                    slot1: '08:00',
                    slot2: '12:00',
                    slot3: '13:00',
                    slot4: '17:00'
                }
            },
            {
                fulldate: 20160602,
                year: 2016,
                month: 6,
                day: 2,
                times: {
                    slot1: '08:00',
                    slot2: '12:00',
                    slot3: '13:00',
                    slot4: '17:00'
                }
            },
            {
                fulldate: 20160603,
                year: 2016,
                month: 6,
                day: 3,
                times: {
                    slot1: '08:00',
                    slot2: '12:00',
                    slot4: '17:00'
                }
            }
        ];

        // Class activation
        activate();

        /*
         * Methods declarations
         */
        function activate() {
            //TODO: check localstorage and display message if not available.
        }

        // datetime is a moment.js object
        function saveTime(datetime) {
            // Get storage for the month of the new time
            var storageData = localStorage.getItem(
                datetime.format("YYYYMM")
            );

            // if there is storage data
            if (storageData) {
                storageData = JSON.parse(storageData);

                // Get storage for the day of the new time
                var dayData = storageData[datetime.format("DD")];

                // if there is data
                if (dayData) {
                    // check for an empty slot to store the new time
                    if (!dayData.hasOwnProperty('slot1')) {
                        dayData.slot1 = datetime.format("HH:mm");
                    } else if (!dayData.hasOwnProperty('slot2')) {
                        dayData.slot2 = datetime.format("HH:mm");
                    } else if (!dayData.hasOwnProperty('slot3')) {
                        dayData.slot3 = datetime.format("HH:mm");
                    } else if (!dayData.hasOwnProperty('slot4')) {
                        dayData.slot4 = datetime.format("HH:mm");
                    } else {
                        // if there is no empty slot available
                    }

                    // sort dayData
                    dayData = sortTimes(dayData);
                } else {
                    // if there is no storagedata for the day
                    dayData = {
                        slot1: datetime.format("HH:mm")
                    };
                }

                storageData[datetime.format("DD")] = dayData;
                storageData = JSON.stringify(storageData);
            } else {
                // if there is no storagedata for the month, create one
                var dayData = {
                    slot1: datetime.format("HH:mm")
                };

                storageData = {};
                storageData[datetime.format("DD")] = dayData;
                storageData = JSON.stringify(storageData);
            }

            // store information
            localStorage.setItem(
                datetime.format("YYYYMM"),
                storageData
            );
        }

        function formatResponse(storageData) {
            var response = [];
            var yearMonthKey;
            var dayKey;
            var dayData;

            for (yearMonthKey in storageData) {
                for (dayKey in storageData[yearMonthKey]) {
                    dayData = {
                        fulldate: yearMonthKey + dayKey,
                        year: yearMonthKey.substr(0, 4),
                        month: yearMonthKey.substr(4, 6),
                        day: dayKey,
                        times: storageData[yearMonthKey][dayKey]
                    }

                    response.push(dayData);
                }
            }

            return response;
        }

        // dates are moment.js objects
        function getTimesInRange(startDate, endDate) {
            if (!startDate || !endDate || endDate.isBefore(startDate, 'month')) {
                return null;
            }

            var monthData;
            var timesData = {};
            var startMonth = startDate.format("YYYYMM");
            var endMonth = endDate.format("YYYYMM");

            var newDate = moment(startDate);
            do {
                startMonth = newDate.format("YYYYMM");
                monthData = localStorage.getItem(startMonth);
                if (monthData) {
                    timesData[startMonth] = JSON.parse(monthData);
                }
                newDate.add(1, 'month');
            } while (newDate.isBefore(endDate, 'month'));

            return formatResponse(timesData);
        }

        function getTimesInMonth(date) {
            if (!date) {
                return null;
            }

            var timesData = {};
            var month = date.format("YYYYMM");
            var monthData = localStorage.getItem(month);
            if (monthData) {
                timesData[month] = JSON.parse(monthData);
            }

            return formatResponse(timesData);
        }

        function sortTimes(timeData) {
            var timesList = [];

            if (timeData.slot1) {
                timesList.push(timeData.slot1);
            }

            if (timeData.slot2) {
                timesList.push(timeData.slot2);
            }

            if (timeData.slot3) {
                timesList.push(timeData.slot3);
            }

            if (timeData.slot4) {
                timesList.push(timeData.slot4);
            }

            timesList.sort();
            for (var i = 0; i < timesList.length; i++) {
                timeData['slot' + (i + 1)] = timesList[i];
            }

            return timeData;
        }
    }

    // dependency injection
    TimesheetService.$inject = [
    ];

})();
