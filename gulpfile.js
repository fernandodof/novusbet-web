var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin');
    cleanCSS = require('gulp-clean-css');
    http = require('http');
    ecstatic = require('ecstatic');

var paths = {
    root: 'src',
    scripts: 'src/app/**/*.js',
    images: 'src/img/**/*.*',
    templates: 'src/app/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'bower_components/**/*.{ttf,woff,woff2,eof,svg}',
    styles : 'src/styles/sass/**/*.scss',
    styles_compiled: 'src/styles/compiled/'
};

var ports = {
    dev: '7083'
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [cleanCSS({compatibility: 'ie8'}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/styles'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-sass', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('custom.min.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('custom-sass', function() {
    return gulp.src(paths.styles)
        .pipe(sass()
        .on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/styles/compiled'));
});

gulp.task('custom-sass-dev', function() {
    return gulp.src(paths.styles)
        .pipe(sass()
        .on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.styles_compiled));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('custom-templates-dev', function() {
    return gulp.src(paths.templates)
        .pipe(gulp.dest('src/templates'));
});


/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-sass']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});


gulp.task('watch-dev', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-sass-dev']);
    gulp.watch([paths.templates], ['custom-templates-dev']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch(['dist/**/*.*']))
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('run', ['build', 'webserver', 'livereload', 'watch']);

gulp.task('run-dev', function () {
    http.createServer(
        ecstatic({ root: __dirname + '/' })
    ).listen(ports.dev);

    console.log(
        'Listening on http://localhost:'
        + ports.dev + '/'
        + paths.root);
});

gulp.task('default', ['custom-sass-dev', 'custom-templates-dev', 'run-dev', 'watch-dev'] );