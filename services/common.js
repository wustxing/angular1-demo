define(["app", "services/services", "services/setting"], function (jhapp) {

    jhapp.factory('common',['myhttp','setting','apis','$ionicHistory'
    ,function(myhttp,setting,apis,$ionicHistory){
            var common = {};

            common.goBackMany = function(depth){
                var historyId = $ionicHistory.currentHistoryId();
                var history = $ionicHistory.viewHistory().histories[historyId];
                var targetViewIndex = history.stack.length - 1 - depth;
                $ionicHistory.backView(history.stack[targetViewIndex]);
                $ionicHistory.goBack();
            };

            common.returnToState = function(stateName){
                var historyId = $ionicHistory.currentHistoryId();
                var history = $ionicHistory.viewHistory().histories[historyId];

                console.log($ionicHistory.viewHistory());

                for (var i = history.stack.length - 1; i >= 0; i--){
                    if (history.stack[i].stateName == stateName){
                        $ionicHistory.backView(history.stack[i]);
                        $ionicHistory.goBack();
                    }
                }
            };

            //设置返回页面
            common.setReturnToState = function(stateName){
                var historyId = $ionicHistory.currentHistoryId();
                var history = $ionicHistory.viewHistory().histories[historyId];
                for (var i = history.stack.length - 1; i >= 0; i--){
                    if (history.stack[i].stateName == stateName){
                        $ionicHistory.backView(history.stack[i]);
                        //$ionicHistory.goBack();
                    }
                }
            };

            common.GetRandomNum = function (Min, Max) {
                var Range = Max - Min;
                var Rand = Math.random();
                return (Min + Math.round(Rand * Range));
            };

            return common;
        }]);

});