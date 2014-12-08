var module = ons.bootstrap();

var applicationLanguage = 'sp';

module.controller('AppController', function($scope) { });

module.controller('LanguageController', function($scope) {
    ons.ready(function() {
        //navigator.getDeviceBackButtonHandler().enable();
    });
});

module.controller('MainMenuController', function($scope) {
    ons.ready(function() {

        applicationLanguage = splash.getCurrentPage().options.lang;



    });
});


var scopeGuestCarouselController;
module.controller('GuestCarouselController', function($scope) {
    ons.ready(function() {

        scopeGuestCarouselController = $scope;

        $scope.items = [
            {
                day: 1,
                month: 'NOV'
            },
            {
                day: 2,
                month: 'NOV'
            },
            {
                day: 3,
                month: 'NOV',
                selected: 'selected'
            },
            {
                day: 4,
                month: 'NOV'
            },
            {
                day: 5,
                month: 'NOV'
            }
            ,{
                day: 6,
                month: 'NOV'
            },
            {
                day: 7,
                month: 'NOV'
            },
            {
                day: 8,
                month: 'NOV'
            },
            {
                day: 9,
                month: 'NOV'
            }
        ];

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

        $scope.labels = {
            guest_list: 'GUEST LIST:',
            club: 'Club:',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta'
        };

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

        $scope.labels = {
            fill_form: 'rellena este pequeño formulario',
            first_name: 'Nombre:',
            last_name: 'Apellidos:',
            email: 'Email:',
            phone: 'Teléfono:',
            persons: 'Nº de personas:',
            conditions: 'aceptar condiciones',
            confirm: 'CONFIRMAR'
        };

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

        $scope.labels = {
            sessions: 'Sesiones:',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta'
        };

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
            },
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

        $scope.labels = {
            open: 'Abierto:',
            type: 'Tipo de cocina:',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta'
        };

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

        $scope.labels = {
            open: 'Abierto:',
            type: 'Tipo de cocina:',
            address: 'Dirección:',
            hour: 'Horario:',
            metro: 'Metro:',
            ambient: 'Ambiente:',
            accept_card: 'Acepta Tarjeta'
        };

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