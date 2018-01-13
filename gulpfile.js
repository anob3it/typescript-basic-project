var gulp = require('gulp');
var ts = require('gulp-typescript');

// Load the typescript configuration
var tsProject = ts.createProject('tsconfig.json');

// Define a task that compiles the sources and outputs into dist
gulp.task('build', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

// Define a task that watches for changes in
// source files and invokes the build task
gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.ts', ['build']);
});

// The default is to run the watch task if no task
// is given on the command line
gulp.task('default', ['watch']);
