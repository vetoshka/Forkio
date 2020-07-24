'use strict';
let gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    scss = require('gulp-sass'),
    minify = require('gulp-js-minify'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber');
gulp.task('server', () => {
    browserSync.init({
        server:{
            baseDir: "./dist",
        },
    });
    browserSync.watch('build', browserSync.reload)
});
gulp.task('clean', () =>{
    return gulp.src('./dist/', {allowEmpty: true})
        .pipe(clean())
});
gulp.task('buildHTML', () => {
    return gulp.src('./src/*.html')
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err.message);
                browserSync.notify(err.message, 10000)}
        }))
        .pipe(concat('index.html'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/'))
        .on('end', browserSync.reload);
});
gulp.task('buildCSS', () => {
    return gulp.src('./src/style/*.scss')
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err.message);
                browserSync.notify(err.message, 10000)}
        }))
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS())
        .pipe(concat('main.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/style/'))
        .on('end', browserSync.reload);
});
gulp.task('addIcon',() =>{
    return gulp.src('./src/img/icon/*')
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err.message);
                browserSync.notify(err.message, 10000)}
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/icon'))
});
gulp.task('addBG',() =>{
    return gulp.src('./src/img/bg/*')
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err.message);
                browserSync.notify(err.message, 10000)}
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/bg'))
});
gulp.task('addIMG', gulp.parallel('addIcon','addBG'));
gulp.task('addResetCSS', () => {
    return gulp.src('./src/style/reset.css')
        .pipe(gulp.dest('dist/style/'))
});
gulp.task('buildScript', () =>{
    return gulp.src('./src/script/*.js')
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err.message);
                browserSync.notify(err.message, 10000)}
        }))
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/script/'))
        .on('end', browserSync.reload);

});
gulp.task('watch', () => {
    gulp.watch('src/style/*.scss', gulp.series('buildCSS'));
    gulp.watch('src/script/*.js', gulp.series('buildScript'));
    gulp.watch('src/*.html', gulp.series('buildHTML'));
    gulp.watch('src/img/*', gulp.series('addIMG'));
});
gulp.task('build', gulp.series(gulp.series('clean'), gulp.parallel('addIMG','buildHTML','buildCSS','buildScript', 'addResetCSS')));
gulp.task('dev', gulp.parallel('watch','server'));