'use strict';

var gulp           = require('gulp'),
    notify         = require('gulp-notify'),
    watch          = require('gulp-watch'),
    browserSync    = require('browser-sync').create(),
    sass           = require('gulp-sass'),
    autoprefixer   = require('gulp-autoprefixer'),
    merge          = require('merge-stream');

function onError(err) {
    console.log(err);
    this.emit('end');
}

var folders = [
    './styling',
];

// --------------------------------------------------- SASS/CSS DEST

var sassInput  = './styling/**/*.scss',
    cssInput   = './styling/css/*.css',
    devInput   = ['./web/*.html', './web/*.php'];

// --------------------------------------------------- COMPILE OPTIONS

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// --------------------------------------------------- AUTOPREFIXER OPTIONS

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%', 'Safari 8', 'Firefox ESR']
};

// --------------------------------------------------- BROWSERSYNC TASK (combines 'sass' with 'browsersync')

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "mijim.local.dev",
        browser: ["google chrome"],
    });

    gulp.watch(sassInput, ['sass']);
    gulp.watch(sassInput).on('change', browserSync.reload);
    gulp.watch(devInput).on('change', browserSync.reload);
});

// --------------------------------------------------- SASS TASK

gulp.task('sass', function(){
    var tasks = folders.map(function(element){
        return gulp.src(element + '/**/*.scss', {base: element + '/sass'})
        .pipe(sass().on('error', sass.logError))        // Error logging
        .pipe(autoprefixer(autoprefixerOptions))        // Autoprefixer with options
        .pipe(gulp.dest(element + '/css'))
    });

    return merge(tasks);
});
