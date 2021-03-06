angular.module('RDash')
  .controller('contactCtrl', ['$scope','$rootScope','$filter', 'ContactService','Notification', contactCtrl]);

function contactCtrl($scope,$rootScope,$filter, ContactService,Notification) {

  $rootScope.currentPage = "CONTACT";

  $scope.enterEmail = "";
  $scope.contact = {
    email : []
  };

  $scope.addEmail = function () {
    if($scope.enterEmail.length > 0) {
      $scope.contact.email.push($scope.enterEmail);
      $scope.enterEmail = "";
    }
  }

  $scope.deleteEmail = function(email){
    $scope.contact.email.splice($scope.contact.email.indexOf(email),1);
  }
  ContactService.getContactInfo().then(function(data) {
    if(data.data.length == 0){
      $scope.contact.latitude = $rootScope.latitude;
      $scope.contact.longitude = $rootScope.longitude;
    } else {
      $scope.contact = data.data[0];
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  });

  $scope.saveContactData = function () {
    if((typeof $scope.marker  !== 'undefined')){
      $scope.contact.latitude = $scope.marker.getPosition().lat();
      $scope.contact.longitude = $scope.marker.getPosition().lng();
    }
    if((typeof $scope.contact._id  === 'undefined')){
      ContactService.createContactInfo($scope.contact).then(function (data){
        $scope.contact = data.data;
        Notification.primary({message: $filter('translate')('UPDATED_CONTACT_INFO')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('NOT_UPDATED_CONTACT_INFO')});
      });
    } else {
      ContactService.updateContactInfo($scope.contact._id,$scope.contact).then(function (data){
        Notification.primary({message: $filter('translate')('UPDATED_CONTACT_INFO')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('NOT_UPDATED_CONTACT_INFO')});
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
      title: 'Hotel Becici'
    });
  }




}