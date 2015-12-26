
angular.module('RDash')
  .service('ReviewsService', function ($http) {

    var servicePrefix = '/reviews/';
    return {
      getAllReviews: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list'
        });
      },
      deleteReview: function (reviewId) {
        return $http({
          method: 'DELETE',
          url:  servicePrefix+''+reviewId
        });
      },
      changeReviewStatus: function (reviewId,status) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+''+reviewId+'/'+status
        });
      }
    }
});