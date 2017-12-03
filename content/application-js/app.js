var mainApp = angular.module('app', [] ); 

mainApp.controller('mainAppController', function ($scope) {
    $scope.name = 'kunal';
    $scope.date = new Date();//'January 1, 2017 12:00:00'
    $scope.date.setMinutes($scope.date.getMinutes() + 1);
});

mainApp.directive('deCountdown', function ($interval, Util) {
    return {
        restrict: 'EA',
        template: '<span ng-if="countdown.days">{{countdown.days + "D"}}</span> &nbsp;' +
                    '<span ng-if="countdown.hours">{{countdown.hours + "H"}}</span>&nbsp;' +
                    '<span ng-if="countdown.minutes">{{countdown.minutes + "M"}}</span>&nbsp;' +
                    '<span ng-if="countdown.seconds >= 0">{{countdown.seconds + "S"}}</span>',
        link: function (scope, elem, attrs) { },
        controller: function ($scope) {
            future = new Date($scope.date);
            var currentTime = new Date();
            if (future > new Date()) {
                $interval(function () {
                    var diff;
                    diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                    $scope.countdown = Util.dhms(diff);
                }, 1000);
            }            
        }
    };
})

mainApp.factory('Util', [function () {
    return {
        dhms: function (t) {
            var countdown = {};
            countdown.days = Math.floor(t / 86400);
            t -= countdown.days * 86400;
            countdown.hours = Math.floor(t / 3600) % 24;
            t -= countdown.hours * 3600;
            countdown.minutes = Math.floor(t / 60) % 60;
            t -= countdown.minutes * 60;
            countdown.seconds = t % 60;
            
            return countdown;
        }
    };
}]);