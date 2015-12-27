
angular.module('RDash')
  .service('BlogService', function ($http) {

    var servicePrefix = '/blog/';
    return {
      getTimelineItems: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/timeline/all'
        });
      },
      getNewsItems: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/news/all'
        });
      },
      createBlogItem: function (blogData) {
        return $http({
          method: 'POST',
          url:  servicePrefix,
          data: blogData
        });
      },
      deleteBlogItem: function (blogId) {
        return $http({
          method: 'DELETE',
          url:  servicePrefix+blogId
        });
      },
      updateBlogItem: function (blogId,blogData) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+blogId,
          data: blogData
        });
      }
    }
  });