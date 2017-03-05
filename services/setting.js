define(['app','env', 'zepto'], function (jhapp,env) {

  jhapp.factory('setting', [function () {
    var default_setting = {

    }
    var dev_setting = {
      api_url :"http://api.greatipr.cn",
      timer_count:60,
      update_ulr:"http://www.greatipr.com/app_down/update"
    };
    var production_setting = {
      api_url :"http://api.greatipr.cn",
      timer_count:60,
      update_ulr:"http://www.greatipr.com/app_down/update"
    };
    var test_setting = {
      api_url :"http://api.greatipr.cn",
      timer_count:60,
      update_ulr:"http://www.greatipr.com/app_down/update"

    };
    var rapmode_setting={
      rap:true
    }
    if (env == "dev") {
      return $.extend(default_setting,dev_setting);
    } else if (env == "production") {
      return $.extend(default_setting,production_setting);
    } else if (env == "test") {
      return $.extend(default_setting,test_setting);
    }else if(env=="rap"){
      return $.extend(test_setting,rapmode_setting);
    }
  }]);


});
