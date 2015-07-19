'use strict';

var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    neat  = require('node-neat').includePaths;


var paths = {
  jsx: './src/js/**/*.jsx,
  scss: './src/styles/*.scss'
};

gulp.task('styles', function() {
  return gulp.src(paths.scss)
           .pipe(sass({
             includePaths: ['styles'].concat(neat)
           }))
           .pipe(gulp.dest('./build/styles'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scss, ['styles']);
  gulp.watch(paths.jsx, ['']);
});

gulp.task('default', ['styles', 'watch'])
