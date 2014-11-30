var module = ons.bootstrap();

var applicationLanguage = 'sp';

module.controller('AppController', function($scope) { });

module.controller('LanguageController', function($scope) {
    ons.ready(function() {

    });
});

module.controller('MainMenuController', function($scope) {
    ons.ready(function() {

        applicationLanguage = splash.getCurrentPage().options.lang;



    });
});

module.controller('GuestController', function($scope) {
    ons.ready(function() {

        var height = window.innerHeight - (angular.element('ons-toolbar').innerHeight()+angular.element('ons-tab').innerHeight());

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

            var selectedItem = $scope.items[index];

            splash.pushPage('guest_list.html');
        };

        $scope.showGuestInfo = function(index) {

            var selectedItem = $scope.items[index];

            splash.pushPage('guest_info.html');
        };

    });
});

module.controller('GuestListCarouselController', function($scope) {
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

    });


});
