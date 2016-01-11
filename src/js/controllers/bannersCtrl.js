angular.module('RDash')
  .controller('bannersCtrl', ['$scope', '$rootScope', 'BlogService', 'Notification', bannersCtrl]);

function bannersCtrl($scope, $rootScope, BlogService, Notification) {

  $rootScope.currentPage = "Banners";

  $scope.banners    = [];
  $scope.editBanner = null;
  $scope.editDesc   = {
    text: ""
  };
  $scope.editTitle  = {
    text: ""
  };

  $scope.multimedia = "";
  $scope.usedLang   = $rootScope.defaultLang;

  $scope.obj = {
    flow: null
  };

  BlogService.getBannerItems().then(function (data) {
    $scope.banners = data.data;
  });

  $scope.selectBanner = function (banner) {
    $scope.editBanner = banner;

    $scope.multimedia = $rootScope.getImageUrl($scope.editBanner.multimedia);
    $scope.usedLang   = $rootScope.defaultLang;
    $scope.getBannerDescriptionByLang($scope.usedLang);
    $scope.reloadBannerTitleByLang($scope.usedLang);
  }

  $scope.getBannerTitleByLang = function (banner, lang) {
    for (var i = 0; i < banner.title.length; i++) {
      if (banner.title[i].lang == lang) {
        return banner.title[i].text;
      }
    }
    return '';
  }

  $scope.reloadBannerTitleByLang = function (lang) {
    for (var i = 0; i < $scope.editBanner.title.length; i++) {
      if ($scope.editBanner.title[i].lang == lang) {
        $scope.editTitle.text = $scope.editBanner.title[i].text;
        return $scope.editBanner.title[i].text;
      }
    }
    return '';
  }

  $scope.getBannerDescriptionByLang = function (lang) {
    for (var i = 0; i < $scope.editBanner.description.length; i++) {
      if ($scope.editBanner.description[i].lang == lang) {
        $scope.editDesc.text = $scope.editBanner.description[i].text;
        return $scope.editBanner.description[i].text;
      }
    }
    return '';
  }

  $scope.addBannerItem = function () {
    $scope.editBanner = {
      blogType: 'banner',
      title: $rootScope.createLangFields(),
      description: $rootScope.createLangFields(),
      img: ""
    };

    $scope.multimedia = "";
    $scope.usedLang   = $rootScope.defaultLang;
    $scope.getBannerDescriptionByLang($scope.usedLang);
    $scope.reloadBannerTitleByLang($scope.usedLang);

  }

  $scope.saveBannerItem = function () {
    if (typeof $scope.editBanner._id === 'undefined') {
      console.log("Creating banner item");
      BlogService.createBlogItem($scope.editBanner).then(function (data) {
        $scope.editBanner = data.data;
        $scope.uploadPicture();
        $scope.banners.push(data.data);
        $scope.editBanner = null;
        Notification.primary({message: 'Created new banner item!'});
      });
    } else {
      console.log($scope.editBanner);
      BlogService.updateBlogItem($scope.editBanner._id, $scope.editBanner).then(function (data) {
        $scope.uploadPicture();
        $scope.editBanner = null;
        Notification.primary({message: 'Banner item updated!'});
      });
    }
  }

  $scope.deleteBanner = function () {
    BlogService.deleteBlogItem($scope.editBanner._id).then(function (data) {
      $scope.banners.splice($scope.banners.indexOf($scope.editBanner), 1);
      $scope.editBanner = null;
      Notification.primary({message: 'Banner item removed removed!'});
    });
  }

  $scope.editBannerDescription = function (desc) {
    for (var i = 0; i < $scope.editBanner.description.length; i++) {
      if ($scope.editBanner.description[i].lang == $scope.usedLang) {
        $scope.editBanner.description[i].text = desc;
      }
    }
  }

  $scope.editBannerTitle = function (title) {
    for (var i = 0; i < $scope.editBanner.title.length; i++) {
      if ($scope.editBanner.title[i].lang == $scope.usedLang) {
        $scope.editBanner.title[i].text = title;
      }
    }
  }

  $scope.changeLang = function (lang) {
    $scope.usedLang = lang;
    $scope.reloadBannerTitleByLang($scope.usedLang);
    $scope.getBannerDescriptionByLang($scope.usedLang);
  }

  $scope.uploadPicture = function () {
    if (typeof $scope.obj.flow.files !== 'undefined') {
      BlogService.uploadImage($scope.editBanner._id, $scope.obj.flow).then(function (data) {
        for (var i = 0; i < $scope.banners.length; i++) {
          if ((typeof $scope.banners[i]._id !== 'undefined') && ($scope.banners[i]._id == data._id)) {
            $scope.banners[i].multimedia = data.filename;
          }
        }
      }).catch(function (err) {
        console.log("FAILURE");
      });

    }
  }
}