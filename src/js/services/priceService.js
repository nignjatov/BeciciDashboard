angular.module('RDash')
    .service('PriceService', function ($http, $rootScope, $q) {

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
                flowObj.opts.target = $rootScope.serverUrl + servicePrefix + "image";
                flowObj.opts.testChunks = false;
                flowObj.opts.fileParameterName = "image";
                flowObj.on('fileSuccess', function (event, resp) {
                    console.log('fileSuccess ', resp);
                    deferred.resolve(JSON.parse(resp));
                });
                flowObj.on('fileError', function (event, err) {
                    console.log('fileError ', err);
                    deferred.reject(JSON.parse(err));
                });
                flowObj.upload();
                return deferred.promise;
            },
            uploadManagementDocument: function (flowObj,type) {
                var deferred = $q.defer();
                flowObj.opts.target = $rootScope.serverUrl + servicePrefix + "document/"+type;
                flowObj.opts.testChunks = false;
                flowObj.opts.fileParameterName = "image";
                flowObj.on('fileSuccess', function (event, resp) {
                    console.log('fileSuccess ', resp);
                    deferred.resolve(JSON.parse(resp));
                });
                flowObj.on('fileError', function (event, err) {
                    console.log('fileError ', err);
                    deferred.reject(JSON.parse(err));
                });
                flowObj.upload();
                return deferred.promise;
            },
            uploadGroupReservation: function (flowObj) {
                var deferred = $q.defer();
                flowObj.opts.target = $rootScope.serverUrl + servicePrefix + "group";
                flowObj.opts.testChunks = false;
                flowObj.opts.fileParameterName = "image";
                flowObj.on('fileSuccess', function (event, resp) {
                    console.log('fileSuccess ', resp);
                    deferred.resolve(JSON.parse(resp));
                });
                flowObj.on('fileError', function (event, err) {
                    console.log('fileError ', err);
                    deferred.reject(JSON.parse(err));
                });
                flowObj.upload();
                return deferred.promise;
            },
            deleteManagementDocument: function (type) {
                return $http({
                    method: 'DELETE',
                    url: servicePrefix + 'document/'+type
                });
            },
            deleteGroupReservation: function () {
                return $http({
                    method: 'DELETE',
                    url: servicePrefix + 'group'
                });
            }
        }
    });