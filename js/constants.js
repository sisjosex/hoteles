//var api_url = 'http://golden-vip.com/api/';
var api_url = 'http://localhost/hoteles_admin/hoteles/api/';
var thumb_url = 'http://golden-vip.com/helpers/timthumb.php?w=%width%&h=%height%&src=';

var applicationLanguage = '';

try {
    applicationLanguage = (localStorage.getItem("lang") !== null || localStorage.getItem("lang") !== undefined) ? localStorage.getItem("lang") : 'es';
} catch(error) {
    applicationLanguage = '';
}


var userData = null;

try {
    userData = (localStorage.getItem("user") !== null || localStorage.getItem("user") !== undefined) ? JSON.parse(localStorage.getItem("user")) : null;
}catch(error) {
    userData = null;
}


var TOKEN_PUSH_NOTIFICATION = 0;

try {
    TOKEN_PUSH_NOTIFICATION = (localStorage.getItem("push_token") !== null || localStorage.getItem("push_token") !== undefined) ? JSON.parse(localStorage.getItem("push_token")) : 0;;
} catch(error) {
    TOKEN_PUSH_NOTIFICATION = 0;
}

var DEVICE_UUID = (localStorage.getItem("uuid") !== null || localStorage.getItem("uuid") !== undefined) ? JSON.parse(localStorage.getItem("uuid")) : 0;


var HAVE_NOTIFICATION = false;
var TYPE_NOTIFICATION = '';
var EVENT;