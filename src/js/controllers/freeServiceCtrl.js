
angular.module('RDash')
  .controller('freeServicesCtrl', ['$scope', '$rootScope','$cookieStore', freeServicesCtrl]);

function freeServicesCtrl($scope,$rootScope) {

  $scope.editFreeService = null;

  $scope.editDesc  = "";
  $scope.editTitle = "";
  $scope.titleLang = $rootScope.defaultLang;

  $scope.descLang = $rootScope.defaultLang;

  $scope.freeServices = [{
    title: [
      {
        text: 'Children animation',
        lang: 'en'
      },
      {
        text: 'Animacija za decu',
        lang: 'rs'
      }],
    description: [
      {
        text: 'Animate your child',
        lang: 'en'
      },
      {
        text: 'Zabavite vase dete',
        lang: 'rs'
      }],
    img: "",
    created_at: Date.now(),
    last_modified: Date.now()
  }];

  $scope.selectFreeService = function (freeService) {
    $scope.editFreeService = angular.extend({}, freeService);

    $scope.descLang = $rootScope.defaultLang;
    $scope.editDesc = $scope.getServiceDescriptionByLang($scope.editFreeService, $scope.descLang);

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle = $scope.getServiceTitleByLang($scope.editFreeService, $scope.titleLang);
  }

  $scope.getServiceTitleByLang = function (freeService, lang) {
    for (var i = 0; i < freeService.title.length; i++) {
      if (freeService.title[i].lang == lang) {
        return freeService.title[i].text;
      }
    }
    return '';
  }

  $scope.getServiceDescriptionByLang = function (freeService, lang) {
    for (var i = 0; i < freeService.description.length; i++) {
      if (freeService.description[i].lang == lang) {
        return freeService.description[i].text;
      }
    }
    return '';
  }

  $scope.addFreeService = function () {
    $scope.editFreeService = {
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
      img: "",
      created_at: Date.now(),
      last_modified: Date.now()
    };


    $scope.descLang = $rootScope.defaultLang;
    $scope.editDesc = $scope.getServiceDescriptionByLang($scope.editFreeService, $scope.descLang);

    $scope.titleLang = $rootScope.defaultLang;
    $scope.editTitle = $scope.getServiceTitleByLang($scope.editFreeService, $scope.titleLang);

    $scope.freeServices.push($scope.editFreeService);

  }

  $scope.saveFreeService   = function () {
    console.log($scope.editFreeService);
  }
  $scope.deleteFreeService = function () {
    $scope.freeServices.splice($scope.freeServices.indexOf($scope.editFreeService), 1);
    $scope.editFreeService = null;
  }

  $scope.editFreeServiceDescription = function (desc) {
    for (var i = 0; i < $scope.editFreeService.description.length; i++) {
      if ($scope.editFreeService.description[i].lang == $scope.descLang) {
        $scope.editFreeService.description[i].text = desc;
      }
    }
  }

  $scope.changeDescLang = function (lang) {
    $scope.descLang = lang;
    $scope.editDesc = $scope.getServiceDescriptionByLang($scope.editFreeService, $scope.descLang);
    console.log("Changed desc lang,text: " + $scope.editDesc);
  }

  $scope.editFreeServiceTitle = function (title) {
    for (var i = 0; i < $scope.editFreeService.title.length; i++) {
      if ($scope.editFreeService.title[i].lang == $scope.titleLang) {
        $scope.editFreeService.title[i].text = title;
      }
    }
  }

  $scope.changeTitleLang = function (lang) {
    $scope.titleLang = lang;
    $scope.editTitle = $scope.getServiceTitleByLang($scope.editFreeService, $scope.titleLang);
    console.log("Changed title lang,text: " + $scope.editTitle);
  }
}