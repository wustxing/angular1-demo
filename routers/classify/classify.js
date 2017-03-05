define(['app'], function (jhapp) {
    jhapp.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('tab.classify', {
                url: "/classify",
                views: {
                    "classify": {
                        templateUrl: 'tpls/classify/classify.html',
                        controller:"classify_ctrl"
                    }
                }
            })


        }])
});

