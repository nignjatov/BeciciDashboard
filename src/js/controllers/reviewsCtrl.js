angular.module('RDash')
    .controller('reviewsCtrl', ['$scope', '$rootScope', '$modal','$filter','ReviewsService', 'Notification', reviewsCtrl]);

function reviewsCtrl($scope, $rootScope,$modal,$filter, ReviewsService, Notification) {

    $rootScope.currentPage = "REVIEWS";

    ReviewsService.getAllReviews()
        .then(function (data) {
            $scope.reviews = data.data;
            angular.forEach($scope.reviews, function (rev) {
                rev.language = $rootScope.getLanguage(rev.language);
            })
        });

    $scope.selectedReview = null;

    $scope.selectReview = function (review) {

        $scope.selectedReview = review;
    }

    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    $scope.deleteReview = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            ReviewsService.deleteReview($scope.selectedReview._id)
                .then(function () {
                    $scope.reviews.splice($scope.reviews.indexOf($scope.selectedReview), 1);
                    $scope.selectedReview = null;
                    Notification.primary({message: $filter('translate')('DELETED_REVIEW_ITEM')});
                }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_DELETED_REVIEW_ITEM')});
            });
        });
    }
    $scope.rejectReview = function () {
        ReviewsService.changeReviewStatus($scope.selectedReview._id, 'rejected')
            .then(function () {
                $scope.selectedReview.status = 'rejected';
                Notification.primary({message: $filter('translate')('REJECTED_REVIEW_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_REJECTED_REVIEW_ITEM')});
            });

    }
    $scope.approveReview = function () {
        ReviewsService.changeReviewStatus($scope.selectedReview._id, 'approved')
            .then(function () {
                Notification.primary({message: $filter('translate')('APPROVED_REVIEW_ITEM')});
                $scope.selectedReview.status = 'approved';
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_APPROVED_REVIEW_ITEM')});
            });

    }

    $scope.sortType = "status";
    $scope.sortReverse = "true";
    $scope.searchWord = '';

}