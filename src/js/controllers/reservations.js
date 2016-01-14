
angular.module('RDash')
  .controller('reservationsCtrl', ['$scope', '$rootScope','Notification', reservationsCtrl]);

function reservationsCtrl($scope,$rootScope,Notification) {

  $rootScope.currentPage = "Reservations";

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
    Notification.primary({message: 'Reservation archived!'});
  }
  $scope.rejectReservation = function(){
    $scope.selectedReservation.status = 'rejected';
    Notification.primary({message: 'Reservation rejected!'});
  }
  $scope.approveReservation = function(){
    $scope.selectedReservation.status = 'approved';
    Notification.primary({message: 'Reservation approved!'});
  }

  $scope.sortType = "status";
  $scope.sortReverse = "true";
  $scope.searchWord   = '';
}