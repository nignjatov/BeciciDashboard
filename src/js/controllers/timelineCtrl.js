angular.module('RDash')
  .controller('timelineCtrl', ['$scope', '$rootScope', '$cookieStore', timelineCtrl]);

function timelineCtrl($scope, $rootScope) {

  $scope.editTimelineEvent = null;

  $scope.editDesc  = "";
  $scope.editTitle = "";
  $scope.titleLang = $rootScope.defaultLang;

  $scope.descLang = $rootScope.defaultLang;

  $scope.timelineEvents = [{
    title: [
      {
        text: 'Hotel opening',
        lang: 'en'
      },
      {
        text: 'Otvaranje hotela',
        lang: 'rs'
      }],
    description: [
      {
        text: 'opened hotel',
        lang: 'en'
      },
      {
        text: 'otvoren hotel',
        lang: 'rs'
      }],
    created_at: Date.now(),
    moment: Date.now(),
    last_modified: Date.now()
  }];

  $scope.selectEvent = function (timelineEvent) {
    $scope.editTimelineEvent = angular.extend({}, timelineEvent);

    $scope.descLang = $rootScope.defaultLang;
    $scope.editDesc = $scope.getDescriptionByLang($scope.editTimelineEvent, $scope.descLang);

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle = $scope.getTitleByLang($scope.editTimelineEvent, $scope.titleLang);
  }

  $scope.getTitleByLang = function (timelineEvent, lang) {
    for (var i = 0; i < timelineEvent.title.length; i++) {
      if (timelineEvent.title[i].lang == lang) {
        return timelineEvent.title[i].text;
      }
    }
    return '';
  }

  $scope.getDescriptionByLang = function (timelineEvent, lang) {
    for (var i = 0; i < timelineEvent.description.length; i++) {
      if (timelineEvent.description[i].lang == lang) {
        return timelineEvent.description[i].text;
      }
    }
    return '';
  }

  $scope.addTimelineEvent = function () {
    $scope.editTimelineEvent = {
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
      created_at: Date.now(),
      moment: Date.now(),
      last_modified: Date.now()

    };


    $scope.descLang = $rootScope.defaultLang;
    $scope.editDesc = $scope.getDescriptionByLang($scope.editTimelineEvent, $scope.descLang);

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle = $scope.getTitleByLang($scope.editTimelineEvent, $scope.titleLang);

    $scope.timelineEvents.push($scope.editTimelineEvent);

  }

  $scope.saveEvent   = function () {
    console.log($scope.editTimelineEvent);
  }
  $scope.deleteEvent = function () {
    $scope.timelineEvents.splice($scope.timelineEvents.indexOf($scope.editTimelineEvent), 1);
    $scope.editTimelineEvent = null;
  }

  $scope.editDescription = function (desc) {
    for (var i = 0; i < $scope.editTimelineEvent.description.length; i++) {
      if ($scope.editTimelineEvent.description[i].lang == $scope.descLang) {
        $scope.editTimelineEvent.description[i].text = desc;
      }
    }
  }

  $scope.changeDescLang = function (lang) {
    $scope.descLang = lang;
    $scope.editDesc = $scope.getDescriptionByLang($scope.editTimelineEvent, $scope.descLang);
    console.log("Changed desc lang,text: " + $scope.editDesc);
  }

  $scope.editEventTitle = function (title) {
    for (var i = 0; i < $scope.editTimelineEvent.title.length; i++) {
      if ($scope.editTimelineEvent.title[i].lang == $scope.titleLang) {
        $scope.editTimelineEvent.title[i].text = title;
      }
    }
  }

  $scope.changeTitleLang = function (lang) {
    $scope.titleLang = lang;
    $scope.editTitle = $scope.getTitleByLang($scope.editTimelineEvent, $scope.titleLang);
    console.log("Changed title lang,text: " + $scope.editTitle);
  }
}