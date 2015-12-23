var RDashApp = angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies'])
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
  });
  //.config(['flowFactoryProvider', function (flowFactoryProvider) {
  //  flowFactoryProvider.defaults = {
  //    target: 'upload.php',
  //    permanentErrors: [404, 500, 501],
  //    maxChunkRetries: 1,
  //    chunkRetryInterval: 5000,
  //    simultaneousUploads: 4,
  //    singleFile: true
  //  };
  //  flowFactoryProvider.on('catchAll', function (event) {
  //    console.log('catchAll', arguments);
  //  });
  //  // Can be used with different implementations of Flow.js
  //  // flowFactoryProvider.factory = fustyFlowFactory;
  //}]);

RDashApp.run(function ($rootScope){

  $rootScope.currency = "RSD";
  $rootScope.dateFormat = 'medium';
  $rootScope.defaultLang = 'en';
  $rootScope.languages = [
    'en',
    'rs'
  ]

});

