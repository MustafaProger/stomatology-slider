const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

gulp.task('server',  function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('*.html').on('change', browserSync.reload)

});

gulp.task('default', gulp.parallel('watch', 'server'));