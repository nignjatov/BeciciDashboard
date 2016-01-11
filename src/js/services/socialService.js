
angular.module('RDash')
  .service('SocialService', function ($http) {

    var servicePrefix = '/social/';
    return {
      getAllNetworks: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/all'
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
          data: networkData
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