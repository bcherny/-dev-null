const
  autoprefixer = require('gulp-autoprefixer'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  notifier = require('node-notifier'),
  rework = require('gulp-rework'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  util = require('gulp-util'),
  watchify = require('watchify')

gulp.task('images', function () {

  gulp
    .src('./src/images/*')
    .pipe(gulp.dest('./dist/images/'))

})

// watchify
gulp.task('watchScripts', bundle)
var bundler = watchify(browserify('./src/scripts/main.js', watchify.args))
  .transform('babelify')
  .on('update', bundle)
function bundle () {

  return bundler
    .bundle()
    .on('error', browserifyError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/'))

}

gulp.task('scripts', function () {

  return browserify('./src/scripts/main.js')
    .transform('babelify')
    .bundle()
    .on('error', browserifyError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/'))

})

gulp.task('styles', function () {

  gulp
    .src('./src/styles/main.css')
    .on('error', reworkError)
    .pipe(sourcemaps.init())
    .pipe(rework(
      require('rework-npm')(),
      require('rework-import')(),
      require('rework-vars')()
    ))
    .pipe(autoprefixer({ browsers: ['last 4 versions'] }))
    .pipe(concat('bundle.css')) // rename
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'))

})

gulp.task('default', ['images', 'scripts', 'styles'])

gulp.task('watch', function () {

  gulp.watch('src/images/*', ['images'])
  gulp.watch('src/scripts/*.js', ['watchScripts'])
  gulp.watch('src/styles/*.css', ['styles'])

})

function error (err, prefix) {
  notifier.notify({
    message: 'Error: ' + err.message,
    title: prefix || 'Error'
  })
  util.log(util.colors.red.bold(prefix || 'Error'), err.message)
}

function browserifyError (err) {
  error.call(this, err, 'Browserify error')
  this.emit('end')
}

function reworkError (err) {
  error.call(this, err, 'Rework error')
  this.end()
}