'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Config
var config = {
  bowerDir: './bower_components',
  jsPath: './src/js',
  sassPath: './src/sass',
  outputPath: './assets'
}

// Bower Files
var bowerFiles = {
  js: [
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    config.bowerDir + '/jquery/dist/jquery.min.js'
  ],
  fonts: [
    config.bowerDir + '/fontawesome/fonts/**.*',
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/**.*'
  ],
  sass: [
    config.bowerDir + '/bootstrap-sass/assets/stylesheets',
    config.bowerDir + '/fontawesome/scss'
  ]
}

// Copy Fonts
gulp.task('copy:fonts', function() {
    return gulp.src(bowerFiles.fonts)
      .pipe(gulp.dest(config.outputPath+'/fonts'));
});
// Copy Javascripts
gulp.task('copy:js', function() {
    return gulp.src(bowerFiles.js)
      .pipe(gulp.dest(config.outputPath+'/js'));
});

// Sass
gulp.task('sass', function () {
  gulp.src(config.sassPath+'/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: bowerFiles.sass
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.outputPath+'/css'));
});
// Sass Watch
gulp.task('sass:watch', function () {
  gulp.watch(config.sassPath+'/**/*.scss', ['sass']);
});

// Uglify
gulp.task('uglify', function() {
  return gulp.src(config.jsPath+'/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.outputPath+'/js'));
});
// Uglify Watch
gulp.task('uglify:watch', function () {
  gulp.watch(config.jsPath+'/*.js', ['uglify']);
});

// Tasks
gulp.task('default', ['sass','uglify']);
gulp.task('watch', ['sass:watch','uglify:watch']);
gulp.task('copy',['copy:js','copy:fonts']);
