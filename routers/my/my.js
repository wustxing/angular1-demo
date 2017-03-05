define(['app'], function (jhapp) {
    jhapp.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('tab.my', {
                url: "/my",
                views: {
                    "my": {
                        templateUrl: 'tpls/my/my.html',
                        controller:"my_ctrl"
                    }
                }
            })


        }])
});

