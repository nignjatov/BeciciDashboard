angular.module('RDash')
    .controller('advertisingCtrl', ['$scope', '$rootScope','$modal', '$filter','BlogService', 'Notification', advertisingCtrl]);

function advertisingCtrl($scope, $rootScope,$modal,$filter, BlogService, Notification) {

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
                Notification.primary({message: $filter('translate')('CREATED_BLOG_ITEM')});
            }).catch(function () {
                Notification.error({message: $filter('translate')('NOT_CREATED_BLOG_ITEM')});
            });
        } else {
            console.log($scope.editAdvertising);
            BlogService.updateBlogItem($scope.editAdvertising._id, $scope.editAdvertising).then(function (data) {
                $scope.uploadPicture();
                $scope.editAdvertising = null;
                Notification.primary({message: $filter('translate')('UPDATED_BLOG_ITEM')});
            }).catch(function () {
                Notification.error({message: $filter('translate')('NOT_UPDATED_BLOG_ITEM')});
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
                Notification.primary({message: $filter('translate')('DELETED_BLOG_ITEM')});
            }).catch(function () {
                Notification.error({message: $filter('translate')('NOT_DELETED_BLOG_ITEM')});
            });
        });
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
    }

    $scope.uploadPicture = function () {
        if (typeof $scope.obj.flow.files !== 'undefined') {
            BlogService.uploadImage($scope.editAdvertising._id, $scope.obj.flow).then(function (data) {
                Notification.primary({message: $filter('translate')('PICTURE_UPLOADED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('PICTURE_NOT_UPLOADED')});
            });

        }
    }

    $scope.sortType = "title";
    $scope.sortReverse = "true";
    $scope.searchWord = '';

}