
angular.module('RDash')
  .service('PriceService', function ($http,$rootScope,$q) {

    var servicePrefix = '/prices/';
    return {
      getPriceList: function () {
        return $http({
          method: 'GET',
          url: servicePrefix + 'list/all'
        });
      },
      uploadImage: function (flowObj) {
        var deferred = $q.defer();
        flowObj.opts.target = $rootScope.serverUrl +servicePrefix+"image";
        flowObj.opts.testChunks=false;
        flowObj.opts.fileParameterName = "image";
        flowObj.on('fileSuccess', function (event,resp) {
          console.log('fileSuccess ', resp);
          deferred.resolve(JSON.parse(resp));
        });
        flowObj.on('fileError', function (event,err) {
          console.log('fileError ', err);
          deferred.reject(JSON.parse(err));
        });
        flowObj.upload();
        return deferred.promise;
      }
    }
  });