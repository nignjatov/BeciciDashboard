'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('rooms', {
                url: '/rooms',
                templateUrl: 'templates/rooms.html',
                controller: 'roomsCtrl'
            }).state('reservations', {
            url: '/reservations',
            templateUrl: 'templates/reservations.html',
            controller: 'reservationsCtrl'
        }).state('albums', {
            url: '/albums',
            templateUrl: 'templates/multimedia.html',
            controller: 'multimediaCtrl'
        }).state('banners', {
            url: '/banners',
            templateUrl: 'templates/banners.html',
            controller: 'bannersCtrl'
        }).state('freeServices', {
            url: '/freeServices',
            templateUrl: 'templates/freeServices.html',
            controller: 'freeServicesCtrl'
        }).state('roomServices', {
            url: '/roomServices',
            templateUrl: 'templates/roomServices.html',
            controller: 'roomServiceCtrl'
        }).state('adverts', {
            url: '/adverts',
            templateUrl: 'templates/advertising.html',
            controller: 'advertisingCtrl'
        }).state('timeline', {
            url: '/timeline',
            templateUrl: 'templates/timeline.html',
            controller: 'timelineCtrl'
        }).state('reviews', {
            url: '/reviews',
            templateUrl: 'templates/reviews.html',
            controller: 'reviewsCtrl'
        }).state('social', {
            url: '/social',
            templateUrl: 'templates/social.html',
            controller: 'socialCtrl'
        }).state('contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html',
            controller: 'contactCtrl'
        }).state('partner', {
            url: '/partner',
            templateUrl: 'templates/partners.html',
            controller: 'partnerCtrl'
        }).state('editRoom', {
            url: '/editRoom/:roomId',
            templateUrl: 'templates/editRoom.html',
            controller: 'editRoomCtrl'
        }).state('editAlbum', {
            url: '/editAlbum/:albumId',
            templateUrl: 'templates/editAlbum.html',
            controller: 'editAlbumCtrl',
            resolve: {
                albumId: function () {
                    return 5;
                },
            }
        });
    }
]);