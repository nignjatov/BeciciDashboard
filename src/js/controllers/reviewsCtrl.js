
angular.module('RDash')
  .controller('reviewsCtrl', ['$scope', '$rootScope','$cookieStore','ReviewsService', reviewsCtrl]);

function reviewsCtrl($scope,$rootScope,reviewsObj,ReviewsService) {

  $rootScope.currentPage = "Reviews";

  ReviewsService.getAllReviews()
    .then(function (data) {
      $scope.reviews =  data.data;
    });

  $scope.selectedReview = null;

  $scope.selectReview = function(review){

    $scope.selectedReview = review;
  }

  $scope.range = function(min, max, step){
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };

  $scope.deleteReview = function(){
    ReviewsService.deleteReview($scope.selectedReview._id)
      .then(function () {
        $scope.reviews.splice($scope.reviews.indexOf($scope.selectedReview), 1);
        $scope.selectedReview = null;
      });
  }
  $scope.rejectReview = function(){
    ReviewsService.changeReviewStatus($scope.selectedReview._id,'rejected')
      .then(function () {
        $scope.selectedReview.status = 'rejected';
      });

  }
  $scope.approveReview = function(){
    ReviewsService.changeReviewStatus($scope.selectedReview._id,'approved')
      .then(function () {
        $scope.selectedReview.status = 'approved';
      });

  }
}