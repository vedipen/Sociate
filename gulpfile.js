var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');

gulp.task('clean', function() {
    return del([
        'manifest/**/*'
    ])
});

gulp.task('generate-manifest', function() {
    gulp.src(['src/static/images/sociate*', 'src/manifest.json'])
        .pipe(zip('sociae.zip'))
        .pipe(gulp.dest('manifest'));
});

gulp.task('default', ['clean', 'generate-manifest'], function() {
    console.log('Build completed. Output in manifest folder');
});