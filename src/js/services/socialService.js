
angular.module('RDash')
  .service('SocialService', function ($http) {

    var servicePrefix = '/social/';
    return {
      getAllNetworks: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list'
        });
      },
      createNetwork: function (data) {
        return $http({
          method: 'POST',
          url:  servicePrefix,
          data: data
        });
      },
      updateNetwork: function (networkId,networkData) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+''+networkId,
          data: data
        });
      },
      deleteNetwork: function (networkId) {
        return $http({
          method: 'DELETE',
          url:  servicePrefix+''+networkId
        });
      }

    }
});