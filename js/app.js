var module = ons.bootstrap();

angular.module('MyApp', ['QuickList']);

var lists = {
    session: [],
    club: [],
    life: [],
    promo: [],
    profile: [],
    calendar: []
};

var calendar = generateCalendar();

var currentDate = '';


var currentSession;

var selectedDate = '';
var current_page = '';
var current_seccion_id = '';


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
};

function resizeCardCarousel() {
    thumb_width = window.innerWidth;
    thumb_height = parseInt(514 / 640 * window.innerWidth);

    $('.hascarousel .carousel-detail').height(thumb_height);
    $('.hascarousel .page__content').css('top', thumb_height);
}

function onError() {}


function gotoPage(page, params) {

    splash.pushPage(page, params);
}


function createUserAndRegisterNotifications() {
    if(userData === null) {

        userData = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            persons: '',
            session_id: '',
            language: applicationLanguage
        };

        getJsonPBackground(api_url + 'registerUser/', function(data){

            userData = data.user;

            localStorage.setItem("user", JSON.stringify(userData));

            registerNotifications();

        }, function(){

            //userData = null;

        }, userData);

    } else if (TOKEN_PUSH_NOTIFICATION === 0) {

        registerNotifications();
    }
}



filterSessionDay = function(index, element) {

    if(element !== undefined) {
        $('.session_day').removeClass('selected');
        $(element).addClass('selected');
    }

    var selectedItem = lists.calendar[index];

    $('div.page__content.ons-page-inner').scrollTop(0);

    selectedItem.selected = 'selected';

    loadIntoTemplateSingle('#session_list_container', {}, 'no_guests', getLabels());

    console.log(selectedDate);
    console.log(selectedItem.date);

    selectedDate = selectedItem.date;

    getJsonP(api_url + 'getSessions/', function (data) {

        if (data.status === 'fail') {



        } else {

            lists.session = data.list;

            loadIntoTemplate('#session_list_container', lists.session, 'session_list', getLabels());

            redirectToSection(scopeGuestcontroller, 'session');
        }

        currentDate = moment().add(0, 'days').format("YYYY-M-D");

    }, function () {
    }, {
        date: selectedItem.date
    });


};

showClubInfo = function(index) {

    splash.pushPage('club_info.html', {index:index});
};

showLifeInfo = function(index) {

    splash.pushPage('life_info.html', {index:index});
};

showPromoInfo = function(index) {

    splash.pushPage('promo_info.html', {index:index});
};

showGuestList = function(index) {

    currentSession = lists.session[index];

    ons.createDialog('guest_list_form.html').then(function(dialog) {
        guestFormDialog.show();
    });
};

showGuestInfo = function(index) {

    currentSession = lists.session[index];

    splash.pushPage('guest_list.html', {index:index});
};


module.controller('LanguageController', function($scope) {
    ons.ready(function() {

        /*$scope.$on("$destroy",function( event ) {
            //$timeout.cancel( timer );
        });*/

        try {
            StatusBar.hide();
        }catch(error){}

        if(applicationLanguage !== '' && (applicationLanguage === 'es' || applicationLanguage === 'en')) {

            splash.pushPage('tab_bar.html', {lang: applicationLanguage, animation: 'none'});

        } else {

            try { navigator.splashscreen.hide(); } catch(error){}

            setTimeout(function(){
                $('.languageButtons').addClass('fadein');
            }, 100);
        }

    });
});

module.controller('MainMenuController', function($scope) {
    ons.ready(function() {

        applicationLanguage = splash.getCurrentPage().options.lang;
        localStorage.setItem('lang', applicationLanguage);

        createUserAndRegisterNotifications();

        $scope.labels = getLabels();

        /*$scope.$on("$destroy",function( event ) {
            //$timeout.cancel( timer );
        });*/

    });
});


var scopeGuestCarouselController;
module.controller('GuestCarouselController', function($scope) {
    ons.ready(function() {

        scopeGuestCarouselController = $scope;

        moment.locale(applicationLanguage);

        /*console.log(lists.calendar);
        lists.calendar = generateCalendar();*/

        loadIntoTemplate('#carouselSession', lists.calendar, 'calendar');

    });
});

var scopeGuestcontroller;
module.controller('GuestController', function($scope) {
    ons.ready(function() {

        if(currentDate === '') {
            currentDate = moment().add(0, 'days').format("YYYY-M-D");
        }

        lists.calendar = generateCalendar();

        current_page = 'guest.html';

        scopeGuestcontroller = $scope;

        var height = window.innerHeight - (angular.element('.guestpage ons-toolbar').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        currentDate = moment().add(0, 'days').format("YYYY-M-D");

        if(selectedDate === '') {
            selectedDate = currentDate;
        }

        var selectedIndex = -1;

        for(var i in lists.calendar) {

            lists.calendar[i].selected = '';

            if(lists.calendar[i].date === selectedDate) {

                lists.calendar[i].selected = 'selected';

                selectedIndex = i;
                break;
            }
        }

        if( selectedIndex !== -1 ) {
            setTimeout(function(){
                filterSessionDay(selectedIndex);
            }, 200);

        }

        $scope.labels = getLabels();

        $scope.gotoDetailFromNotification = function(index) {

            currentSession = lists.session[index];

            splash.pushPage('guest_list.html', {index:index});
        };


        /*$scope.$on("$destroy",function( event ) {
            //$timeout.cancel( timer );
        });*/


        $('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });

    });
});

var scopeGuestListCardController;
module.controller('GuestListCardController', function($scope) {
    ons.ready(function() {

        current_page = 'guest_list.html';

        scopeGuestListCardController = $scope;

        $scope.labels = getLabels();

        resizeCardCarousel();

        pictures = getArrayAsObjects(lists.session[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        loadIntoTemplate('#guest_images', pictures, 'guest_images');

        $scope.detail = lists.session[splash.getCurrentPage().options.index];

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

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

    });


});


var scopeGuestListFormController;
var isShowingForm = false;
module.controller('GuestListFormController', function($scope) {
    ons.ready(function() {

        isShowingForm = true;

        scopeGuestListFormController = $scope;

        $scope.form_visible = 'visible';
        $scope.detail_visible = '';

        if( (userData === undefined || userData === null) || (userData !== null && userData.email === '') )  {

            $scope.userData = {
                persons: 1,
                session_id: currentSession.id
            };

            $scope.form_visible = 'visible';
            $scope.detail_visible = '';

            fixModalBottomHeight('21.2em');

        } else {

            $scope.userData = userData;

            $scope.userData.persons = 1;
            $scope.userData.session_id = currentSession.id;

            $scope.form_visible = '';
            $scope.detail_visible = 'visible';

            fixModalBottomHeight('13.2em');
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

            isShowingForm = false;

            $('#conditions').remove();
            guestFormDialog.hide();
        };

        $scope.confirm = function() {

            if($scope.userData.first_name === undefined || $scope.userData.first_name === '') {

                alert(getLabel('user_first_name_required'));

            } else if($scope.userData.last_name === undefined || $scope.userData.last_name === '') {

                alert(getLabel('user_last_name_required'));

            } else if($scope.userData.email === undefined || $scope.userData.email === '') {

                alert(getLabel('user_email_required'));

            } else if(!$scope.userData.email.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ) ) {

                alert(getLabel('user_email_invalid'));

            } else if($scope.userData.phone === undefined || $scope.userData.phone === '') {

                alert(getLabel('user_phone_required'));

            } else if($scope.userData.conditions === undefined || $scope.userData.conditions === false) {

                alert(getLabel('user_conditions_required'));

            } else {

                if(userData && userData.id !== undefined && userData.id !== '') {
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


                    fixModalBottomHeight('13.2em');

                }, function(data){


                }, $scope.userData);
            }
        };

        $scope.goToProfile = function() {

            $scope.closeForm();

            mainTabBar.setActiveTab(4);
        };

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

    });


});

var scopeClubsController;
module.controller('ClubsController', function($scope) {
    ons.ready(function() {

        current_page = 'clubs.html';

        scopeClubsController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        setTimeout(function(){
            loadIntoTemplateSingle('#club_list', {}, 'no_club', getLabels());
        }, 200);


        getJsonP(api_url + 'getClubs/', function(data){

            lists.club = data.list;

            if(data.status === 'fail') {

            } else {

                loadIntoTemplate('#club_list', lists.club, 'club_list', getLabels());

                redirectToSection(scopeClubsController, 'club');
            }


        }, function(){

            scopeClubsController.error = true;

        }, {});

        $scope.labels = getLabels();

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('club_info.html', {index:index});
        };

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

        /*$('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });*/

    });
});




module.controller('ClubInfoController', function($scope) {
    ons.ready(function() {

        current_page = 'club_info.html';

        resizeCardCarousel();

        pictures = getArrayAsObjects(lists.club[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.club[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        loadIntoTemplate('#club_images', pictures, 'club_images');

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

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

    });


});





var scopeLifeController;
module.controller('LifeController', function($scope) {
    ons.ready(function() {

        current_page = 'life.html';

        scopeLifeController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        setTimeout(function(){
            loadIntoTemplateSingle('#life_list', {}, 'no_life', getLabels());
        }, 200);


        getJsonP(api_url + 'getLifes/', function(data){

            lists.life = data.list;

            if(data.status === 'fail') {

            } else {

                loadIntoTemplate('#life_list', lists.life, 'life_list', getLabels());

                redirectToSection(scopeLifeController, 'life');
            }

        }, function(){

        }, {});

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

        /*$('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });*/

    });
});




module.controller('LifeInfoController', function($scope) {
    ons.ready(function() {

        current_page = 'life_info.html';

        resizeCardCarousel();

        pictures = getArrayAsObjects(lists.life[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.life[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        loadIntoTemplate('#life_images', pictures, 'life_images');

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

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

    });


});







var scopePromosController;
module.controller('PromosController', function($scope) {
    ons.ready(function() {

        current_page = 'promos.html';

        scopePromosController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        setTimeout(function(){
            loadIntoTemplateSingle('#promo_list', {}, 'no_promo', getLabels());
        }, 200);


        getJsonP(api_url + 'getPromos/', function(data){

            lists.promo = data.list;

            if(data.status === 'fail') {

            } else {

                loadIntoTemplate('#promo_list', lists.promo, 'promo_list', getLabels());

                redirectToSection(scopePromosController, 'promo');
            }

        }, function(){


        }, {});

        $scope.labels = getLabels();

        $scope.showInfo = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };

        /*$('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });*/

    });
});




module.controller('PromoInfoController', function($scope) {
    ons.ready(function() {

        current_page = 'promo_info.html';

        resizeCardCarousel();

        pictures = getArrayAsObjects(lists.promo[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = lists.promo[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        loadIntoTemplate('#promo_images', pictures, 'promo_images');

        $scope.carouselPostChange = function() {

            var selectedItem = $scope.pictures[promoListCarousel.getActiveCarouselItemIndex()];

            for(var i in $scope.pictures) {

                $scope.pictures[i].selected = '';
            }

            if(selectedItem)
            selectedItem.selected = 'selected';

            $scope.$apply();
        };

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

        setTimeout(function(){

            promoListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });


});





var scopeProfileController;
module.controller('ProfileController', function($scope) {
    ons.ready(function() {

        current_page = 'profile.html';

        scopeProfileController = $scope;

        var height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        setTimeout(function(){
            loadIntoTemplateSingle('#profile_list', {}, 'no_profile', getLabels());
        }, 200);


        getJsonP(api_url + 'getUserSessions/', function(data){

            apply(scopeProfileController, 'items', data.list, scopeProfileController.thumb_width, scopeProfileController.thumb_height);

            lists.profile = data.list;

            if(data.status === 'fail') {


            } else {

                loadIntoTemplate('#profile_list', lists.profile, 'profile_list', getLabels());
            }

        }, function(){


        }, {
            user_id: (userData && userData.id) ? userData.id : ''
        });

        $scope.labels = getLabels();

        $scope.validate = function(index) {

            user_session = lists.profile[index];

            getJsonP(api_url + 'validateByAdmin/', function(data){

                alert(data.message);

            }, function(){

                $scope.error = true;
                $scope.$apply();

            }, {user_id: (userData && userData.id) ? userData.id : '', users_session_id: user_session.users_session_id});
        };

        /*$('div.page__content.ons-page-inner').scroll(function(evt1,evt2){
            $('.guesto-list-verlay.overlay').css('opacity', 1);
        });*/

    });
});


var scopeProfileDetailController;
module.controller('ProfileDetailController', function($scope) {
    ons.ready(function() {

        current_page = 'profile_detail.html';

        scopeProfileDetailController = $scope;

        if(userData === undefined || userData === null ) {

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

            if($scope.detail_visible === 'visible') {

                $scope.detail_visible = '';
                $scope.form_visible = 'visible';

                $scope.label_edit = getLabel('save');

            } else {

                if($scope.userData.first_name === undefined || $scope.userData.first_name === '') {

                    alert(getLabel('user_first_name_required'));

                } else if($scope.userData.last_name === undefined || $scope.userData.last_name === '') {

                    alert(getLabel('user_last_name_required'));

                } else if($scope.userData.email === undefined || $scope.userData.email === '') {

                    alert(getLabel('user_email_required'));

                } else if(!$scope.userData.email.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ) ) {

                    alert(getLabel('user_email_invalid'));

                } else if($scope.userData.phone === undefined || $scope.userData.phone === '') {

                    alert(getLabel('user_phone_required'));

                } else {

                    if(userData && userData.id !== undefined && userData.id !== '') {
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

        /*$scope.$on("$destroy",function( event ) {
            $timeout.cancel( timer );
        });*/

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

    items.push({day: moment().subtract(2, 'days').format("D"), month: moment().subtract(2, 'days').format("MMM"), selected: '', date: moment().subtract(2, 'days').format("YYYY-M-D") });
    items.push({day: moment().subtract(1, 'days').format("D"), month: moment().subtract(1, 'days').format("MMM"), selected: '', date: moment().subtract(1, 'days').format("YYYY-M-D") });


    for (i = 0; i <= 30; i ++) {
        if(i === 0) {
            items.push({day: moment().add(i, 'days').format("D"), month: moment().add(i, 'days').format("MMM"), selected: 'selected', date: moment().add(i, 'days').format("YYYY-M-D") });
        } else {
            items.push({day: moment().add(i, 'days').format("D"), month: moment().add(i, 'days').format("MMM"), selected: '', date: moment().add(i, 'days').format("YYYY-M-D") });
        }
    }

    return items;
}

// result json
function apply($scope, key, value, width, height) {

    var result = [];
    var i;
    var obj;
    if(value && value.length > 0) {
        for(i in value) {
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

    } else {

        result = value;
    }

    if($scope[key] && $scope[key].length > 0) {
        for(i in $scope[key]) {
            delete $scope[key][i];
        }
    }

    if(result && result.length > 0) {
        if(!$scope[key]) {
            $scope[key] = [];
        }

        for(i in result) {
            $scope[key].push(result[i]);
        }
    } else {
        delete $scope[key];

        $scope[key] = result;
    }

    delete result;
    delete i;
    delete obj;
}

function getArrayAsObjects(array, width, height) {
    var result = [];

    width = width*2;
    height = height*2;

    for(var i in array) {
        result.push({list_image:array[i], selected:i === 0 ? 'selected' : ''});
        /*if(width && height) {
            result.push({list_image: thumb_url.replace('%width%', width).replace('%height%', height) + array[i], selected:i === 0 ? 'selected' : ''});
        } else {
            result.push({list_image:array[i], selected:i === 0 ? 'selected' : ''});
        }*/
    }

    return result;
}

function getJsonP(url, callback_success, callback_error, data) {

    if(data === undefined) {
        data = {};
    }


    if(data.lang === undefined) {
        data.lang = applicationLanguage;
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

    if(data === undefined) {
        data = {};
    }


    if(data.lang === undefined) {
        data.lang = applicationLanguage;
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


function fixGuestListItem(height) {
    $('body').append(
        '<style type="text/css">'+
        '.guest_list_item {'+
        'position:relative;'+
        'height:'+height+'px;'+
        '}'+
        '</style>'
    );
}

function fixModalBottomHeight(height){
    $('body').append('<style type="text/css">.bottom-dialog .dialog {min-height: ' + height + ';}</style>');
}