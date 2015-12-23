angular.module('RDash')
  .controller('contactCtrl', ['$scope', '$cookieStore', contactCtrl]);

function contactCtrl($scope) {

  $scope.contact = {
    latitude: 42.28295,
    longitude: 18.87260
  };

  $scope.saveContactData = function () {
    console.log("MARKER LAT "+$scope.marker.getPosition().lat());
    console.log("MARKER LONG "+$scope.marker.getPosition().lng());

  }
  function initialize() {

    var myLatLng = {lat: 42.28295, lng: 18.87260};

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 15,
      center: myLatLng
    });

    $scope.marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      draggable:true,
      title: 'Hotel Becici!'
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);



}