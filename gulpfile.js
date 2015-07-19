'use strict';

var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    neat  = require('node-neat').includePaths;

var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var notify     = require('gulp-notify');


var paths = {
  jsx: './src/js/**/*.jsx',
  background: './src/js/background.js',
  scss: './src/styles/**/*.scss'
};

var buildMessage = function(name, start) {
  return console.log("Built " + name + " in " + (Date.now() - start) + "ms")
};

gulp.task('buildComponents', function() {
  var componentBundler = browserify({
    debug: true
  })
  .require(require.resolve('./src/js/wrangler.jsx'), { entry: true })
  .transform(reactify)
  .external('react');

  var bundleComponents = function() {
    var start = Date.now();
    var destination = 'wrangler_bundle.js';
    componentBundler.bundle()
    .pipe(source(destination))
    .pipe(gulp.dest('build/js/bundles/'))
    .pipe(notify(function() { buildMessage(destination, start) }));
  };

  bundleComponents();
});

gulp.task('buildBackground', function() {
  var backgroundBundler = browserify({
    debug: true
  })
  .require(require.resolve('./src/js/background.js'))

  var bundleBackground = function() {
    var start = Date.now();
    var destination = 'background_bundle.js';
      backgroundBundler.bundle()
      .pipe(source(destination))
      .pipe(gulp.dest('build/js/bundles'))
      .pipe(notify(function() { buildMessage(destination, start) }));
  };

  bundleBackground();
});


gulp.task('buildStyles', function() {
  var start = Date.now();
  gulp.src(paths.scss)
  .pipe(sass({includePaths: ['styles'].concat(neat)}))
  .pipe(gulp.dest('./build/styles'))
  .pipe(notify(function() { buildMessage("styles", start) }));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsx, ['buildComponents']);
  gulp.watch(paths.background, ['buildBackground']);
  gulp.watch(paths.scss, ['buildStyles']);
});

gulp.task('build', function() {
  gulp.start('buildBackground', 'buildComponents', 'buildStyles');
});

gulp.task('default', ['build', 'watch'])
