angular.module('RDash')
    .controller('advertisingCtrl', ['$scope', '$rootScope','$modal', 'BlogService', 'Notification', advertisingCtrl]);

function advertisingCtrl($scope, $rootScope,$modal, BlogService, Notification) {

    $rootScope.currentPage = "Advertising";

    $scope.advertising = [];
    $scope.editAdvertising = null;

    $scope.multimedia = "";
    $scope.usedLang = $rootScope.defaultLang;

    $scope.obj = {
        flow: null
    };

    BlogService.getNewsItems().then(function (data) {
        $scope.advertising = data.data;
    });

    $scope.selectAdvert = function (advert) {
        $scope.editAdvertising = advert;

        $scope.multimedia = $rootScope.getImageUrl($scope.editAdvertising.multimedia);
        $scope.usedLang = $rootScope.defaultLang;
    }

    $scope.addAdvert = function () {
        $scope.editAdvertising = {
            blogType: 'news',
            title: $rootScope.createLangFields(),
            description: $rootScope.createLangFields(),
            img: ""
        };

        $scope.multimedia = "";
        $scope.usedLang = $rootScope.defaultLang;
    }

    $scope.saveAdvert = function () {
        if (typeof $scope.editAdvertising._id === 'undefined') {
            //new service
            console.log("Creating advert");
            BlogService.createBlogItem($scope.editAdvertising).then(function (data) {
                $scope.editAdvertising = data.data;
                $scope.uploadPicture();
                $scope.advertising.push(data.data);
                $scope.editAdvertising = null;
                Notification.primary({message: 'Created new advertisement!'});
            }).catch(function () {
                Notification.error({message: 'Failed to create advertisement!'});
            });
        } else {
            console.log($scope.editAdvertising);
            BlogService.updateBlogItem($scope.editAdvertising._id, $scope.editAdvertising).then(function (data) {
                $scope.uploadPicture();
                $scope.editAdvertising = null;
                Notification.primary({message: 'Advertisement updated!'});
            }).catch(function () {
                Notification.error({message: 'Failed to update advertisement!'});
            });
        }
    }

    $scope.deleteAdvert = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            BlogService.deleteBlogItem($scope.editAdvertising._id).then(function (data) {
                $scope.advertising.splice($scope.advertising.indexOf($scope.editAdvertising), 1);
                $scope.editAdvertising = null;
                Notification.primary({message: 'Advertisement removed!'});
            }).catch(function () {
                Notification.error({message: 'Failed to remove advertisement!'});
            });
        });
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
    }

    $scope.uploadPicture = function () {
        if (typeof $scope.obj.flow.files !== 'undefined') {
            BlogService.uploadImage($scope.editAdvertising._id, $scope.obj.flow).then(function (data) {
                Notification.primary({message: 'Advert picture uploaded!'});
            }).catch(function (err) {
                Notification.error({message: 'Failed to upload advert picture!'});
            });

        }
    }

    $scope.sortType = "title";
    $scope.sortReverse = "true";
    $scope.searchWord = '';

}