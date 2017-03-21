'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var iife = require("gulp-iife");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
 return gulp.src('./src/sass/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest('./public/res/css'));
});


gulp.task('js', function (cb) {
  pump([
        gulp.src(['src/js/modules/*.module.js', 'src/js/*.js', 'src/js/**/*.js']),
        sourcemaps.init(),
        iife(),
        babel({
          presets: ['es2015']
        }),
        concat('script.min.js'),
        uglify(/*{
          mangle: false,
          output: {
            beautify: true
          },
          outSourceMap: true
        }*/),
        sourcemaps.write('.'),
        gulp.dest('./public/res/js')
    ],
    cb
  );
});

gulp.task('default', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

/*
* conseguir hacer el package.json
* livereload y liveserver
*/