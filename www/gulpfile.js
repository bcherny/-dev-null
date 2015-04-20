const
  autoprefixer = require('gulp-autoprefixer'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  rework = require('gulp-rework'),
  source = require('vinyl-source-stream'),
  util = require('gulp-util')

gulp.task('images', function () {

  gulp
    .src('./src/images/*')
    .pipe(gulp.dest('./dist/images/'))

})

gulp.task('scripts', function () {

  var bundler = browserify({
    entries: ['./src/scripts/main.js']
  })

  var bundle = function() {
    return bundler
      .transform(babelify)
      .bundle()
      .on('error', browserifyError)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist/'))
  }

  return bundle()

})

gulp.task('styles', function () {

  gulp
    .src('./src/styles/*.css')
    .on('error', reworkError)
    .pipe(rework(
      require('rework-npm')(),
      require('rework-import')()
    ))
    .pipe(autoprefixer({ browsers: ['last 4 versions'] }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/'))

})

gulp.task('default', ['images', 'scripts', 'styles'])

gulp.task('watch', function () {

  gulp.watch('src/images/*', ['images'])
  gulp.watch('src/scripts/*.js', ['scripts'])
  gulp.watch('src/styles/*.css', ['styles'])

})

function error (err, prefix) {
  notifier.notify({
    message: 'Error: ' + err.message,
    title: prefix || 'Error'
  })
  util.log(util.colors.red.bold(prefix || 'Error'), err.message)
  this.end()
}

function browserifyError (err) {
  error.call(this, err, 'Browserify error')
}

function reworkError (err) {
  error.call(this, err, 'Rework error')
}