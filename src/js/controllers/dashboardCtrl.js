angular.module('RDash')
    .controller('dashboardCtrl', ['$scope', '$rootScope', 'ReviewsService', 'ReservationsService', 'CoursesService', 'PriceService', 'Notification',
        dashboardCtrl]);

function dashboardCtrl($scope, $rootScope, ReviewsService, ReservationsService, CoursesService, PriceService, Notification) {

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

    $scope.chartYear = new Date().getFullYear();
    $scope.euroCourse = null;

    $scope.obj = {
        flow: null
    };

    $scope.individual = {
        flow: null
    };

    $scope.group = {
        flow: null
    };

    $scope.priceListImg = null;
    $scope.individualReservation = null;
    $scope.groupReservation = null;

    PriceService.getPriceList().then(function (data) {
        angular.forEach(data.data, function(item){
            if(item.type == 'priceList'){
                $scope.priceListImg = item.filename;
            } else if(item.type == 'individualReservation'){
                $scope.individualReservation = item.filename;
            } else if(item.type == 'groupReservation'){
                $scope.groupReservation = item.filename;
            }
        });
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
            angular.forEach(data.data, function (reservation) {
                if (reservation.status != 'INIT') {
                    $scope.reservations.push(reservation);
                }
                var resDate = new Date(reservation.updated_on);
                if (resDate.getFullYear() == $scope.chartYear) {
                    resSeries[resDate.getMonth()]++;
                    if(reservation.status== "PAID"){
                        moneySeries[resDate.getMonth()] += parseFloat(reservation.amount);
                    } else if (reservation.status== "CANCELED"){
                        moneySeries[resDate.getMonth()] += parseFloat(reservation.earned);
                    }
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

    $scope.uploadPriceList = function () {
        if (typeof $scope.obj.flow.files !== 'undefined') {
            PriceService.uploadImage($scope.obj.flow).then(function (data) {
                Notification.primary({message: 'Price list uploaded!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to upload picture!'});
            });

        }
    }

    $scope.uploadIndividualReservation = function () {
        if (typeof $scope.individual.flow.files !== 'undefined') {
            PriceService.uploadIndividualReservation($scope.individual.flow).then(function (data) {
                Notification.primary({message: 'Individual reservation file uploaded!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to upload file!'});
            });
        }
    }

    $scope.uploadGroupReservation = function () {
        if (typeof $scope.group.flow.files !== 'undefined') {
            PriceService.uploadGroupReservation($scope.group.flow).then(function (data) {
                Notification.primary({message: 'Group reservation file uploaded!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to upload file!'});
            });
        }
    }
    $scope.deleteIndividualReservation = function () {
        PriceService.deleteIndividualReservation().then(function (data) {
            Notification.primary({message: 'Individual reservation file deleted!'});
            $scope.individualReservation = null;
        }).catch(function (err) {
            Notification.error({message: 'Failed to delete file!'});
        });
    }

    $scope.deleteGroupReservation = function () {
        PriceService.deleteGroupReservation().then(function (data) {
            Notification.primary({message: 'Group reservation file deleted!'});
            $scope.groupReservation = null;
        }).catch(function (err) {
            Notification.error({message: 'Failed to delete file!'});
        });
    }
    $scope.changeYear = function (year) {
        $scope.dataTop = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        $scope.dataBottom = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        var resSeries = $scope.dataTop[0];
        var moneySeries = $scope.dataBottom[0];
        angular.forEach($scope.reservations, function (reservation) {
            var resDate = new Date(reservation.updated_on);
            console.log(resDate.getYear());
            if (resDate.getFullYear() == $scope.chartYear) {
                resSeries[resDate.getMonth()]++;
                if(reservation.status== "PAID"){
                    moneySeries[resDate.getMonth()] += parseFloat(reservation.amount);
                } else if (reservation.status== "CANCELED"){
                    moneySeries[resDate.getMonth()] += parseFloat(reservation.earned);
                }
            }
        })
    }
}