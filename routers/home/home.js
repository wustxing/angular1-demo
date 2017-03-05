define(['app'], function (jhapp) {
    jhapp.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('tab.home', {
                url: "/home",
                views: {
                    "home": {
                        templateUrl: 'tpls/home/home.html',
                        controller:"home_ctrl"
                    }
                }
            })


        }])
});

