define(['app', 'ionic'], function (huadeeapp) {
    huadeeapp.directive('alertauto', [function () {
        return {
            templateUrl: 'tpls/manage/directive/alert_auto.html'
        };
    }]);

    huadeeapp.directive('showimg', ['setting', function (setting) {
        return {
            scope: {showimg: '=', foralt: '='},
            template: '<div class="imgp_ my-center vertical-center"><img alt="{{foralt}}"/></div>',
            link: function (s, ele, attrs) {
                var default_img = attrs.default || "directives/picture_show/default.png";
                //var ele1 = $(".imgp_");

                var ele1 = $(ele[0]);

                ele1.css("visibility", "hidden");

                var function_ele = function (ele1, cc) {
                    var ph = ele1.height();
                    var pw = ele1.width();
                    var blp = ph / pw;
                    var blc = cc.height / cc.width;
                    if (ph != 0 && pw != 0) {
                        ele1.find('.imgp_').css("height", ph + "px");
                        ele1.find('.imgp_').css("width", pw + 'px');
                        if (blc > blp) {
                            ele1.find('.imgp_ img').css("height", "100%");
                        } else {
                            ele1.find('.imgp_ img').css("width", "100%");
                        }
                    }
                };
                s.$watch('showimg', function (newv) {

                    var cc = new Image();

                    cc.onerror = function () {

                        ele1.find('.imgp_ img').attr('src', default_img);

                        var dimg = new Image();

                        dimg.onload = function () {

                            function_ele(ele1, dimg);

                            ele1.css("visibility", "visible");

                        };

                        dimg.src = default_img;
                    }
                    cc.onload = function () {

                        var imgdom = ele1.find('.imgp_ img')[0];

                        if (imgdom) {

                            imgdom.onload = function () {

                                function_ele(ele1, cc);

                                ele1.css("visibility", "visible");

                            };

                            imgdom.src = setting.api_url + '/api/file/download_img/' + newv;

                        }
                        //先获取父容器的宽高
                    }
                    cc.src = setting.api_url + '/api/file/download_img/' + newv;

                });
            }
        }
    }]);

    //huadeeapp.directive('showimg', [function () {
    //    return {
    //        scope: {showimg: '='},
    //        template: '<div class="imgp_ my-center vertical-center" ><img /></div>',
    //        link: function (s, ele, attrs) {
    //            var ele1 = ele;
    //            ele1.css("visibility", "hidden");
    //            var function_ele = function (elep, cc) {
    //                var ph = elep.height();
    //                var pw = elep.width();
    //                var blp = ph / pw;
    //                var blc = cc.height / cc.width;
    //                if (ph != 0 && pw != 0) {
    //                    elep.find('.imgp_').css("height", ph + "px");
    //                    elep.find('.imgp_').css("width", pw + 'px');
    //                    if (blc > blp) {
    //                        elep.find('.imgp_ img').css("height", "100%");
    //                    } else {
    //                        elep.find('.imgp_ img').css("width", "100%");
    //                    }
    //                }
    //            }
    //            //
    //            s.$watch('showimg', function (newv) {
    //                var cc = new Image();
    //                cc.onerror = function () {
    //                    ele1.find('.imgp_ img').attr('src', 'img/ionic.png');
    //                    var dimg = new Image();
    //                    dimg.onload = function () {
    //                        function_ele($(ele1[0]), dimg);
    //                        ele1.css("visibility", "visible");
    //                    }
    //                    dimg.src = 'img/ionic.png';
    //                }
    //                cc.onload = function () {
    //                    var imgdom = ele.find('img')[0];
    //                    //console.log(ele);
    //                    imgdom.onload = function () {
    //                        function_ele($(ele[0]), cc);
    //                        ele1.css("visibility", "visible");
    //                    };
    //                    imgdom.src = newv;
    //                    //先获取父容器的宽高
    //                }
    //
    //                cc.src = newv;
    //            });
    //        }
    //    }
    //}]);

    huadeeapp.directive('neterror', ["$rootScope", "$location", "$state", function ($rootScope, $location, $state) {
        return {
            templateUrl: 'tpls/manage/directive/neterror.html',
            link: function (scope, ele, attrs) {
                //$("input[type='hidden']").attr('type', 'text');
                //点击刷新图文特效
                ele.on('touchstart', function () {
                    //console.log('i am tom');
                    $(".error-img").css('backgroundImage', "url('img/manage/common/error_on.png')");
                    $('.error-tip').css('color', '#979a9b');
                });
                ele.on('touchend', function () {
                    $(".error-img").css('backgroundImage', "url('img/manage/common/error_off.png')");
                    $('.error-tip').css('color', '#d1d5d6');
                    $("#neterror").hide();
                    $rootScope.$broadcast("neterror2", {});
                    //$rootScope.$broadcast("$ionicView.beforeEnter", "forneterror");
                    // scope.$emit("neterror",{});
                });
                //ele.on('click', function () {
                //  $("#neterror").hide();
                //  $rootScope.$broadcast("$ionicView.enter", {});
                //  //$rootScope.$broadcast("$ionicView.beforeEnter", {});
                //  $("input[type='text']").attr('type', 'text');
                //});


                var hasnavurls = ["tab.data", "tab.message_index", "tab.contact_index", "tab.my_index"];
                scope.$on('freshneterro', function () {

                    var top = 0;
                    var bottom = 0;
                    //对登陆页面做同意处理
                    if (ionic.Platform.isIOS()) {
                        top = 64;
                    } else {
                        top = 44;
                    }
                    //根据是否是导航页来来设定bottom值

                    if (hasnavurls.indexOf($state.current.name) > -1) {
                        bottom = 0.83333;
                    } else {
                        bottom = 0;
                    }
                    //var hasnavurls_ideas=['tab.release_ideas'];
                    //if (hasnavurls_ideas.indexOf($state.current.name) > -1) {
                    //  scope.release_ideas=false;
                    //}
                    if ($state.current.name == "login_self") {
                        top = 0;
                        bottom = 0;

                    }
                    $(ele[0]).find(".net-abnormal-container").css("top", top + "px");
                    $(ele[0]).find(".net-abnormal-container").css("bottom", bottom + "rem");
                });
            }
        }
    }]);

    huadeeapp.directive('localneterror', ["$rootScope", "$location", "$state", function ($rootScope, $location, $state) {
        return {
            templateUrl: 'tpls/manage/directive/localneterror.html',
            link: function (scope, ele, attrs) {
                //$("input[type='hidden']").attr('type', 'text');
                //点击刷新图文特效
                ele.on('touchstart', function () {
                    //console.log('i am tom');
                    $(".error-img").css('backgroundImage', "url('img/manage/common/error_on.png')");
                    $('.error-tip').css('color', '#979a9b');
                });
                ele.on('touchend', function () {
                    $(".error-img").css('backgroundImage', "url('img/manage/common/error_off.png')");
                    $('.error-tip').css('color', '#d1d5d6');
                    $("#localneterror").hide();
                    //$rootScope.$broadcast("$ionicView.enter", {});
                    //$rootScope.$broadcast("$ionicView.beforeEnter", "forneterror");
                    scope.$emit("neterror", {});

                });


                var hasnavurls = ["tab.data", "tab.message_index", "tab.contact_index", "tab.my_index", "tab.testnet_index"];
                scope.$on('freshneterro', function () {

                    var top = 0;
                    var bottom = 0;
                    //对登陆页面做同意处理
                    if (ionic.Platform.isIOS()) {
                        top = 64;
                    } else {
                        top = 44;
                    }
                    //根据是否是导航页来来设定bottom值

                    if (hasnavurls.indexOf($state.current.name) > -1) {
                        bottom = 49;
                    } else {
                        bottom = 0;
                    }
                    //var hasnavurls_ideas=['tab.release_ideas'];
                    //if (hasnavurls_ideas.indexOf($state.current.name) > -1) {
                    //  scope.release_ideas=false;
                    //}
                    if ($state.current.name == "login_self") {
                        top = 0;
                        bottom = 0;

                    }
                    $(ele[0]).find(".net-abnormal-container").css("top", top + "px");
                    $(ele[0]).find(".net-abnormal-container").css("bottom", bottom + "px");
                });
            }
        }
    }]);

    huadeeapp.directive('loadingpage', ["$state", function ($state) {
        return {
            template: '<div class="loading_pages hide"><ion-spinner icon="ios" class="loadingpage"></ion-spinner></div>',
            link: function (s, ele, attrs) {

                var j_ele = $(ele[0]);

                s.$on('freshloadpage', function () {
                    //判断平台
                    var tops = 44;
                    if (ionic.Platform.isIOS()) {
                        tops = 64;
                    }
                    //判断是否有导航
                    var bottoms = 0;
                    var hasnavurls = ["tab.data", "tab.message_index", "tab.contact_index", "tab.my_index", "tab.testnet_index"];
                    var currentstate = $state.current.name;
                    if (hasnavurls.indexOf(currentstate) > -1) {
                        bottoms = 49;
                    }
                    j_ele.find('.loading_pages').css('top', tops + 'px');
                    j_ele.find('.loading_pages').css('bottom', bottoms + 'px');
                });

            }
        }
    }]);

    huadeeapp.directive('imgsee', ['$state', '$ionicPlatform', '$rootScope', function ($state, $ionicPlatform, $rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'tpls/manage/directive/seeimg.html',
            scope: {
                items: '=',
                itemindex: '='
            },
            link: function (s, ele, attrs) {
                //获取元素


                s.$watch('items', function (newValue, oldValue) {

                    console.log("检测到变化");

                    console.log(newValue);
                    console.log(oldValue);

                    if (newValue instanceof Array && newValue.length > 0) {


                        var pswpElement = document.querySelectorAll('.pswp')[0];


                        // define options (if needed)
                        var options = {
                            // history & focus options are disabled on CodePen
                            history: false,
                            focus: false,
                            showAnimationDuration: 0,

                            loop: false,//相册是否自动循环. 默认 =
                            enableUIWebViewRepositionTimeout: true,//检查设备的方向是否改变。默认 =
                            uiWebViewResetPositionDelay: 500,//(毫秒),定时检查设备的方向是否改变的时间 默认 =

                            hideAnimationDuration: 0,
                            fullscreenEl: !1,  //

                            shareEl: !1,     //

                            tapToClose: !0

                        };

                        var gallery = new window.photoswipe(pswpElement, window.photoswipeui_default, s.items, options);
                        gallery.init();
                        gallery.goTo(s.itemindex);
                        console.log(gallery);

                        console.log(gallery.getCurrentIndex());


                        console.log($rootScope);

                        gallery.listen('close', function () {
                            $rootScope.$$childHead.obj_item.items = [];
                        });


                        document.addEventListener("backbutton", function () {

                            gallery.close();

                        }, false);
                        //
                        //gallery.listen('preventDragEvent', function(e, isDown, preventObj) {
                        //
                        //  console.log("llllldddddddddddddddd");
                        //  preventObj.prevent = true;
                        //});
                        // Image loaded
                        gallery.listen('imageLoadComplete', function (index, item) {
                            // index - index of a slide that was loaded
                            // item - slide object
                            //点击大图隐藏，用下面的代码的话 有一个点击较快就失效的bug
                            console.log("llllldddddddddddddddd");
                            $('.pswp__zoom-wrap').on('click', 'img', function () {
                                $(".pswp__button--close").trigger("click");
                            });
                        });

                    }

                });


                console.log(ele[0]);

            }
        }
    }]);

    huadeeapp.directive('platformtop', ['$state', function ($state) {
        return {
            link: function (s, ele, attrs) {
                var p_ele = $(ele);
                var top = 44;
                if (ionic.Platform.isIOS()) {
                    top = 64;
                }
                ele.css('padding-top', top + 'px');
            }
        }
    }]);

    huadeeapp.directive('resizefootbar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
        // Runs during compile
        return {
            replace: false,
            link: function (scope, iElm, iAttrs, controller) {
                //绑定taResize事件
                var keyHeight = 0;
                var pheight = 0;
                var newFooterHeight = 0;
                var keyboardHeight = 0;
                /*window.addEventListener('native.keyboardshow', keyboardShowHandler);
                 function keyboardShowHandler(e){

                 var scroll = document.body.querySelector("#message-detail-content");
                 var taHeight = ta[0].offsetHeight;
                 var newFooterHeight = taHeight + 10;
                 newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                 //调整ion-footer-bar高度
                 iElm[0].style.height = newFooterHeight + 'px';
                 var scrollBar = $ionicScrollDelegate.$getByHandle('msgchatingScroll');
                 console.log('Keyboard height is: ' + e.keyboardHeight);
                 console.log("newFooterHeight"+newFooterHeight);
                 keyHeight = e.keyboardHeight;
                 pheight = keyHeight+newFooterHeight;
                 scroll.style.bottom = pheight+"px";
                 console.log("pheight"+pheight);
                 console.log("9999999999999999999999999----------------")
                 console.log(newFooterHeight);
                 scrollBar.scrollBottom();
                 }*/
                var isshow = "0";
                ionic.on('native.keyboardshow', function (e) {
                    isshow = "1";
                    keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
                    var scroll = document.body.querySelector("#message-detail-content");
                    var scrollBar = $ionicScrollDelegate.$getByHandle('msgchatingScroll');

                    if (ionic.Platform.isAndroid()) {
                        //  footerbar.style.bottom = newFooterHeight+"px";
                    } else {
                        var bottombase = 0;
                        if (isshow == "1") {
                            bottombase = keyboardHeight;
                        }
                        else {
                            bottombase = newFooterHeight;
                        }
                        var pheight = bottombase + newFooterHeight;
                        scroll.style.bottom = pheight + "px";
                        scrollBar.scrollBottom();
                    }
                }, window);
                ionic.on('native.keyboardhide', function () {
                    isshow = "0";
                    var scroll = document.body.querySelector("#message-detail-content");
                    var scrollBar = $ionicScrollDelegate.$getByHandle('msgchatingScroll');
                    if (ionic.Platform.isAndroid()) {
                        //  scroll.style.bottom = newFooterHeight+"px";
                    } else {
                        var bottombase = 0;
                        if (isshow == "1") {
                            bottombase = keyboardHeight;
                        }
                        else {
                            bottombase = newFooterHeight;
                        }
                        var pheight = bottombase + newFooterHeight;
                        scroll.style.bottom = pheight + "px";
                        scrollBar.scrollBottom();
                    }

                }, window);
                scope.$on("taResize", function (e, ta) {

                    if (!ta) return;
                    var scroll = document.body.querySelector("#message-detail-content");
                    var scrollBar = $ionicScrollDelegate.$getByHandle('msgchatingScroll');
                    var taHeight = ta[0].offsetHeight;
                    var newFooterHeight = taHeight + 10;
                    newFooterHeight = (newFooterHeight > 49) ? newFooterHeight : 49;

                    //调整ion-footer-bar高度
                    iElm[0].style.height = newFooterHeight + 'px';
                    //下面两行代码, 是解决键盘弹出覆盖聊天内容的bug
                    //第一行增加内容区高度
                    //第二行滑动到底部
                    if (ionic.Platform.isAndroid()) {
                        scroll.style.bottom = newFooterHeight + "px";
                    } else {
                        var bottombase = 0;
                        if (isshow == "1") {
                            bottombase = keyboardHeight;
                        }
                        else {
                            bottombase = 0;
                        }
                        var pheight = bottombase + newFooterHeight;
                        scroll.style.bottom = pheight + "px";
                    }
                    scrollBar.scrollBottom();
                })
                /* window.addEventListener('native.keyboardshow', keyboardShowHandler);
                 function keyboardShowHandler(e){
                 var keyheight = e.keyboardHeight;
                 }*/
            }
        };
    }]);

    huadeeapp.directive('keyboardshow', ["$rootScope", "$ionicPlatform", "$timeout", "$ionicHistory", "$cordovaKeyboard",
        function ($rootScope, $ionicPlatform, $timeout, $ionicHistory, $cordovaKeyboard) {
            return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    window.addEventListener('native.keyboardshow', function (e) {
                        angular.element(element).css({
                            'bottom': e.keyboardHeight + 'px'
                        });
                    });

                    window.addEventListener('native.keyboardhide', function (e) {
                        angular.element(element).css({
                            'bottom': 0 + "!important"
                        });
                    });
                }
            };
        }]);

    huadeeapp.directive('itemadd', [function () {

        //"@"  本地作用域属性：使用当前指令中的数据和DOM属性的值进行绑定
        //“=” 双向绑定：本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。
        //“&” 父级作用域绑定：通过 & 符号可以对父级作用域进行绑定


        return {
            restrict: 'ECMA',
            replace: true,    //替换的方式插入内容//绑定策略
            scope: {
                did: '@',        //解析普通字符串
                name: '@',    //解析数据
                popevent: '&'        //函数
            },
            link: function (scope, element, attributes) {

                console.log("link=========");

            },
            controller: ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {

                $scope.showPopup = function () {
                    $scope.data = {};

                    var myPopup = $ionicPopup.show({
                        template: '<input type="text" placeholder="请输入10字以内的标签" ng-model="data.value">',
                        title: '添加标签',
                        //subTitle: 'Please use normal things',
                        scope: $scope,
                        buttons: [
                            {text: '取消'},
                            {
                                text: '<b>确定</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.data.value) {
                                        //不允许用户关闭，除非他键入wifi密码
                                        e.preventDefault();
                                    } else {
                                        return $scope.data.value;
                                    }
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {
                        if (res) {
                            $scope.popevent({value: res});
                            console.log('Tapped!', res);
                        }

                    });

                    //$timeout(function() {
                    //  myPopup.close(); //由于某种原因3秒后关闭弹出
                    //}, 3000);
                };

                // 一个确认对话框
                $scope.showConfirm = function () {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Consume Ice Cream',
                        template: 'Are you sure you want to eat this ice cream?'
                    });
                    confirmPopup.then(function (res) {
                        if (res) {
                            console.log('You are sure');
                        } else {
                            console.log('You are not sure');
                        }
                    });
                };

                // 一个提示对话框
                $scope.showAlert = function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Don\'t eat that!',
                        template: 'It might taste good'
                    });
                    alertPopup.then(function (res) {
                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                };


            }],
            //template : '<div id="{{myId}}">\
            //              <input type="button"  value="1" class="active button button-p" ng-click="myFn({num:456})">\
            //              <input type="button" value="2">\
            //              <input type="button" value="3">\
            //              <div style="display:block;">{{myName}}</div>\
            //              <div>{{name}}</div>\
            //              <div>3333</div>\
            //          </div>'

            templateUrl: 'directives/directivetpls/modal_additem.html'
            //templateUrl: 'tpls/manage/directive/alert_auto.html'
        };

    }]);
});
