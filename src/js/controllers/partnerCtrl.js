angular.module('RDash')
    .controller('partnerCtrl', ['$scope', '$rootScope', 'PartnerService', 'Notification', partnerCtrl]);

function partnerCtrl($scope, $rootScope, PartnerService, Notification) {

    $rootScope.currentPage = "Partners";

    $scope.selectedPartner = null;
    $scope.partners = [];

    PartnerService.getPartners().then(function (data) {
        $scope.partners = data.data;
    });

    $scope.addPartnerData = function () {
        $scope.selectedPartner = {
            title : ""
        };
    }

    $scope.selectPartner = function(partner){
        $scope.selectedPartner = partner;
    }
    $scope.savePartner = function () {
        if (typeof $scope.selectedPartner._id === 'undefined') {
            PartnerService.createPartner($scope.selectedPartner).then(function (data) {
                Notification.primary({message: 'Partner created!'});
                $scope.selectedPartner = data.data;
                $scope.partners.push($scope.selectedPartner);
                $scope.selectedPartner = null;
            }).catch(function (err) {
                Notification.error({message: 'Failed to create partner!'});
            });
        } else {
            PartnerService.updatePartner($scope.selectedPartner._id, $scope.selectedPartner).then(function (data) {
                Notification.primary({message: 'Partner updated!'});
                $scope.selectedPartner = null;
            }).catch(function (err) {
                Notification.error({message: 'Failed to update partner!'});
            });
        }
    }
    $scope.deletePartner = function () {
        PartnerService.deletePartner($scope.selectedPartner._id).then(function (data) {
            Notification.primary({message: 'Partner deleted!'});
            $scope.partners.splice($scope.partners.indexOf($scope.selectedPartner),1);
            $scope.selectedPartner = null;
        }).catch(function (err) {
            Notification.error({message: 'Failed to delete partner!'});
        });
    }
}