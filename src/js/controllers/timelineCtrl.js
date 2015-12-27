angular.module('RDash')
  .controller('timelineCtrl', ['$scope', '$rootScope', 'BlogService', timelineCtrl]);

function timelineCtrl($scope, $rootScope,BlogService) {

  $rootScope.currentPage = "Timeline";

  $scope.editTimelineEvent = null;

  $scope.timelineEvents = [];
  $scope.editDesc = {
    text : ""
  };
  $scope.editTitle = {
    text : ""
  };

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
    $scope.reloadDescriptionByLang($scope.usedLang);
    $scope.reloadTitleByLang($scope.usedLang);
  }

  $scope.getTitleByLang = function (timelineEvent, lang) {
    for (var i = 0; i < timelineEvent.title.length; i++) {
      if (timelineEvent.title[i].lang == lang) {
        return timelineEvent.title[i].text;
      }
    }
    return '';
  }

  $scope.reloadTitleByLang = function (lang) {
    for (var i = 0; i < $scope.editTimelineEvent.title.length; i++) {
      if ($scope.editTimelineEvent.title[i].lang == lang) {
        $scope.editTitle.text = $scope.editTimelineEvent.title[i].text;
        return $scope.editTimelineEvent.title[i].text;
      }
    }
    return '';
  }
  $scope.reloadDescriptionByLang = function (lang) {
    for (var i = 0; i < $scope.editTimelineEvent.description.length; i++) {
      if ($scope.editTimelineEvent.description[i].lang == lang) {
        $scope.editDesc.text = $scope.editTimelineEvent.description[i].text;
        return $scope.editTimelineEvent.description[i].text;
      }
    }
    return '';
  }

  $scope.addTimelineEvent = function () {
    $scope.editTimelineEvent = {
      blogType : 'timeline',
      title: [
        {
          text: '',
          lang: 'en'
        },
        {
          text: '',
          lang: 'rs'
        }],
      description: [
        {
          text: '',
          lang: 'en'
        },
        {
          text: '',
          lang: 'rs'
        }],
      moment: Date.now()
    };

    $scope.usedLang = $rootScope.defaultLang;
    $scope.editDesc = $scope.getDescriptionByLang($scope.editTimelineEvent, $scope.usedLang);
    $scope.editTitle = $scope.getTitleByLang($scope.editTimelineEvent, $scope.usedLang);

  }

  $scope.saveEvent   = function () {
    if (typeof $scope.editTimelineEvent._id  === 'undefined') {
      //new service
      console.log("Creating timeline event");
      BlogService.createBlogItem($scope.editTimelineEvent).then(function(data){
        $scope.timelineEvents.push(data.data);
        $scope.editTimelineEvent = null;
      });
    } else {
      BlogService.updateBlogItem($scope.editTimelineEvent._id,$scope.editTimelineEvent).then(function (data) {
        $scope.editTimelineEvent = null;
      });
    }
  }
  $scope.deleteEvent = function () {
    BlogService.deleteBlogItem($scope.editTimelineEvent._id).then(function (data) {
      $scope.timelineEvents.splice($scope.timelineEvents.indexOf($scope.editTimelineEvent), 1);
      $scope.editTimelineEvent = null;
    });
  }

  $scope.editDescription = function (desc) {
    for (var i = 0; i < $scope.editTimelineEvent.description.length; i++) {
      if ($scope.editTimelineEvent.description[i].lang == $scope.usedLang) {
        $scope.editTimelineEvent.description[i].text = desc;
      }
    }
  }

  $scope.changeDescLang = function (lang) {
    $scope.descLang = lang;
    $scope.reloadDescriptionByLang($scope.usedLang);
    console.log("Changed desc lang,text: " + $scope.editDesc);
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
    $scope.reloadTitleByLang($scope.usedLang);
    $scope.reloadDescriptionByLang($scope.usedLang);
  }

  $scope.open = function($event) {
    $scope.status.opened = true;
  };
}