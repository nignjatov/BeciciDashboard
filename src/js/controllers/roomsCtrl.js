
angular.module('RDash')
  .controller('roomsCtrl', ['$scope','roomsService', roomsCtrl]);

function roomsCtrl($scope, roomsService) {

  $scope.selectedRoom = null;

  $scope.rooms = [
    {
      title : "Delux",
      type : "Best room",
      image : "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg",
      available : [

      ],
      price : 99,
      bed_number : 2,
      number_of_rooms : 2,
      free_services : [
        {
          title: "WIFI",
          active: true
        },
        {
          title: "BBF",
          active: true
        },
        {
          title: "QQQQQ",
          active: false
        },
        {
          title: "asdas",
          active: true
        },
      ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
    {
      title : "King size",
      type : "Appartment",
      image : "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg",
      available : [
        {
          from: Date.now(),
          to: Date.now(),
          amount: 5
        }
      ],
      price : 199,
      bed_number : 3,
      free_services : [

      ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
    {
      title : "King size",
      type : "Appartment",
      image : "http://www.arrowwoodresort.com/images/sized/up/Family_room-572x223.jpg",
      available : [

      ],
      price : 199,
      bed_number : 3,
      free_services : [

      ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
    {
      title : "King size",
      type : "Appartment",
      image : "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg",
      available : [

      ],
      price : 199,
      bed_number : 3,
      free_services : [

      ],
      created_at : Date.now(),
      last_modified : Date.now()
    }
  ];

  $scope.selectRoom = function(room){
    $scope.selectedRoom = room;
  }

  $scope.deleteRoom = function(){
    $scope.rooms.splice($scope.rooms.indexOf($scope.selectedRoom),1);
    $scope.selectedRoom = null;
  }
}