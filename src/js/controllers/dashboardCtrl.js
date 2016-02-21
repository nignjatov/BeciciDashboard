angular.module('RDash')
    .controller('dashboardCtrl', ['$scope', '$rootScope', 'ReviewsService', 'ReservationsService',
        dashboardCtrl]);

function dashboardCtrl($scope, $rootScope, ReviewsService, ReservationsService) {

    $rootScope.currentPage = "Dashboard";

    $scope.approvedReviews = 0;
    $scope.waitingReviews = 0;
    $scope.reservations = [];

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"
        , "November", "December"];
    $scope.seriesTop = ['Reservations'];
    $scope.dataTop = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    $scope.seriesBottom = ['Money amount (RSD)'];
    $scope.dataBottom = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    ReviewsService.getAllReviews()
        .then(function (data) {
            var reviews = data.data;
            angular.forEach(reviews, function (rev) {
                if (rev.status == 'approved') {
                    $scope.approvedReviews++;
                } else if (rev.status == 'waiting') {
                    $scope.waitingReviews++;
                }
            })
        });
    ReservationsService.getReservations().then(function (data) {
            var resSeries = $scope.dataTop[0];
            var moneySeries = $scope.dataBottom[0];
            var currentYear = new Date().getYear();
            angular.forEach(data.data, function (reservation) {
                if (reservation.status != 'INIT') {
                    $scope.reservations.push(reservation);
                }
                var resDate = new Date(reservation.updated_on);
                if (resDate.getYear() == currentYear) {
                    resSeries[resDate.getMonth()]++;
                    moneySeries[resDate.getMonth()] += parseFloat(reservation.amount);
                }
            })
        }
    )
    ;


    $scope.onClickTop = function (points, evt) {
        console.log(points, evt);
    };
    $scope.onClickBottom = function (points, evt) {
        console.log(points, evt);
    };
}