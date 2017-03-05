require.config({
    baseUrl: ".",
    paths: {
        'zepto':"lib/zepto.min",
        'ionic':"lib/ionic/js/ionic.bundle",
        'cordova':"cordova",
        'lodash':'lib/lodash',
        'ngcookie':'lib/angular-cookie',
        'z_cookie':'lib/zepto.cookie',
        'ngcordova':'lib/ng-cordova'
    },
    shim:{
        'ionic':{
            deps:['zepto']
        },
        'ngcookie':{
            deps:['ionic']
        },
        'z_cookie':{
            deps:['zepto']
        },
        'ngcordova':{
            deps:['ionic']
        }
    },
    waitSeconds:15
});
require(['env','zepto','ionic','services/setting'
        ,'services/services','routers/router_setting'
        ,'lodash','directives/directive'
    ,'ngcookie','ngcordova',"ctrl/root_ctrl"]
    ,function(env){
        return angular.bootstrap(document, ['jhapp']);
    });


