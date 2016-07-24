angular.module('RDash')
    .controller('timelineCtrl', ['$scope', '$rootScope','$modal','$filter', 'BlogService', 'Notification', timelineCtrl]);

function timelineCtrl($scope, $rootScope,$modal,$filter, BlogService, Notification) {

    $rootScope.currentPage = "TIMELINE";

    $scope.editTimelineEvent = null;

    $scope.timelineEvents = [];

    $scope.usedLang = $rootScope.defaultLang;

    $scope.status = {
        opened: false
    };

    BlogService.getTimelineItems().then(function (data) {
        $scope.timelineEvents = data.data;
    });

    $scope.selectEvent = function (timelineEvent) {
        $scope.editTimelineEvent = angular.extend({}, timelineEvent);

        $scope.usedLang = $rootScope.defaultLang;
    }

    $scope.addTimelineEvent = function () {
        $scope.editTimelineEvent = {
            blogType: 'timeline',
            title: $rootScope.createLangFields(),
            description: $rootScope.createLangFields(),
            moment: Date.now()
        };

        $scope.usedLang = $rootScope.defaultLang;

    }

    $scope.saveEvent = function () {
        if (typeof $scope.editTimelineEvent._id === 'undefined') {
            //new service
            console.log("Creating timeline event");
            BlogService.createBlogItem($scope.editTimelineEvent).then(function (data) {
                $scope.timelineEvents.push(data.data);
                $scope.editTimelineEvent = null;
                Notification.primary({message: $filter('translate')('CREATED_TIMELINE_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_CREATED_TIMELINE_ITEM')});
            });
        } else {
            BlogService.updateBlogItem($scope.editTimelineEvent._id, $scope.editTimelineEvent).then(function (data) {
                $scope.editTimelineEvent = null;
                Notification.primary({message: $filter('translate')('UPDATED_TIMELINE_ITEM')});
                BlogService.getTimelineItems().then(function (data) {
                    $scope.timelineEvents = data.data;
                });
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_UPDATED_TIMELINE_ITEM')});
            });
        }
    }
    $scope.deleteEvent = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalCtrl',
            size: 'sm'
        });
        modalInstance.result.then(function (retModal) {
            BlogService.deleteBlogItem($scope.editTimelineEvent._id).then(function (data) {
                $scope.timelineEvents.splice($scope.timelineEvents.indexOf($scope.editTimelineEvent), 1);
                $scope.editTimelineEvent = null;
                Notification.primary({message: $filter('translate')('DELETED_TIMELINE_ITEM')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('NOT_DELETED_TIMELINE_ITEM')});
            });
        });
    }

    $scope.editEventTitle = function (title) {
        for (var i = 0; i < $scope.editTimelineEvent.title.length; i++) {
            if ($scope.editTimelineEvent.title[i].lang == $scope.usedLang) {
                $scope.editTimelineEvent.title[i].text = title;
            }
        }
    }

    $scope.changeLang = function (lang) {
        $scope.usedLang = lang;
    }

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.sortType = "moment";
    $scope.sortReverse = "true";
    $scope.searchWord = '';
}