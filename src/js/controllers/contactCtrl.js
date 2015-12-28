angular.module('RDash')
  .controller('contactCtrl', ['$scope','$rootScope', 'ContactService','Notification', contactCtrl]);

function contactCtrl($scope,$rootScope,ContactService,Notification) {

  $rootScope.currentPage = "Contact";

  $scope.contact = {};
  ContactService.getContactInfo().then(function(data) {
    if(data.data.length == 0){
      $scope.contact = {
        latitude: $rootScope.latitude,
        longitude: $rootScope.longitude
      };
    } else {
      $scope.contact = data.data[0];
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  });

  $scope.saveContactData = function () {
    $scope.contact.latitude = $scope.marker.getPosition().lat();
    $scope.contact.longitude = $scope.marker.getPosition().lng();
    if((typeof $scope.contact._id  === 'undefined')){
      ContactService.createContactInfo($scope.contact).then(function (data){
        $scope.contact = data.data;
        Notification.primary({message: 'Contact information saved!'});
      });
    } else {
      ContactService.updateContactInfo($scope.contact._id,$scope.contact).then(function (data){
        Notification.primary({message: 'Contact information saved!'});
      });
    }
  }
  function initialize() {

    var myLatLng = {lat: $scope.contact.latitude, lng: $scope.contact.longitude};

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: myLatLng
    });

    $scope.marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      draggable:true,
      title: 'O Zone Hotel Becici'
    });
  }




}