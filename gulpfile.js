var gulp = require('gulp'); 

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('js', function() {
  gulp.src('js/*.js')
      .pipe(concat('lib.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
  gulp.src('style/*.css')
      .pipe(concat('index.min.css'))
      .pipe(cleanCss())
      .pipe(gulp.dest('build'));
});

gulp.task('server', ['js', 'css'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: 9000,
    browser: 'google chrome'
  });

  gulp.watch('style/*.css', ['css']);
  gulp.watch('js/*.js', ['js']);

  gulp.watch('style/*.css').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});

// 默认任务
gulp.task('default', ['server']);

