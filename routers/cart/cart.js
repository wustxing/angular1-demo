define(['app'], function (jhapp) {
    jhapp.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('tab.cart', {
                url: "/cart",
                views: {
                    "cart": {
                        templateUrl: 'tpls/cart/cart.html',
                        controller:"cart_ctrl"
                    }
                }
            })


        }])
});

