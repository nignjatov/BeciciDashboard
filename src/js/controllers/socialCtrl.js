angular.module('RDash')
  .controller('socialCtrl', ['$scope', '$cookieStore', socialCtrl]);

function socialCtrl($scope) {

  $scope.addNetworkName  = "";
  $scope.defaultNetworks = [
    "Facebook",
    "Twitter",
    "YouTube"
  ];
  $scope.socials         = [
    {
      name: "Facebook",
      active: true,
      link: "www.facebook.com"
    }
  ];

  $scope.addNetwork = function () {
    console.log("ADD " + $scope.addNetworkName);
    $scope.socials.push({
      name: $scope.addNetworkName,
      active: true,
      link: "www." + $scope.addNetworkName + ".com"
    });
    filterNetworks();
    console.log($scope.socials);
  }

  function filterNetworks() {
    for (var i = 0; i < $scope.defaultNetworks.length; i++) {
      for (var j = 0; j < $scope.socials.length; j++) {
          if($scope.defaultNetworks[i] == $scope.socials[j].name){
            $scope.defaultNetworks.splice(i,1);
          }
      }
    }
  }

  filterNetworks();
}