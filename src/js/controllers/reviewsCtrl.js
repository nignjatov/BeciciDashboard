angular.module('RDash')
    .controller('reviewsCtrl', ['$scope', '$rootScope', 'ReviewsService', 'Notification', reviewsCtrl]);

function reviewsCtrl($scope, $rootScope, ReviewsService, Notification) {

    $rootScope.currentPage = "Reviews";

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
        ReviewsService.deleteReview($scope.selectedReview._id)
            .then(function () {
                $scope.reviews.splice($scope.reviews.indexOf($scope.selectedReview), 1);
                $scope.selectedReview = null;
                Notification.primary({message: 'Review removed!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to remove review!'});
            });
    }
    $scope.rejectReview = function () {
        ReviewsService.changeReviewStatus($scope.selectedReview._id, 'rejected')
            .then(function () {
                $scope.selectedReview.status = 'rejected';
                Notification.primary({message: 'Changed review\'s status to: rejected!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to change review\'s status!'});
            });

    }
    $scope.approveReview = function () {
        ReviewsService.changeReviewStatus($scope.selectedReview._id, 'approved')
            .then(function () {
                Notification.primary({message: 'Changed review\'s status to: approved!'});
                $scope.selectedReview.status = 'approved';
            }).catch(function (err) {
                Notification.error({message: 'Failed to change review\'s status!'});
            });

    }

    $scope.sortType = "status";
    $scope.sortReverse = "true";
    $scope.searchWord = '';

}