angular.module('RDash')
  .controller('contactCtrl', ['$scope', '$cookieStore', contactCtrl]);

function contactCtrl($scope) {

  $scope.contact = {
    latitude: 42.28295,
    longitude: 18.87260
  };

  $scope.saveContactData = function () {
    console.log($scope.contact);
  }
  function initialize() {
    var mapProp = {
      center: new google.maps.LatLng(42.28295, 18.87260),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map= new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }

  google.maps.event.addDomListener(window, 'load', initialize);



}