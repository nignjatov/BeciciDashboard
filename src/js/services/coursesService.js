
angular.module('RDash')
  .service('CoursesService', function ($http) {

    var servicePrefix = '/courses/';
    return {
      getEuroCourse: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/all'
        });
      },
      updateEuroCurrency: function (value) {
        return $http({
          method: 'PATCH',
          url: servicePrefix+'/EUR',
          data: value
        });
      }
    }
  });