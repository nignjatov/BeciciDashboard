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
            BACKOFFICE: 'BackOffice',
            NAVIGATION: 'Navigation',
            HOME: 'Home',
            DASHBOARD: 'Dashboard',
            ROOMS: 'Rooms',
            RESERVATIONS: 'Reservations',
            GALLERY: 'Gallery',
            BANNERS: 'Banners',
            FREE_SERVICES: 'Services',
            ROOM_SERVICES: 'Room services',
            ADVERTISING: 'Blog',
            TIMELINE: 'Timeline',
            REVIEWS: 'Reviews',
            SOCIAL: 'Social networks',
            PARTNERS: 'Partners',
            CONTACT: 'Contact',
            ADD: "Add",
            UPDATE: 'Update',
            DELETE: 'Delete',
            SELECT_IMAGE: 'Select image',
            UPDATE_IMAGE: 'Update image',
            DISCARD: 'Discard',
            TITLE: 'Title',
            DESCRIPTION: 'Description',
            IMAGE: 'Image',
            LANGUAGE: 'Language',
            E_MAIL: 'E-Mail',
            STATUS: 'Status',
            CREATED_AT: 'Created at',
            SAVE: 'Save',
            BACK: 'Back',
            NO_IMG_PROVIDED: 'No image provided',
            MODIFIED_AT: 'Last modified',
            DELETE_QUESTION: 'Are you sure you want to delete this item?',
            YES: 'Yes',
            NO: 'No',
            PICTURE_UPLOADED: 'Picture successfully uploaded',
            PICTURE_NOT_UPLOADED: 'Failed to upload picture',
            PICTURE_REMOVED: 'Picture successfully remove',
            PICTURE_NOT_REMOVED: 'Failed to remove picture',
            FILE_UPLOADED: 'File successfully uploaded',
            FILE_NOT_UPLOADED: 'Failed to upload file',
            FILE_DELETED: 'File successfully deleted',
            FILE_NOT_DELETED: 'Failed to delete file',
            CANCEL : 'Cancel',
            //Dashboard
            CURRENCY: 'Currency',
            CHARTS_YEAR: 'Select year for charts',
            APPROVED_REVIEWS: 'Approved reviews',
            WAITING_REVIEWS: 'Waiting reviews',
            RESERVATIONS_CHART: 'Reservations chart',
            EARNINGS_CHART: 'Earnings Chart',
            MONEY_AMOUNT: 'Money amount',
            ROOM_PRICE_LIST_IMG: 'Rooms price list image',
            UPLOAD_FILE: 'Upload file',
            SEE_FILE: 'See file',
            UPDATE_FILE: 'Update file',
            INDIVIDUAL_INFO: 'Individual reservation information file',
            INDIVIDUAL_CONTRACT: 'Individual reservation contract file',
            GROUP_INFO: 'Group reservation information file',
            GROUP_CONTRACT: 'Group reservation contract file',
            PARTNERS_INFO: 'Partners information file',
            PARTNERS_CONTRACT: 'Partners contract file',
            CURRENCY_UPDATED: 'Currency updated',
            CURRENCY_NOT_UPDATED : 'Currency not updated',
            //Rooms
            EDIT_ROOM: 'Edit room',
            ROOM_TYPE: 'Room type',
            CHILDREN_DISCOUNT: 'Children discount',
            BED_SHARING_DISCOUNT: 'Bed sharing discount',
            ADDITIONAL_INFORMATION: 'Additional information',
            NUMBER_OF_BEDS: 'Number of beds',
            FRENCH_BED: 'French bed',
            ROOM_AVAILABILITY: 'Room availability',
            SELECT_YEAR: 'Select year',
            ROOMS_NUMBER: 'Room\'s number',
            AVAILABLE: 'Available',
            PRICE: 'Price',
            FROM: 'From',
            TO: 'To',
            NUMBER_OF_ROOMS: 'Number of rooms',
            DELETED_ROOM: 'Deleted room',
            NOT_DELETED_ROOM: 'Failed to delete room',
            CREATED_ROOM : 'Created new room',
            UPDATED_ROOM : 'Updated room',
            DELETED_ROOM_ITEM: 'Deleted room item',
            NOT_DELETED_ROOM_ITEM: 'Failed to delete room item',
            //Reservations
            ROOM: 'Room',
            SEARCH_RESERVATIONS: 'Search reservations',
            FIRST_NAME : 'Name',
            LAST_NAME : 'Surname',
            AVAILABLE_ROOMS : 'Available rooms',
            ROOM_NUMBER : 'Room number',
            MARK_PAID : 'Mark as paid',
            RESERVATION : 'Reservation',
            PERSONS : 'Passengers',
            //Gallery
            IMAGES: 'Images',
            ALBUM_CREATE_MSG: 'Please enter album title and click Save in order to be able to add pictures',
            ALBUM: 'Album',
            ADD_NEW_IMAGE: 'Add new image',
            CREATED_ALBUM_ITEM: 'Created new album item',
            NOT_CREATED_ALBUM_ITEM: 'Failed to create album item',
            UPDATED_ALBUM_ITEM: 'Updated album item',
            NOT_UPDATED_ALBUM_ITEM: 'Failed to update album item',
            DELETED_ALBUM_ITEM: 'Deleted album item',
            NOT_DELETED_ALBUM_ITEM: 'Failed to delete album item',
            ALBUM_CREATED: 'Created new album',
            NOT_CREATED_ALBUM: 'Failed to create album',
            UPDATED_ALBUM: 'Updated album',
            NOT_UPDATED_ALBUM: 'Failed to update album',
            DELETED_ALBUM: 'Deleted album',
            NOT_DELETED_ALBUM: 'Failed to delete album',
            //Banners
            BANNER_ITEM: 'Banner item',
            CREATED_BANNER_ITEM: 'Created new banner item',
            NOT_CREATED_BANNER_ITEM: 'Failed to create banner item',
            UPDATED_BANNER_ITEM: 'Updated banner item',
            NOT_UPDATED_BANNER_ITEM: 'Failed to update banner item',
            DELETED_BANNER_ITEM: 'Deleted banner item',
            NOT_DELETED_BANNER_ITEM: 'Failed to delete banner item',
            //Services
            SEARCH_SERVICES: 'Search services',
            SERVICE: 'Service',
            CREATED_SERVICE_ITEM: 'Created new service item',
            NOT_CREATED_SERVICE_ITEM: 'Failed to create service item',
            UPDATED_SERVICE_ITEM: 'Updated service item',
            NOT_UPDATED_SERVICE_ITEM: 'Failed to update service item',
            DELETED_SERVICE_ITEM: 'Deleted service item',
            NOT_DELETED_SERVICE_ITEM: 'Failed to delete service item',
            //Room services
            SEARCH_ROOM_SERVICES: 'Search room services',
            ROOM_SERVICE: 'Room service',
            CREATED_ROOM_SERVICE_ITEM: 'Created new room service item',
            NOT_CREATED_ROOM_SERVICE_ITEM: 'Failed to room create service item',
            UPDATED_ROOM_SERVICE_ITEM: 'Updated room service item',
            NOT_UPDATED_ROOM_SERVICE_ITEM: 'Failed to update room service item',
            DELETED_ROOM_SERVICE_ITEM: 'Deleted room service item',
            NOT_DELETED_ROOM_SERVICE_ITEM: 'Failed to delete room service item',
            //Blog
            SEARCH_BLOG: 'Search blog',
            BLOG_ITEM: 'Blog item',
            CREATED_BLOG_ITEM: 'Created new blog item',
            NOT_CREATED_BLOG_ITEM: 'Failed to create blog item',
            UPDATED_BLOG_ITEM: 'Updated blog item',
            NOT_UPDATED_BLOG_ITEM: 'Failed to update blog item',
            DELETED_BLOG_ITEM: 'Deleted blog item',
            NOT_DELETED_BLOG_ITEM: 'Failed to delete blog item',
            //Timeline
            SEARCH_TIMELINE: 'Search timeline events',
            HAPPENED: 'Happened',
            TIMELINE_EVENT: 'Timeline event',
            DELETED_TIMELINE_ITEM: 'Deleted timeline item',
            NOT_DELETED_TIMELINE_ITEM: 'Failed to delete timeline item',
            CREATED_TIMELINE_ITEM: 'Created timeline item',
            NOT_CREATED_TIMELINE_ITEM: 'Failed to create timeline item',
            UPDATED_TIMELINE_ITEM: 'Updated timeline item',
            NOT_UPDATED_TIMELINE_ITEM: 'Failed to update timeline item',
            //Reviews
            SEARCH_REVIEWS: 'Search reviews',
            STARS: 'Stars',
            FULL_NAME: 'Full name',
            TEXT: 'Text',
            DELETED_REVIEW_ITEM: 'Deleted review item',
            NOT_DELETED_REVIEW_ITEM: 'Failed to delete review item',
            APPROVED_REVIEW_ITEM: 'Approved review item',
            NOT_APPROVED_REVIEW_ITEM: 'Failed to approve review item',
            REJECTED_REVIEW_ITEM: 'Rejected review item',
            NOT_REJECTED_REVIEW_ITEM: 'Failed to reject review item',
            //Social
            URL_FORMAT: 'Please note that social network links have to be in full URL format, e.g. https://www.facebook.com/',
            ADDED_NETWORKS: 'Added Networks',
            ACTIVE: 'Active',
            LINK: 'Link',
            CREATED_SOCIAL_ITEM: 'Created new social network',
            NOT_CREATED_SOCIAL_ITEM: 'Failed to create social network',
            UPDATED_SOCIAL_ITEM: 'Updated service social network',
            NOT_UPDATED_SOCIAL_ITEM: 'Failed to update service social network',
            DELETED_SOCIAL_ITEM: 'Deleted service social network',
            NOT_DELETED_SOCIAL_ITEM: 'Failed to delete service social network',
            //Contact
            PHONE: 'Phone',
            FAX: 'Fax',
            ADDRESS: 'Address',
            CITY: 'City',
            STATE: 'State',
            WEBSITE: 'Website',
            DIRECTOR: 'Director',
            EXISTING_E_MAILS: 'Existing E-Mails',
            UPDATED_CONTACT_INFO: 'Saved contact information',
            NOT_UPDATED_CONTACT_INFO: 'Failed to save contact information'
//TODO reservationsCtrl
        }).translations('rs', {
            BACKOFFICE: 'Administrator',
            NAVIGATION: 'Navigacija',
            HOME: 'Početna',
            DASHBOARD: 'Pregled',
            ROOMS: 'Sobe',
            RESERVATIONS: 'Rezervacije',
            GALLERY: 'Galerija',
            BANNERS: 'Baneri',
            FREE_SERVICES: 'Pogodnosti',
            ROOM_SERVICES: 'Sobne usluge',
            ADVERTISING: 'Aktuelnosti',
            TIMELINE: 'Događaji',
            REVIEWS: 'Recenzije',
            SOCIAL: 'Socijalne mreže',
            PARTNERS: 'Partneri',
            CONTACT: 'Kontakt',
            ADD: "Dodati",
            UPDATE: 'Ažurirati',
            DELETE: 'Obrisati',
            SELECT_IMAGE: 'Odabrati sliku',
            UPDATE_IMAGE: 'Ažurirati sliku',
            DISCARD: 'Poništi',
            TITLE: 'Naslov',
            DESCRIPTION: 'Opis',
            IMAGE: 'Slika',
            LANGUAGE: 'Jezik',
            E_MAIL: 'E-Mail',
            STATUS: 'Status',
            CREATED_AT: 'Kreirano',
            SAVE: 'Sačuvaj',
            BACK: 'Nazad',
            NO_IMG_PROVIDED: 'Nepostojeća slika',
            MODIFIED_AT: 'Ažurirano',
            DELETE_QUESTION: 'Da li ste sigurni da želite da obrišete stavku?',
            YES: 'Da',
            NO: 'Ne',
            PICTURE_UPLOADED: 'Slika uspešno postavljena',
            PICTURE_NOT_UPLOADED: 'Neuspešno postavljanje slike',
            PICTURE_REMOVED: 'Slika uspešno obrisana',
            PICTURE_NOT_REMOVED: 'Neuspešno brisanje slike',
            FILE_UPLOADED: 'Fajl uspešno postavljen',
            FILE_NOT_UPLOADED: 'Neuspešno postavljanje fajla',
            FILE_DELETED: 'Fajl uspešno obrisan',
            FILE_NOT_DELETED: 'Neuspešno postavljanje fajla',
            CANCEL : 'Otkaži',
            //Dashboard
            CURRENCY: 'Kurs',
            CHARTS_YEAR: 'Odaberite godinu za grafike',
            APPROVED_REVIEWS: 'Odobrene recenzije',
            WAITING_REVIEWS: 'Recenzije na čekanju',
            RESERVATIONS_CHART: 'Grafik rezervacija',
            EARNINGS_CHART: 'Grafik zarade',
            MONEY_AMOUNT: 'Iznos novca',
            ROOM_PRICE_LIST_IMG: 'Slika cenovnika soba',
            UPLOAD_FILE: 'Postavi fajl',
            SEE_FILE: 'Pogledaj fajl',
            UPDATE_FILE: 'Ažuriraj fajl',
            INDIVIDUAL_INFO: 'Individualne rezervacije informacije',
            INDIVIDUAL_CONTRACT: 'Individualne rezervacije ugovor',
            GROUP_INFO: 'Grupne rezervacije informacije',
            GROUP_CONTRACT: 'Grupne rezervacije ugovor',
            PARTNERS_INFO: 'Partneri informacije',
            PARTNERS_CONTRACT: 'Partneri ugovor',
            CURRENCY_UPDATED: 'Kurs ažuriran',
            CURRENCY_NOT_UPDATED : 'Neuspešno ažuriranje kursa',
            //Rooms
            EDIT_ROOM: 'Izmeni sobu',
            ROOM_TYPE: 'Tip sobe',
            CHILDREN_DISCOUNT: 'Dečiji popust',
            BED_SHARING_DISCOUNT: 'Popust na deljenje kreveta',
            ADDITIONAL_INFORMATION: 'Dodatne informacije',
            NUMBER_OF_BEDS: 'Broj kreveta',
            FRENCH_BED: 'Francuski ležaj',
            ROOM_AVAILABILITY: 'Dostupnost sobe',
            SELECT_YEAR: 'Odaberite godinu',
            ROOMS_NUMBER: 'Broj soba',
            AVAILABLE: 'Dostupno',
            PRICE: 'Cena',
            FROM: 'Od',
            TO: 'Do',
            NUMBER_OF_ROOMS: 'Broj soba',
            DELETED_ROOM: 'Soba obrisana',
            NOT_DELETED_ROOM: 'Neuspešno brisanje sobe',
            CREATED_ROOM : 'Kreirana nova soba',
            UPDATED_ROOM : 'Podaci o sobi ažurirani',
            DELETED_ROOM_ITEM: 'Obrisana soba',
            NOT_DELETED_ROOM_ITEM: 'Neuspešno brisanje sobe',
            //Reservations
            ROOM: 'Soba',
            SEARCH_RESERVATIONS: 'Pretraži rezervacije',
            FIRST_NAME : 'Ime',
            LAST_NAME : 'Prezime',
            AVAILABLE_ROOMS : 'Dostupnih soba',
            ROOM_NUMBER : 'Broj sobe',
            MARK_PAID : 'Naplaćeno',
            RESERVATION : 'Rezervacija',
            PERSONS : 'Putnici',
            //Gallery
            IMAGES: 'Slike',
            ALBUM_CREATE_MSG: 'Molimo unesite ime albuma i sačuvajte ga da biste mogli dodavati slike.',
            ALBUM: 'Album',
            ADD_NEW_IMAGE: 'Dodaj novu sliku',
            CREATED_ALBUM_ITEM: 'Kreiran novi album',
            NOT_CREATED_ALBUM_ITEM: 'Neuspešno kreiranje albuma',
            UPDATED_ALBUM_ITEM: 'Album ažuriran',
            NOT_UPDATED_ALBUM_ITEM: 'Neuspešno ažuriranje albuma',
            DELETED_ALBUM_ITEM: 'Album obrisan',
            NOT_DELETED_ALBUM_ITEM: 'Neuspešno brisanje albuma',
            ALBUM_CREATED: 'Kreiran novi album',
            NOT_CREATED_ALBUM: 'Neuspešno kreiranje albuma',
            UPDATED_ALBUM: 'Album ažuriran',
            NOT_UPDATED_ALBUM: 'Neuspešno ažuriranje albuma',
            DELETED_ALBUM: 'Album obrisan',
            NOT_DELETED_ALBUM: 'Neuspešno brisanje albuma',
            //Banners
            BANNER_ITEM: 'Baner',
            CREATED_BANNER_ITEM: 'Kreiran novi baner',
            NOT_CREATED_BANNER_ITEM: 'Neuspešno kreiranje banera',
            UPDATED_BANNER_ITEM: 'Baner ažuriran',
            NOT_UPDATED_BANNER_ITEM: 'Neuspešno ažuriranje banera',
            DELETED_BANNER_ITEM: 'Baner obrisan',
            NOT_DELETED_BANNER_ITEM: 'Neuspešno brisanje banera',
            //Services
            SEARCH_SERVICES: 'Pretraži pogodnosti',
            SERVICE: 'Pogodnost',
            CREATED_SERVICE_ITEM: 'Kreirana nova pogodnost',
            NOT_CREATED_SERVICE_ITEM: 'Neuspešno kreiranje nove pogodnosti',
            UPDATED_SERVICE_ITEM: 'Pogodnost ažurirana',
            NOT_UPDATED_SERVICE_ITEM: 'Neuspešno ažuriranje pogodnosti',
            DELETED_SERVICE_ITEM: 'Pogodnost obrisana',
            NOT_DELETED_SERVICE_ITEM: 'Neuspešno brisanje pogodonosti',
            //Room services
            SEARCH_ROOM_SERVICES: 'Pretraži sobne usluge',
            ROOM_SERVICE: 'Sobna usluga',
            CREATED_ROOM_SERVICE_ITEM: 'Kreiraj novu sobnu uslugu',
            NOT_CREATED_ROOM_SERVICE_ITEM: 'Neuspešno kreiranje nove sobne usluge',
            UPDATED_ROOM_SERVICE_ITEM: 'Sobna usluga ažurirana',
            NOT_UPDATED_ROOM_SERVICE_ITEM: 'Neuspešno ažuriranje sobne usluge',
            DELETED_ROOM_SERVICE_ITEM: 'Sobna usluga obrisana',
            NOT_DELETED_ROOM_SERVICE_ITEM: 'Neuspešno brisanje sobne usluge',
            //Blog
            SEARCH_BLOG: 'Pretraži aktuelnosti',
            BLOG_ITEM: 'Aktuelnost',
            CREATED_BLOG_ITEM: 'Kreirana nova aktuelnost',
            NOT_CREATED_BLOG_ITEM: 'Neuspešno kreiranje aktuelnosti',
            UPDATED_BLOG_ITEM: 'Aktuelnost ažurirana',
            NOT_UPDATED_BLOG_ITEM: 'Neuspešno ažuriranje aktuelnosti',
            DELETED_BLOG_ITEM: 'Aktuelnost obrisana',
            NOT_DELETED_BLOG_ITEM: 'Neuspešno brisanje aktuelnosti',
            //Timeline
            SEARCH_TIMELINE: 'Pretraži događaje',
            HAPPENED: 'Dogodilo se',
            TIMELINE_EVENT: 'Događaj',
            DELETED_TIMELINE_ITEM: 'Događaj obrisan',
            NOT_DELETED_TIMELINE_ITEM: 'Neuspešno brisanje događaja',
            UPDATED_TIMELINE_ITEM: 'Događaj ažuriran',
            NOT_UPDATED_TIMELINE_ITEM: 'Neuspešno ažuriranje događaja',
            CREATED_TIMELINE_ITEM: 'Kreiran događaj',
            NOT_CREATED_TIMELINE_ITEM: 'Neuspešno kreiranje događaja',
            //Reviews
            SEARCH_REVIEWS: 'Pretraži recenzije',
            STARS: 'Ocena',
            FULL_NAME: 'Ime i prezime',
            TEXT: 'Tekst',
            DELETED_REVIEW_ITEM: 'Obrisana recenzija',
            NOT_DELETED_REVIEW_ITEM: 'Neuspešno brisanje recenzije',
            APPROVED_REVIEW_ITEM: 'Recenzija odobrena',
            NOT_APPROVED_REVIEW_ITEM: 'Neuspešno odobravanje recenzije',
            REJECTED_REVIEW_ITEM: 'Recenzija odbijena',
            NOT_REJECTED_REVIEW_ITEM: 'Neuspešno odbijanje recenzije',
            //Social
            URL_FORMAT: 'Molimo unosite linkove u punom formatu, npr. https://www.facebook.com/',
            ADDED_NETWORKS: 'Dodate mreže',
            ACTIVE: 'Aktivna',
            LINK: 'Link',
            CREATED_SOCIAL_ITEM: 'Socijalna mreža kreirana',
            NOT_CREATED_SOCIAL_ITEM: 'Neuspešno kreiranje socijalne mreže',
            UPDATED_SOCIAL_ITEM: 'Socijalna mreža ažurirana',
            NOT_UPDATED_SOCIAL_ITEM: 'Neuspešno ažuriranje socijalne mreže',
            DELETED_SOCIAL_ITEM: 'Socijalna mreža obrisana',
            NOT_DELETED_SOCIAL_ITEM: 'Neuspešno brisanje socijalne mreže',
            //Contact
            PHONE: 'Telefon',
            FAX: 'Fax',
            ADDRESS: 'Adresa',
            CITY: 'Grad',
            STATE: 'Država',
            WEBSITE: 'Web stranica',
            DIRECTOR: 'Predstavnik',
            EXISTING_E_MAILS: 'Postojeći E-Mail',
            UPDATED_CONTACT_INFO: 'Sačuvane kontakt informacije',
            NOT_UPDATED_CONTACT_INFO: 'Neuspešno čuvanje kontakt informacija'
        });
        $translateProvider.preferredLanguage('rs');
    });

RDashApp.run(function ($rootScope) {

    $rootScope.fullDate = "d.M.yyyy";
    $rootScope.fullDateTime = "H:mm:ss, d.M.yyyy";

    $rootScope.currencyRSD = "RSD";
    $rootScope.currencyEUR = "EUR";
    $rootScope.currentPage = "DASHBOARD";
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

