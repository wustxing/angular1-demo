define(['app'
    , 'ctrl/demo/demo_ctrl'
    ,'ctrl/my/my_ctrl'
    ,'ctrl/home/home_ctrl'
    ,'ctrl/classify/classify_ctrl'
    ,'ctrl/cart/cart_ctrl'


], function (jhapp) {

    jhapp.controller('rootctrl',
        ['$scope', '$ionicHistory', '$rootScope'
            , function (s, $ionicHistory, $rootScope) {
            console.log("rootctrl");
        }]);


});
