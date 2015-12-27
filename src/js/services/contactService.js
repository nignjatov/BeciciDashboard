
angular.module('RDash')
  .service('ContactService', function ($http) {

    var servicePrefix = '/contact/';
    return {
      getContactInfo: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/all'
        });
      },
      createContactInfo: function (contactData) {
        return $http({
          method: 'POST',
          url: servicePrefix,
          data: contactData
        });
      },
      updateContactInfo: function (contactId,contactData) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+contactId,
          data: contactData
        });
      }
    }
  });