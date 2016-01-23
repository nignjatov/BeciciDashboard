angular.module('RDash')
  .controller('socialCtrl', ['$scope', '$rootScope','SocialService','Notification', socialCtrl]);

function socialCtrl($scope,$rootScope, SocialService,Notification) {

  $rootScope.currentPage = "Social Networks";

  $scope.defaultNetworks = [
    "Facebook",
    "Twitter",
    "Youtube",
    "Instagram",
    "LinkedIn"
  ];

  $scope.socials = [];

  SocialService.getAllNetworks()
    .then(function (data) {
      $scope.socials = data.data;
      filterNetworks();
    });

  $scope.addNetworkName  = "";
  $scope.availableNetworks = [];
  filterNetworks();
  $scope.addNetwork = function () {
    if ($scope.addNetworkName != "") {
      SocialService.createNetwork({
        network: $scope.addNetworkName
      })
        .then(function (data) {
          $scope.socials.push(data.data);
          filterNetworks();
          console.log($scope.socials);
          $scope.addNetworkName = ""
          Notification.primary({message: 'Social network added!'});
        }).catch(function (err) {
            Notification.error({message: 'Failed to add social network!'});
          });
    }
  }

  $scope.saveSocialData   = function (social) {
    SocialService.updateNetwork(social._id, {
      active: social.active,
      link: social.link
    }).then(function (data) {
      console.log(social);
      Notification.primary({message: 'Social network updated!'});
    }).catch(function (err) {
      Notification.error({message: 'Failed to update social networks!'});
    });

  }
  $scope.deleteSocialData = function (social) {
    SocialService.deleteNetwork(social._id).then(function (data) {
      $scope.socials.splice($scope.socials.indexOf(social), 1);
      filterNetworks();
      Notification.primary({message: 'Social network removed!'});
    }).catch(function (err) {
      Notification.error({message: 'Failed to remove social network!'});
    });
  }

  function filterNetworks() {
    $scope.availableNetworks = [];
    for (var i = 0; i < $scope.defaultNetworks.length; i++) {
      var found = false;
      for (var j = 0; j < $scope.socials.length; j++) {
        if ($scope.defaultNetworks[i] == $scope.socials[j].network) {
          found = true;
        }
      }
      if(found === false){
        $scope.availableNetworks.push($scope.defaultNetworks[i]);
      }
    }
  }
}