var RDashApp = angular.module('RDash', ['ui.router', 'ngCookies', 'flow', 'ui-notification', 'ui.bootstrap',
        'ui.bootstrap.datetimepicker', 'chart.js','pascalprecht.translate'])
    .filter('html', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    })
    .filter('language', function ($sce) {
        return function (input) {
            if (input === 'en') {
                return $sce.trustAsHtml('English');
            } else if (input === 'rs') {
                return $sce.trustAsHtml('Srpski');
            } else if (input === 'ru') {
                return $sce.trustAsHtml('Ruski');
            } else if (input === 'hu') {
                return $sce.trustAsHtml('Madjarski');
            } else if (input === 'cz') {
                return $sce.trustAsHtml('Češki');
            } else if (input === 'sk') {
                return $sce.trustAsHtml('Slovački');
            }
        }
    })
    .config(['flowFactoryProvider', '$httpProvider', function (flowFactoryProvider, $httpProvider) {


        $httpProvider.interceptors.push('myHttpInterceptor');

        flowFactoryProvider.defaults = {
            target: 'upload.php',
            permanentErrors: [404, 500, 501],
            maxChunkRetries: 1,
            chunkRetryInterval: 5000,
            simultaneousUploads: 4,
            singleFile: true
        };
        flowFactoryProvider.on('catchAll', function (event) {
            console.log('catchAll', arguments);
        });
        // Can be used with different implementations of Flow.js
        // flowFactoryProvider.factory = fustyFlowFactory;
    }]).config(function (NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
    });

RDashApp.run(function ($rootScope) {

    $rootScope.fullDate = "d.M.yyyy";
    $rootScope.fullDateTime = "H:mm:ss, d.M.yyyy";

    $rootScope.currencyRSD = "RSD";
    $rootScope.currencyEUR = "EUR";
    $rootScope.currentPage = "Dashboard";
    $rootScope.latitude = 42.28295;
    $rootScope.longitude = 18.87260;

    $rootScope.maxPictureSize = 1024 * 512;
    $rootScope.currency = "RSD";
    $rootScope.dateFormat = 'medium';
    $rootScope.defaultLang = 'en';
    $rootScope.languages = [
        'en',
        'rs',
        'ru',
        'hu',
        'cz',
        'sk'
    ]

    $rootScope.fullLanguages = [
        {
            code: 'en',
            text: 'English'
        },
        {
            code: 'rs',
            text: 'Srpski'
        },
        {
            code: 'ru',
            text: 'Ruski'
        },
        {
            code: 'hu',
            text: 'Madjarski'
        },
        {
            code: 'cz',
            text: 'Czech'
        },
        {
            code: 'sk',
            text: 'Slovak'
        }
    ]

    $rootScope.getLanguage = function (code) {
        for (var i = 0; i < $rootScope.fullLanguages.length; i++) {
            if ($rootScope.fullLanguages[i].code == code) {
                return $rootScope.fullLanguages[i].text;
            }
        }
    };

    //$rootScope.serverUrl = "http://194.106.182.81:3000/api";
    $rootScope.serverUrl = "http://192.168.1.2:3000/api";
    $rootScope.getImageUrl = function (filename) {
        if (filename != null && filename.length > 0) {
            return $rootScope.serverUrl + "/images/images/" + filename
        } else {
            return null;
        }
    };

    $rootScope.createLangFields = function () {
        var fields = {};
        fields.en = "";
        fields.rs = "";
        fields.ru = "";
        fields.hu = "";
        fields.cz = "";
        fields.sk = "";
        return fields;
    }
});

