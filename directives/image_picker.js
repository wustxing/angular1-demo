define(["app",'services/common'], function (myapp) {
    myapp.directive("imagepick", ["$ionicActionSheet", "common", "$cordovaCamera", "apis",
        function ($ionicActionSheet, common, $cordovaCamera, apis) {
            return {
                scope: {
                    completeselect: "&"
                },
                link: function (s, ele, attrs) {

                    var pickImage = function () {

                        var options = {
                            maximumImagesCount: s.file_obj.count,
                            width: 640,
                            height: 960,
                            quality: 80

                        };

                        $cordovaImagePicker.getPictures(options)
                            .then(function (results) {
                                //$(".load_spiner").show();

                                s.tcount = 0;
                                s.str_list_img = [];
                                s.file_obj.count = s.file_obj.count - results.length;


                                for (var k = 0; k < results.length; k++) {

                                    var tc = s.file_obj.count - k;

                                    //convertImgToBase64(results[k],'image/png',tc,results.length);

                                    common.convertImgToBase64(results[k], 'image/jpeg', tc, results.length, function (dataimg, ori) {


                                        common.getImgDataToBase(dataimg, function (base64) {
                                            upImage(base64, "");
                                        }, ori);


                                    });


                                }
                            }, function (error) {
                                // error getting photos
                            });
                    };

                    var appendByCamera = function () {
                        var options = {
                            //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
                            quality: 100,                                            //相片质量0-100
                            destinationType: 2,        //Camera.DestinationType.FILE_URI      //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
                            sourceType: 1,             //1为相机拍照  Camera.PictureSourceType.CAMERA    //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                            allowEdit: false,                                        //在选择之前允许修改截图
                            encodingType: 0,                   // Camera.EncodingType.JPEG    //保存的图片格式： JPEG = 0, PNG = 1
                            targetWidth: 800,                                        //照片宽度
                            targetHeight: 800,                                       //照片高度
                            mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                            cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: true                                   //保存进手机相册
                        };
                        $cordovaCamera.getPicture(options).then(function (imageData) {

                            s.tcount = 0;
                            // s.file_obj.count = s.file_obj.count - 1;

                            common.getImgData(imageData, function (base64) {
                                upImage(base64, 'camera.jpg');
                            })

                        }, function (err) {
                            // error
                            //alert(err.message);
                        });

                    }

                    var upImage = function (base64img, f_name) {
                        var t_base64img = "";

                        var tcount = 1;

                        if (f_name != 'camera.jpg') {
                            //var t = base64img.dataURL.indexOf('base64,');
                            //t_base64img = base64img.dataURL.slice(t + 7);
                            t_base64img = base64img.dataURL;
                            tcount = base64img.tcount;
                        } else {
                            t_base64img = base64img;
                            tcount = -1;
                        }

                        var params = {};
                        params.fileData = t_base64img;
                        params.type = 0;
                        params.fileName = f_name || "test.jpg";

                        params.viewOrder = base64img.sortid || 0;


                        //在这里显示照片
                        apis.my.upload_file(params)
                            .success(function (data) {

                                if (data.ResultFlag > 0) {
                                    //上传成功了以后获取id

                                    if (add_ids) {
                                        add_ids += "," + data.FileInfo.Id;
                                    } else {
                                        add_ids = data.FileInfo.Id;
                                    }

                                    //存储返回图片id（用于删除）
                                    var obj_file = {};
                                    obj_file.id = data.FileInfo.Id;
                                    obj_file.base64img = "data:image/jpeg;base64," + params.fileData;
                                    obj_file.sortid = params.viewOrder;

                                    var obj_f = {}
                                    obj_f.XsfileId = data.FileInfo.Id;
                                    obj_f.f_img = "data:image/jpeg;base64," + params.fileData;


                                    s.completeselect({imagerestul: data.FileInfo});


                                    $(".load_spiner").hide();
                                }


                            })
                            .error(function (data) {

                            });
                    };

                    ele.on('click', function () {

                        $ionicActionSheet.show({
                            buttons: [
                                {text: '本地相册'},
                                {text: '拍照'}
                            ],
                            cancelText: '取消',

                            cancel: function () {
                                return true;
                            },
                            buttonClicked: function (index) {

                                switch (index) {

                                    case 0:
                                        pickImage();
                                        break;
                                    case 1:
                                        appendByCamera();

                                        break;
                                    default:
                                        break;
                                }
                                return true;
                            }
                        });
                    });
                }
            };
        }]);

    myapp.directive("imagepick1",
        ["$ionicActionSheet", "$cordovaCamera", "$cordovaImagePicker","common","apis",
            function ($ionicActionSheet, $cordovaCamera, $cordovaImagePicker,common,apis) {

                return {
                    restrict: 'ECMA',
                    replace: true,    //替换的方式插入内容//绑定策略
                    scope: {
                        completeselect: "&"
                    },
                    link: function (s, ele, attrs) {

                        s.tcount = 0;

                        s.str_list_img = [];

                        //图片对象
                        s.file_obj = {};
                        s.file_obj.count = 9;

                        var pickImage = function () {

                            var options = {
                                maximumImagesCount: s.file_obj.count,
                                width: 640,
                                height: 960,
                                quality: 80

                            };

                            $cordovaImagePicker.getPictures(options)
                                .then(function (results) {
                                    $(".load_spiner").show();
                                    s.tcount = 0;

                                    s.str_list_img = [];

                                    s.file_obj.count = s.file_obj.count - results.length;

                                    console.log("选择多张图片getPictures=========");
                                    console.log(results);

                                    for (var k = 0; k < results.length; k++) {

                                        var tc = s.file_obj.count - k;

                                        common.convertImgToBase64(results[k], 'image/jpeg', tc, results.length, function (dataimg, ori) {

                                            console.log("选择多张图片convertImgToBase64==========="+ori);

                                            common.getImgDataToBase(dataimg, function (base64) {
                                                console.log("选择多张图片getImgDataToBase===========");
                                                upImage(base64, "");
                                            }, ori);


                                        });


                                    }
                                }, function (error) {
                                    // error getting photos
                                });
                        };

                        var appendByCamera = function () {
                            var options = {
                                //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
                                quality: 100,                                            //相片质量0-100
                                destinationType: 2,        //Camera.DestinationType.FILE_URI      //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
                                sourceType: 1,             //1为相机拍照  Camera.PictureSourceType.CAMERA    //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                                allowEdit: false,                                        //在选择之前允许修改截图
                                encodingType: 0,                   // Camera.EncodingType.JPEG    //保存的图片格式： JPEG = 0, PNG = 1
                                targetWidth: 400,                                        //照片宽度
                                targetHeight: 400,                                       //照片高度
                                mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                                cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
                                popoverOptions: CameraPopoverOptions,
                                saveToPhotoAlbum: true                                   //保存进手机相册
                            };
                            $cordovaCamera.getPicture(options).then(function (imageData) {

                                s.tcount = 0;
                                s.file_obj.count = s.file_obj.count - 1;

                                console.log("getPicture=================");
                                console.log(imageData);

                                common.getImgData(imageData, function (base64) {
                                    console.log("getImgData=================");
                                    upImage(base64, 'camera.jpg');
                                })

                            }, function (err) {
                                // error
                                //alert(err.message);
                            });

                        }

                        var upImage = function (base64img, f_name) {
                            var t_base64img = "";

                            var tcount = 1;

                            if (f_name != 'camera.jpg') {
                                t_base64img = base64img.dataURL;
                                tcount = base64img.tcount;
                                console.log("相册选择=============upimage");
                            } else {
                                t_base64img = base64img;
                                tcount = -1;

                                console.log("camera=============upimage");
                            }

                            var params = {};
                            params.fileData = t_base64img;
                            params.type = 0;
                            params.fileName = f_name || "test.jpg";

                            params.viewOrder = base64img.sortid || 0;


                            //在这里显示照片
                            apis.my.upload_file(params)
                                .success(function (data) {
                                    console.log(data);
                                    if (data.ResultFlag > 0) {
                                        console.log("上传成功=============upimage");
                                        //上传成功了以后获取id
                                        //存储返回图片id（用于删除）
                                        var obj_file = {};
                                        obj_file.id = data.FileInfo.Id;
                                        obj_file.base64img = "data:image/jpeg;base64," + params.fileData;
                                        obj_file.sortid = params.viewOrder;

                                        //var obj_f = {};
                                        //obj_f.XsfileId = data.FileInfo.Id;
                                        //obj_f.f_img = "data:image/jpeg;base64," + params.fileData;


                                        s.completeselect({imagerestul: obj_file});


                                        $(".load_spiner").hide();
                                    }else{
                                        s.completeselect({imagerestul: -1});
                                    }


                                })
                                .error(function (data) {

                                    s.completeselect({imagerestul: -1});
                                });
                        };

                        ele.on('click', function () {

                            $ionicActionSheet.show({
                                buttons: [
                                    {text: '本地相册'},
                                    {text: '拍照'}
                                ],
                                cancelText: '取消',

                                cancel: function () {
                                    return true;
                                },
                                buttonClicked: function (index) {

                                    switch (index) {

                                        case 0:
                                            pickImage();
                                            break;
                                        case 1:
                                            appendByCamera();

                                            break;
                                        default:
                                            break;
                                    }
                                    return true;
                                }
                            });
                        });
                    }
                };

            }]);
});
