var module = ons.bootstrap();

var applicationLanguage = (localStorage.getItem("lang") != null || localStorage.getItem("lang") != undefined) ? localStorage.getItem("lang") : 'es';

var api_url = 'http://golden-vip.com/api/';
var thumb_url = 'http://golden-vip.com/helpers/timthumb.php?w=%width%&h=%height%&src=';

var lists = {
    session_list: [],
    clubs_list: [],
    life_list: [],
    promos_list: []
};

var currentDate = '';
var userData = (localStorage.getItem("user") != null || localStorage.getItem("user") != undefined) ? JSON.parse(localStorage.getItem("user")) : null;
var currentSession;

var selectedDate;

var TOKEN_PUSH_NOTIFICATION = (localStorage.getItem("push_token") != null || localStorage.getItem("push_token") != undefined) ? JSON.parse(localStorage.getItem("push_token")) : 0;
var DEVICE_UUID = (localStorage.getItem("uuid") != null || localStorage.getItem("uuid") != undefined) ? JSON.parse(localStorage.getItem("uuid")) : 0;

var current_section = '';
var current_seccion_id = '';

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
        fill_form: 'rellena este pequeño formulario. Este proceso sólo es necesario una vez',
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
        user_email_required: 'Email es requerido',
        user_email_invalid: 'Direccion de Email inválida',
        user_phone_required: 'Telefono es requerido',
        user_conditions_required: 'Debe aceptar las condiciones',
        no_guest_list: 'No tienes ningún GUEST LIST. Entra en la sección y elige tus sesiones',
        no_data: 'No hay datos para mostrar',
        no_sessions: 'No hay sessiones disponibles',
        no_clubs: 'No hay clubs disponibles',
        no_life: 'No hay life disponibles',
        no_promos: 'No hay promos disponibles',
        hi: 'Hola',
        complete_nro_persons: 'completa el n° de personas que asistiréis',
        to_session: 'a la sessión',
        to_day: 'del día',
        perfect: 'Perfecto!',
        you_are_in_guest_list: 'ya estás en la guest list de ',
        for_session: 'para la ',
        present_invitation: 'presenta la invitación que te hemos guardado',
        in_seccion: 'en la sección',
        this_app: 'de este app',
        club_door: 'en la puerta del club',
        my_profile: 'MI PERFIL',
        profile: 'mi perfil',
        alert: 'ALERTA',
        accept: 'Aceptar',
        yes: 'Si',
        no: 'No',
        call: 'LLAMAR'
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
        fill_form: 'fill this few form, This process is only required once',
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
        user_phone_required: 'Phone is required',
        user_conditions_required: 'You must accept conditions',
        no_guest_list: 'You have no GUEST LIST. Enter the section and select your sessions',
        no_data: 'There is no data to show',
        no_sessions: 'There is no sessions available',
        no_clubs: 'There is no clubs available',
        no_life: 'There is no life available',
        no_promos: 'There is promos available',
        hi: 'Hi',
        complete_nro_persons: 'cComplete the n ° of people who will attend',
        to_session: 'to session',
        to_day: 'of the day',
        perfect: 'Perfect!',
        you_are_in_guest_list: "and you're on the guest list of ",
        for_session: 'for ',
        present_invitation: "presents the invitation that we've kept",
        in_seccion: 'in section',
        this_app: 'of this app',
        club_door: 'in front of the club',
        my_profile: 'MY PROFILE',
        profile: 'my profile',
        alert: 'ALERT',
        accept: 'Accept',
        yes: 'Yes',
        no: 'No',
        call: 'CALL'
    }
};


function redirectToSection(scope, section) {

    if(current_seccion_id != '') {

        index=-1;

        list = lists[section + '_list'];

        if(list && list.length > 0) {

            for(var i in list) {
                if(list[i].id == current_seccion_id) {
                    index = i;
                    break;
                }
            }


            if(index != -1) {
                scope.gotoDetailFromNotification(index);
            }
        }

        current_seccion_id = '';
    }
}


window.fadeIn = function(obj) {

    var finalImage = $('<div class="item-bg-final"></div>');

    finalImage.css('background-image', "url('" + $(obj).attr('src') + "')");

    $(obj).parent().html(finalImage);

    setTimeout(function(){
        finalImage.addClass('fadein');
    }, 50);
};

window.onresize = function(){
    resizeCardCarousel();
}

function resizeCardCarousel() {
    thumb_width = window.innerWidth;
    thumb_height = parseInt(510 / 640 * window.innerWidth);

    $('.hascarousel .carousel-detail').height(thumb_height);
    $('.hascarousel .page__content').css('top', thumb_height);
}


/*module.controller('AppController', function($scope) {
    ons.ready(function() {
    });
});*/


function registerNotifications() {

    console.log('registerNotifications');

    if(window.plugins && window.plugins.pushNotification) {

        var pushNotification = window.plugins.pushNotification;

        if (device.platform == 'android' || device.platform == 'Android') {

            pushNotification.register(successHandler, this.errorHandler, {
                "senderID": "51393321226",
                "ecb": "onNotificationGCM"
            });

            console.log('Android');

        } else {

            pushNotification.register(tokenHandler, this.errorHandler, {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            });

            console.log('IPhone');
        }
    }
}

function successHandler() {}

// android
function tokenHandler(result) {

    console.log('tokenHandler ' + result);

    if(TOKEN_PUSH_NOTIFICATION == 0){
        storeToken(device.uuid, result, 'iphone');

        console.log('tokenHandler ' + result);
    }
}

function onNotificationGCM(e) {

    console.log('onNotificationGCM');

    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                if(TOKEN_PUSH_NOTIFICATION == 0){
                    storeToken(device.uuid, e.regid, 'android');
                }
            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            if(TOKEN_PUSH_NOTIFICATION != 0){
                showNotification(e,'android');
            }else{
                HAVE_NOTIFICATION = true;
                TYPE_NOTIFICATION = 'android';
                EVENT = e;
            }
            break;

        case 'error':
            alert('GCM error = '+e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}

function onNotificationAPN(event) {
    if (event.alert) {
        if(TOKEN_PUSH_NOTIFICATION != 0){
            showNotification(event,'ios');
        }else{
            HAVE_NOTIFICATION = true;
            TYPE_NOTIFICATION = 'ios';
            EVENT = event;
        }
    }
}

function showNotification(event, type){
    var message = type == "android" ? event.message : event.alert;
    var seccion = type == "android" ? event.payload.seccion : event.seccion;
    var seccion_id = type == "android" ? event.payload.seccion_id : event.seccion_id;

    navigator.notification.alert(
        message,
        function(){
            redirectToPage(seccion, seccion_id);
        },
        getLabel("alert"),
        getLabel("accept")
    );
}

function redirectToPage(seccion, id){
    var page = "";
    var params = {};
    var active_tab = -1;

    if(id != ""){
        params.id = id;
    }

    current_seccion_id = id;

    if(seccion == "session"){

        active_tab = 0;

    } else if(seccion == "club"){

        active_tab = 1;

    } else if(seccion == "life"){

        active_tab = 2;

    } else if(seccion == "promo"){

        active_tab = 3;
    }

    if(active_tab != -1) {
        mainTabBar.setActiveTab(active_tab);
    }
}

function errorHandler() {}


function storeToken(uuid, token, device) {

    TOKEN_PUSH_NOTIFICATION = token;
    DEVICE_UUID = uuid;

    console.log('uuid: ' + uuid + ' token: ' + token + ' device: ' + device);

    getJsonPBackground(api_url + 'updateUUID/', function(data) {

        console.log(data);

        localStorage.setItem("push_token", TOKEN_PUSH_NOTIFICATION);
        localStorage.setItem("uuid", DEVICE_UUID);

    }, function(){

        //TOKEN_PUSH_NOTIFICATION = 0;

    }, {
        user_id: userData.id,
        uuid: TOKEN_PUSH_NOTIFICATION,
        uuid_device: uuid,
        device: device
    });
}


module.controller('LanguageController', function($scope) {
    ons.ready(function() {

        $('#app-wrapper').show();

        try {
            StatusBar.hide();
        }catch(error){}

        if(applicationLanguage != null) {

            splash.pushPage('page.html', {lang: applicationLanguage, animation: 'none'});

        } else {

            try { navigator.splashscreen.hide(); } catch(error){}

            setTimeout(function(){
                $('.languageButtons').addClass('fadein');
            }, 100);

        }



        if(userData == null) {

            userData = {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                persons: '',
                session_id: ''
            };

            getJsonPBackground(api_url + 'registerUser/', function(data){

                userData = data.user;

                localStorage.setItem("user", JSON.stringify(userData));

                registerNotifications();

            }, function(){

                userData = null;

            }, userData);

        } else if (TOKEN_PUSH_NOTIFICATION == 0) {

            registerNotifications();
        }



    });
});

module.controller('MainMenuController', function($scope) {
    ons.ready(function() {

        applicationLanguage = splash.getCurrentPage().options.lang;

        localStorage.setItem('lang', applicationLanguage);

        $scope.labels = getLabels();

    });
});


var scopeGuestCarouselController;
module.controller('GuestCarouselController', function($scope) {
    ons.ready(function() {

        scopeGuestCarouselController = $scope;

        moment.locale(applicationLanguage);

        currentDate = moment().format("L");

        scopeGuestCarouselController.calendar = generateCalendar();


        $scope.filterSessionDay = function(index) {

            var selectedItem = $scope.calendar[index];

            for(var i in $scope.calendar) {

                $scope.calendar[i].selected = '';
            }

            $('div.page__content.ons-page-inner').scrollTop(0);

            selectedItem.selected = 'selected';

            if(selectedDate != selectedItem.date) {

                selectedDate = selectedItem.date;

                getJsonP(api_url + 'getSessions/', function (data) {

                    //scopeGuestcontroller.items = data.list;
                    //scopeGuestcontroller.$digest();

                    apply(scopeGuestcontroller, 'items', data.list, scopeGuestcontroller.thumb_width, scopeGuestcontroller.thumb_height);

                    if (data.status == 'fail') {

                        scopeGuestcontroller.$apply(function () {
                            scopeGuestcontroller.no_data = true;
                        });

                    } else {

                        scopeGuestcontroller.$apply(function () {
                            scopeGuestcontroller.no_data = false;
                        });
                    }

                    lists.session_list = scopeGuestcontroller.items;

                }, function () {

                    scopeGuestcontroller.error = true;
                    //scopeGuestcontroller.$digest();

                    apply(scopeGuestcontroller, 'items', []);

                }, {
                    date: selectedItem.date/*,
                     width: scopeGuestcontroller.thumb_width,
                     height: scopeGuestcontroller.thumb_height*/
                });

            }
        };
    });
});

var scopeGuestcontroller;
module.controller('GuestController', function($scope) {
    ons.ready(function() {

        scopeGuestcontroller = $scope;

        var height = window.innerHeight - (angular.element('.guestpage ons-toolbar').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }


        scopeGuestcontroller.thumb_width = window.innerWidth;
        scopeGuestcontroller.thumb_height = height;

        $('body').append(
            '<style type="text/css">'+
                '.guest_list_item {\
                position:relative;\
                height:'+height+'px;\
                }'+
            '</style>'
        );

        scopeGuestcontroller.no_data = true;

        selectedDate = moment().add(0, 'days').format("YYYY-M-D");

        getJsonP(api_url + 'getSessions/', function(data){

            apply(scopeGuestcontroller, 'items', data.list, scopeGuestcontroller.thumb_width, scopeGuestcontroller.thumb_height);

            if(data.status == 'fail') {

                scopeGuestcontroller.$apply(function(){
                    scopeGuestcontroller.no_data = true;
                });

            } else {

                scopeGuestcontroller.$apply(function(){
                    scopeGuestcontroller.no_data = false;
                });

                redirectToSection(scopeGuestcontroller, 'session');
            }

            lists.session_list = $scope.items;

            setTimeout(function(){
                try { navigator.splashscreen.hide(); } catch(error){}
            }, 200);


        }, function(){

            scopeGuestcontroller.error = true;

            apply(scopeGuestcontroller, 'items', []);

            setTimeout(function(){
                try { navigator.splashscreen.hide(); } catch(error){}
            }, 200);

        },{
            date: moment().add(0, 'days').format("YYYY-M-D")/*,
            width: $scope.thumb_width,
            height: $scope.thumb_height*/
        });

        $scope.labels = getLabels();

        $scope.showGuestList = function(index) {

            currentSession = lists.session_list[index];

            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
            });
        };

        $scope.showGuestInfo = function(index) {

            currentSession = lists.session_list[index];

            splash.pushPage('guest_list.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            currentSession = lists.session_list[index];

            splash.pushPage('guest_list.html', {index:index});
        };


        $('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            console.log('scroll');
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });

    });
});

var scopeGuestListCardController;
module.controller('GuestListCardController', function($scope) {
    ons.ready(function() {

        scopeGuestListCardController = $scope;

        $scope.labels = getLabels();

        resizeCardCarousel();

        $scope.pictures = getArrayAsObjects(lists.session_list[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.session_list[splash.getCurrentPage().options.index];

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[guestListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            if(selectedItem)
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


var scopeGuestListFormController;
module.controller('GuestListFormController', function($scope) {
    ons.ready(function() {

        scopeGuestListFormController = $scope;

        $scope.form_visible = 'visible';
        $scope.detail_visible = '';

        if( (userData == undefined || userData == null) || (userData != null && userData.email=='') )  {

            $scope.userData = {
                persons: 1,
                session_id: currentSession.id
            };

            $scope.form_visible = 'visible';
            $scope.detail_visible = '';

            $('body').append('<style type="text/css">.bottom-dialog .dialog {min-height: 21.2em;}</style>');

        } else {

            $scope.userData = userData;

            $scope.userData.persons = 1;
            $scope.userData.session_id = currentSession.id;

            $scope.form_visible = '';
            $scope.detail_visible = 'visible';

            $('body').append('<style type="text/css">.bottom-dialog .dialog {min-height: 13.2em;}</style>');
        }

        $scope.detail = currentSession;


        $scope.labels = getLabels();

        $scope.reservation_complete = false;
        $scope.reservation_inprogress = true;

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

            if($scope.userData.first_name == undefined || $scope.userData.first_name == '') {

                alert(getLabel('user_first_name_required'));

            } else if($scope.userData.last_name == undefined || $scope.userData.last_name == '') {

                alert(getLabel('user_last_name_required'));

            } else if($scope.userData.email == undefined || $scope.userData.email == '') {

                alert(getLabel('user_email_required'));

            } else if(!$scope.userData.email.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ) ) {

                alert(getLabel('user_email_invalid'));

            } else if($scope.userData.phone == undefined || $scope.userData.phone == '') {

                alert(getLabel('user_phone_required'));

            } else if($scope.userData.conditions == undefined || $scope.userData.conditions == false) {

                alert(getLabel('user_conditions_required'));

            } else {

                if(userData && userData.id != undefined && userData.id != '') {
                    $scope.userData.id = userData.id;
                }

                getJsonP(api_url + 'registerUser/', function(data){

                    userData = data.user;

                    //$scope.closeForm();

                    scopeGuestListFormController.$apply(function(){
                        scopeGuestListFormController.reservation_complete = true;
                        scopeGuestListFormController.reservation_inprogress = false;
                    });

                    localStorage.setItem("user", JSON.stringify(userData));

                    storeToken(DEVICE_UUID, TOKEN_PUSH_NOTIFICATION, ons.platform.isIOS() ? 'iphone' : 'android');

                    $('body').append('<style type="text/css">.bottom-dialog .dialog {min-height: 13.2em;}</style>');

                }, function(data){


                }, $scope.userData);
            }
        };

        $scope.goToProfile = function() {

            $scope.closeForm();

            mainTabBar.setActiveTab(4);
        };

    });


});

var scopeClubsController;
module.controller('ClubsController', function($scope) {
    ons.ready(function() {

        scopeClubsController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        $scope.thumb_width = window.innerWidth;
        $scope.thumb_height = height;

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

        $scope.no_data = true;

        getJsonP(api_url + 'getClubs/', function(data){

            //scopeClubsController.items = data.list;
            //scopeClubsController.$digest();

            apply(scopeClubsController, 'items', data.list, scopeClubsController.thumb_width, scopeClubsController.thumb_height);

            if(data.status == 'fail') {

                scopeClubsController.$apply(function(){
                    scopeClubsController.no_data = true;
                });

            } else {

                scopeClubsController.$apply(function(){
                    scopeClubsController.no_data = false;
                });

                redirectToSection(scopeClubsController, 'club');
            }

            lists.clubs_list = $scope.items;
        }, function(){

            scopeClubsController.error = true;
            //scopeClubsController.$digest();

            apply(scopeClubsController, 'items', []);
        }, {
            /*width: $scope.thumb_width,
            height: $scope.thumb_height*/
        });

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            splash.pushPage('club_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('club_info.html', {index:index});
        };



        $('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });

    });
});




module.controller('ClubInfoController', function($scope) {
    ons.ready(function() {

        resizeCardCarousel();

        $scope.pictures = getArrayAsObjects(lists.clubs_list[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.clubs_list[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[clubListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            if(selectedItem)
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





var scopeLifeController;
module.controller('LifeController', function($scope) {
    ons.ready(function() {

        scopeLifeController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        $scope.thumb_width = window.innerWidth;
        $scope.thumb_height = height;

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

        $scope.no_data = true;

        getJsonP(api_url + 'getLifes/', function(data){

            //scopeLifeController.items = data.list;
            //scopeLifeController.$digest();

            apply(scopeLifeController, 'items', data.list, scopeLifeController.thumb_width, scopeLifeController.thumb_height);

            if(data.status == 'fail') {

                scopeLifeController.$apply(function(){
                    scopeLifeController.no_data = true;
                });

            } else {

                scopeLifeController.$apply(function(){
                    scopeLifeController.no_data = false;
                });

                redirectToSection(scopeLifeController, 'life');
            }

            lists.life_list = $scope.items;

        }, function(){

            scopeLifeController.error = true;
            //scopeLifeController.$digest();

            apply(scopeLifeController, 'items', []);
        }, {/*
            width: $scope.thumb_width,
            height: $scope.thumb_height*/
        });

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };


        $('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });

    });
});




module.controller('LifeInfoController', function($scope) {
    ons.ready(function() {

        resizeCardCarousel();

        $scope.pictures = getArrayAsObjects(lists.life_list[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.life_list[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[guestListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            if(selectedItem)
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

        $scope.actionCall = function(phone) {
            document.location.href = 'tel:' + phone;
        };

    });


});







var scopePromosController;
module.controller('PromosController', function($scope) {
    ons.ready(function() {

        scopePromosController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        $scope.thumb_width = window.innerWidth;
        $scope.thumb_height = height;

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


        $scope.no_data = true;

        getJsonP(api_url + 'getPromos/', function(data){

            //scopePromosController.items = data.list;
            //scopePromosController.$digest();

            apply(scopePromosController, 'items', data.list, scopePromosController.thumb_width, scopePromosController.thumb_height);

            if(data.status == 'fail') {

                scopePromosController.$apply(function(){
                    scopePromosController.no_data = true;
                });

            } else {

                scopePromosController.$apply(function(){
                    scopePromosController.no_data = false;
                });

                redirectToSection(scopePromosController, 'promo');
            }

            lists.promos_list = $scope.items;

        }, function(){

            scopePromosController.error = true;
            //scopePromosController.$digest();

            apply(scopePromosController, 'items', []);
        }, {/*
            width: $scope.thumb_width,
            height: $scope.thumb_height*/
        });

        $scope.labels = getLabels();

        $scope.showInfo = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };


        $('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });

    });
});




module.controller('PromoInfoController', function($scope) {
    ons.ready(function() {

        resizeCardCarousel();

        $scope.pictures = getArrayAsObjects(lists.promos_list[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.promos_list[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        $scope.title = 'Funky Night';
        $scope.subtitle = '2X1 CENAS, A LA CARTA 50% Y BOTELLA GRATIS';

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[promoListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            if(selectedItem)
            selectedItem.selected = 'selected';

            $scope.$apply();
        };

        setTimeout(function(){

            promoListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });


});





var scopeProfileController;
module.controller('ProfileController', function($scope) {
    ons.ready(function() {

        scopeProfileController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        $scope.thumb_width = window.innerWidth;
        $scope.thumb_height = height;

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

        $scope.no_guest_list = true;

        $scope.no_data = true;

        getJsonP(api_url + 'getUserSessions/', function(data){

            apply(scopeProfileController, 'items', data.list, scopeProfileController.thumb_width, scopeProfileController.thumb_height);

            profile_list = $scope.items;

            if(data.status == 'fail') {

                scopeProfileController.$apply(function(){
                    scopeProfileController.no_guest_list = true;
                });

            } else {

                scopeProfileController.$apply(function(){
                    scopeProfileController.no_guest_list = false;
                });
            }

        }, function(){

            scopeProfileController.error = true;
            //scopeProfileController.$digest();

            apply(scopeProfileController, 'items', []);

        }, {
            user_id: (userData && userData.id) ? userData.id : ''/*,
            width: $scope.thumb_width,
            height: $scope.thumb_height*/
        });

        $scope.labels = getLabels();

        $scope.validate = function(index) {

            user_session = profile_list[index];

            getJsonP(api_url + 'validateByAdmin/', function(data){

                alert(data.message);

            }, function(){

                $scope.error = true;
                $scope.$apply();

            }, {user_id: (userData && userData.id) ? userData.id : '', users_session_id: user_session.users_session_id});
        };


        $('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });

    });
});


var scopeProfileDetailController;
module.controller('ProfileDetailController', function($scope) {
    ons.ready(function() {

        scopeProfileDetailController = $scope;

        if(userData == undefined || userData == null ) {

            $scope.userData = {
                session_id: 0,
                persons: 0
            };

        } else {

            $scope.userData = userData;
            $scope.userData.session_id = 0;
            $scope.userData.persons = 0;
        }

        $scope.labels = getLabels();

        $scope.label_edit = getLabel('edit');

        $scope.detail_visible = 'visible';
        $scope.form_visible = '';

        $scope.actionForm = function() {

            if($scope.detail_visible == 'visible') {

                $scope.detail_visible = '';
                $scope.form_visible = 'visible';

                $scope.label_edit = getLabel('save');

            } else {

                if($scope.userData.first_name == undefined || $scope.userData.first_name == '') {

                    alert(getLabel('user_first_name_required'));

                } else if($scope.userData.last_name == undefined || $scope.userData.last_name == '') {

                    alert(getLabel('user_last_name_required'));

                } else if($scope.userData.email == undefined || $scope.userData.email == '') {

                    alert(getLabel('user_email_required'));

                } else if(!$scope.userData.email.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ) ) {

                    alert(getLabel('user_email_invalid'));

                } else if($scope.userData.phone == undefined || $scope.userData.phone == '') {

                    alert(getLabel('user_phone_required'));

                } else {

                    if(userData && userData.id != undefined && userData.id != '') {
                        $scope.userData.id = userData.id;
                    }

                    getJsonP(api_url + 'registerUser/', function(data){

                        userData = data.user;

                        $scope.detail_visible = 'visible';
                        $scope.form_visible = '';

                        $scope.label_edit = getLabel('edit');

                        $scope.$apply();

                        localStorage.setItem("user", JSON.stringify(userData));

                        storeToken(DEVICE_UUID, TOKEN_PUSH_NOTIFICATION, ons.platform.isIOS() ? 'iphone' : 'android');

                    }, function(){


                    }, $scope.userData);


                }
            }
        };

        $scope.updateLanguage = function(newLanguage) {

            getJsonP(api_url + 'setIdiomaUser/', function(data){

                applicationLanguage = newLanguage;

                localStorage.setItem('lang', applicationLanguage);

                if(data.message) {
                    alert(data.message);
                }

                //apply(scopeProfileDetailController, 'labels', getLabels());

                scopeProfileDetailController.$apply(function(){
                    scopeProfileDetailController.labels = getLabels();
                });

                scopeProfileController.$apply(function(){
                    scopeProfileController.labels = getLabels();
                });

            }, function(){


            }, {
                user_id: $scope.userData ? $scope.userData.id : '',
                lang: newLanguage
            });
        };

        $scope.updateNotifications = function(flag) {

            getJsonP(api_url + 'setNotificationUser/', function(data){

                if(data.message) {
                    alert(data.message);
                }

            }, function(){


            }, {
                user_id: $scope.userData ? $scope.userData.id : '',
                notif: flag
            });
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

    items.push({day: moment().subtract(2, 'days').format("D"), month: moment().subtract(2, 'days').format("MMM"), date: moment().subtract(2, 'days').format("YYYY-M-D") });
    items.push({day: moment().subtract(1, 'days').format("D"), month: moment().subtract(1, 'days').format("MMM"), date: moment().subtract(1, 'days').format("YYYY-M-D") });


    for (i = 0; i <= 30; i ++) {
        if(i == 0) {
            items.push({day: moment().add(i, 'days').format("D"), month: moment().add(i, 'days').format("MMM"), selected: 'selected', date: moment().add(i, 'days').format("YYYY-M-D") });
        } else {
            items.push({day: moment().add(i, 'days').format("D"), month: moment().add(i, 'days').format("MMM"), date: moment().add(i, 'days').format("YYYY-M-D") });
        }
    }

    return items;
}

// result json
function apply($scope, key, value, width, height) {
    var result = [];
    if(value && value.length > 0) {
        for(var i in value) {
            var obj = value[i];

            try {
                /*if(width && height) {
                    width = width*2;
                    height = height*2;
                    obj.thumb = thumb_url.replace('%width%', width).replace('%height%', height) + obj.images[0];
                } else {
                    obj.thumb = obj.images[0];
                }*/

                obj.thumb = obj.images[0];

            }catch(error){}

            result.push(obj);
        }

        $scope.$apply(function() {
            $scope[key] = result;
        });

    } else {

        $scope.$apply(function() {
            $scope[key] = value;
        });
    }


}

function getArrayAsObjects(array, width, height) {
    var result = [];

    width = width*2;
    height = height*2;

    for(var i in array) {
        result.push({list_image:array[i], selected:i == 0 ? 'selected' : ''});
        /*if(width && height) {
            result.push({list_image: thumb_url.replace('%width%', width).replace('%height%', height) + array[i], selected:i == 0 ? 'selected' : ''});
        } else {
            result.push({list_image:array[i], selected:i == 0 ? 'selected' : ''});
        }*/
    }

    return result;
}

function getJsonP(url, callback_success, callback_error, data) {

    if(data == undefined) {
        data = {};
    }


    if(data['lang'] == undefined) {
        data['lang'] = applicationLanguage;
    }

    modal.show();

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        dataType: 'JSONp',
        timeout: 30000,
        async:true,
        success: function(data) {

            modal.hide();

            callback_success(data);
        },
        error: function(data) {

            modal.hide();

            callback_error(data);
        }
    });
}


function getJsonPBackground(url, callback_success, callback_error, data) {

    console.log(data);

    if(data == undefined) {
        data = {};
    }


    if(data['lang'] == undefined) {
        data['lang'] = applicationLanguage;
    }

    $.ajax({
        type: 'GET',
        url: url,
        data: data,
        dataType: 'JSONp',
        timeout: 30000,
        async:true,
        success: function(data) {

            modal.hide();

            callback_success(data);
        },
        error: function(data) {

            modal.hide();

            callback_error(data);
        }
    });
}


function alert(message) {
    ons.notification.alert({
        message: message,
        // or messageHTML: '<div>Message in HTML</div>',
        title: getLabel('alert'),
        buttonLabel: 'OK',
        animation: 'default', // or 'none'
        // modifier: 'optional-modifier'
        callback: function() {
            // Alert button is closed!
        }
    });
}
