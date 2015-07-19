var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;

var paths = {
  scss: './src/styles/*.scss'
}

gulp.task('styles', function() {
  return gulp.src(paths.scss)
           .pipe(sass({
             includePaths: ['styles'].concat(neat)
           }))
           .pipe(gulp.dest('./build/styles'));
});

gulp.task('default', function() {
  gulp.start('styles');
});
