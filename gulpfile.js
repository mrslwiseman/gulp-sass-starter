const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const reload      = browserSync.reload;
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

var src = {
    scss: 'src/styles/*.scss',
    css:  'build/css/',
    pug: 'src/*.pug',
    html: 'build/'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'views'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.pug, ['views']);
    gulp.watch("build/*.html").on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
    });
    
    gulp.task('views', function buildHTML() {
        return gulp.src('src/*.pug')
        .pipe(pug({
            // Your options in here. 
        }))
        .pipe(gulp.dest(src.html))
  });


gulp.task('default', ['serve']);
