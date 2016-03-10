/**
 * LIBS
 */

var gulp    = require('gulp');
var concat  = require('gulp-concat');
var serve   = require('gulp-serve');
var del     = require('del');
var sass    = require('gulp-sass');

/**
 * Variables
 */

var BOWER_COMPONENTS_DIR    = 'bower_components';
var LIBS_DIR                = 'assets/lib';
var MEDIA_DIR               = 'assets/media';
var APP_DIR                 = 'app';
var CSS_DIR                 = 'assets/css';
var SCSS_DIR                = 'assets/scss';
var DIST_DIR                = 'dist';
var DIST_CSS_DIR            = 'dist/' + CSS_DIR;
var DIST_LIBS_DIR           = 'dist/' + LIBS_DIR;
var DIST_APP_DIR            = 'dist/' + APP_DIR;
var DIST_MEDIA_DIR          = 'dist/' + MEDIA_DIR;

/**
 * TASKS
 */

gulp.task('js-libs', function () {
    gulp.src([
        BOWER_COMPONENTS_DIR + '/angular/angular.min.js',
        BOWER_COMPONENTS_DIR + '/angular-ui-router/release/angular-ui-router.min.js',
        BOWER_COMPONENTS_DIR + '/moment/min/moment.min.js',
        BOWER_COMPONENTS_DIR + '/angular-aria/angular-aria.min.js',
        BOWER_COMPONENTS_DIR + '/angular-animate/angular-animate.min.js',
        BOWER_COMPONENTS_DIR + '/angular-material/angular-material.min.js',
        BOWER_COMPONENTS_DIR + '/angular-notification/angular-notification.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(LIBS_DIR));
});

gulp.task('js-app', function () {
    gulp.src([
        APP_DIR + '/app.config.js',
        APP_DIR + '/*/*.js'
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

gulp.task('css-libs', function () {
    gulp.src([
        BOWER_COMPONENTS_DIR + '/angular-material/angular-material.min.css',
        BOWER_COMPONENTS_DIR + '/angular-material/angular-material.layouts.min.css'
    ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(LIBS_DIR));
});

gulp.task('css-app', function () {
    gulp.src(SCSS_DIR + '/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(CSS_DIR));
});

gulp.task('css', ['css-libs', 'css-app']);

gulp.task('css-clean', function () {
    del(CSS_DIR + '/app.css');
});

gulp.task('copy-files-to-dist', function () {
    gulp.src([
        APP_DIR + '/**/*.template.html',
        APP_DIR + '/app.js'
    ])
        .pipe(gulp.dest(DIST_APP_DIR));

    gulp.src(CSS_DIR + '/app.css')
        .pipe(gulp.dest(DIST_CSS_DIR));

    gulp.src(LIBS_DIR + '/**/*')
        .pipe(gulp.dest(DIST_LIBS_DIR));

    gulp.src(MEDIA_DIR + '/**/*')
        .pipe(gulp.dest(DIST_MEDIA_DIR));

    gulp.src('index.html')
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('build', ['css', 'js', 'copy-files-to-dist']);

gulp.task('build-clean', function () {
    del(DIST_DIR);
});

gulp.task('clean', ['css-clean', 'js-clean', 'build-clean'])
