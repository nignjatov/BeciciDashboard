angular.module('RDash')
    .controller('bannersCtrl', ['$scope', '$rootScope','$modal','$filter', 'BlogService', 'Notification', bannersCtrl]);

function bannersCtrl($scope, $rootScope,$modal,$filter, BlogService, Notification) {

    $rootScope.currentPage = "Banners";

    $scope.banners = [];
    $scope.editBanner = null;

    $scope.multimedia = "";
    $scope.usedLang = $rootScope.defaultLang;

    $scope.obj = {
        flow: null
    };

    BlogService.getBannerItems().then(function (data) {
        $scope.banners = data.data;
    });

    $scope.selectBanner = function (banner) {
        $scope.editBanner = banner;

        $scope.multimedia = $rootScope.getImageUrl($scope.editBanner.multimedia);
        $scope.usedLang = $rootScope.defaultLang;
    }

    $scope.addBannerItem = function () {
        $scope.editBanner = {
            blogType: 'banner',
            title: $rootScope.createLangFields(),
            description: $rootScope.createLangFields(),
            img: ""
        };
        $scope.multimedia = "";
        $scope.usedLang = $rootScope.defaultLang;

    }

    $scope.saveBannerItem = function () {
        if (typeof $scope.editBanner._id === 'undefined') {
            console.log("Creating banner item");
            BlogService.createBlogItem($scope.editBanner).then(function (data) {
                $scope.editBanner = data.data;
                $scope.uploadPicture();
                $scope.banners.push(data.data);
                $scope.editBanner = null;
                Notification.primary({message: $filter('translate')('CREATED_BANNER_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_CREATED_BANNER_ITEM')});
            });
        } else {
            console.log($scope.editBanner);
            BlogService.updateBlogItem($scope.editBanner._id, $scope.editBanner).then(function (data) {
                $scope.uploadPicture();
                $scope.editBanner = null;
                Notification.primary({message: $filter('translate')('UPDATED_BANNER_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_UPDATED_BANNER_ITEM')});
            });
        }
    }

    $scope.deleteBanner = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            BlogService.deleteBlogItem($scope.editBanner._id).then(function (data) {
                $scope.banners.splice($scope.banners.indexOf($scope.editBanner), 1);
                $scope.editBanner = null;
                Notification.primary({message: $filter('translate')('DELETED_BANNER_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_DELETED_BANNER_ITEM')});
            });
        });
    }

    $scope.editBannerDescription = function (desc) {
        for (var i = 0; i < $scope.editBanner.description.length; i++) {
            if ($scope.editBanner.description[i].lang == $scope.usedLang) {
                $scope.editBanner.description[i].text = desc;
            }
        }
    }

    $scope.editBannerTitle = function (title) {
        for (var i = 0; i < $scope.editBanner.title.length; i++) {
            if ($scope.editBanner.title[i].lang == $scope.usedLang) {
                $scope.editBanner.title[i].text = title;
            }
        }
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
    }

    $scope.uploadPicture = function () {
        if (typeof $scope.obj.flow.files !== 'undefined') {
            BlogService.uploadImage($scope.editBanner._id, $scope.obj.flow).then(function (data) {
                for (var i = 0; i < $scope.banners.length; i++) {
                    if ((typeof $scope.banners[i]._id !== 'undefined') && ($scope.banners[i]._id == data._id)) {
                        $scope.banners[i].multimedia = data.filename;
                    }
                }
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('PICTURE_UPLOADED')});
            });

        }
    }
}