angular.module('RDash')
  .controller('socialCtrl', ['$scope', '$cookieStore', socialCtrl]);

function socialCtrl($scope) {

  $scope.addNetworkName  = "";
  $scope.defaultNetworks = [
    "Facebook",
    "Twitter",
    "YouTube"
  ];
  $scope.socials = [
    {
      name: "Facebook",
      active: false,
      link: ""
    }
  ];

  $scope.addNetwork = function () {
    if ($scope.addNetworkName != "") {
      $scope.socials.push({
        name: $scope.addNetworkName,
        active: false,
        link: ""
      });
      filterNetworks();
      console.log($scope.socials);
      $scope.addNetworkName  = ""
    }
  }

  $scope.saveSocialData = function(){
    console.log($scope.socials);
  }
  function filterNetworks() {
    for (var i = 0; i < $scope.defaultNetworks.length; i++) {
      for (var j = 0; j < $scope.socials.length; j++) {
        if ($scope.defaultNetworks[i] == $scope.socials[j].name) {
          $scope.defaultNetworks.splice(i, 1);
        }
      }
    }
  }

  filterNetworks();
}