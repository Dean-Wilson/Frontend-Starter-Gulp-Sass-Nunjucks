var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var todo = require('gulp-todo');  
var stripDebug = require('gulp-strip-debug');
var browserSync = require('browser-sync').create();

var base = {
 public: 'public/',
 source: 'src/'
};
var paths = {
 styles: ['src/styles/**/*.scss'],
 allScripts: ['src/scripts/**/*'],
 siteScripts: ['src/scripts/*'],
 vendorScripts: ['src/scripts/vendor/*'],
 images: ['src/images/**/*'],
 fonts: ['src/fonts/*'],
 html: ['craft/templates/*.html']
};

//run default dev tasks here
gulp.task('serve', ['styles','scripts','fonts','images','todo'], function(){
  browserSync.init({
      proxy: "ku.dev",
      open: false,
      reloadOnRestart: false,
      injectChanges: true,
  });
  // Watch the various folders / files for change and run respective tasks
  gulp.watch(paths.styles, ['styles']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch(paths.allScripts,['scripts']);
  gulp.watch(paths.images,['images']);
  gulp.watch(paths.fonts,['fonts']);
  gulp.watch(paths.html,['todo']).on('change', browserSync.reload);
});

//To Do task: generate a todo.md from all files in the paths.html folder
gulp.task('todo', function() {
    gulp.src(paths.html)
        .pipe(todo())
        .pipe(gulp.dest(base.source))
});

//Styles Task
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: require('node-normalize-scss').with('node_modules/susy/sass')
};
gulp.task('styles', function () {
  return gulp
    .src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('/maps', { sourceRoot: null }))      
    .pipe(gulp.dest(base.public + 'styles/'))
    // the follwing line lets through only files with a *.css extension - so maps file doesn't force a page reload
    .pipe(filter(['**/*.css']))  
    .pipe(browserSync.stream());
});

//Fonts Task
gulp.task('fonts', function() {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest(base.public + '/styles/fonts'));
});

//Scripts task: Concatenating, renaming Script files
gulp.task('scripts', function() {
    gulp.src('src/scripts/*')
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(base.public + '/scripts'))
    gulp.src(paths.vendorScripts)        
      .pipe(concat('vendor.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(base.public + '/scripts'))
      .pipe(browserSync.stream());
  });

//Images task: compress and then copy images
gulp.task('images', function() {
  gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(base.public + '/images'));
});

//default runs the serve task above
gulp.task('default', ['serve']);

//Build task
gulp.task('build', ['styles-prod', 'scripts-prod', 'images', 'fonts']);

var sassBuildOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  includePaths: require('node-normalize-scss').with('node_modules/susy/sass')
};

//Build tasks (no browsersync task, minified scripts and styles, strip debug)
gulp.task('styles-prod', function () {
  return gulp
    .src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass(sassBuildOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('/maps', { sourceRoot: null }))  
    .pipe(gulp.dest(base.public + 'styles/'))
});

gulp.task('scripts-prod', function() {
  gulp.src('src/scripts/*')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(base.public + '/scripts'))
  gulp.src(paths.vendorScripts)        
    .pipe(concat('vendor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(base.public + '/scripts'))
});