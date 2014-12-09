var module = ons.bootstrap();

var applicationLanguage = 'es';


var labels = {
    'es': {
        tab_guest_list: 'GUEST LIST',
        tab_clubs: 'CLUBS',
        tab_life: 'LIFE',
        tab_promos: 'PROMOS',
        tab_profile: 'MI PERFIL',
        header_guest_list: 'Guest List',
        header_clubs: 'Clubs',
        back_to_my_guest_list: 'VOLVER A MI GUEST LIST',
        my_data: 'Mis Datos',
        name: 'Nombre:',
        email: 'Email:',
        phone: 'Telefono:',
        edit: 'EDITAR',
        idiom: 'Idioma',
        alerts: 'Alertas',
        setup_my_data: 'CONFIGURAR MIS DATOS',
        validate: 'VALIDAR POR EL RESPONSABLE DEL CLUB',
        guest_list: 'GUEST LIST:',
        club: 'Club:',
        address: 'Dirección:',
        hour: 'Horario:',
        metro: 'Metro:',
        ambient: 'Ambiente:',
        accept_card: 'Acepta Tarjeta',
        fill_form: 'rellena este pequeño formulario',
        first_name: 'Nombre:',
        last_name: 'Apellidos:',
        persons: 'Nº de personas:',
        conditions: 'aceptar condiciones',
        confirm: 'CONFIRMAR',
        sessions: 'Sesiones:',
        open: 'Abierto:',
        type: 'Tipo de cocina:',
        save: 'Guardar'
    },
    'en': {
        tab_guest_list: 'GUEST LIST',
        tab_clubs: 'CLUBS',
        tab_life: 'LIFE',
        tab_promos: 'PROMOS',
        tab_profile: 'MY PROFILE',
        header_guest_list: 'Guest List',
        header_clubs: 'Clubs',
        back_to_my_guest_list: 'BACK TO MY GUEST LIST',
        my_data: 'My Info',
        name: 'Name:',
        email: 'Email:',
        phone: 'Phone:',
        edit: 'EDIT',
        idiom: 'Idiom',
        alerts: 'Alerts',
        setup_my_data: 'SETUP MY INFO',
        validate: 'VALIDATE BY CLUB RESPONSABLE',
        guest_list: 'GUEST LIST:',
        club: 'Club:',
        address: 'Address:',
        hour: 'Schedule:',
        metro: 'Metro:',
        ambient: 'Ambient:',
        accept_card: 'Accept Card',
        fill_form: 'fill this few form',
        first_name: 'Name:',
        last_name: 'Surename:',
        persons: 'Nº of persons:',
        conditions: 'accept conditions',
        confirm: 'CONFIRM',
        sessions: 'Sessions:',
        open: 'Open:',
        type: 'Type of kitchen:',
        save: 'Save'
    }
}


module.controller('AppController', function($scope) { });

module.controller('LanguageController', function($scope) {
    ons.ready(function() {
        //navigator.getDeviceBackButtonHandler().enable();
    });
});

module.controller('MainMenuController', function($scope) {
    ons.ready(function() {

        applicationLanguage = splash.getCurrentPage().options.lang;

        $scope.labels = getLabels();

    });
});


var scopeGuestCarouselController;
module.controller('GuestCarouselController', function($scope) {
    ons.ready(function() {

        scopeGuestCarouselController = $scope;

        moment.lang(applicationLanguage);
        console.log('lang: ' + applicationLanguage);

        $scope.items = generateCalendar();


        $scope.filterSessionDay = function(index) {

            var selectedItem = $scope.items[index];

            for(var i in $scope.items) {

                $scope.items[i].selected = '';
            }

            selectedItem.selected = 'selected';
        };
    });
});


module.controller('GuestController', function($scope) {
    ons.ready(function() {

        var height = window.innerHeight - (angular.element('.guestpage ons-toolbar').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2)-1;

        $('body').append(
            '<style type="text/css">'+
                '.guest_list_item {\
                position:relative;\
                height:'+height+'px;\
                }'+
            '</style>'
        );

        $scope.getWindowDimensions = function () {
            return { h: height };
        };

        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {

            $('.guest_list_item').height(newValue.h);
        }, true);

    });
});

module.controller('GuestListController', function($scope) {
    ons.ready(function() {

        $scope.items = [
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            }
        ];

        $scope.labels = getLabels();

        $scope.showGuestList = function(index) {

            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
                //naviDialog.show();
            });
        };

        $scope.showGuestInfo = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('guest_list.html');
        };

    });
});


module.controller('GuestListCardController', function($scope) {
    ons.ready(function() {

        $scope.pictures = [
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png',
                selected:'selected'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            }
        ];

        $scope.labels = getLabels();

        $scope.detail = {
            guest_list: 'GUEST LIST:',
            club: 'Club:',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta',
            content: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimenaceptar condiciones. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa'
        };

        $scope.title = 'Funky Night';
        $scope.subtitle = 'en PANCHA CBN';

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[guestListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            selectedItem.selected = 'selected';

            $scope.$apply();
        };

        setTimeout(function(){

            guestListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);


        $scope.showForm = function(session_id) {
            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
                //naviDialog.show();
            });
        };

    });


});



module.controller('GuestListFormController', function($scope) {
    ons.ready(function() {

        $scope.labels = getLabels();

        $scope.values = {
            persons: 1
        };

        $scope.increasePersons = function() {
            $scope.values.persons ++;
        };

        $scope.decreasePersons = function() {
            if($scope.values.persons >= 2) {
                $scope.values.persons --;
            }
        };

        $scope.closeForm = function() {

            $('#conditions').remove();
            guestFormDialog.hide();
        };

    });


});

module.controller('ClubsController', function($scope) {
    ons.ready(function() {

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2)-1;

        $('body').append(
            '<style type="text/css">'+
            '.guest_list_item {\
            position:relative;\
            height:'+height+'px;\
                }'+
            '</style>'
        );

        $scope.getWindowDimensions = function () {
            return { h: height };
        };

        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {

            $('.guest_list_item').height(newValue.h);
        }, true);

    });
});


module.controller('ClubsListController', function($scope) {
    ons.ready(function() {

        $scope.items = [
            {
                title: 'Funky Night',
                days: 'lunes, martes, miércoles, jueves, viernes, sábados, domingos',
                list_image: 'img/list_clubs.jpg'
            },
            {
                title: 'Funky Night',
                days: 'lunes, martes, miércoles, jueves, viernes, sábados, domingos',
                list_image: 'img/list_clubs.jpg'
            },
            {
                title: 'Funky Night',
                days: 'lunes, martes, miércoles, jueves, viernes, sábados, domingos',
                list_image: 'img/list_clubs.jpg'
            },
            {
                title: 'Funky Night',
                days: 'lunes, martes, miércoles, jueves, viernes, sábados, domingos',
                list_image: 'img/list_clubs.jpg'
            },
            {
                title: 'Funky Night',
                days: 'lunes, martes, miércoles, jueves, viernes, sábados, domingos',
                list_image: 'img/list_clubs.jpg'
            },
            {
                title: 'Funky Night',
                days: 'lunes, martes, miércoles, jueves, viernes, sábados, domingos',
                list_image: 'img/list_clubs.jpg'
            }
        ];

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('club_info.html');
        };

    });
});




module.controller('ClubInfoController', function($scope) {
    ons.ready(function() {

        $scope.pictures = [
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png',
                selected:'selected'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            }
        ];

        $scope.labels = getLabels();

        $scope.detail = {
            sessions: 'Sesiones:',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta',
            content: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimenaceptar condiciones. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa'
        };

        $scope.title = 'Funky Night';
        $scope.subtitle = 'en PANCHA CBN';

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[clubListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            selectedItem.selected = 'selected';

            $scope.$apply();
        };

        setTimeout(function(){

            clubListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);


        $scope.showForm = function(session_id) {
            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
                //naviDialog.show();
            });
        };

    });


});






module.controller('LifeController', function($scope) {
    ons.ready(function() {

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2)-1;

        $('body').append(
            '<style type="text/css">'+
            '.guest_list_item {\
            position:relative;\
            height:'+height+'px;\
                }'+
            '</style>'
        );

        $scope.getWindowDimensions = function () {
            return { h: height };
        };

        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {

            $('.guest_list_item').height(newValue.h);
        }, true);

    });
});


module.controller('LifeListController', function($scope) {
    ons.ready(function() {

        $scope.items = [
            {
                title: 'Funky Night',
                subtitle: 'RESTAURANTE MEDITERRANEO CON VISTAS AL MAR',
                list_image: 'img/list_life.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'RESTAURANTE MEDITERRANEO CON VISTAS AL MAR',
                list_image: 'img/list_life.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'RESTAURANTE MEDITERRANEO CON VISTAS AL MAR',
                list_image: 'img/list_life.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'RESTAURANTE MEDITERRANEO CON VISTAS AL MAR',
                list_image: 'img/list_life.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'RESTAURANTE MEDITERRANEO CON VISTAS AL MAR',
                list_image: 'img/list_life.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'RESTAURANTE MEDITERRANEO CON VISTAS AL MAR',
                list_image: 'img/list_life.jpg'
            }
        ];

        $scope.showClubInfo = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('life_info.html');
        };

    });
});




module.controller('LifeInfoController', function($scope) {
    ons.ready(function() {

        $scope.pictures = [
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png',
                selected:'selected'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            }
        ];

        $scope.labels = getLabels();

        $scope.detail = {
            open: 'Lunes, Martes, etc...',
            type: 'mediterranea, etc.',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta',
            content: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimenaceptar condiciones. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa'
        };

        $scope.title = 'Funky Night';
        $scope.subtitle = 'en PANCHA CBN';

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[guestListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            selectedItem.selected = 'selected';

            $scope.$apply();
        };

        setTimeout(function(){

            guestListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);


        $scope.showForm = function(session_id) {
            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
                //naviDialog.show();
            });
        };

    });


});








module.controller('PromosController', function($scope) {
    ons.ready(function() {

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2)-1;

        $('body').append(
            '<style type="text/css">'+
            '.guest_list_item {\
            position:relative;\
            height:'+height+'px;\
                }'+
            '</style>'
        );

        $scope.getWindowDimensions = function () {
            return { h: height };
        };

        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {

            $('.guest_list_item').height(newValue.h);
        }, true);

    });
});


module.controller('PromosListController', function($scope) {
    ons.ready(function() {

        $scope.items = [
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                list_image: 'img/list_promo.jpg'
            }
        ];

        $scope.showInfo = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('promo_info.html');
        };

    });
});




module.controller('PromoInfoController', function($scope) {
    ons.ready(function() {

        $scope.pictures = [
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png',
                selected:'selected'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            },
            {
                title: 'Funky Night',
                place: 'en PANCHA CBN',
                time: 'martes 22:00 FREE hasta las 2:00h',
                list_image: 'img/list.png'
            }
        ];

        $scope.labels = getLabels();

        $scope.detail = {
            open: 'Lunes, Martes, etc...',
            type: 'mediterranea, etc.',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta',
            content: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimenaceptar condiciones. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfaaaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa aaaaa bbbb ccddddfa'
        };

        $scope.title = 'Funky Night';
        $scope.subtitle = '2X1 CENAS, A LA CARTA 50% Y BOTELLA GRATIS';

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[guestListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            selectedItem.selected = 'selected';

            $scope.$apply();
        };

        setTimeout(function(){

            guestListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });


});






module.controller('ProfileController', function($scope) {
    ons.ready(function() {

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2)-1;

        $('body').append(
            '<style type="text/css">'+
            '.guest_list_item {\
            position:relative;\
            height:'+height+'px;\
                }'+
            '</style>'
        );

        $scope.getWindowDimensions = function () {
            return { h: height };
        };

        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {

            $('.guest_list_item').height(newValue.h);
        }, true);

        $scope.labels = getLabels();

    });
});


module.controller('ProfileListController', function($scope) {
    ons.ready(function() {

        $scope.items = [
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                club: 'en PACHA CBN',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                club: 'en PACHA CBN',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                club: 'en PACHA CBN',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                club: 'en PACHA CBN',
                list_image: 'img/list_promo.jpg'
            },
            {
                title: 'Funky Night',
                subtitle: 'COPA GRATIS HASTA LAS 3:00H',
                club: 'en PACHA CBN',
                list_image: 'img/list_promo.jpg'
            }
        ];

        $scope.labels = getLabels();

        $scope.showDetail = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('profile_detail.html');
        };

    });
});




module.controller('ProfileDetailController', function($scope) {
    ons.ready(function() {

        $scope.label_edit = getLabel('edit');

        $scope.detail = {
            name: '',
            email: '',
            phone: ''
        };

        $scope.detail_visible = 'visible';
        $scope.form_visible = '';

        $scope.actionForm = function() {

            if($scope.detail_visible == 'visible') {

                $scope.detail_visible = '';
                $scope.form_visible = 'visible';

                $scope.label_edit = getLabel('save');

            } else {

                $scope.detail_visible = 'visible';
                $scope.form_visible = '';

                $scope.label_edit = getLabel('edit');
            }
        };

    });
});




function getLabels() {
    return labels[applicationLanguage];
}

function getLabel(key) {
    return labels[applicationLanguage][key];
}

function generateCalendar() {
    var items = [];

    var currentDay = parseInt( moment().format("D") );

    items.push({day: moment().subtract('days', 2).format("D"), month: moment().subtract('days', 2).format("MMM"), date: moment().subtract('days', 2).format("L") });
    items.push({day: moment().subtract('days', 1).format("D"), month: moment().subtract('days', 1).format("MMM"), date: moment().subtract('days', 1).format("L") });


    for (i = 0; i <= 30; i ++) {
        if(i == 0) {
            items.push({day: moment().add('days', i).format("D"), month: moment().add('days', i).format("MMM"), selected: 'selected', date: moment().add('days', i).format("L") });
        } else {
            items.push({day: moment().add('days', i).format("D"), month: moment().add('days', i).format("MMM"), date: moment().add('days', i).format("L") });
        }
    }
}