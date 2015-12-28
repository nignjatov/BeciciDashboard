var RDashApp = angular.module('RDash', ['ui.router', 'ngCookies','flow','ui-notification','ui.bootstrap',
  'ui.bootstrap.datetimepicker','chart.js'])
  .filter('html', function ($sce) {
  return function (input) {
    return $sce.trustAsHtml(input);
  }
  })
  .filter('language', function ($sce) {
    return function (input) {
      if(input === 'en'){
        return $sce.trustAsHtml('English');
      } else if (input === 'rs'){
        return $sce.trustAsHtml('Srpski');
      }
    }
  })
  .config(['flowFactoryProvider','$httpProvider', function (flowFactoryProvider,$httpProvider) {


    $httpProvider.interceptors.push('myHttpInterceptor');

    flowFactoryProvider.defaults = {
      target: 'upload.php',
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: true
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
  }]).config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
    });
  });

RDashApp.run(function ($rootScope){

  $rootScope.currentPage = "Dashboard";
  $rootScope.latitude = 42.28295;
  $rootScope.longitude = 18.87260;

  $rootScope.currency = "RSD";
  $rootScope.dateFormat = 'medium';
  $rootScope.defaultLang = 'en';
  $rootScope.languages = [
    'en',
    'rs'
  ]

  $rootScope.serverUrl = "http://192.168.1.3:3000/api";

  $rootScope.getImageUrl = function(filename){
    return $rootScope.serverUrl + "/images/images/"+filename
  };

});

