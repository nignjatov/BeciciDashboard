angular.module('RDash')
    .controller('dashboardCtrl', ['$scope', '$rootScope', 'ReviewsService', 'ReservationsService', 'CoursesService','PriceService','Notification',
        dashboardCtrl]);

function dashboardCtrl($scope, $rootScope, ReviewsService, ReservationsService, CoursesService,PriceService,Notification) {

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

    $scope.euroCourse = null;

    $scope.obj = {
        flow: null
    };

    $scope.priceListImg = null;

    PriceService.getPriceList().then(function (data){
        if(data.data.length > 0){
            $scope.priceListImg = data.data[0].filename;
        }
    });
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

    CoursesService.getEuroCourse().then(function (data) {
        console.log(data);
        angular.forEach(data.data, function (curr) {
            if (curr.currency == 'EUR') {
                $scope.euroCourse = curr;
                $scope.euroCourse.value = parseFloat($scope.euroCourse.value);
            }
        })

    });

    $scope.updateCourse = function () {
        CoursesService.updateEuroCurrency($scope.euroCourse).then(function (data) {
            Notification.primary({message: 'Currency updated!'});
        }).catch(function () {
            Notification.error({message: 'Failed to currency update!'});
        });
    }
    $scope.onClickTop = function (points, evt) {
        console.log(points, evt);
    };
    $scope.onClickBottom = function (points, evt) {
        console.log(points, evt);
    };

    $scope.uploadPriceList = function (){
        if (typeof $scope.obj.flow.files !== 'undefined') {
            PriceService.uploadImage($scope.obj.flow).then(function (data) {
                Notification.primary({message: 'Price list uploaded!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to upload picture!'});
            });

        }
    }
}