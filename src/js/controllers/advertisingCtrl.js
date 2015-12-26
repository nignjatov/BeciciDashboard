angular.module('RDash')
  .controller('advertisingCtrl', ['$scope', '$rootScope','$cookieStore', advertisingCtrl]);

function advertisingCtrl($scope,$rootScope) {

  $scope.editDesc  = {
    text : ""
  };
  $scope.editTitle = {
    text : ""
  };
  $scope.usedLang = $rootScope.defaultLang;

  $scope.advertising = [{
    title: [
      {
        text: 'Summer fun',
        lang: 'en'
      },
      {
        text: 'Zabava leti',
        lang: 'rs'
      }],
    description: [
      {
        text: 'Party every night',
        lang: 'en'
      },
      {
        text: 'Zurka svake veceri',
        lang: 'rs'
      }],
    img: "",
    created_at: Date.now(),
    last_modified: Date.now()
  }];

  $scope.editAdvertising = null;

  $scope.selectAdvert = function (advert) {
    $scope.editAdvertising = advert;

    $scope.usedLang = $rootScope.defaultLang;
    $scope.getAdvertDescriptionByLang($scope.usedLang);
    $scope.reloadAdvertTitleByLang($scope.usedLang);
  }

  $scope.getAdvertTitleByLang = function (advert, lang) {
    for (var i = 0; i < advert.title.length; i++) {
      if (advert.title[i].lang == lang) {
        return advert.title[i].text;
      }
    }
    return '';
  }

  $scope.reloadAdvertTitleByLang = function (lang) {
    for (var i = 0; i < $scope.editAdvertising.title.length; i++) {
      if ($scope.editAdvertising.title[i].lang == lang) {
        $scope.editTitle.text = $scope.editAdvertising.title[i].text;
        return $scope.editAdvertising.title[i].text;
      }
    }
    return '';
  }

  $scope.getAdvertDescriptionByLang = function (lang) {
    for (var i = 0; i < $scope.editAdvertising.description.length; i++) {
      if ($scope.editAdvertising.description[i].lang == lang) {
        $scope.editDesc.text = $scope.editAdvertising.description[i].text;
        return $scope.editAdvertising.description[i].text;
      }
    }
    return '';
  }

  $scope.addAdvert = function () {
    $scope.editAdvertising = {
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
    $scope.getAdvertDescriptionByLang($scope.usedLang);
    $scope.reloadAdvertTitleByLang($scope.titleLang);

    $scope.freeServices.push($scope.editAdvertising);

  }

  $scope.saveAdvert = function () {
    console.log($scope.editAdvertising);
  }

  $scope.deleteAdvert = function () {
    $scope.advertising.splice($scope.advertising.indexOf($scope.editAdvertising), 1);
    $scope.editAdvertising = null;
  }

  $scope.editAdvertDescription = function (desc) {
    for (var i = 0; i < $scope.editAdvertising.description.length; i++) {
      if ($scope.editAdvertising.description[i].lang == $scope.usedLang) {
        $scope.editAdvertising.description[i].text = desc;
      }
    }
  }

  $scope.editAdvertTitle = function (title) {
    for (var i = 0; i < $scope.editAdvertising.title.length; i++) {
      if ($scope.editAdvertising.title[i].lang == $scope.usedLang) {
        $scope.editAdvertising.title[i].text = title;
      }
    }
  }

  $scope.changeLang = function (lang) {
    $scope.usedLang = lang;
    $scope.reloadAdvertTitleByLang($scope.usedLang);
    $scope.getAdvertDescriptionByLang($scope.usedLang);
  }
}