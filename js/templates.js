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
                '<p class="title-normal block">%hour%</p>'+
            '</div>'+
            '<div align="center" class="buttons">'+
                '<div class="button purple" ng-click="showGuestList(%index%)">GUEST LIST</div>'+
                '<div class="button" ng-click="showGuestInfo(%index%)">+ INFO</div>'+
            '</div>'+
        '</div>'+
    '</div>',

    no_rows: '' +
        '<div class="guest_list_item" ng-show="no_data">'+
            '<div class="guesto-list-verlay overlay">'+
                '<div align="center" class="guest-list-item-content">'+
                    '<p class="title-normal block">{no_sessions}</p>'+
                '</div>'+
            '</div>'+
        '</div>'
};




function loadIntoTemplate(div, data, template, labels) {

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
