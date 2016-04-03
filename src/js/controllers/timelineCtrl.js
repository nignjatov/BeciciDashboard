angular.module('RDash')
  .controller('timelineCtrl', ['$scope', '$rootScope', 'BlogService','Notification', timelineCtrl]);

function timelineCtrl($scope, $rootScope,BlogService,Notification) {

  $rootScope.currentPage = "Timeline";

  $scope.editTimelineEvent = null;

  $scope.timelineEvents = [];

  $scope.usedLang = $rootScope.defaultLang;

  $scope.status = {
    opened: false
  };

  BlogService.getTimelineItems().then(function (data){
    $scope.timelineEvents = data.data;
  });

  $scope.selectEvent = function (timelineEvent) {
    $scope.editTimelineEvent = angular.extend({}, timelineEvent);

    $scope.usedLang = $rootScope.defaultLang;
  }

  $scope.addTimelineEvent = function () {
    $scope.editTimelineEvent = {
      blogType : 'timeline',
      title: $rootScope.createLangFields(),
      description: $rootScope.createLangFields(),
      moment: Date.now()
    };

    $scope.usedLang = $rootScope.defaultLang;

  }

  $scope.saveEvent   = function () {
    if (typeof $scope.editTimelineEvent._id  === 'undefined') {
      //new service
      console.log("Creating timeline event");
      BlogService.createBlogItem($scope.editTimelineEvent).then(function(data){
        $scope.timelineEvents.push(data.data);
        $scope.editTimelineEvent = null;
        Notification.primary({message: 'Created timeline event!'});
      }).catch(function (err) {
        Notification.error({message: 'Failed to create timeline event!'});
      });
    } else {
      BlogService.updateBlogItem($scope.editTimelineEvent._id,$scope.editTimelineEvent).then(function (data) {
        $scope.editTimelineEvent = null;
        Notification.primary({message: 'Timeline event updated!'});
        BlogService.getTimelineItems().then(function (data){
          $scope.timelineEvents = data.data;
        });
      }).catch(function (err) {
        Notification.error({message: 'Failed to update timeline event!'});
      });
    }
  }
  $scope.deleteEvent = function () {
    BlogService.deleteBlogItem($scope.editTimelineEvent._id).then(function (data) {
      $scope.timelineEvents.splice($scope.timelineEvents.indexOf($scope.editTimelineEvent), 1);
      $scope.editTimelineEvent = null;
      Notification.primary({message: 'Timeline event removed!'});
    }).catch(function (err) {
      Notification.error({message: 'Failed to remove timeline event!'});
    });
  }

  $scope.editEventTitle = function (title) {
    for (var i = 0; i < $scope.editTimelineEvent.title.length; i++) {
      if ($scope.editTimelineEvent.title[i].lang == $scope.usedLang) {
        $scope.editTimelineEvent.title[i].text = title;
      }
    }
  }

  $scope.changeLang = function (lang) {
    $scope.usedLang = lang;
  }

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.sortType = "moment";
  $scope.sortReverse = "true";
  $scope.searchWord   = '';
}