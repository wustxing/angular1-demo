define(['app'], function (jhapp) {
    jhapp.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('tab.demo', {
                url: "/demo",
                views: {
                    "demo": {
                        templateUrl: 'tpls/demo/demo.html',
                        controller:"demo_ctrl"
                    }
                }
            }).state('tab.testspinner', {
                url: "/testspinner",
                views: {
                    "demo": {
                        templateUrl: 'tpls/demo/testspinner.html',
                        controller:"testspinner_ctrl"
                    }
                }
            }).state('tab.testshowimg',{
                url:'/testshowimg',
                views:{
                    "demo":{
                        templateUrl:'tpls/demo/testshowimg.html',
                        controller:'testshowimg_ctrl'
                    }
                }
            })


        }])
});

