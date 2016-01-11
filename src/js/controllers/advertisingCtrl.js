angular.module('RDash')
  .controller('advertisingCtrl', ['$scope', '$rootScope', 'BlogService','Notification', advertisingCtrl]);

function advertisingCtrl($scope, $rootScope, BlogService,Notification) {

  $rootScope.currentPage = "Advertising";

  $scope.advertising     = [];
  $scope.editAdvertising = null;
  $scope.editDesc        = {
    text: ""
  };
  $scope.editTitle       = {
    text: ""
  };

  $scope.multimedia = "";
  $scope.usedLang        = $rootScope.defaultLang;

  $scope.obj = {
    flow: null
  };

  BlogService.getNewsItems().then(function (data) {
    $scope.advertising = data.data;
  });

  $scope.selectAdvert = function (advert) {
    $scope.editAdvertising = advert;

    $scope.multimedia = $rootScope.getImageUrl($scope.editAdvertising.multimedia);
    $scope.usedLang                   = $rootScope.defaultLang;
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
      blogType: 'news',
      title: $rootScope.createLangFields(),
      description: $rootScope.createLangFields(),
      img: ""
    };

    $scope.multimedia = "";
    $scope.usedLang = $rootScope.defaultLang;
    $scope.getAdvertDescriptionByLang($scope.usedLang);
    $scope.reloadAdvertTitleByLang($scope.usedLang);

  }

  $scope.saveAdvert = function () {
    if (typeof $scope.editAdvertising._id === 'undefined') {
      //new service
      console.log("Creating advert");
      BlogService.createBlogItem($scope.editAdvertising).then(function (data) {
        $scope.editAdvertising = data.data;
        $scope.uploadPicture();
        $scope.advertising.push(data.data);
        $scope.editAdvertising = null;
        Notification.primary({message: 'Created new advertisement!'});
      });
    } else {
      console.log($scope.editAdvertising);
      BlogService.updateBlogItem($scope.editAdvertising._id, $scope.editAdvertising).then(function (data) {
        $scope.uploadPicture();
        $scope.editAdvertising = null;
        Notification.primary({message: 'Advertisement updated!'});
      });
    }
  }

  $scope.deleteAdvert = function () {
    BlogService.deleteBlogItem($scope.editAdvertising._id).then(function (data) {
      $scope.advertising.splice($scope.advertising.indexOf($scope.editAdvertising), 1);
      $scope.editAdvertising = null;
      Notification.primary({message: 'Advertisement removed!'});
    });
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

  $scope.uploadPicture = function () {
    if (typeof $scope.obj.flow.files !== 'undefined') {
      BlogService.uploadImage($scope.editAdvertising._id, $scope.obj.flow).then(function (data) {
        for( var i = 0; i<$scope.advertising.length; i++){
          if ((typeof $scope.advertising[i]._id !== 'undefined') && ($scope.advertising[i]._id == data._id)){
            $scope.advertising[i].multimedia = data.filename;
          }
        }
      }).catch( function (err){
        console.log("FAILURE");
      });

    }
  }
}