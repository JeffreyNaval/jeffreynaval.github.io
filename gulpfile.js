'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Sass
gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// Uglify
gulp.task('uglify', function() {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'));
});

// Tasks
gulp.task('default', ['sass','uglify']);
gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['uglify']);
});