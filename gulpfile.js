var gulp = require("gulp");
// var $ = require("gulp-load-plugins")(); 
var browserSync = require('browser-sync');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var yargs = require('yargs').argv;
var fs = require("fs");
var minifyCss = require('gulp-uglifycss');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var del = require("del");

gulp.task('browser-sync', function() {
  browserSync.init({
    files: "**",
    server: {
      baseDir: "./"
    },
    port: yargs.p || 4000
  });
});

gulp.task('browserify', function() {
	gulp.src('./js/index.js')
		.pipe(browserify({
		  insertGlobals : true
		}))
    .pipe(uglify())
		.pipe(gulp.dest('./build/js'))
});


gulp.task('styles', function () {
  console.log("scss compile")
  gulp.src('./sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['styles'],function () {
        browserSync.reload();
    });
    gulp.watch('js/*.js', ['browserify'],function () {
        browserSync.reload();
    });
});

gulp.task("clean", function (){
  del(['./dist/'])
})

var disturl = './dist/';
gulp.task('build', ['browserify', 'styles'], function (){
  gulp.src('./*.html').pipe(gulp.dest(disturl));
  gulp.src('./images/**/*').pipe(gulp.dest(disturl+'images/'));
  gulp.src('./build/js/*.js').pipe(gulp.dest(disturl+'build/js/'));
  gulp.src('./audio/*.mp3').pipe(gulp.dest(disturl+'audio/'));
  gulp.src('./css/**/*').pipe(gulp.dest(disturl+'css/'));
})


gulp.task("default", function (){
	gulp.run(["browser-sync", "watch"]);
})
