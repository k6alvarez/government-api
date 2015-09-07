// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
/** Our lint task checks any JavaScript file in our govtAPI/www/js/ directory and makes sure there are no errors in our code. **/
gulp.task('lint', function() {
    return gulp.src('govtAPI/www/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
/** The sass task compiles any of our Sass files in our scss/ directory into .css and saves the compiled .css file in our css/ directory. **/
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('govtAPI/www/css'));
});

// Concatenate & Minify JS
/** 
    The scripts task concatenates all JavaScript files in our govtAPI/www/js/ directory and saves the ouput to our dist/ directory. 
    Then gulp takes that concatenated file, minifies it, renames it and saves it to the dist/ directory alongside
    the concatenated file. 
**/
gulp.task('scripts', function() {
    return gulp.src('govtAPI/www/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('govtAPI/www/js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);