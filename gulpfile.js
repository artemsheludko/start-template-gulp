var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    notify = require('gulp-notify');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
    return gulp.src('src/css/scss/style.scss')
        .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        // .pipe(cssnano({zindex: false})) // Optional, comment out when debugging
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

// Watch
gulp.task('watch', ['html', 'sass', 'js', 'fonts', 'browser-sync'], function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/css/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/fonts/**/*.*', ['fonts']);
});

// Default task
gulp.task('default', ['watch']);