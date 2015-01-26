var templates = {
    calendar: '<ons-carousel-item class="session-item">'+
        '<div class="session_day %selected%" onclick="filterSessionDay(%index%, this);">' +
            '<span class="session_day_text">%day%</span>' +
            '<span class="session_month">%month%</span>' +
        '</div>'+
    '</ons-carousel-item>',

    session_list:
    '<div class="guest_list_item">'+
        '<div class="item-bg list">'+
            '<img onload="fadeIn(this)" src="%first_image%" />'+
        '</div>'+
        '<div class="guesto-list-verlay overlay">'+
            '<div align="center" class="guest-list-item-content">'+
                '<span class="title-big">%guest_list%</span> <span class="title-medium">{in} %club%</span>'+
                '<p class="title-normal block" style="color: #fff;text-decoration: none;pointer-events: none;">%hour%</p>'+
            '</div>'+
            '<div align="center" class="buttons">'+
                '<div class="button purple" onclick="showGuestList(%index%, event)">GUEST LIST</div>'+
                '<div class="button" rel="%index%" onclick="showGuestInfo(%index%, event)">+ INFO</div>'+
            '</div>'+
        '</div>'+
    '</div>',

    club_list: '' +
    '<div class="guest_list_item">'+
        '<div class="item-bg list">'+
            '<img onload="fadeIn(this)" src="%first_image%" />'+
        '</div>'+
            '<div class="guesto-list-verlay overlay">'+
        '<div align="center" class="guest-list-item-content">'+
            '<p class="title-big">%name%</p>'+
            '<p class="title-normal block">%days%</p>'+
        '</div>'+
        '<div align="center" class="buttons">'+
            '<div class="button" onclick="showClubInfo(%index%, event)">+ INFO</div>' +
        '</div>'+
        '</div>'+
    '</div>',

    life_list: '' +
    '<ons-list-item class="guest_list_item">'+
        '<div class="item-bg list">'+
            '<img onload="fadeIn(this)" src="%first_image%" />'+
        '</div>'+
        '<div class="guesto-list-verlay overlay">'+
        '<div align="center" class="guest-list-item-content">'+
            '<p class="title-big">%name%</p>'+
            '<p class="title-normal block">%cut_content%</p>'+
            '</div>'+
            '<div align="center" class="buttons">'+
                '<div class="button" onclick="showLifeInfo(%index%, event)">+ INFO</div>'+
            '</div>'+
        '</div>'+
    '</ons-list-item>',

    promo_list: '' +
        '<ons-list-item class="guest_list_item">'+
            '<div class="item-bg list">'+
                '<img onload="fadeIn(this)" src="%first_image%" />'+
            '</div>'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<p class="title-big">%name%</p>'+
                    '<p class="title-normal block">%cut_content%</p>'+
                '</div>'+
                    '<div align="center" class="buttons">'+
                    '<div class="button" onclick="showPromoInfo(%index%, event)">+ INFO</div>'+
                '</div>'+
            '</div>'+
        '</ons-list-item>',

    profile_list: '' +
        '<ons-list-item class="guest_list_item">'+
            '<div class="item-bg list">'+
                '<img onload="fadeIn(this)" src="%first_image%" />'+
            '</div>'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<span class="title-big">%guest_list%</span> <span class="title-medium">{in} %club%</span>'+
                    '<p class="title-normal block" style="color: #fff;text-decoration: none;pointer-events: none;">%session_date% %hour%</p>'+
                    '<p class="title-normal block access_conditions"><span class="rosa">{access_conditions}</span> <span class="value">%access_conditions%</span></p>'+
                '</div>'+
                '<div align="center" class="buttons">'+
                    '<div class="transparent" style="font-size: 0.8em;height: 2.2em;padding-left: 0.4em;padding-right: 0.4em;">{ask_golden}</div>'+
                '</div>'+
            '</div>'+
        '</ons-list-item>',

    no_guests: '' +
        '<div class="guest_list_item">'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<p class="title-normal block">{no_sessions}</p>'+
                '</div>'+
            '</div>'+
        '</div>',

    no_club: '' +
        '<div class="guest_list_item">'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<p class="title-normal block">{no_clubs}</p>'+
                '</div>'+
            '</div>'+
        '</div>',

    no_life: '' +
    '<ons-list-item class="guest_list_item">'+
        '<div class="guesto-list-verlay overlay">'+
            '<div align="center" class="guest-list-item-content">'+
                '<p class="title-normal block">{no_life}</p>'+
            '</div>'+
        '</div>'+
    '</ons-list-item>',

    no_promo: '' +
        '<ons-list-item class="guest_list_item">'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<p class="title-normal block">{no_promos}</p>'+
                '</div>'+
            '</div>'+
        '</ons-list-item>',

    no_profile: '' +
        '<ons-list-item class="guest_list_item">'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<p class="title-normal block">{no_guest_list}</p>'+
                '</div>'+
            '</div>'+
        '</ons-list-item>',

    guest_images: '' +
        '<ons-carousel-item class="item-bg detail session-item">'+
            '<img onload="fadeIn(this)" src="%list_image%" />'+
        '</ons-carousel-item>',

    club_images: '' +
        '<ons-carousel-item class="item-bg detail session-item">'+
            '<img onload="fadeIn(this)" src="%list_image%" />'+
        '</ons-carousel-item>',

    life_images: '' +
        '<ons-carousel-item class="item-bg detail session-item">'+
            '<img onload="fadeIn(this)" src="%list_image%" />'+
        '</ons-carousel-item>',

    promo_images: '' +
        '<ons-carousel-item class="item-bg detail session-item">'+
            '<img onload="fadeIn(this)" src="%list_image%" />'+
        '</ons-carousel-item>',

    guest_paginator: '<li class="carousel-page %selected%"></li>',

    club_paginator: '<li class="carousel-page %selected%"></li>',

    life_paginator: '<li class="carousel-page %selected%"></li>',

    promo_paginator: '<li class="carousel-page %selected%"></li>'
};




function loadIntoTemplate(div, data, template, labels, height) {

    var container = $(div);
    var content = '', cal = '', str = '';

    for(var i in data) {

        cal = data[i];
        var str = templates[template].replaceAll('%index%', i);

        for(var j in cal) {

            str = str.replaceAll('%' + j + '%', cal[j]);
        }

        if(labels != undefined) {

            for(var j in labels) {

                str = str.replaceAll('{' + j + '}', labels[j]);
            }
        }

        if(data[i].images && data[i].images.length > 0) {

            if(height !== undefined) {

                str = str.replaceAll('%first_image%', thumb_url.replaceAll('%width%', $(window).width()).replaceAll('%height%', height) + data[i].images[0]);

            } else {

                str = str.replaceAll('%first_image%', data[i].images[0]);
            }
        }

        content = content + " " + str;

        delete str;
    }

    if(content !== '') {

        content = $(content);

        container.html('');

        container.append(content);

        ons.compile(content[0]);
    }
}

function loadIntoTemplateSingle(div, data, template, labels) {

    var container = $(div);
    var content = '', cal = '', str = '';


    cal = data[i];
    var str = templates[template].replaceAll('%index%', i);

    if(data != undefined) {
        for (var j in data) {

            str = str.replaceAll('%' + j + '%', data[j]);
        }
    }

    if(labels != undefined) {

        for(var j in labels) {

            str = str.replaceAll('{' + j + '}', labels[j]);
        }
    }

    content = content + " " + str;

    delete str;


    if(content !== '') {

        content = $(content);

        container.html('');

        container.append(content);

        ons.compile(content[0]);
    }
}
