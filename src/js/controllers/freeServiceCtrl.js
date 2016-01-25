
angular.module('RDash')
  .controller('freeServicesCtrl', ['$scope', '$rootScope','HotelServicesService','Notification', freeServicesCtrl]);

function freeServicesCtrl($scope,$rootScope,HotelServicesService,Notification) {

  $rootScope.currentPage = "Free Services";

  $scope.editDesc  = {
    text : ""
  };
  $scope.editTitle = {
    text : ""
  };

  $scope.obj = {
    flow: null
  };
  $scope.multimedia = "";
  $scope.usedLang = $rootScope.defaultLang;

  $scope.editFreeService = null;

  HotelServicesService.getFreeServices().then (function (data) {
    $scope.freeServices = data.data;
  });

  $scope.selectFreeService = function (freeService) {
    $scope.editFreeService = freeService;
    $scope.usedLang = $rootScope.defaultLang;

    $scope.multimedia = $rootScope.getImageUrl($scope.editFreeService.image);
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
      serviceType: "freeService",
      title: $rootScope.createLangFields(),
      description: $rootScope.createLangFields(),
      img: "",
    };

    $scope.multimedia = "";
    $scope.usedLang = $rootScope.defaultLang;
    $scope.getServiceDescriptionByLang($scope.usedLang);
    $scope.reloadServiceTitleByLang($scope.usedLang);
  }

  $scope.saveFreeService   = function () {
    if (typeof $scope.editFreeService._id  === 'undefined') {
      //new service
      console.log("Creating free service ");
      HotelServicesService.createService($scope.editFreeService).then(function(data){
        $scope.freeServices.push(data.data);
        $scope.editFreeService = data.data;
        $scope.uploadPicture();
        $scope.editFreeService = null;
        Notification.primary({message: 'Created new free service!'});
      }).catch(function (err) {
        Notification.error({message: 'Failed to create new free service!'});
      });
    } else {
      HotelServicesService.updateService($scope.editFreeService._id,$scope.editFreeService).then(function (data) {
        $scope.editFreeService = data.data;
        $scope.uploadPicture();
        $scope.editFreeService = null;
        Notification.primary({message: 'Free service updated!'});
      }).catch(function (err) {
        Notification.error({message: 'Failed to update free service!'});
      });
    }
  }

  $scope.deleteFreeService = function () {
    HotelServicesService.deleteHotelService($scope.editFreeService._id).then(function (data) {
      $scope.freeServices.splice($scope.freeServices.indexOf($scope.editFreeService), 1);
      $scope.editFreeService = null;
      Notification.primary({message: 'Free service removed!'});
    }).catch(function (err) {
      Notification.error({message: 'Failed to remove free service!'});
    });
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

  $scope.uploadPicture = function () {
    if (typeof $scope.obj.flow.files !== 'undefined') {
      HotelServicesService.uploadImage($scope.editFreeService._id, $scope.obj.flow).then(function (data) {
        for( var i = 0; i<$scope.freeServices.length; i++){
          if ((typeof $scope.freeServices[i]._id !== 'undefined') && ($scope.freeServices[i]._id == data._id)){
            $scope.freeServices[i].image = data.filename;
          }
        }
      }).catch( function (err){
        Notification.error({message: 'Failed to upload picture!'});
      });

    }
  }

  $scope.sortType = "title";
  $scope.sortReverse = "true";
  $scope.searchWord   = '';
}