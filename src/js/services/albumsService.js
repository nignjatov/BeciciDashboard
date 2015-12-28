
angular.module('RDash')
  .service('AlbumsService', function ($http,$rootScope,$q) {

    var servicePrefix = '/albums/';
    return {
      getAlbums: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/all'
        });
      },
      getAlbumById: function (albumId) {
        return $http({
          method: 'GET',
          url: servicePrefix+albumId
        });
      },
      createAlbum: function (albumData) {
        return $http({
          method: 'POST',
          url:  servicePrefix,
          data: albumData
        });
      },
      deleteAlbum: function (albumId) {
        return $http({
          method: 'DELETE',
          url:  servicePrefix+albumId
        });
      },
      updateAlbum: function (albumId,albumData) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+albumId,
          data: albumData
        });
      },
      uploadImage: function (albumId, flowObj) {
        var deferred = $q.defer();
        flowObj.opts.target = $rootScope.serverUrl +servicePrefix +albumId;
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

      deleteImage : function(albumId, image){
        return $http({
          method: 'DELETE',
          url:  servicePrefix+albumId+'/'+image
        });
      }
    }
  });