var RDashApp = angular.module('RDash', ['ui.router', 'ngCookies', 'flow', 'ui-notification', 'ui.bootstrap',
        'ui.bootstrap.datetimepicker', 'chart.js', 'pascalprecht.translate'])
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
    }).config(function ($translateProvider) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.translations('en', {
            BACKOFFICE : 'BackOffice',
            NAVIGATION : 'Navigation',
            HOME: 'Home',
            DASHBOARD : 'Dashboard',
            ROOMS: 'Rooms',
            RESERVATIONS : 'Reservations',
            GALLERY : 'Gallery',
            BANNERS : 'Banners',
            FREE_SERVICES : 'Services',
            ROOM_SERVICES : 'Room services',
            ADVERTISING : 'Blog',
            TIMELINE : 'Timeline',
            REVIEWS  : 'Reviews',
            SOCIAL : 'Social networks',
            PARTNERS : 'Partners',
            CONTACT : 'Contact',
            ADD : "Add",
            UPDATE : 'Update',
            DELETE : 'Delete',
            SELECT_IMAGE : 'Select image',
            UPDATE_IMAGE : 'Update image',
            DISCARD : 'Discard',
            TITLE : 'Title',
            DESCRIPTION : 'Description',
            IMAGE : 'Image',
            LANGUAGE : 'Language',
            E_MAIL : 'E-Mail',
            STATUS : 'Status',
            CREATED_AT : 'Created at',
            SAVE : 'Save',
            BACK : 'Back',
            NO_IMG_PROVIDED : 'No image provided',
            MODIFIED_AT : 'Last modified',
            DELETE_QUESTION : 'Are you sure you want to delete this item?',
            YES : 'Yes',
            NO : 'No',
            PICTURE_UPLOADED : 'Picture successfully uploaded',
            PICTURE_NOT_UPLOADED : 'Failed to upload picture',
            PICTURE_REMOVED : 'Picture successfully remove',
            PICTURE_NOT_REMOVED : 'Failed to remove picture',
            //Dashboard
            CURRENCY : 'Currency',
            CHARTS_YEAR : 'Select year for charts',
            APPROVED_REVIEWS : 'Approved reviews',
            WAITING_REVIEWS : 'Waiting reviews',
            RESERVATIONS_CHART : 'Reservations chart',
            EARNINGS_CHART : 'Earnings Chart',
            MONEY_AMOUNT : 'Money amount',
            ROOM_PRICE_LIST_IMG : 'Rooms price list image',
            UPLOAD_FILE : 'Upload file',
            SEE_FILE : 'See file',
            UPDATE_FILE : 'Update file',
            INDIVIDUAL_INFO : 'Individual reservation information file',
            INDIVIDUAL_CONTRACT : 'Individual reservation contract file',
            GROUP_INFO : 'Group reservation information file',
            GROUP_CONTRACT :'Group reservation contract file',
            PARTNERS_INFO : 'Partners information file',
            PARTNERS_CONTRACT : 'Partners contract file',
            //Rooms
            EDIT_ROOM : 'Edit room',
            ROOM_TYPE : 'Room type',
            CHILDREN_DISCOUNT : 'Children discount',
            BED_SHARING_DISCOUNT : 'Bed sharing discount',
            ADDITIONAL_INFORMATION : 'Additional information',
            NUMBER_OF_BEDS : 'Number of beds',
            FRENCH_BED : 'French bed',
            ROOM_AVAILABILITY : 'Room availability',
            SELECT_YEAR  : 'Select year',
            ROOMS_NUMBER : 'Room\'s number',
            AVAILABLE : 'Available',
            PRICE : 'Price',
            FROM : 'From',
            TO : 'To',
            NUMBER_OF_ROOMS : 'Number of rooms',
            //Reservations
            ROOM: 'Room',
            SEARCH_RESERVATIONS : 'Search reservations',
            DELETED_ROOM_ITEM : 'Deleted room item',
            NOT_DELETED_ROOM_ITEM : 'Failed to delete room item',
            //Gallery
            IMAGES : 'Images',
            ALBUM_CREATE_MSG : 'Please enter album title and click Save in order to be able to add pictures',
            ALBUM : 'Album',
            ADD_NEW_IMAGE : 'Add new image',
            CREATED_ALBUM_ITEM : 'Created new album item',
            NOT_CREATED_ALBUM_ITEM : 'Failed to create album item',
            UPDATED_ALBUM_ITEM : 'Updated album item',
            NOT_UPDATED_ALBUM_ITEM : 'Failed to update album item',
            DELETED_ALBUM_ITEM : 'Deleted album item',
            NOT_DELETED_ALBUM_ITEM : 'Failed to delete album item',
            //Banners
            BANNER_ITEM : 'Banner item',
            CREATED_BANNER_ITEM : 'Created new banner item',
            NOT_CREATED_BANNER_ITEM : 'Failed to create banner item',
            UPDATED_BANNER_ITEM : 'Updated banner item',
            NOT_UPDATED_BANNER_ITEM : 'Failed to update banner item',
            DELETED_BANNER_ITEM : 'Deleted banner item',
            NOT_DELETED_BANNER_ITEM : 'Failed to delete banner item',
            //Services
            SEARCH_SERVICES : 'Search services',
            SERVICE : 'Service',
            CREATED_SERVICE_ITEM : 'Created new service item',
            NOT_CREATED_SERVICE_ITEM : 'Failed to create service item',
            UPDATED_SERVICE_ITEM : 'Updated service item',
            NOT_UPDATED_SERVICE_ITEM : 'Failed to update service item',
            DELETED_SERVICE_ITEM : 'Deleted service item',
            NOT_DELETED_SERVICE_ITEM : 'Failed to delete service item',
            //Room services
            SEARCH_ROOM_SERVICES : 'Search room services',
            ROOM_SERVICE : 'Room service',
            CREATED_ROOM_SERVICE_ITEM : 'Created new room service item',
            NOT_CREATED_ROOM_SERVICE_ITEM : 'Failed to room create service item',
            UPDATED_ROOM_SERVICE_ITEM : 'Updated room service item',
            NOT_UPDATED_ROOM_SERVICE_ITEM : 'Failed to update room service item',
            DELETED_ROOM_SERVICE_ITEM : 'Deleted room service item',
            NOT_DELETED_ROOM_SERVICE_ITEM : 'Failed to delete room service item',
            //Blog
            SEARCH_BLOG : 'Search blog',
            BLOG_ITEM : 'Blog item',
            CREATED_BLOG_ITEM : 'Created new blog item',
            NOT_CREATED_BLOG_ITEM : 'Failed to create blog item',
            UPDATED_BLOG_ITEM : 'Updated blog item',
            NOT_UPDATED_BLOG_ITEM : 'Failed to update blog item',
            DELETED_BLOG_ITEM : 'Deleted blog item',
            NOT_DELETED_BLOG_ITEM : 'Failed to delete blog item',
            //Timeline
            SEARCH_TIMELINE : 'Search timeline events',
            HAPPENED : 'Happened',
            TIMELINE_EVENT : 'Timeline event',
            DELETED_TIMELINE_ITEM : 'Deleted timeline item',
            NOT_DELETED_TIMELINE_ITEM : 'Failed to delete timeline item',
            APPROVED_TIMELINE_ITEM : 'Updated timeline item',
            NOT_APPROVED_TIMELINE_ITEM : 'Failed to update timeline item',
            REJECTED_TIMELINE_ITEM : 'Deleted timeline item',
            NOT_REJECTED_TIMELINE_ITEM : 'Failed to delete timeline item',
            //Reviews
            SEARCH_REVIEWS : 'Search reviews',
            STARS : 'Stars',
            FULL_NAME : 'Full name',
            TEXT : 'Text',
            DELETED_REVIEW_ITEM : 'Deleted review item',
            NOT_DELETED_REVIEW_ITEM : 'Failed to delete review item',
            APPROVED_REVIEW_ITEM : 'Approved review item',
            NOT_APPROVED_REVIEW_ITEM : 'Failed to approve review item',
            REJECTED_REVIEW_ITEM : 'Rejected review item',
            NOT_REJECTED_REVIEW_ITEM : 'Failed to reject review item',
            //Social
            URL_FORMAT : 'Please note that social network links have to be in full URL format, e.g. https://www.facebook.com/',
            ADDED_NETWORKS : 'Added Networks',
            ACTIVE : 'Active',
            LINK : 'Link',
            CREATED_SOCIAL_ITEM : 'Created new social network',
            NOT_CREATED_SOCIAL_ITEM : 'Failed to create social network',
            UPDATED_SOCIAL_ITEM : 'Updated service social network',
            NOT_UPDATED_SOCIAL_ITEM : 'Failed to update service social network',
            DELETED_SOCIAL_ITEM : 'Deleted service social network',
            NOT_DELETED_SOCIAL_ITEM : 'Failed to delete service social network',
            //Contact
            PHONE : 'Phone',
            FAX : 'Fax',
            ADDRESS : 'Address',
            CITY : 'City',
            STATE : 'State',
            WEBSITE : 'Website',
            DIRECTOR : 'Director',
            EXISTING_E_MAILS : 'Existing E-Mails',
            UPDATED_CONTACT_INFO : 'Saved contact information',
            NOT_UPDATED_CONTACT_INFO : 'Failed to save contact information'
//TODO reservationsCtrl,dashboardCtrl
        }).translations('rs', {
            BACKOFFICE : 'Administrator',
            ROOMS: 'Sobe',
            ROOMS_LIST: 'Lista soba',
            ROOMS_DETAIL: 'Detalji o sobi',
            BLOG: 'Aktuelnosti',
            GALLERY: 'Galerija',
            CONTACT: 'Kontakt',
            ADDRESS: 'Adresa',
            PHONE: 'Telefon',
            E_MAIL: 'E-Mail adresa',
            WEBSITE: 'Web stranica',
            SEND_MESSAGE: 'Pošaljite poruku',
            YOUR_NAME: 'Vaše Ime',
            SUBJECT: 'Naslov',
            YOUR_MESSAGE: 'Vaša Poruka',
            BOOKING: 'Rezervacija',
            ROOM: 'Soba',
            OTHER: 'Ostalo',
            RIGHTS_RESERVED: 'Sva prava zadržana',
            ALL: "Svi",
            IMAGE: "Slika",
            A_NIGHT: "noćenje od",
            BOOK_NOW: "Rezervišite sada",
            RESERVATION: "Rezervacija",
            CHECK_IN: "Prijava",
            CHECK_OUT: "Odjava",
            ENTER_EMAIL: "Molimo unesite Vašu E-mail adresu",
            SERVICE_OVERVIEW: "Pregled pogodnosti",
            OTHER_ROOMS: "Druge sobe",
            OVERVIEW: "Pregled",
            SELECT_ROOM: "Izaberite sobu",
            ROOM_TYPE: "Tip sobe",
            GUEST_FAVOURITE_ROOMS: "Omiljene sobe posetilaca",
            READ_MORE: "Vidi detalje",
            SEE_ROOMS: "Vidi sobe",
            USER_EXPERIENCE: "Iskustva drugih posetilaca",
            ABOUT_HOTEL: "O hotelu",
            SERVICES: "Pogodnosti",
            TIMELINE: "Događaji",
            REVIEWS: "Iskustva posetilaca",
            HAPPENED: "Dogodilo se",
            NAME: "Ime",
            SURNAME: "Prezime",
            REVIEW_TEXT: "Molimo unosite vašu recenziju...",
            YOUR_RATING: "Vaša ocena",
            HIDE_FORM: "Sakrij formu",
            SHOW_FORM: "Unesi recenziju",
            POST_REVIEW: "Objavi recenziju",
            MAX_250_CHARS_FOR_REVIEW: "Maksimalno 250 karaktera za unos teksta",
            POSTED_ON: "Objavljeno",
            REVIEW_POSTED: "Recenzija uneta u sistem",
            REVIEW_NOT_POSTED: "Neuspešno objavljivanje recenzije",
            SEARCH: "Pretraži",
            MSG_SENT: "Poruka poslata",
            MSG_SEND_FAIL: "Neuspešno slanje poruke",
            TERMIN: 'Termin',
            ADULTS_NUMBER: 'Broj odraslih osoba',
            CHILDREN_NUMBER: 'Broj dece (2 - 12 godina)',
            BABY_NUMBER: 'Broj dece (do 2 godine)',
            PRICE_FOR_NIGHT_PER_PERSON: 'Cena noćenja po osobi',
            TOTAL_PRICE_FOR: 'Cena za',
            NIGHTS: 'noćenja',
            TOO_MANY_PERSONS: 'Broj osoba premašuje kapacitete sobe',
            FROM: 'Od',
            TO: 'Do',
            PRICE: 'Cena',
            RESERVATION_INFORMATION: 'Informacije o rezervaciji',
            CONTACT_INFORMATION: 'Kontakt informacije',
            TERMS_OF_SERVICE: 'Uslovi korišćenja',
            COMPANY_INFORMATION: 'Informacije o firmi',
            ACCEPT_TERMS_OF_SERVICE: 'Prihvatam uslove korišćenja',
            LASTNAME: 'Prezime',
            PAYMENT: 'Plaćanje',
            NO_CURRENT_RESERVATION: 'Trenutno ne postoji aktivna rezervacija',
            PAYMENT_NOTIFICATION: 'Informacije o transakciji',
            NO_RESERVATION: 'Rezervacija nije pronadjena. Identifikator plaćanja',
            TRANSACTION_STATUS: "Status transakcije",
            TRANSACTION_ID: "Identifikator transakcije",
            APPROVED: 'Odobrena',
            'NOT APPROVED': 'Nije odobrena',
            'CAPTURED': 'Rezervisana sredstva',
            'NOT CAPTURED': 'Sredstva nisu rezervisana',
            'DENIED BY RISK': 'Odbijeno iz bezbednosnih razloga',
            'HOST TIMEOUT': 'Greška u vezi',
            ADMINISTRATOR_CONTACT: 'Vaša rezervacija je sačuvana u našem sistemu. Naš administrator će Vas kontaktirati u najkraćem roku i obavestiti o daljem status Vaše rezervacije.',
            MINIMUM_ONE_ADULT : 'Minimalno jedna odrasla osoba mora biti prisutna',
            PARTNERS : 'Partneri',
            DIRECTOR : 'Predstavnik',
            CITY : 'Grad',
            ADDRESS_NUMBER : 'Ulica i broj',
            NO_ROOMS_FOUND : 'Nijedna soba nije pronađena sa zadatim kriterijumima. Molimo pokušajte ponovo.'
        });
        $translateProvider.preferredLanguage('en');
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

    $rootScope.serverUrl = "http://194.106.182.81:3000/api";
    //$rootScope.serverUrl = "http://192.168.1.8:3000/api";
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

    $rootScope.years = [
        2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
    ];

});

