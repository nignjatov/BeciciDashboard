
angular.module('RDash')
  .controller('roomServiceCtrl', ['$scope', '$rootScope','$cookieStore', roomServiceCtrl]);

function roomServiceCtrl($scope,$rootScope) {

  $scope.editRoomService = null;

  $scope.editTitle = "";
  $scope.titleLang = $rootScope.defaultLang;


  $scope.roomServices = [{
    title: [
      {
        text: 'Free cable',
        lang: 'en'
      },
      {
        text: 'Besplatna televizija',
        lang: 'rs'
      }],
    created_at: Date.now()
  }];

  $scope.selectRoomService = function (roomService) {
    $scope.editRoomService = angular.extend({}, roomService);

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle = $scope.getServiceTitleByLang($scope.editRoomService, $scope.titleLang);
  }

  $scope.getServiceTitleByLang = function (roomService, lang) {
    for (var i = 0; i < roomService.title.length; i++) {
      if (roomService.title[i].lang == lang) {
        return roomService.title[i].text;
      }
    }
    return '';
  }

  $scope.addRoomService = function () {
    $scope.editRoomService = {
      title: [
        {
          text: '',
          lang: 'en'
        },
        {
          text: '',
          lang: 'rs'
        }],
      created_at: Date.now()
    };

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle = $scope.getServiceTitleByLang($scope.editRoomService, $scope.titleLang);

    $scope.roomServices.push($scope.editRoomService);

  }

  $scope.saveRoomService   = function () {
    console.log($scope.editRoomService);
  }
  $scope.deleteRoomService = function () {
    $scope.roomServices.splice($scope.roomServices.indexOf($scope.editRoomService), 1);
    $scope.editRoomService = null;
  }

  $scope.editRoomServiceTitle = function (title) {
    for (var i = 0; i < $scope.editRoomService.title.length; i++) {
      if ($scope.editRoomService.title[i].lang == $scope.titleLang) {
        $scope.editRoomService.title[i].text = title;
      }
    }
  }

  $scope.changeTitleLang = function (lang) {
    $scope.titleLang = lang;
    $scope.editTitle = $scope.getServiceTitleByLang($scope.editRoomService, $scope.titleLang);
    console.log("Changed title lang,text: " + $scope.editTitle);
  }
}