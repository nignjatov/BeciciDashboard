
angular.module('RDash')
  .controller('reservationsCtrl', ['$scope', '$rootScope','$cookieStore', reservationsCtrl]);

function reservationsCtrl($scope,$rootScope) {

  $scope.selectedReservation = null;

  $scope.reservations = [{
    user: {
      firstName: 'Nikola',
      lastName: 'Mirkov',
      email: "nikola@gmail.com"
    },
    room :{
      type : "two beds"
    },
    transaction:{
      id: "123124141224112",
    },
    start_date : Date.now(),
    end_date : Date.now(),
    status : 'waiting',
    created_at : Date.now()
  },{
    user: {
      firstName: 'Petar',
      lastName: 'Mirkov',
      email: "petar@gmail.com"
    },
    room :{
      type : "three beds"
    },
    transaction:{
      id: "12312414111224112",
    },
    start_date : Date.now(),
    end_date : Date.now(),
    status : 'waiting',
    created_at : Date.now()
  }];

  $scope.selectReservation = function(reservation){
    $scope.selectedReservation = reservation;
  }

  $scope.archiveReservation = function(){
    $scope.selectedReservation.status = 'archive';
    $scope.selectedReservation = null;
  }
  $scope.rejectReservation = function(){
    $scope.selectedReservation.status = 'rejected';
  }
  $scope.approveReservation = function(){
    $scope.selectedReservation.status = 'approved';
  }
}