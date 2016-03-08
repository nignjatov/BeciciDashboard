
angular.module('RDash')
  .service('PartnerService', function ($http) {

    var servicePrefix = '/partners/';
    return {
      getPartners: function () {
        return $http({
          method: 'GET',
          url: servicePrefix+'list/all'
        });
      },
      createPartner: function (partnerData) {
        return $http({
          method: 'POST',
          url: servicePrefix,
          data: partnerData
        });
      },
      updatePartner: function (partnerId,partnerData) {
        return $http({
          method: 'PATCH',
          url:  servicePrefix+partnerId,
          data: partnerData
        });
      },
      deletePartner : function(partnerId){
        return $http({
          method: 'DELETE',
          url:  servicePrefix+partnerId,
        });
      }
    }
  });