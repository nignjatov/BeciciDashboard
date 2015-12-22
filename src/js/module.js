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

RDashApp.run(function ($rootScope){

  $rootScope.dateFormat = 'medium';
  $rootScope.defaultLang = 'en';
  $rootScope.languages = [
    'en',
    'rs'
  ]

});

