
angular.module('RDash')
  .service('RoomsService', function ($http,$q,$rootScope) {
    var servicePrefix = '/rooms/';
    return {
      getRooms: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/all'
        });
      },
      getRoomById: function (roomId) {
        return $http({
          method: 'GET',
          url: servicePrefix+roomId
        });
      },
      createRoom: function (roomData) {
        return $http({
          method: 'POST',
          url:  servicePrefix,
          data: roomData
        });
      },
      deleteRoom: function (roomId) {
        return $http({
          method: 'DELETE',
          url:  servicePrefix+roomId
        });
      },
      updateRoom: function (roomId,roomData) {
        roomData.last_modified = Date.now();
        return $http({
          method: 'PATCH',
          url:  servicePrefix+roomId,
          data: roomData
        });
      },
      uploadImage: function (roomId, flowObj) {
        var deferred = $q.defer();
        flowObj.opts.target = $rootScope.serverUrl +servicePrefix +roomId;
        flowObj.opts.testChunks=false;
        flowObj.opts.fileParameterName = "image";
        flowObj.on('fileSuccess', function (event,resp) {
          console.log('fileSuccess ', resp);
          deferred.resolve(JSON.parse(resp));
        });
        flowObj.on('fileError', function (event,err) {
          console.log('fileError ', err);
          deferred.reject(err);
        });
        flowObj.upload();
        return deferred.promise;
      },
    }
});