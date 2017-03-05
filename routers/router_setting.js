define(['app'
    , 'env'
    , 'routers/demo/demo'
    ,'routers/my/my'
    ,'routers/classify/classify'
    ,'routers/cart/cart'
    ,'routers/home/home'
], function (jhapp, env) {

    jhapp.run(['$ionicPlatform', 'setting', '$ionicConfig', '$rootScope', 'myhttp',
        '$state', '$ionicActionSheet', '$timeout', '$cordovaDevice', '$cordovaAppVersion',
        '$ionicPopup', '$ionicLoading', '$cordovaFileTransfer', '$cordovaFile', '$cordovaFileOpener2',
        '$ionicHistory', '$location', 'myalert', '$cordovaKeyboard'
        , function ($ionicPlatform, setting,
                    $ionicConfigProvider, $rootScope, myhttp,
                    $state, $ionicActionSheet, $timeout, $cordovaDevice,
                    $cordovaAppVersion, $ionicPopup, $ionicLoading, $cordovaFileTransfer,
                    $cordovaFile, $cordovaFileOpener2, $ionicHistory, $location, myalert, $cordovaKeyboard) {


            //统一处理下方导航的显示与隐藏
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    event.preventDefault();
                    var backlist = ["tab.home",
                        "tab.demo",
                        "tab.my",
                        "tab.cart",
                        "tab.classify"];

                    if (_.indexOf(backlist, toState.name) != -1) {
                        $(".tab-nav.tabs").show();

                    } else {
                        $(".tab-nav.tabs").hide();
                    }

                    $rootScope.$broadcast("freshloadpage", {});
                    $rootScope.$broadcast("freshneterro", {});
                });

            $rootScope.myhttp = myhttp;
            $rootScope.$state = $state;

            $rootScope.$on('$ionicHistory.change', function (e, data) {

                console.log("================+++++++++++++++++++++++++++++++++++++");

                console.log($location.path());

                //$ionicHistory.clearHistory();


            });


            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                    ////延迟splash screnn 隐藏时间,不然会有短暂的白屏出现
                    //setTimeout(function () {
                    //    navigator.splashscreen.hide();
                    //}, 10);
                }

                if (window.StatusBar) {
                    StatusBar.styleDefault();
                    //StatusBar.styleLightContent();
                }

                console.log("env+:===============================" + env);


                if (env == "production" || env == "test") {
                    //检测更新
                    console.log($cordovaDevice.getModel());

                    var plat = $cordovaDevice.getPlatform();
                    console.log("plat+:=================" + plat);
                    if (plat == 'Android') {
                        checkUpdate();
                        //common.checkUpdate();
                    }
                }
                document.addEventListener("menubutton", onHardwareMenuKeyDown, false);

                window.addEventListener('native.keyboardhide', function (e) {
                    cordova.plugins.Keyboard.isVisible = true;
                    $timeout(function () {
                        cordova.plugins.Keyboard.isVisible = false;
                    }, 100);

                });

                ////双击退出
                $ionicPlatform.registerBackButtonAction(function (e) {
                    //判断处于哪个页面时双击退出
                    console.log("路径====" + $location.path());
                    console.log($rootScope.$$childHead.obj_item.items.length);
                    console.log($rootScope.$$childHead.obj_item.items);
                    if ($rootScope.$$childHead.obj_item.items.length > 0) {

                    } else {
                        if ($location.path() == '/tab/ideas_index') {
                            backExit();
                        }
                        else if ($location.path() == '/tab/appprocess_warn') {
                            var ion_t = $ionicHistory.currentHistoryId();
                            $ionicHistory.goToHistoryRoot(ion_t);
                        } else if ($location.path() == '/tab/com_index') {
                            var ion_i = $ionicHistory.currentHistoryId();
                            $ionicHistory.goToHistoryRoot(ion_i);
                        }
                        else if ($location.path() == '/tab/chating') {

                            if ($cordovaKeyboard.isVisible()) {
                                $cordovaKeyboard.close();
                            } else {
                                var ion_m = $ionicHistory.currentHistoryId();
                                $ionicHistory.goToHistoryRoot(ion_m);
                            }
                        } else if ($location.path() == '/tab/con_chating') {

                            if ($cordovaKeyboard.isVisible()) {
                                $cordovaKeyboard.close();
                            } else {
                                var ion_c = $ionicHistory.currentHistoryId();
                                $ionicHistory.goToHistoryRoot(ion_c);
                            }

                        }
                        else if ($ionicHistory.backView()) {

                            if ($cordovaKeyboard.isVisible()) {
                                $cordovaKeyboard.close();
                            } else {
                                $ionicHistory.goBack();
                            }

                        }
                        else {
                            backExit();
                        }
                    }


                    console.log($ionicHistory);
                    e.preventDefault();
                    return false;
                }, 101);

                $ionicPlatform.onHardwareBackButton(function () {

                });
            });


            function backExit() {
                if ($rootScope.backButtonPressedOnceToExit) {
                    //ionic.Platform.exitApp();
                    //navigator.app.exitApp();//这种退出方法没有完全关闭进程
                    ionic.Platform.exitApp();

                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    //var myconfirm = $ionicPopup.confirm({
                    //    title: '退出应用',
                    //    template: '再按一次退出系统',
                    //    cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
                    //    okText: '确认' // String (默认: 'OK')。OK按钮的文字。
                    //});
                    //myconfirm.then(function (res) {
                    //    if (res) {
                    //        navigator.app.exitApp();
                    //    } else {
                    //        console.log('You are not sure');
                    //        //$rootScope.backButtonPressedOnceToExit = false;
                    //    }
                    //});
                    //setTimeout(function () {
                    //    $rootScope.backButtonPressedOnceToExit = false;
                    //    myconfirm.close();
                    //}, 2000);


                    myalert.alert_auto("再按一次退出系统");
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;

                    }, 2000);
                }
            }

            // 菜单键
            function onHardwareMenuKeyDown() {
                $ionicActionSheet.show({
                    titleText: '检查更新',
                    buttons: [
                        {text: '关于'}
                    ],
                    destructiveText: '检查更新',
                    cancelText: '取消',
                    cancel: function () {
                        // add cancel code..
                    },
                    destructiveButtonClicked: function () {
                        //检查更新
                        checkUpdate();
                    },
                    buttonClicked: function (index) {

                    }
                });
                $timeout(function () {
                    hideSheet();
                }, 2000);
            };
            // 检查更新
            function checkUpdate() {
                console.log("checkUpdate+:=================");
                cordova.getAppVersion.getVersionNumber().then(function (version) {
                    // alert("版本号：===="+version);
                    $.ajax({
                        url: setting.update_ulr + "?version_code=" + version_code,
                        type: "get",
                        success: function (data) {
                            var serverAppVersion = data; //从服务端获取最新版本
                            if (version != serverAppVersion.appVersion) {
                                showUpdateConfirm(serverAppVersion);
                            }
                        },
                        error: function (data) {
                            console.log("获取版本号失败");
                        }
                    });
                });

            };

            // 显示是否更新对话框
            function showUpdateConfirm(appVersionParam) {
                var confirmPopup = $ionicPopup.confirm({
                    title: '版本升级',
                    //template: '1.xxxx;</br>2.xxxxxx;</br>3.xxxxxx;</br>4.xxxxxx' + version, //从服务端获取更新的内容
                    template: appVersionParam.template,
                    cancelText: '取消',
                    okText: '升级'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $ionicLoading.show({
                            template: "已经下载：0%"
                        });
                        //var url = "http://10.0.3.163:3000/android-debug.apk"; //可以从服务端获取更新APP的路径
                        var url = appVersionParam.down_url;
                        var path_v = cordova.file.externalRootDirectory + appVersionParam.name;
                        //var path_v =  cordova.file.applicationStorageDirectory + appVersionParam.name;

                        var targetPath = path_v; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                        var trustHosts = true;
                        var options = {};
                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                            // 打开下载下来的APP

                            $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
                            ).then(function () {

                                    // 成功
                                }, function (err) {
                                    // 错误
                                });
                            $ionicLoading.hide();
                        }, function (err) {
                            alert('下载失败');
                        }, function (progress) {
                            //进度，这里使用文字显示下载百分比
                            $timeout(function () {
                                var downloadProgress = (progress.loaded / progress.total) * 100;
                                $ionicLoading.show({
                                    template: "已经下载：" + Math.floor(downloadProgress) + "%"
                                });
                                if (downloadProgress > 99) {
                                    $ionicLoading.hide();
                                }
                            })
                        });
                    } else {
                        // 取消更新
                    }
                });
            };


        }]);
    //jhapp.config(['$httpProvider', 'ngRapProvider', '$urlRouterProvider',
    //    function (httpProvider, ngRapProvider, $urlRouterProvider,setting) {
    //
    //
    //        $urlRouterProvider.otherwise("/tab/index");
    //
    //        if (env=="rap") {
    //            ngRapProvider.script = ' http://rap.taobao.org/rap.plugin.js?projectId=4837'; // replce your host and project id
    //            //'http://10.0.3.217','http://dev.greatipr.com','http://localhost'
    //            ngRapProvider.enable({
    //                mode: 3,
    //                domain: ['http://localhost:4002', 'http://demo.huadee.cn']
    //            });
    //            httpProvider.interceptors.push('rapMockInterceptor');
    //        }
    //
    //
    //    }]);

    jhapp.config(['$httpProvider',
        function ($httpProvider) {
            //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            //
            ////console.log($httpProvider.defaults.headers);
            //if (env != "rap") {
            //    $httpProvider.defaults.withCredentials = true;
            //}
            //
            //$httpProvider.defaults.transformRequest = [function (data) {
            //    /**
            //     * The workhorse; converts an object to x-www-form-urlencoded serialization.
            //     * @param {Object} obj
            //     * @return {String}
            //     */
            //    var param = function (obj) {
            //        var query = '';
            //        var name, value, fullSubName, subName, subValue, innerObj, i;
            //
            //        for (name in obj) {
            //            value = obj[name];
            //
            //            if (value instanceof Array) {
            //                for (i = 0; i < value.length; ++i) {
            //                    subValue = value[i];
            //                    fullSubName = name + '[' + i + ']';
            //                    innerObj = {};
            //                    innerObj[fullSubName] = subValue;
            //                    query += param(innerObj) + '&';
            //                }
            //            } else if (value instanceof Object) {
            //                for (subName in value) {
            //                    subValue = value[subName];
            //                    fullSubName = name + '[' + subName + ']';
            //                    innerObj = {};
            //                    innerObj[fullSubName] = subValue;
            //                    query += param(innerObj) + '&';
            //                }
            //            } else if (value !== undefined && value !== null) {
            //                query += encodeURIComponent(name) + '='
            //                    + encodeURIComponent(value) + '&';
            //            }
            //        }
            //
            //        return query.length ? query.substr(0, query.length - 1) : query;
            //    };
            //
            //    return angular.isObject(data) && String(data) !== '[object File]'
            //        ? param(data)
            //        : data;
            //}];
        }]);

    jhapp.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/tab/demo");
            $stateProvider
                .state('tab', {
                    url: '/tab',
                    views: {
                        "rootview": {
                            templateUrl: 'tpls/tabs.html',
                            controller: 'tabctrl'
                        }
                    }
                })


        }])

});