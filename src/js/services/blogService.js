
angular.module('RDash')
  .service('BlogService', function ($http,$rootScope,$q) {

    var servicePrefix = '/blog/';
    return {
      getTimelineItems: function () {
        return $http({
          method: 'GET',
          url: servicePrefix + 'list/timeline/all'
        });
      },
      getNewsItems: function () {
        return $http({
          method: 'GET',
          url: servicePrefix + 'list/news/all'
        });
      },
      getBannerItems: function () {
        return $http({
          method: 'GET',
          url: servicePrefix + 'list/banner/all'
        });
      },
      createBlogItem: function (blogData) {
        return $http({
          method: 'POST',
          url: servicePrefix,
          data: blogData
        });
      },
      deleteBlogItem: function (blogId) {
        return $http({
          method: 'DELETE',
          url: servicePrefix + blogId
        });
      },
      updateBlogItem: function (blogId, blogData) {
        return $http({
          method: 'PATCH',
          url: servicePrefix + blogId,
          data: blogData
        });
      },
      uploadImage: function (blogId, flowObj) {
        var deferred = $q.defer();
        flowObj.opts.target = $rootScope.serverUrl +servicePrefix +blogId;
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