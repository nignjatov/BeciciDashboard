
angular.module('RDash')
  .service('roomsService', function ($http) {
    return {
      test: function () {
        console.log("this is a test");
        $http({
          method: 'GET',
          url: '/users/list/all'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    }
});