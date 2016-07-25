angular.module('RDash')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$translate', '$filter', 'ReviewsService', 'ReservationsService', 'CoursesService', 'PriceService', 'Notification',
        dashboardCtrl]);

function dashboardCtrl($scope, $rootScope, $translate,$filter, ReviewsService, ReservationsService, CoursesService, PriceService, Notification) {

    $rootScope.currentPage = "DASHBOARD";

    $scope.individualInfoType = "individualReservationInfo";
    $scope.individualContractType = "individualReservationContract";
    $scope.groupInfoType = "groupReservationInfo";
    $scope.groupContractType = "groupReservationContract";
    $scope.partnersInfoType = "partnersInfo";
    $scope.partnersContractType = "partnersContract";

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

    $scope.individualInfo = {
        flow: null
    };

    $scope.individualContract = {
        flow: null
    };

    $scope.groupInfo = {
        flow: null
    };

    $scope.groupContract = {
        flow: null
    };

    $scope.partnersInfoFlow = {
        flow: null
    };
    $scope.partnersContractFlow = {
        flow: null
    };

    $scope.priceListImg = null;


    $scope.changeLang = function(lang){
        $translate.use(lang);
    }

    PriceService.getPriceList().then(function (data) {
        angular.forEach(data.data, function (item) {
            if (item.type == 'priceList') {
                $scope.priceListImg = item.filename;
            } else if (item.type == 'individualReservationInfo') {
                $scope.individualReservationInfo = item.filename;
            } else if (item.type == 'individualReservationContract') {
                $scope.individualReservationContract = item.filename;
            } else if (item.type == 'groupReservationInfo') {
                $scope.groupReservationInfo = item.filename;
            } else if (item.type == 'groupReservationContract') {
                $scope.groupReservationContract = item.filename;
            } else if (item.type == 'partnersInfo') {
                $scope.partnersInfo = item.filename;
            } else if (item.type == 'partnersContract') {
                $scope.partnersContract = item.filename;
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

                    if (reservation.status == "PAID") {
                        moneySeries[resDate.getMonth()] += parseFloat(reservation.amount);
                        resSeries[resDate.getMonth()]++;
                    } else if (reservation.status == "CANCELED") {
                        moneySeries[resDate.getMonth()] += parseFloat(reservation.earned);
                        resSeries[resDate.getMonth()]++;
                    } else if (reservation.status == "CAPTURED") {
                        resSeries[resDate.getMonth()]++;
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
            Notification.primary({message: $filter('translate')('CURRENCY_UPDATED')});
        }).catch(function () {
            Notification.error({message: $filter('translate')('CURRENCY_NOT_UPDATED')});
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
                Notification.primary({message: $filter('translate')('FILE_UPLOADED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('FILE_NOT_UPLOADED')});
            });

        }
    }

    $scope.uploadManagementDocument = function (flowObj, type) {
        if (typeof flowObj.flow.files !== 'undefined') {
            PriceService.uploadManagementDocument(flowObj.flow, type).then(function (data) {
                Notification.primary({message: $filter('translate')('FILE_UPLOADED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('FILE_NOT_UPLOADED')});
            });
        }
    }
    $scope.deleteManagementDocument = function (filename, type) {
        PriceService.deleteManagementDocument(type).then(function (data) {
            Notification.primary({message: $filter('translate')('FILE_DELETED')});
            filename = null;
        }).catch(function (err) {
            Notification.error({message: $filter('translate')('FILE_NOT_DELETED')});
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
                if (reservation.status == "PAID") {
                    moneySeries[resDate.getMonth()] += parseFloat(reservation.amount);
                } else if (reservation.status == "CANCELED") {
                    moneySeries[resDate.getMonth()] += parseFloat(reservation.earned);
                }
            }
        })
    }
}