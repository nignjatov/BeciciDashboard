
angular.module('RDash')
  .controller('multimediaCtrl', ['$scope', '$cookieStore', multimediaCtrl]);

function multimediaCtrl($scope,$rootScope) {

  $scope.selectedAlbum = null;

  $scope.albums = [
    {
      title : "Rooms",
      images : [
        "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg",
        "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg"
        ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
    {
      title : "Restaurant",
      images : [
        "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg"
      ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
    {
      title : "Pool",
      images : [
        "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg"
      ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
    {
      title : "City",
      images : [
        "http://www.arrowwoodresort.com/images/sized/up/gallery/Family_Room_3-140x140.jpg"
      ],
      created_at : Date.now(),
      last_modified : Date.now()
    },
  ];

  $scope.selectAlbum = function(album){
    $scope.selectedAlbum = album;
  }

  $scope.deleteAlbum = function(){
    $scope.albums.splice($scope.albums.indexOf($scope.selectedAlbum),1);
    $scope.selectedAlbum = null;
  }


}