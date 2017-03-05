var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
var gulpSequence = require('gulp-sequence');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");


gulp.task("default", function () {
    console.log("hello")
});

gulp.task("server", function () {
    browserSync.init({
        server: {baseDir: "."},
        port: 4002,
        ui: {port: 4003}
    });
    gulp.watch(["*.html", "css/**/*.css", "js/*.js"])
        .on("change", reload)

});



//删除
gulp.task('clean:done', function (cb) {
    del([
        'done/**/*',
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        'done_uglify/**/*'
    ], cb);
});

//js合并压缩
gulp.task('cjs', function () {

    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    return gulp.src(['done/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('done_uglify'));


});
//css合并压缩
gulp.task('minify-css', function () {
    gulp.src('css/*.css') // 要压缩的css文件
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('done/css'));
});

gulp.task('minify-html', function () {
    gulp.src('html/*.html') // 要压缩的html文件
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('dist/html'));
});

//压缩图片
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件

gulp.task('pngimg', function () {
    return gulp.src('img/index/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('done/'));
});



// 复制文件
gulp.task('copy', function () {
    gulp.src('ctrl/**/*.js')
        .pipe(gulp.dest('done/'));

});

gulp.task('publish',['clean:done'], function(){
    gulp.start('copy','index');
});