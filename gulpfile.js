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

var buildMessage = function(name, start) {
  return console.log("Built " + name + " in " + (Date.now() - start) + "ms")
};

gulp.task('build', function() {

  var backgroundBundler = browserify({
    debug: true
  })
  .require(require.resolve('./src/js/background.js'))

  var backgroundBundle = function() {
  var start = Date.now();
  var destination = 'background_bundle.js';
    backgroundBundler.bundle()
    .pipe(source(destination))
    .pipe(gulp.dest('build/js/bundles'))
    .pipe(notify(function() { buildMessage(destination, start) }));
  };

  var bundler = browserify({
    debug: true
  })
  .require(require.resolve('./src/js/wrangler.jsx'), { entry: true })
  .transform(reactify)
  .external('react');

  var rebundle = function() {
    var start = Date.now();
    var destination = 'wrangler_bundle.js';
    bundler.bundle()
    .pipe(source(destination))
    .pipe(gulp.dest('build/js/bundles/'))
    .pipe(notify(function() { buildMessage(destination, start) }));
  };

  rebundle();
  backgroundBundle();
});

gulp.task('styles', function() {
  var start = Date.now();
  gulp.src(paths.scss)
  .pipe(sass({includePaths: ['styles'].concat(neat)}))
  .pipe(gulp.dest('./build/styles'))
  .pipe(notify(function() { buildMessage("styles", start) }));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsx, ['build']);
  gulp.watch(paths.scss, ['styles']);
});

gulp.task('default', ['build', 'styles', 'watch'])
