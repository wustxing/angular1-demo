define(['env', 'ionic'], function (env) {
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                console.log(clientWidth);
                if (!clientWidth) return;
                if (clientWidth >= 640) {
                    docEl.style.fontSize = '100px';
                } else {
                    // docEl.style.fontSize = '58.6px';
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';

                    console.log(docEl.style.fontSize);
                }
            };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);


    var jhapp = angular.module('jhapp', ['ionic', 'ngCordova']);
    jhapp.run(['$ionicPlatform', "$ionicConfig","setting",
        function ($ionicPlatform, $ionicConfigProvider,setting) {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                //延迟splash screnn 隐藏时间,不然会有短暂的白屏出现

            }

            $ionicConfigProvider.platform.ios.tabs.style('standard');
            $ionicConfigProvider.platform.ios.tabs.position('bottom');
            $ionicConfigProvider.platform.android.tabs.style('standard');
            $ionicConfigProvider.platform.android.tabs.position('bottom');

            $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
            $ionicConfigProvider.platform.android.navBar.alignTitle('center');

            $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
            $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');

        }
    ]);


    jhapp.controller('tabctrl', ['$scope', '$ionicHistory','$state'
        , function (s, $ionicHistory,$state) {

            console.log("tabctrl=======================");
            s.back_history = function () {
                console.log("ddd===555");

                console.log($ionicHistory.viewHistory());
                console.log($ionicHistory.currentHistoryId());
                $ionicHistory.goBack();
            };

            s.isshownav = false;
            s.shownav = function () {
                s.isshownav = true;
            }
            s.hidenav = function () {
                s.isshownav = false;
            }


        }]);

    return jhapp;

});
