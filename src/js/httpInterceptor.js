angular.module('RDash').factory('myHttpInterceptor', function($q) {
  return {
    // optional method
    'request': function(config) {
      // do something on success
      console.log(config);
      if(!/.html/.test(config.url)){
        config.url = "http://194.106.182.81:3000/api"+ config.url;
        console.log("NEW URL "+ config.url);
      }
      return config;
    },

    // optional method
    'response': function(response) {
      // do something on success
      console.log(response);
      return response;
    },

    // optional method
    'responseError': function(rejection) {
      // do something on error
      //if (canRecover(rejection)) {
      //  return responseOrNewPromise
      //}
      return $q.reject(rejection);
    }
  };
});
