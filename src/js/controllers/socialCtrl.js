angular.module('RDash')
  .controller('socialCtrl', ['$scope', '$rootScope','SocialService', socialCtrl]);

function socialCtrl($scope,$rootScope, SocialService) {

  $rootScope.currentPage = "Social Networks";

  $scope.socials = [];

  SocialService.getAllNetworks()
    .then(function (data) {
      $scope.socials = data.data;
      filterNetworks();
    });

  $scope.addNetworkName  = "";
  $scope.defaultNetworks = [
    "Facebook",
    "Twitter",
    "YouTube"
  ];

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
        });
    }
  }

  $scope.saveSocialData   = function (social) {
    SocialService.updateNetwork(social._id, {
      active: social.active,
      link: social.link
    }).then(function (data) {
      console.log(social);
    });

  }
  $scope.deleteSocialData = function (social) {
    SocialService.deleteNetwork(social._id).then(function (data) {
      $scope.socials.splice($scope.socials.indexOf(social), 1);
      filterNetworks();
    });
  }

  function filterNetworks() {
    for (var i = 0; i < $scope.defaultNetworks.length; i++) {
      for (var j = 0; j < $scope.socials.length; j++) {
        if ($scope.defaultNetworks[i] == $scope.socials[j].network) {
          $scope.defaultNetworks.splice(i, 1);
        }
      }
    }
  }
}