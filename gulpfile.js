/**
 * LIBS
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var serve = require('gulp-serve');
var del = require('del');

/**
 * Variables
 */

var BOWER_COMPONENTS_DIR = './bower_components';
var LIBS_DIR = './assets/lib';
var APP_DIR = './app';

/**
 * TASKS
 */

gulp.task('js-libs', function () {
    gulp.src([
        BOWER_COMPONENTS_DIR + '/angular/angular.min.js',
        BOWER_COMPONENTS_DIR + '/angular-ui-router/release/angular-ui-router.min.js',
        BOWER_COMPONENTS_DIR + '/moment/min/moment.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(LIBS_DIR));
});

gulp.task('js-app', function () {
    gulp.src([
        APP_DIR + '/app.config.js',
        APP_DIR + '/home/home.controller.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(APP_DIR));
});

gulp.task('js', ['js-libs', 'js-app']);

gulp.task('js-clean', function () {
    del([
        APP_DIR + '/app.js',
        LIBS_DIR + '/libs.js'
    ]);
});
