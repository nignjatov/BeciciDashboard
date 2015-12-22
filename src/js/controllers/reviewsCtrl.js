
angular.module('RDash')
  .controller('reviewsCtrl', ['$scope', '$rootScope','$cookieStore', reviewsCtrl]);

function reviewsCtrl($scope,$rootScope) {

  $scope.selectedReview = null;

  $scope.reviews = [{
    stars: 1,
    description : "VEEEEEEEEEEEEEERY LONG DESCRIPTION",
    language : 'en',
    status : 'waiting',
    created_at : Date.now()
  },{
    stars: 5,
    description : "Vasdasdasdadsadsadasdasdq rgbwserfgfbvxcbsefb",
    language : 'rs',
    status : 'approved',
    created_at : Date.now()
  }];

  $scope.selectReview = function(review){
    console.log(review);
    $scope.selectedReview = review;
  }

  $scope.range = function(min, max, step){
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };

  $scope.deleteReview = function(){
    $scope.reviews.splice($scope.reviews.indexOf($scope.selectedReview),1);
    $scope.selectedReview = null;
  }
  $scope.rejectReview = function(){
    $scope.selectedReview.status = 'rejected';
  }
  $scope.approveReview = function(){
    $scope.selectedReview.status = 'approved';
  }
}