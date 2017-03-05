define(['app'
   ,"ctrl/demo/testspinner_ctrl"],function(jhapp){
   jhapp.controller('demo_ctrl',['$scope',function(s){
      console.log("demo_ctrl==============");


      s.items = [
         {
            name:"测试Spinner",
            url:"tab.testspinner"
         },
         {
            name:"测试showimg",
            url:"tab.testshowimg"

         }
      ];
   }]);
});