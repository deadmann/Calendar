angular.module('test', [])
    .controller('testCtrl', [
        '$scope', '$http', function($scope, $http) {
            $scope.alert = function() {
                alert("WOW");
            };
            $scope.test = function() {
                var pd = PersianDate(1395, 1, 1);
                var wim = pd.getWeeksInMonth();
                console.log(wim);
            };
        }
    ]);