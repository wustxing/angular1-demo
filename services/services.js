define(['app'], function (jhapp) {
  jhapp.factory('myhttp', ['$q', '$http', function ($q, $http) {
      var basehttp;
      return basehttp = function (request) {
        var promise;
        promise = $q(function (resolve, reject) {

          //$http.defaults.headers.post['Set-Cookie'] = 'ASP.NET_SessionId='+localStorage.getItem("SessionId");

          return $http(request).success(function (data, state, hearders) {
            resolve(data);

            if (data.Message == "需要登陆!") {
              console.log(data);
              //location.href = "#/login_self";
              location.href = "#/login/login_self";
            }
            $("#neterror").hide();
            $("#localneterror").hide();

          }).error(function (data) {

           var dev_url =  request.url.indexOf('yun2.huadee.cn');
            var production_url =request.url.indexOf('yun.huadee.cn');

       

            if(dev_url == -1 && production_url == -1){

              //本地环境
              console.log("localneterror");
              $("#localneterror").show();
            }else{
              console.log("neterror");
              $("#neterror").show();
            }

            reject(data);
          });
        });

        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };

        promise.error = function (fn2) {
          return promise["catch"](fn2);
        };

        return promise;
      };
    }]);
  var req_count = 0;
  var showspinner = function () {
    setTimeout(function () {
      if (req_count > 0) {
        $(".load_spiner").show();
      }
    }, 1000);

    req_count++;
  }

  var closespinner = function () {
    req_count--;
    if (req_count == 0) {
      $(".load_spiner").hide();
    }
    console.log("req_count:" + req_count);

  }

  jhapp.factory('http_loading', ["myhttp", "$q", '$httpProvider',function (myhttp, $q,$httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    var http_loading = function (config) {
      showspinner();
      config.timeout = config.timeout||40000;
      var promise = $q(function (resolve, reject) {
        myhttp(config).success(function (a, b, c) {
          resolve(a, b, c);
          closespinner();

        }).error(function (a, b, c) {
          reject(a, b, c);
          closespinner();
        });
      });
      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };

      promise.error = function (fn) {
        promise["catch"](fn);
        return promise;
      }
      return promise;
    }
    return http_loading;
  }]);

  jhapp.factory('http_no_loading', ["myhttp", "$q",
    function (myhttp, $q) {
      var http_loading = function (config) {

        var promise = $q(function (resolve, reject) {
          myhttp(config).success(function (a, b, c) {
            resolve(a, b, c);

          }).error(function (a, b, c) {
            reject(a, b, c);
          });
        });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };

        promise.error = function (fn) {
          promise["catch"](fn);
          return promise;
        }

        return promise;
      }
      return http_loading;

    }
  ]);

  var req_num = 0;

  var showloadingpage = function () {
    if (req_num > 0) {
      $(".loading_pages").show();
    }
    req_num++;
  }

  var hideloadingpage = function () {
    req_num--;
    if (req_num <= 0) {
      $(".loading_pages").hide();
    }
  }
  jhapp.factory('http_pageloading',["myhttp", "$q", function (myhttp, $q) {

    var http_pageloading = function (config) {
      showloadingpage();
      //config.timeout = 10000;
      var promise = $q(function (resolve, reject) {
        myhttp(config).success(function (a, b, c) {
          resolve(a, b, c);
          hideloadingpage();
        }).error(function (a, b, c) {
          reject(a, b, c);
          hideloadingpage();
        });
      })
      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };
      promise.error = function (fn) {
        promise["catch"](fn);
        return promise;
      }
      return promise;
    }
    return http_pageloading;
  }]);

  jhapp.factory('http_no_pageloading', ["myhttp", "$q",
    function (myhttp, $q) {
      var http_pageloading = function (config) {

        var promise = $q(function (resolve, reject) {
          myhttp(config).success(function (a, b, c) {
            resolve(a, b, c);

          }).error(function (a, b, c) {
            reject(a, b, c);
          });
        });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };

        promise.error = function (fn) {
          promise["catch"](fn);
          return promise;
        }

        return promise;
      }
      return http_pageloading;
    }
  ]);

  jhapp.factory('myalert', ["$ionicPopup", function ($ionicPopup) {
    return {
      alert: function (title, content, callback) {
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: content,
          okType: "button-light"
        });

        alertPopup.then(function (res) {
          callback(res);
          // console.log('Thank you for not eating my delicious ice cream cone');
        });
      },
      message: function (tile, content, okcallbuck, canclecallback) {
        var confirmPopup = $ionicPopup.confirm({
          title: tile,
          template: content,
          cancelType: "button-light",
          okType: "button-stable"
        });

        confirmPopup.then(function (res) {
          if (res) {
            if (okcallbuck) {
              okcallbuck();
            }
          } else {
            if (canclecallback) {
              canclecallback();
            }
          }
        });
      }, alert_auto: function (content) {
        $(".alert_auto .in_content").html(content);

        $(".alert_auto").show().removeClass("aw_out").addClass("aw_in");
        setTimeout(function () {
          $('.alert_auto').addClass("aw_out").removeClass("aw_in").hide();
        }, 1500);
      }, alert_auto_call: function (content,callback) {
        $(".alert_auto .in_content").html(content);

        $(".alert_auto").show().removeClass("aw_out").addClass("aw_in");
        setTimeout(function () {
          $('.alert_auto').addClass("aw_out").removeClass("aw_in").hide();
          callback();
        }, 1500);

      }
    }
  }
  ]);

  jhapp.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  });

  jhapp.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });

      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        elem.off(attr.eventFocus);
      });
    };
  });

});
