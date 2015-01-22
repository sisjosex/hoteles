var module = ons.bootstrap();

angular.module('MyApp', ['QuickList']);

var calendar;

var currentDate = '';


var currentSession;

var selectedDate = '';
var current_page = '';
var current_seccion_id = '';

var applicationParams = '';

var currentSessionFromNotification = null;

function storeImages(data) {

    if(data !== undefined) {

        for(var i in data) {

            var section = data[i];

            if(section && section.length > 0) {

                for(var k in section) {

                    var section_row = section[k];

                    if(section_row.images) {

                        for(var j in section_row.images) {
                            var url = section_row.images[j];

                            convertImgToBase64(url, function(content, img, url2){

                                var filename = url2.split("/")[url2.split("/").length-1];

                                //console.log(filename);

                                write(filename, content);

                            });
                        }
                    }
                }
            }

        }
    }
}

function initApp() {

    try {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    } catch(error) {}
}

function read(path, success){
    fileSystem.root.getFile(path, {create: true, exclusive: false}, function(entry){var file = {entry: entry};
        file.entry.file(function (dbFile) {
            var dbEntries = [];
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var textArray = evt.target.result.split("\n");

                dbEntries = textArray.concat(dbEntries);

                success(dbEntries.join());
            }
            reader.readAsText(dbFile);
        }, fail);
    }, fail);
}

function write(path, content){
    fileSystem.root.getFile(path, {create: true, exclusive: false}, function(entry){var file = {entry: entry};
        file.entry.createWriter(function(writer){
            writer.onwrite = function (evt) {
                //console.log('writed');
            };

            writer.write(content);
        }, fail);
    }, fail);
}

function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL, img, url);
        // Clean up
        canvas = null;
    };
    img.src = url;
}

function gotFS(fs) {

    fileSystem = fs;

    //var path = "readme.txt";
    //fileSystem.root.getFile(path, {create: true, exclusive: false}, gotFileEntry, fail);
}

function fail() {

}

function readText() {
    if (file.entry) {
        file.entry.file(function (dbFile) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var textArray = evt.target.result.split("\n");

                dbEntries = textArray.concat(dbEntries);

                $('definitions').innerHTML = dbEntries.join('');
            }
            reader.readAsText(dbFile);
        }, failCB("FileReader"));
    }

    return false;
}


window.fadeIn = function(obj) {

    //$(obj).find('*').remove();

    //var finalImage = $('<div class="item-bg-final"></div>');

    $(obj).parent().css('background-image', "url('" + $(obj).attr('src') + "')");
    $(obj).parent().css('background-size', "auto 100%");

    $(obj).parent().find('*').remove();

    //$(obj).parent().html(finalImage);

    //finalImage.css('background-image', "url('" + $(obj).attr('src') + "')");

    //setTimeout(function(){
        //finalImage.addClass('fadein');
    //}, 10);
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


function gotoPage(page, lang) {

    applicationLanguage = lang;

    localStorage.setItem('lang', applicationLanguage);

    splash.pushPage(page);
}

function loadApplicationParams() {

    getJsonPBackground(api_url + 'getParams/', function(data){

        applicationParams = data;

    }, function(){

    }, {});
}

var reservations;
function loadOfflineData(callback) {

    reservations = [];

    if(offline_data != undefined && userData != undefined && userData != null) {

        if(offline_data.user_sessions && offline_data.user_sessions.length > 0) {

            for(var i in offline_data.user_sessions) {

                if(offline_data.user_sessions[i].users_session_id === 0) {
                    reservations.push({
                        persons: offline_data.user_sessions[i].persons,
                        date: offline_data.user_sessions[i].date,
                        session_id: offline_data.user_sessions[i].id
                    });
                }
            }
        }
    }

    getJsonPBackground(api_url + 'getOffline/', function (data) {

        if (data.status === 'success') {

            offline_data = data;

            //console.log(offline_data);

            localStorage.setItem("offline_data", JSON.stringify(offline_data));

            callback ? callback() : '';

            //storeImages(offline_data);

            isonline = true;
        }

    }, function () {

        isonline = false;

        callback ? callback() : '';

    }, {user_id: userData ? userData.id : '', user: userData, reservations: reservations, language: applicationLanguage});
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



        }, userData);

    } else if (TOKEN_PUSH_NOTIFICATION === 0 || TOKEN_PUSH_NOTIFICATION === null || TOKEN_PUSH_NOTIFICATION === 'null') {

        TOKEN_PUSH_NOTIFICATION = 0;

        registerNotifications();
    }
}

filterSessions = function(selectedCalendar) {

    moment.locale('en');

    currentSessions = [];
    var currentDate = moment().add(0, 'days');
    var calendarDate = moment(selectedCalendar.date, "YYYY-MM-DD");


    if(offline_data && offline_data.sessions) {

        for(var i in offline_data.sessions) {

            if(offline_data.sessions[i].type == 'fijo') {

                if(offline_data.sessions[i].days.search(calendarDate.format('dddd')) !== -1) {

                    currentSessions.push(offline_data.sessions[i]);
                }

            } else if (offline_data.sessions[i].type == 'programado') {

                if(calendarDate.format('D') === offline_data.sessions[i].day
                    && calendarDate.format('M') === offline_data.sessions[i].month
                    && calendarDate.format('YYYY') === offline_data.sessions[i].year ) {

                    currentSessions.push(offline_data.sessions[i]);
                }
            }
        }
    }

    if(currentSessions.length > 0) {
        return currentSessions;
    } else {
        currentSessions = false;
    }

    return false;
};

var currentSessions;
loadSessions = function(selectedCalendar) {

    currentSessions = filterSessions(selectedCalendar);

    if(currentSessions) {

        renderSessions();

    } else {

        loadIntoTemplateSingle('#guest_list', {}, 'no_guests', getLabels());
    }

    //currentDate = moment().add(0, 'days').format("YYYY-M-D");

    try { navigator.splashscreen.hide(); } catch(error){}
};


var selectedSession;
var selectedItem;
filterSessionDay = function(index, element) {

    modal.show();

    $('.session_day').removeClass('selected');
    $('#carouselSession > ons-carousel-item:nth-child(' + (parseInt(index) + 1) + ') .session_day').addClass('selected');

    selectedItem = calendar[index];

    $('div.page__content.ons-page-inner').scrollTop(0);

    selectedItem.selected = 'selected';

    loadIntoTemplateSingle('#guest_list', {}, 'no_guests', getLabels());

    if(!offline_data) {

        loadOfflineData( function(){ loadSessions(selectedItem); modal.hide(); } );

    } else {

        loadSessions(selectedItem);
        modal.hide();
    }
};

var height;
function renderSessions() {

    height = window.innerHeight - (angular.element('.guestpage ons-toolbar').innerHeight()+angular.element('ons-tab').innerHeight());

    height = parseInt(height/2);

    if(height < 150) {
        height = 150;
    }

    loadIntoTemplate('#guest_list', currentSessions, 'session_list', getLabels(), height);

    ons.compile($('#guest_list')[0]);

    initScroll('guest_scroll');

    redirectToSection(scopeGuestcontroller, 'session');

    try { navigator.splashscreen.hide(); } catch(error){}

    //loadOfflineData();
}

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

    $('ons-dialog').remove();

    currentSession = currentSessions[index];

    if(!isShowingForm) {
        ons.createDialog('guest_list_form.html').then(function (dialog) {
            guestFormDialog.show();
        });
    }

    return false;
};

showGuestInfo = function(index, event) {

    event.preventDefault();

    if(current_page !== 'guest_list.html') {

        current_page = 'guest_list.html';

        currentSession = currentSessions[index];

        splash.pushPage('guest_list.html', {index:index});
    }

    return false;
};

showSessionDetailScreen = function(id) {

    getJsonP(api_url + 'getSessions/', function(data){

        if(data.list && data.list.length == 1) {

            if(isShowingForm) {
                closeForm();
            }

            if(isShowingInfo) {
                closeInfo();
            }

            if(currentSessionFromNotification != null) {
                splash.popPage('guest_detail.html');
            }

            currentSessionFromNotification = data.list[0];

            splash.pushPage('guest_detail.html', {id:id});
        }

    }, function(){

    }, {id: id});
};

closeDetailSession = function() {

    popPage('guest_info.html');

    currentSessionFromNotification=null;


;}

showInformation = function(event) {

    isShowingInfo = false;

    ons.createDialog('guest_info.html').then(function(dialog) {
        guestInfoDialog.show();
    });
};

popPage = function(page) {

    current_page = '';

    splash.popPage(page);
};

actionCall = function(phone) {
    //document.location.href = 'tel:' + phone;

    phonedialer.dial(
        phone,
        function(err) {
            if (err == "empty") {
                alert("Unknown phone number");
            }
            else alert("Dialer Error:" + err);
        },
        function(success) {
            //alert('Dialing succeeded');
        }
    );
};

showForm = function(session_id) {
    ons.createDialog('guest_list_form.html').then(function(dialog) {
        guestFormDialog.show();
    });
};

closeForm = function() {

    isShowingForm = false;

    //$('#conditions').remove();
    try{
        guestFormDialog.hide();
    } catch (error) {}

};

closeInfo = function() {

    isShowingInfo = false;

    try{
        guestInfoDialog.hide();
    } catch (error) {}
};

goToProfile = function() {

    closeForm();

    setTimeout(function(){

        if(currentSessionFromNotification != null) {
            //console.log('hide detail');
            closeDetailSession();
            //splash.popPage('guest_detail.html');
        }

        if(current_page === 'guest_list.html') {

            splash.popPage(current_page);

        } else if(current_page === 'club_info.html') {

            splash.popPage(current_page);

        } else if(current_page === 'life_info.html') {

            splash.popPage(current_page);

        } else if(current_page === 'promo_info.html') {

            splash.popPage(current_page);

        } else if(current_page === 'profile_detail.html') {

            profileNavigator.popPage(current_page);

        }

        mainTabBar.setActiveTab(4);

    }, 250);
};

function translateImages() {
    $('.translate').each(function(){

        $(this).removeClass('en').removeClass('es').addClass(applicationLanguage);

    });
}


var scopeLanguageController;
module.controller('LanguageController', function($scope) {
    ons.ready(function() {

        scopeLanguageController = $scope;

        initApp();

        /*$scope.$on("$destroy",function( event ) {
            //$timeout.cancel( timer );
        });*/

        try {
            StatusBar.hide();
        }catch(error){}

        loadApplicationParams();

        if(applicationLanguage !== '' && (applicationLanguage === 'es' || applicationLanguage === 'en')) {

            loadOfflineData(function(){

                splash.pushPage('tab_bar.html', {lang: applicationLanguage, animation: 'none'});
            });

        } else {

            try { navigator.splashscreen.hide(); } catch(error){}

            setTimeout(function(){
                $('.languageButtons').addClass('fadein');
            }, 100);
        }

    });
});

var scopeMainMenuController;
module.controller('MainMenuController', function($scope) {
    ons.ready(function() {

        scopeMainMenuController = $scope;

        splash.getCurrentPage().options;

        moment.locale(applicationLanguage);
        localStorage.setItem('lang', applicationLanguage);

        createUserAndRegisterNotifications();

        $scope.labels = getLabels();

    });
});

var scopeGuestcontroller;
var scopeGuestcontrollerFirstTime = true;
var calendar;
module.controller('GuestController', function($scope) {
    ons.ready(function() {

        moment.locale(applicationLanguage);

        if(currentDate === '') {
            currentDate = moment().add(0, 'days').format("YYYY-M-D");
        }

        current_page = 'guest.html';

        scopeGuestcontroller = $scope;

        height = window.innerHeight - (angular.element('.guestpage ons-toolbar').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        //currentDate = moment().add(0, 'days').format("YYYY-M-D");

        if(selectedDate === '') {
            selectedDate = currentDate;
        }

        verifyNotification();

        $scope.init = function(reset) {

            if (reset === undefined) {

                generateCalendar(selectedDate);
            }

            //$('#guest_list').find('*').remove();
            loadIntoTemplate('#carouselSession', calendar, 'calendar', {}, height);

            var selectedIndex = -1;

            for(var i in calendar) {

                if(calendar[i].date === selectedDate) {

                    selectedIndex = i;
                    break;
                }
            }

            if( selectedIndex !== -1 ) {
                filterSessionDay(selectedIndex);
            }

            $scope.labels = getLabels();
        };

        $scope.gotoDetailFromNotification = function(index) {

            currentSession = currentSessions[index];

            splash.pushPage('guest_list.html', {index:index});
        };


        $scope.$on("$destroy",function( event ) {

            if(current_page === 'guest.html') {

                scopeGuestcontroller.init(false);
            } else {

                currentDate = moment().add(0, 'days').format("YYYY-M-D");
            }

        });

        $scope.init();

    });
});

var scopeGuestListCardController;
module.controller('GuestListCardController', function($scope) {
    ons.ready(function() {

        current_page = 'guest_list.html';

        scopeGuestListCardController = $scope;

        $scope.labels = getLabels();

        resizeCardCarousel();

        pictures = getArrayAsObjects(currentSessions[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        loadIntoTemplate('#guest_images', pictures, 'guest_images');
        loadIntoTemplate('#guest_paginator', pictures, 'guest_paginator');

        $scope.detail = currentSessions[splash.getCurrentPage().options.index];

        if($scope.detail.dress_code === '' || $scope.detail.dress_code === undefined) {

            setTimeout(function(){
                $('.dress_code').hide();
            },100);

        } else {

            setTimeout(function(){
                $('.dress_code').show();
            },100);
        }

        if($scope.detail.age === '' || $scope.detail.age === undefined) {

            setTimeout(function(){
                $('.age').hide();
            },100);

        } else {

            setTimeout(function(){
                $('.age').show();
            },100);
        }

        if($scope.detail.access_conditions === '' || $scope.detail.access_conditions === undefined) {

            setTimeout(function(){
                $('.access_conditions').hide();
            },100);

        } else {

            setTimeout(function(){
                $('.access_conditions').show();
            },100);
        }

        $('#guest_paginator > li:nth-child(1)').addClass('selected');
        $scope.carouselPostChange = function() {
            $('#guest_paginator > li').removeClass('selected');
            $('#guest_paginator > li:nth-child(' + (guestListCarousel.getActiveCarouselItemIndex()+1) + ')').addClass('selected');
        };

        setTimeout(function(){

            guestListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });
});


var scopeGuestListDetailController;
module.controller('GuestListDetailController', function($scope) {
    ons.ready(function() {

        //current_page = 'guest_detail.html';

        GuestListDetailController = $scope;

        $scope.labels = getLabels();

        resizeCardCarousel();

        pictures = getArrayAsObjects(currentSessionFromNotification.images);
        $scope.detail = currentSessionFromNotification;

        loadIntoTemplate('#detail_images', pictures, 'guest_images');
        loadIntoTemplate('#detail_paginator', pictures, 'guest_paginator');

        if($scope.detail.dress_code === '' || $scope.detail.dress_code === undefined) {

            setTimeout(function(){
                $('.dress_code').hide();
            },100);

        } else {

            setTimeout(function(){
                $('.dress_code').show();
            },100);
        }

        if($scope.detail.age === '' || $scope.detail.age === undefined) {

            setTimeout(function(){
                $('.age').hide();
            },100);

        } else {

            setTimeout(function(){
                $('.age').show();
            },100);
        }

        if($scope.detail.access_conditions === '' || $scope.detail.access_conditions === undefined) {

            setTimeout(function(){
                $('.access_conditions').hide();
            },100);

        } else {

            setTimeout(function(){
                $('.access_conditions').show();
            },100);
        }

        $('#detail_paginator > li:nth-child(1)').addClass('selected');
        $scope.carouselPostChange = function() {
            $('#detail_paginator > li').removeClass('selected');
            $('#detail_paginator > li:nth-child(' + (guestDetailCarousel.getActiveCarouselItemIndex()+1) + ')').addClass('selected');
        };

        setTimeout(function(){

            guestDetailCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });
});


var scopeGuestListFormController;
var isShowingForm = false;
module.controller('GuestListFormController', function($scope) {
    ons.ready(function() {

        isShowingForm = true;

        scopeGuestListFormController = $scope;

        if(currentSessionFromNotification != null) {
            currentSession = currentSessionFromNotification;
        }

        if( (userData === undefined || userData === null) || (userData !== null && (userData.email === '' || userData.email === undefined)) )  {

            $scope.userData = {
                persons: 1,
                session_id: currentSession.id
            };

            setTimeout(function(){
                $('.form_visible').show();
                $('.detail_visible').hide();
                $('.reservation_complete').hide();
                $('.reservation_inprogress').show();
            }, 200);

            fixModalBottomHeight('21.2em');

        } else {

            //console.log('There is user');

            $scope.userData = {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                phone: userData.phone
            };

            $scope.userData = userData;

            $scope.userData.persons = 1;
            $scope.userData.session_id = currentSession.id;

            setTimeout(function() {
                $('.form_visible').hide();
                $('.detail_visible').show();
                $('.reservation_complete').hide();
                $('.reservation_inprogress').show();
            }, 200);

            fixModalBottomHeight('13.2em');
        }



        $scope.detail = currentSession;

        $scope.labels = getLabels();

        $scope.increasePersons = function() {
            $scope.userData.persons ++;
        };

        $scope.decreasePersons = function() {
            if($scope.userData.persons >= 2) {
                $scope.userData.persons --;
            }
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

            }/* else if($scope.userData.conditions === undefined || $scope.userData.conditions === false) {

                alert(getLabel('user_conditions_required'));

            } */else {

                if(userData && userData.id !== undefined && userData.id !== '') {

                    if(isonline) {
                        storeToken(DEVICE_UUID, TOKEN_PUSH_NOTIFICATION, ons.platform.isIOS() ? 'iphone' : 'android');
                        registerNotifications();
                    }

                } else {

                    if( (userData === undefined || userData === null) || (userData !== null && (userData.email === '' || userData.email === undefined)) ) {

                        userData = {
                            first_name: $scope.userData.first_name,
                            last_name: $scope.userData.last_name,
                            email: $scope.userData.email,
                            phone: $scope.userData.phone
                        };

                        localStorage.setItem("user", JSON.stringify(userData));
                    }
                }


                storeSessionReservation($scope.userData.persons, selectedItem.date);

                $('.reservation_complete').show();
                $('.reservation_inprogress').hide();

                //fixModalBottomHeight('13.2em');

                /*if(userData && userData.id !== undefined && userData.id !== '') {
                    $scope.userData.id = userData.id;
                }

                $scope.userData.date = selectedDate;

                getJsonP(api_url + 'registerUser/', function(data){

                    $scope.userData = userData = {
                        id: data.user.id,
                        first_name: data.user.first_name,
                        last_name: data.user.last_name,
                        email: data.user.email,
                        phone: data.user.phone
                    };

                    $('.reservation_complete').show();
                    $('.reservation_inprogress').hide();

                    localStorage.setItem("user", JSON.stringify(userData));

                    storeToken(DEVICE_UUID, TOKEN_PUSH_NOTIFICATION, ons.platform.isIOS() ? 'iphone' : 'android');
                    registerNotifications();

                    fixModalBottomHeight('13.2em');

                }, function(data){

                }, $scope.userData);*/
            }
        };

    });
});



var storeSessionReservation = function(nro, date) {

    //console.log('saving' + date);

    if(!offline_data.user_sessions) {

        offline_data.user_sessions = [];

    } else {

        for(var i in offline_data.user_sessions) {
            if(offline_data.user_sessions[i].date === date) {
                //console.log()
                offline_data.user_sessions[i].persons = nro;
                return;
            }
        }
    }

    var obj = {
        id: currentSession.id,
        persons: nro,
        users_session_id: 0,
        guest_list: currentSession.guest_list,
        club: currentSession.club,
        address: currentSession.address,
        hour: currentSession.hour,
        metro: currentSession.metro,
        ambient: currentSession.ambient,
        accept_card: currentSession.accept_card,
        age: currentSession.age,
        dress_code: currentSession.dress_code,
        music: currentSession.music,
        access_conditions: currentSession.access_conditions,
        content: currentSession.content,
        date: date,
        session_date: date,
        images: currentSession.images
    };

    offline_data.user_sessions.push(obj);

    localStorage.setItem("offline_data", JSON.stringify(offline_data));
};



var scopeGuestInfoController;
var isShowingInfo = false;
module.controller('GuestInfoController', function($scope) {
    ons.ready(function() {

        if(applicationParams !== '') {
            setTimeout(function(){
                $('.info_content').html(applicationParams.info.content);
            },200);
        }

        isShowingInfo = true;
    });
});

var scopeClubsController;
module.controller('ClubsController', function($scope) {
    ons.ready(function() {

        current_page = 'clubs.html';

        scopeClubsController = $scope;

        height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);



        //setTimeout(function(){
            //loadIntoTemplateSingle('#club_list', {}, 'no_club', getLabels());
        //}, 0);

        $scope.render = function() {

            if(offline_data && offline_data.clubs) {

                loadIntoTemplate('#club_list', offline_data.clubs, 'club_list', getLabels(), height);

                ons.compile($('#club_list')[0]);

                initScroll('club_scroll');

            } else {

                loadIntoTemplateSingle('#club_list', {}, 'no_club', getLabels());
            }

            redirectToSection(scopeClubsController, 'club');
        };

        $scope.$on("$destroy",function( event ) {

            if(current_page === 'clubs.html') {

                scopeClubsController.init(false);

            } else {


            }

        });

        $scope.init = function() {

            if(offline_data === undefined) {
                modal.show();
                loadOfflineData(function(){

                    scopeClubsController.render();

                    modal.hide();
                });
            } else {

                scopeClubsController.render();
            }
        };



        $scope.labels = getLabels();

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('club_info.html', {index:index});
        };


        $scope.init();
    });
});




module.controller('ClubInfoController', function($scope) {
    ons.ready(function() {

        current_page = 'club_info.html';

        resizeCardCarousel();

        pictures = getArrayAsObjects(offline_data.clubs[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = offline_data.clubs[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        loadIntoTemplate('#club_images', pictures, 'club_images');
        loadIntoTemplate('#club_paginator', pictures, 'club_paginator');

        $('#club_paginator > li:nth-child(1)').addClass('selected');
        $scope.carouselPostChange = function() {
            $('#club_paginator > li').removeClass('selected');
            $('#club_paginator > li:nth-child(' + (clubListCarousel.getActiveCarouselItemIndex()+1) + ')').addClass('selected');
        };

        setTimeout(function(){

            clubListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });


});





var scopeLifeController;
module.controller('LifeController', function($scope) {
    ons.ready(function() {

        current_page = 'life.html';

        scopeLifeController = $scope;

        height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        //setTimeout(function(){
            //loadIntoTemplateSingle('#life_list', {}, 'no_life', getLabels());
        //}, 1);

        $scope.render = function() {

            if(offline_data && offline_data.life) {

                loadIntoTemplate('#life_list', offline_data.life, 'life_list', getLabels(), height);

                ons.compile($('#life_list')[0]);

                initScroll('life_scroll');



            } else {

                loadIntoTemplateSingle('#life_list', {}, 'no_life', getLabels());
            }

            redirectToSection(scopeLifeController, 'life');

        };

        $scope.labels = getLabels();

        $scope.showClubInfo = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('life_info.html', {index:index});
        };

        $scope.$on("$destroy",function( event ) {

            if(current_page === 'life.html') {

                scopeLifeController.init(false);

            } else {


            }
        });

        $scope.init = function() {
            if(offline_data === undefined) {

                modal.show();

                loadOfflineData(function(){

                    scopeLifeController.render();

                    modal.hide();
                });
            } else {

                scopeLifeController.render();
            }
        }

        $scope.init();

    });
});




module.controller('LifeInfoController', function($scope) {
    ons.ready(function() {

        current_page = 'life_info.html';

        resizeCardCarousel();

        pictures = getArrayAsObjects(offline_data.life[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = offline_data.life[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        loadIntoTemplate('#life_images', pictures, 'life_images');
        loadIntoTemplate('#life_paginator', pictures, 'life_paginator');

        //ons.compile($('#life_images')[0]);

        $('#life_paginator > li:nth-child(1)').addClass('selected');
        $scope.carouselPostChange = function() {
            $('#life_paginator > li').removeClass('selected');
            $('#life_paginator > li:nth-child(' + (lifetListCarousel.getActiveCarouselItemIndex()+1) + ')').addClass('selected');
        };

        setTimeout(function(){

            lifetListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);


        $scope.showForm = function(session_id) {
            ons.createDialog('guest_list_form.html').then(function(dialog) {
                guestFormDialog.show();
                //naviDialog.show();
            });
        };

    });


});







var scopePromosController;
module.controller('PromosController', function($scope) {
    ons.ready(function() {

        current_page = 'promos.html';

        scopePromosController = $scope;

        height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        //setTimeout(function(){
            //loadIntoTemplateSingle('#promo_list', {}, 'no_promo', getLabels());
        //}, 1);


        $scope.render = function() {

            if(offline_data && offline_data.promos) {

                loadIntoTemplate('#promo_list', offline_data.promos, 'promo_list', getLabels(), height);

                ons.compile($('#promo_list')[0]);

                initScroll('promo_scroll');


            } else {

                loadIntoTemplateSingle('#promo_list', {}, 'no_promo', getLabels());
            }

            redirectToSection(scopePromosController, 'promo');
        };

        $scope.labels = getLabels();

        $scope.showInfo = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };

        $scope.gotoDetailFromNotification = function(index) {

            splash.pushPage('promo_info.html', {index:index});
        };

        $scope.$on("$destroy",function( event ) {

            if(current_page === 'promos.html') {

                scopePromosController.init(false);

            } else {


            }
        });

        $scope.init = function() {
            if(offline_data === undefined) {

                modal.show();

                loadOfflineData(function(){

                    scopePromosController.render();

                    modal.hide();
                });
            } else {

                scopePromosController.render();
            }
        };

        $scope.init();

    });
});




module.controller('PromoInfoController', function($scope) {
    ons.ready(function() {

        current_page = 'promo_info.html';

        resizeCardCarousel();

        pictures = getArrayAsObjects(offline_data.promos[splash.getCurrentPage().options.index].images, $scope.thumb_width, $scope.thumb_height);

        $scope.detail = offline_data.promos[splash.getCurrentPage().options.index];

        $scope.labels = getLabels();

        loadIntoTemplate('#promo_images', pictures, 'promo_images');
        loadIntoTemplate('#promo_paginator', pictures, 'promo_paginator');

        $('#promo_paginator > li:nth-child(1)').addClass('selected');
        $scope.carouselPostChange = function() {
            $('#promo_paginator > li').removeClass('selected');
            $('#promo_paginator > li:nth-child(' + (promoListCarousel.getActiveCarouselItemIndex()+1) + ')').addClass('selected');
        };

        setTimeout(function(){

            promoListCarousel.on('postchange', $scope.carouselPostChange);

        }, 1000);

    });


});





var scopeProfileController;
module.controller('ProfileController', function($scope) {
    ons.ready(function() {

        moment.locale(applicationLanguage);

        current_page = 'profile.html';

        scopeProfileController = $scope;

        height = window.innerHeight - (angular.element('.header-title').innerHeight()+angular.element('ons-tab').innerHeight());

        height = parseInt(height/2);

        if(height < 150) {
            height = 150;
        }

        fixGuestListItem(height);

        //setTimeout(function(){
            //loadIntoTemplateSingle('#profile_list', {}, 'no_profile', getLabels());
        //}, 1);

        $scope.render = function() {

            if(offline_data && offline_data.user_sessions) {

                for (var i in offline_data.user_sessions) {
                    for (var j in offline_data.user_sessions[i]) {
                        //if (j == 'session_date' && offline_data.user_sessions[i]['parsed'] == undefined) {
                        if (j == 'session_date') {
                            offline_data.user_sessions[i][j] = moment(offline_data.user_sessions[i]['date'], "YYYY-MM-DD").format("D MMMM dddd");
                            //offline_data.user_sessions[i]['parsed'] = true;
                        }
                    }
                }

                loadIntoTemplate('#profile_list', offline_data.user_sessions, 'profile_list', getLabels(), height);

                ons.compile($('#profile_list')[0]);

                $('#profile_list .access_conditions .value').each(function () {
                    if ($(this).html() === '') {
                        $(this).parent().remove();
                    }
                });

                ons.compile($('#profile_list')[0]);

                initScroll('profile_scroll');

            } else {

                loadIntoTemplateSingle('#profile_list', {}, 'no_profile', getLabels());
            }
        };

        $scope.labels = getLabels();

        $scope.validate = function(index) {

            user_session = offline_data.user_sessions[index];

            getJsonP(api_url + 'validateByAdmin/', function(data){

                alert(data.message);

            }, function(){

            }, {user_id: (userData && userData.id) ? userData.id : '', users_session_id: user_session.users_session_id});
        };

        $scope.$on("$destroy",function( event ) {

            if(current_page === 'profile.html') {

                scopeProfileController.init(false);

            } else {


            }
        });

        $scope.init = function() {

            translateImages();

            if(offline_data === undefined) {

                modal.show();

                loadOfflineData(function(){

                    scopeProfileController.render();

                    modal.hide();
                });
            } else {

                scopeProfileController.render();
            }
        }

        $scope.init();

    });
});


var scopeProfileDetailController;
module.controller('ProfileDetailController', function($scope) {
    ons.ready(function() {

        current_page = 'profile_detail.html';

        scopeProfileDetailController = $scope;

        translateImages();

        if( (userData === undefined || userData === null) || (userData !== null && (userData.email === '' || userData.email === undefined)) )  {

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

                        $scope.userData = userData = {
                            id: data.user.id,
                            first_name: data.user.first_name,
                            last_name: data.user.last_name,
                            email: data.user.email,
                            phone: data.user.phone
                        };

                        $scope.detail_visible = 'visible';
                        $scope.form_visible = '';

                        $scope.label_edit = getLabel('edit');

                        $scope.$apply();

                        localStorage.setItem("user", JSON.stringify(userData));

                        storeToken(DEVICE_UUID, TOKEN_PUSH_NOTIFICATION, ons.platform.isIOS() ? 'iphone' : 'android');
                        registerNotifications();

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

                translateImages();

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

    if(calendar === undefined) {

        calendar = [];

        var currentDay = parseInt(moment().format("D"));

        calendar.push({
            day: moment().subtract(2, 'days').format("D"),
            month: moment().subtract(2, 'days').format("MMM"),
            selected: '',
            date: moment().subtract(2, 'days').format("YYYY-M-D")
        });
        calendar.push({
            day: moment().subtract(1, 'days').format("D"),
            month: moment().subtract(1, 'days').format("MMM"),
            selected: '',
            date: moment().subtract(1, 'days').format("YYYY-M-D")
        });


        for (i = 0; i <= 30; i++) {
            /*if(i === 0) {
             calendar.push({day: moment().add(i, 'days').format("D"), month: moment().add(i, 'days').format("MMM"), selected: 'selected', date: moment().add(i, 'days').format("YYYY-M-D") });
             } else */
            {
                calendar.push({
                    day: moment().add(i, 'days').format("D"),
                    month: moment().add(i, 'days').format("MMM"),
                    selected: '',
                    date: moment().add(i, 'days').format("YYYY-M-D")
                });
            }
        }
    }

    return calendar;
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
        timeout: 2000,
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
        timeout: 2000,
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

    $('#styleguest').remove();

    $('body').append(
        '<style id="styleguest" type="text/css">'+
        '.guest_list_item {'+
        'position:relative;'+
        'height:'+(height)+'px;'+
        '}'+
        '</style>'
    );
}

function fixModalBottomHeight(height){

    $('#stylemodal').remove();

    $('body').append('<style id="stylemodal" type="text/css">.bottom-dialog .dialog {min-height: ' + height + ';}</style>');
}

var scrolls = {};
function initScroll(div) {

    if(!scrolls[div]) {

        //scrolls[div] = new IScroll('#' + div, {hScrollbar: false, vScrollbar: false});
        scrolls[div] = new iScroll(div, {momentum:false, hScrollbar:false, vScrollbar:false});

    } else {

        //scrolls[div] = new iScroll(div, {hScrollbar: false, vScrollbar: false});
        scrolls['guest_scroll'].scrollTo(0,0);
        setTimeout(function(){ scrolls[div].destroy();scrolls[div] = new iScroll(div, {momentum:false, hScrollbar:false, vScrollbar:false}); }, 10);
        //scrolls[div].refresh();
        //scrolls[div].destroy();scrolls[div] = new IScroll('#' + div, {hScrollbar: false, vScrollbar: false});
    }

    //new IScroll('#' + div, { hScrollbar: false, vScrollbar: false });
}

function updateContent (el, data) {
    el.innerHTML = data;
}