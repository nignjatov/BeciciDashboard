
angular.module('RDash')
  .controller('freeServicesCtrl', ['$scope', '$rootScope','$cookieStore', freeServicesCtrl]);

function freeServicesCtrl($scope,$rootScope) {



  $scope.editDesc  = {
    text : ""
  };
  $scope.editTitle = {
    text : ""
  };
  $scope.usedLang = $rootScope.defaultLang;

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
  },
    {
      title: [
        {
          text: 'Pool',
          lang: 'en'
        },
        {
          text: 'Bazen',
          lang: 'rs'
        }],
      description: [
        {
          text: 'Swim for free',
          lang: 'en'
        },
        {
          text: 'Plivajte besplatno',
          lang: 'rs'
        }],
      img: "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg",
      created_at: Date.now(),
      last_modified: Date.now()
    }];

  $scope.editFreeService = null;

  $scope.selectFreeService = function (freeService) {
    $scope.editFreeService = freeService;

    $scope.usedLang = $rootScope.defaultLang;
    $scope.getServiceDescriptionByLang($scope.usedLang);
    $scope.reloadServiceTitleByLang($scope.usedLang);
  }

  $scope.getServiceTitleByLang = function (freeService, lang) {
    for (var i = 0; i < freeService.title.length; i++) {
      if (freeService.title[i].lang == lang) {
        return freeService.title[i].text;
      }
    }
    return '';
  }

  $scope.reloadServiceTitleByLang = function (lang) {
    for (var i = 0; i < $scope.editFreeService.title.length; i++) {
      if ($scope.editFreeService.title[i].lang == lang) {
        $scope.editTitle.text = $scope.editFreeService.title[i].text;
        return $scope.editFreeService.title[i].text;
      }
    }
    return '';
  }

  $scope.getServiceDescriptionByLang = function (lang) {
    for (var i = 0; i < $scope.editFreeService.description.length; i++) {
      if ($scope.editFreeService.description[i].lang == lang) {
        $scope.editDesc.text = $scope.editFreeService.description[i].text;
        return $scope.editFreeService.description[i].text;
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


    $scope.usedLang = $rootScope.defaultLang;
    $scope.getServiceDescriptionByLang($scope.usedLang);
    $scope.reloadServiceTitleByLang($scope.titleLang);

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
      if ($scope.editFreeService.description[i].lang == $scope.usedLang) {
        $scope.editFreeService.description[i].text = desc;
      }
    }
  }

  $scope.editFreeServiceTitle = function (title) {
    for (var i = 0; i < $scope.editFreeService.title.length; i++) {
      if ($scope.editFreeService.title[i].lang == $scope.usedLang) {
        $scope.editFreeService.title[i].text = title;
      }
    }
  }

  $scope.changeLang = function (lang) {
    $scope.usedLang = lang;
    $scope.reloadServiceTitleByLang($scope.usedLang);
    $scope.getServiceDescriptionByLang($scope.usedLang);
  }
}