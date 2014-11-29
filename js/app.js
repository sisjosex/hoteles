var module = ons.bootstrap('myapp', ['onsen']);

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


    });
});

module.controller('GuestCarouselController', function($scope) {
    ons.ready(function() {
        $scope.items = [
            {
                title: 1
            },
            {
                title: 2
            },
            {
                title: 3
            },
            {
                title: 4
            }
        ];
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

        /*$scope.showDetail = function(index) {
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
        };*/

    });
});


module.factory('$data', function() {
    var data = {};

    data.items = [
        {
            title: 'Item 1 Title',
            label: '4h',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            title: 'Another Item Title',
            label: '6h',
            desc: 'Ut enim ad minim veniam.'
        },
        {
            title: 'Yet Another Item Title',
            label: '1day ago',
            desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            title: 'Yet Another Item Title',
            label: '1day ago',
            desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
    ];

    return data;
});

