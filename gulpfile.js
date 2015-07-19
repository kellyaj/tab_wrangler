'use strict';

var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    neat  = require('node-neat').includePaths;

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');


var paths = {
  jsx: './src/js/**/*.jsx',
  scss: './src/styles/**/*.scss'
};

gulp.task('build', function() {
  var bundler = browserify({
    debug: true
  })
  .require(require.resolve('./src/js/wrangler.jsx'), { entry: true })
  .transform(reactify)
  .external('react');

  var rebundle = function() {
    var start = Date.now();
    bundler.bundle()
    .pipe(source('wrangler_bundle.js'))
    .pipe(gulp.dest('build/js/bundles/'))
    .pipe(notify(function() {
      console.log('built in ' + (Date.now() - start) + 'ms');
    }));
  };

  rebundle();
});

gulp.task('styles', function() {
  return gulp.src(paths.scss)
           .pipe(sass({
             includePaths: ['styles'].concat(neat)
           }))
           .pipe(gulp.dest('./build/styles'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsx, ['build']);
  gulp.watch(paths.scss, ['styles']);
});

gulp.task('default', ['build', 'styles', 'watch'])
