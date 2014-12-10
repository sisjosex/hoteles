var module = ons.bootstrap();

var applicationLanguage = 'es';

var api_url = 'http://localhost/hoteles_admin/hoteles/api/';


var session_list = [];
var clubs_list = [];
var life_list = [];
var promos_list = [];
var currentDate = '';
var userData = {};

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
        save: 'Guardar',
        in: ' en ',
        user_first_name_required: 'Nombre es requerido',
        user_last_name_required: 'Apellido es requerido',
        user_email_required: 'Email esrequerido',
        user_email_invalid: 'Direccion de Email inválida',
        user_phone_required: 'Telefono es requerido'
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
        save: 'Save',
        in: ' in ',
        user_first_name_required: 'Name is required',
        user_last_name_required: 'Surename is required',
        user_email_required: 'Email is required',
        user_email_invalid: 'Invalid email address',
        user_phone_required: 'Phone is required'
    }
};


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

        currentDate = moment().subtract('days', 2).format("L");

        scopeGuestCarouselController.items = generateCalendar();


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


        getJsonP(api_url + 'getSessions/?callback=JSON_CALLBACK', function(data){

            $scope.items = data.list;
            $scope.$apply();

            session_list = $scope.items;
        }, function(){

            $scope.error = true;
            $scope.$apply();
        });

        $scope.labels = getLabels();

        $scope.showGuestList = function(index) {

            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
                //naviDialog.show();
            });
        };

        $scope.showGuestInfo = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('guest_list.html', {index:index});
        };

    });
});


module.controller('GuestListCardController', function($scope) {
    ons.ready(function() {

        $scope.labels = getLabels();

        $scope.pictures = getArrayAsObjects(session_list[splash.getCurrentPage().options.index].images);

        $scope.detail = session_list[splash.getCurrentPage().options.index];

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

        $scope.userData = {
            persons: 1
        };

        $scope.labels = getLabels();

        $scope.increasePersons = function() {
            $scope.userData.persons ++;
        };

        $scope.decreasePersons = function() {
            if($scope.userData.persons >= 2) {
                $scope.userData.persons --;
            }
        };

        $scope.closeForm = function() {

            $('#conditions').remove();
            guestFormDialog.hide();
        };

        $scope.confirm = function() {

            if($scope.userData.first_name == undefined) {

                alert(getLabel('user_first_name_required'));

            } else if($scope.userData.last_name == undefined) {

                alert(getLabel('user_last_name_required'));

            } else if($scope.userData.email == undefined) {

                alert(getLabel('user_email_required'));

            } else if(!$scope.userData.email.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ) ) {

                alert(getLabel('user_email_invalid'));

            } else if($scope.userData.phone == undefined) {

                alert(getLabel('user_phone_required'));

            } else {

                getJsonP(api_url + 'registerUser/?callback=JSON_CALLBACK', function(data){


                }, function(){


                }, $scope.userData);
            }
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

        getJsonP(api_url + 'getClubs/?callback=JSON_CALLBACK', function(data){

            $scope.items = data.list;
            $scope.$apply();

            clubs_list = $scope.items;
        }, function(){

            $scope.error = true;
            $scope.$apply();
        });

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            splash.pushPage('club_info.html', {index:index});
        };

    });
});




module.controller('ClubInfoController', function($scope) {
    ons.ready(function() {

        $scope.pictures = getArrayAsObjects(clubs_list[splash.getCurrentPage().options.index].images);

        $scope.detail = clubs_list[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

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

        getJsonP(api_url + 'getLifes/?callback=JSON_CALLBACK', function(data){

            $scope.items = data.list;
            $scope.$apply();

            life_list = $scope.items;

        }, function(){

            $scope.error = true;
            $scope.$apply();
        });

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };

    });
});




module.controller('LifeInfoController', function($scope) {
    ons.ready(function() {

        $scope.pictures = getArrayAsObjects(life_list[splash.getCurrentPage().options.index].images);

        $scope.detail = life_list[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

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


        getJsonP(api_url + 'getPromos/?callback=JSON_CALLBACK', function(data){

            $scope.items = data.list;
            $scope.$apply();

            promos_list = $scope.items;

        }, function(){

            $scope.error = true;
            $scope.$apply();
        });

        $scope.labels = getLabels();

        $scope.showInfo = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };

    });
});




module.controller('PromoInfoController', function($scope) {
    ons.ready(function() {

        $scope.pictures = getArrayAsObjects(promos_list[splash.getCurrentPage().options.index].images);

        $scope.detail = promos_list[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

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

            splash.pushPage('profile_detail.html', {index:index});
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

            $scope.apply();
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

    return items;
}

function getArrayAsObjects(array) {
    var result = [];

    for(var i in array) {
        result.push({list_image:array[i], selected:i == 0 ? 'selected' : ''});
    }

    return result;
}

function getJsonP(url, callback_success, callback_error, data) {

    if(data == undefined) {
        data = {};
    }

    data['lang'] = applicationLanguage;

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        dataType: 'JSONp',
        timeout: 30000,
        async:true,
        success: function(data) {

            callback_success(data);
        },
        error: function(data) {

            callback_error(data);
        }
    });
}